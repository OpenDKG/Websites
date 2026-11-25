import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const opendkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = process.env.OPENDKG_SITE_DIR
  ? path.resolve(process.env.OPENDKG_SITE_DIR)
  : path.resolve(opendkgDir, "..", "dist");

const SITES = ["desktop", "graph", "veritytrail"];

function existsExactCase(baseDir, relPath) {
  const segments = relPath.split("/").filter(Boolean);
  let cur = baseDir;
  for (const seg of segments) {
    let entries;
    try {
      entries = readdirSync(cur);
    } catch {
      return false;
    }
    if (!entries.includes(seg)) return false;
    cur = path.join(cur, seg);
  }
  return true;
}

test("project sites build cleanly and exclude repository housekeeping files", () => {
  for (const slug of SITES) {
    const siteDir = path.join(distDir, slug);
    assert.ok(existsSync(path.join(siteDir, "index.html")), `missing ${slug}/index.html`);
    assert.ok(existsSync(path.join(siteDir, "assets", "theme.css")), `missing ${slug}/assets/theme.css`);
    for (const excluded of ["README.md", ".gitignore", ".gitattributes", ".github"]) {
      assert.ok(!existsSync(path.join(siteDir, excluded)), `unexpected ${slug}/${excluded}`);
    }
  }
});

test("project site HTML and theme CSS resolve all local assets with exact case and obey CSP", () => {
  const privateOwner = ["a", "51", "50"].join("-");

  for (const slug of SITES) {
    const siteDir = path.join(distDir, slug);
    const html = readFileSync(path.join(siteDir, "index.html"), "utf8");
    const themeCss = readFileSync(path.join(siteDir, "assets", "theme.css"), "utf8");

    // CSP & privacy rules
    assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/i, `${slug} contains inline <script>`);
    assert.doesNotMatch(html, /data:image\//i, `${slug} HTML contains data:image URI`);
    assert.doesNotMatch(themeCss, /data:image\//i, `${slug} theme.css contains data:image URI`);
    assert.doesNotMatch(html, /https?:\/\/fonts\.(googleapis|gstatic)\.com/i, `${slug} uses external Google fonts`);
    assert.ok(!html.includes(privateOwner), `${slug} HTML references private owner`);
    assert.ok(!themeCss.includes(privateOwner), `${slug} theme.css references private owner`);

    // Exact canonical
    assert.ok(
      html.includes(`https://opendkg.org/${slug}/`),
      `${slug}/index.html lacks canonical https://opendkg.org/${slug}/`,
    );

    // Every local href/src in HTML resolves in dist/<slug>/
    const attrRe = /\b(?:href|src)\s*=\s*"([^"]+)"/gi;
    let m;
    while ((m = attrRe.exec(html)) !== null) {
      const raw = m[1].trim();
      if (/^(https?:\/\/|mailto:|tel:)/i.test(raw)) continue;
      if (raw.startsWith("#")) {
        const id = raw.slice(1);
        assert.ok(
          new RegExp(`\\b(?:id|name)\\s*=\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(html),
          `${slug}: missing anchor #${id}`,
        );
        continue;
      }
      const clean = decodeURIComponent(raw.split("#")[0].split("?")[0]);
      assert.ok(existsExactCase(siteDir, clean), `${slug}: missing or case-mismatched asset ${raw}`);
    }

    // Every url(...) in assets/theme.css resolves relative to assets/
    const cssUrlRe = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;
    while ((m = cssUrlRe.exec(themeCss)) !== null) {
      const raw = m[1].trim();
      if (/^(https?:\/\/|data:|#)/i.test(raw)) continue;
      const clean = decodeURIComponent(raw.split("#")[0].split("?")[0]);
      assert.ok(
        existsExactCase(path.join(siteDir, "assets"), clean),
        `${slug}/assets/theme.css: missing url(${raw})`,
      );
    }
  }
});

test("Cloudflare _headers includes CSP and font headers for /desktop/*, /graph/*, and /veritytrail/*", () => {
  const headers = readFileSync(path.join(opendkgDir, "public", "_headers"), "utf8");
  for (const slug of SITES) {
    assert.ok(headers.includes(`/${slug}/*`), `_headers missing /${slug}/* block`);
    assert.ok(headers.includes(`/${slug}/assets/fonts/*`), `_headers missing /${slug}/assets/fonts/*`);
  }
});

test("homepage and /apps/ directory list all project sites", () => {
  const homeHtml = readFileSync(path.join(distDir, "index.html"), "utf8");
  const appsHtml = readFileSync(path.join(distDir, "apps", "index.html"), "utf8");
  const appsCss = readFileSync(path.join(distDir, "apps", "apps.css"), "utf8");
  const cardsCss = readFileSync(path.join(distDir, "assets", "home-cards.css"), "utf8");

  assert.ok(appsCss.length > 0, "apps.css should be non-empty");
  assert.ok(cardsCss.includes(".platform-icon"), "home-cards.css missing .platform-icon");
  assert.ok(homeHtml.includes('href="/assets/home-cards.css"'), "homepage missing home-cards.css");
  assert.ok(appsHtml.includes('href="/assets/home-cards.css"'), "/apps/ missing home-cards.css");
  assert.ok(homeHtml.includes('href="/apps/"'), "homepage missing /apps/ link");

  for (const [name, html] of [["index.html", homeHtml], ["apps/index.html", appsHtml]]) {
    const iconMatches = [...html.matchAll(/<span class="platform-icon[^"]*"[^>]*>\s*<svg\b([^>]*)>/g)];
    assert.ok(iconMatches.length >= 10, `${name} should contain platform-icon SVGs`);
    for (const m of iconMatches) {
      assert.match(m[1], /(?:^|\s)width="13"/, `${name} platform-icon SVG missing width="13"`);
      assert.match(m[1], /(?:^|\s)height="13"/, `${name} platform-icon SVG missing height="13"`);
    }
  }

  for (const route of ["/axiom/", "/desktop/", "/graph/", "/veritytrail/"]) {
    assert.ok(homeHtml.includes(`href="${route}"`), `homepage missing ${route}`);
    assert.ok(appsHtml.includes(`href="${route}"`), `/apps/ missing ${route}`);
  }
});
