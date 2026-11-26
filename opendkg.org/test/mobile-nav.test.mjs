import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = process.env.OPENDKG_SITE_DIR
  ? path.resolve(process.env.OPENDKG_SITE_DIR)
  : path.resolve(root, "..", "dist");

const read = (rel) => readFileSync(path.join(distDir, rel), "utf8");

const PRIMARY_NAV_HREFS = [
  "/#projects",
  "/apps/",
  "/#open-source",
  "/#roadmap",
  "/donate/",
  "https://github.com/OpenDKG",
];

test("mobile CSS keeps all primary nav links visible and wraps cleanly", () => {
  const homeCss = read("home.css");
  const cardsCss = read("assets/home-cards.css");

  assert.doesNotMatch(
    homeCss,
    /\.nav\s+a[^{]*\{[^}]*display\s*:\s*none/i,
    "home.css must not hide primary nav links",
  );
  assert.doesNotMatch(
    cardsCss,
    /\.nav\s+a[^{]*\{[^}]*display\s*:\s*none/i,
    "assets/home-cards.css must not hide primary nav links",
  );
  assert.match(homeCss, /\.nav\s*\{[^}]*flex-wrap\s*:\s*wrap/i, "home.css should wrap .nav on narrow viewports");
  assert.match(homeCss, /\.nav-bar\s*\{[^}]*flex-wrap\s*:\s*wrap/i, "home.css should wrap .nav-bar on narrow viewports");
  assert.match(
    homeCss,
    /\.nav\s+a\[aria-current="page"\]\s*\{/,
    "home.css should style .nav a[aria-current=\"page\"] visibly",
  );
});

test("primary nav keeps all 6 links and active aria-current across /, /apps/, /donate/, and 404", () => {
  for (const rel of ["index.html", "apps/index.html", "donate/index.html", "404.html"]) {
    const html = read(rel);
    const navMatch = html.match(/<nav class="nav" aria-label="Primary">([\s\S]*?)<\/nav>/);
    assert.ok(navMatch, `${rel} missing primary nav`);
    const hrefs = [...navMatch[1].matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(hrefs, PRIMARY_NAV_HREFS, `${rel} primary nav links mismatch`);
  }

  assert.match(read("apps/index.html"), /<a href="\/apps\/" aria-current="page">/);
  assert.match(read("donate/index.html"), /<a class="nav-donate" href="\/donate\/" aria-current="page">/);
});
