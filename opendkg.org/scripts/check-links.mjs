#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";


function stripHash(url) {
  const i = url.indexOf("#");
  return i === -1 ? url : url.slice(0, i);
}

function getHash(url) {
  const i = url.indexOf("#");
  return i === -1 ? "" : url.slice(i + 1);
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

export function extractLinks(html) {
  const links = [];
  const re = /\b(?:href|src)\s*=\s*"([^"]+)"/gi;
  let match;
  while ((match = re.exec(html)) !== null) links.push(match[1]);
  return links;
}

export function collectIds(html) {
  const ids = new Set();
  const re = /\b(?:id|name)\s*=\s*"([^"]+)"/gi;
  let match;
  while ((match = re.exec(html)) !== null) ids.add(match[1]);
  return ids;
}

// Vendored project sites keep their own conventions and their own checks.
const vendored = new Set(["axiom"]);

async function walkHtml(dir, root = dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const rel = path.relative(root, full).split(path.sep).join("/");
      if (vendored.has(rel)) continue;
      out.push(...(await walkHtml(full, root)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

export async function resolveTarget(root, fromFile, rawUrl) {
  const url = rawUrl.trim();
  if (!url) throw new Error("empty link");
  if (url.startsWith("#")) return { file: fromFile, hash: url.slice(1) };
  if (/^(mailto:|tel:|data:)/i.test(url)) return { skip: true };
  if (isExternal(url)) return { external: url };
  if (/^[a-z]+:/i.test(url) && !url.startsWith("/")) {
    throw new Error(`unsupported scheme: ${url}`);
  }

  const hash = getHash(url);
  let target = stripHash(url);
  if (!target) return { file: fromFile, hash };

  target = decodeURIComponent(target);
  let file;
  if (target.startsWith("/")) {
    file = path.join(root, target);
  } else {
    file = path.resolve(path.dirname(fromFile), target);
  }

  if (target.endsWith("/")) {
    file = path.join(file, "index.html");
  } else {
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = path.join(file, "index.html");
    } catch {
      // Missing files are handled by the caller.
    }
  }
  return { file, hash };
}

const cache = new Map();
async function idsFor(file) {
  if (!cache.has(file)) cache.set(file, collectIds(await readFile(file, "utf8")));
  return cache.get(file);
}

async function existsExactCase(root, targetFile) {
  const rel = path.relative(path.resolve(root), path.resolve(targetFile));
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return false;
  let current = path.resolve(root);
  for (const segment of rel.split(path.sep)) {
    let entries;
    try {
      entries = await readdir(current);
    } catch {
      return false;
    }
    if (!entries.includes(segment)) return false;
    current = path.join(current, segment);
  }
  return true;
}

function pageBasics(html, rel = "") {
  const errors = [];
  const is404 = rel === "404.html";
  const title = html.match(/<title>([^<]*)<\/title>/i);
  if (!title) errors.push("missing <title>");
  if (!/<html[^>]*\slang="[^"]+"/i.test(html)) errors.push("missing html lang");
  if (!/<meta[^>]*name="description"[^>]*content="[^"]+"/i.test(html)) {
    errors.push("missing meta description");
  }
  if (!is404 && !/<link[^>]*rel="canonical"[^>]*href="[^"]+"/i.test(html)) {
    errors.push("missing canonical");
  }
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`expected one h1, found ${h1Count}`);
  if (!/<main[^>]*\sid="main"/i.test(html)) errors.push('missing <main id="main">');
  if (!/class="skip"/i.test(html)) errors.push("missing skip link");
  let scriptCheckedHtml = html.replace('<script src="/assets/privacy-notice.js" defer></script>', '');
  if (rel.split(path.sep).join("/") === "donate/index.html") {
    scriptCheckedHtml = scriptCheckedHtml.replace('<script src="/donate/donate.js" defer></script>', '');
  }
  if (/<script\b/i.test(scriptCheckedHtml)) errors.push("contains a script element");
  if (/\sstyle="/i.test(html)) errors.push("contains an inline style attribute");
  if (/href="#"/i.test(html)) errors.push('contains a dead href="#"');
  if (/http:\/\//i.test(html)) errors.push("contains an insecure http:// link");
  if (/TODO|FIXME/i.test(html)) errors.push("contains TODO/FIXME");
  return errors;
}

export async function checkSite(root = "public", { external = false } = {}) {
  const errors = [];
  const pages = await walkHtml(root);
  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();
  const externalLinks = new Set();
  let checked = 0;

  for (const file of pages) {
    const rel = path.relative(root, file) || "index.html";
    const html = await readFile(file, "utf8");
    for (const err of pageBasics(html, rel)) errors.push(`${rel}: ${err}`);

    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
    if (title) {
      if (titles.has(title)) errors.push(`${rel}: duplicate title also in ${titles.get(title)}`);
      titles.set(title, rel);
    }
    const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i)?.[1];
    if (description) {
      if (descriptions.has(description)) {
        errors.push(`${rel}: duplicate meta description also in ${descriptions.get(description)}`);
      }
      descriptions.set(description, rel);
    }
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    if (canonical) {
      if (canonicals.has(canonical)) {
        errors.push(`${rel}: duplicate canonical also in ${canonicals.get(canonical)}`);
      }
      canonicals.set(canonical, rel);
    }

    for (const link of extractLinks(html)) {
      checked += 1;
      let target;
      try {
        target = await resolveTarget(root, file, link);
      } catch (err) {
        errors.push(`${rel}: ${err.message}`);
        continue;
      }
      if (target.skip) continue;
      if (target.external) {
        // Canonicals point at the production domain; do not fetch it during local checks.
        if (!/^https?:\/\/(www\.)?opendkg\.org\//i.test(target.external)) {
          externalLinks.add(target.external);
        }
        continue;
      }
      try {
        await stat(target.file);
        if (!(await existsExactCase(root, target.file))) {
          throw new Error("case mismatch");
        }
      } catch {
        errors.push(`${rel}: missing target ${link}`);
        continue;
      }
      if (target.hash) {
        const ids = await idsFor(target.file);
        if (!ids.has(target.hash)) {
          errors.push(`${rel}: missing anchor #${target.hash} in ${path.relative(root, target.file)}`);
        }
      }
    }
  }

  const sitemapPath = path.join(root, "sitemap.xml");
  try {
    const sitemap = await readFile(sitemapPath, "utf8");
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const expected = pages
      .filter((file) => path.basename(file) !== "404.html")
      .map((file) => {
        const rel = path.relative(root, file).replace(/\\/g, "/");
        if (rel === "index.html") return "https://opendkg.org/";
        return `https://opendkg.org/${rel.replace(/\/index\.html$/, "/")}`;
      });
    for (const loc of expected) {
      if (!locs.includes(loc)) errors.push(`sitemap.xml: missing ${loc}`);
    }
  } catch {
    errors.push("sitemap.xml: missing or unreadable");
  }

  if (external && externalLinks.size > 0) {
    for (const url of externalLinks) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10000);
        let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
        if (res.status === 405 || res.status === 403) {
          res = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
        }
        clearTimeout(timer);
        if (res.status >= 400) errors.push(`external ${url}: HTTP ${res.status}`);
      } catch (err) {
        errors.push(`external ${url}: ${err.message}`);
      }
    }
  }

  return { errors, checked, pages: pages.length, externalLinks: [...externalLinks] };
}

async function main() {
  const args = process.argv.slice(2);
  const external = args.includes("--external");
  const root = args.find((arg) => !arg.startsWith("--")) ?? "public";
  const result = await checkSite(root, { external });
  console.log(`Checked ${result.pages} pages and ${result.checked} links.`);
  if (result.externalLinks.length) {
    console.log(`External links found: ${result.externalLinks.length} (use --external to fetch).`);
  }
  if (result.errors.length) {
    console.error(`\n${result.errors.length} issue(s):`);
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log("No issues found.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
