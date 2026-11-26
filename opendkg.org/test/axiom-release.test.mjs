import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// dist/axiom/ is skipped by scripts/check-links.mjs, so these pages are asserted directly.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = process.env.OPENDKG_SITE_DIR
  ? path.resolve(process.env.OPENDKG_SITE_DIR)
  : path.resolve(root, "..", "dist");
const read = (rel) => readFile(path.join(publicDir, rel), "utf8");

const PAGES = {
  home: "index.html",
  axiom: "axiom/index.html",
  transparency: "transparency/index.html",
};

const STALE = [
  /unreleased/i,
  /No public download or application repository yet/i,
  /Public download links are not live yet/i,
  /will appear here when the public releases/i,
  /Follow development/i,
  /will be added at launch/i,
];

const RELEASES = "https://github.com/OpenDKG/Axiom/releases/latest";
const SOURCE = "https://github.com/OpenDKG/Axiom";

async function textFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await textFiles(full)));
    else if (/\.(html|js|css|md|txt|xml|json)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

test("build output contains expected site files and excludes Axiom housekeeping files", () => {
  for (const required of [
    "_headers",
    "404.html",
    "robots.txt",
    "sitemap.xml",
    "axiom/index.html",
    "axiom/pentesting.html",
  ]) {
    assert.ok(existsSync(path.join(publicDir, required)), `missing ${required} in ${publicDir}`);
  }

  for (const excluded of [
    "axiom/README.md",
    "axiom/.gitignore",
    "axiom/.gitattributes",
    "axiom/.github",
  ]) {
    assert.ok(!existsSync(path.join(publicDir, excluded)), `unexpected ${excluded} in ${publicDir}`);
  }
});

test("stale Axiom availability wording is gone", async () => {
  for (const [name, rel] of Object.entries(PAGES)) {
    const html = await read(rel);
    for (const pattern of STALE) {
      assert.doesNotMatch(html, pattern, `${name} still matches ${pattern}`);
    }
  }
});

test("stable public release and source links are present", async () => {
  for (const rel of [PAGES.home, PAGES.axiom]) {
    const html = await read(rel);
    assert.ok(html.includes(`href="${RELEASES}"`), `${rel} lacks releases/latest link`);
    assert.ok(html.includes(`href="${SOURCE}"`), `${rel} lacks public source link`);
    assert.doesNotMatch(html, /releases\/(tag|download)\//, `${rel} pins a specific release`);
  }
  const transparency = await read(PAGES.transparency);
  assert.ok(transparency.includes(`href="${SOURCE}"`), "transparency lacks Axiom source link");
});

test("no private canonical upstream is referenced from public pages", async () => {
  const privateOwner = ["a", "51", "50"].join("-");
  for (const file of await textFiles(publicDir)) {
    const text = await readFile(file, "utf8");
    assert.ok(!text.includes(privateOwner), `${file} references the private upstream`);
  }
});

test("donation and video additions are preserved", async () => {
  assert.ok((await read(PAGES.home)).includes('href="/donate/"'), "home lost the donate link");
  const axiom = await read(PAGES.axiom);
  assert.ok(axiom.includes('href="https://opendkg.org/donate/"'), "axiom lost the donate link");
  assert.ok(axiom.includes('id="videos"'), "axiom lost the videos section");
  assert.ok(axiom.includes("youtu.be/mbIE4DqWYQU"), "axiom lost the explainer video");
  assert.ok(axiom.includes("youtu.be/QkPPoDt-GYQ"), "axiom lost the agent-secrets video");
});

test("release, preview and active-development distinctions are stated", async () => {
  for (const rel of [PAGES.home, PAGES.axiom]) {
    const html = await read(rel);
    assert.match(html, /Windows x64/, `${rel} lacks the Windows release distinction`);
    assert.match(html, /previews?/i, `${rel} lacks the preview distinction`);
    assert.match(html, /active development/i, `${rel} lacks the active-development status`);
    assert.match(html, /not audited/i, `${rel} lacks the unaudited caveat`);
  }
  const axiom = await read(PAGES.axiom);
  assert.ok(axiom.includes("SHA256SUMS.txt"), "axiom lacks the checksum note");
  assert.match(axiom, /Ubuntu 24\.04 amd64/, "axiom lacks the Ubuntu preview detail");
  assert.match(axiom, /ad-hoc signed/, "axiom lacks the macOS signing limit");
  assert.match(axiom, /network extension needs separate activation/, "axiom lacks the extension limit");
});

test("transparency no longer claims the download arrives at launch", async () => {
  const html = await read(PAGES.transparency);
  assert.doesNotMatch(html, /Launching/);
  assert.match(html, /Active development/);
});

test("Axiom/Windows builds are never called a current release without development or QA status", async () => {
  const offenders = [];
  for (const file of await textFiles(publicDir)) {
    if (!file.endsWith(".html")) continue;
    const text = (await readFile(file, "utf8")).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const match of text.matchAll(/current (?:release|installer|stable build)|Windows x64 release/gi)) {
      const window = text.slice(Math.max(0, match.index - 200), match.index + 200);
      if (/axiom|windows/i.test(window) && !/development|pending[^.]{0,40}QA/i.test(window)) {
        offenders.push(`${path.relative(publicDir, file)}: …${window.trim().slice(0, 160)}…`);
      }
    }
  }
  assert.deepEqual(offenders, []);
});

test("Axiom platform lines carry preview or development status where the platforms are named", async () => {
  const axiom = await read(PAGES.axiom);
  const description = axiom.match(/<meta name="description" content="([^"]+)"/)?.[1] || "";
  assert.match(description, /development|preview/i, "meta description must show development/preview status");
  assert.doesNotMatch(axiom, /Control you can trust/i);
  const apps = await read("apps/index.html");
  assert.match(apps, /Not audited on any platform/);
});
