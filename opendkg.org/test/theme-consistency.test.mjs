import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = process.env.OPENDKG_SITE_DIR
  ? path.resolve(process.env.OPENDKG_SITE_DIR)
  : path.resolve(root, "..", "dist");

const UMBRELLA_PAGES = [
  "index.html",
  "404.html",
  "apps/index.html",
  "donate/index.html",
  "transparency/index.html",
  "privacy/index.html",
  "DKGSwarm/index.html",
  "blackbox/index.html",
  "tracabot/index.html",
];

test("all non-vendored umbrella pages share the Graphite & Titanium dark theme and navigation", async () => {
  for (const rel of UMBRELLA_PAGES) {
    const html = await readFile(path.join(distDir, rel), "utf8");
    assert.ok(html.includes('content="#111317"'), `${rel} missing dark theme-color #111317`);
    assert.ok(html.includes('href="/favicon-opendkg.png"'), `${rel} missing /favicon-opendkg.png`);
    assert.ok(html.includes('href="/home.css"'), `${rel} missing /home.css`);
    assert.ok(html.includes('src="/assets/opendkg-logo.png"'), `${rel} missing /assets/opendkg-logo.png`);
    assert.ok(html.includes('class="site-footer"'), `${rel} missing site-footer`);
    assert.ok(!html.includes("#e8ebe4"), `${rel} still references legacy light theme color #e8ebe4`);
  }
});

test("dist/styles.css uses Graphite & Titanium dark palette with no legacy light colors", async () => {
  const styles = await readFile(path.join(distDir, "styles.css"), "utf8");
  assert.ok(styles.includes("#111317"), "dist/styles.css missing #111317");
  for (const legacyColor of ["#e8ebe4", "#f4f6f0", "#0644b7", "#dfe6f5"]) {
    assert.ok(!styles.includes(legacyColor), `dist/styles.css still contains legacy color ${legacyColor}`);
  }
});
