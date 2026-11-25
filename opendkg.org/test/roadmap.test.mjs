import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = process.env.OPENDKG_SITE_DIR
  ? path.resolve(process.env.OPENDKG_SITE_DIR)
  : path.resolve(root, "..", "dist");
const read = (rel) => readFileSync(path.join(distDir, rel), "utf8");

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

const navHrefs = (html) => {
  const nav = html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(nav, "missing primary nav");
  return [...nav[1].matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => m[1]);
};

const footerItems = (html) => {
  const nav = html.match(/<nav class="footer-links"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(nav, "missing footer nav");
  return [...nav[1].matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => [
    m[1],
    m[2].replace(/<[^>]+>/g, "").trim(),
  ]);
};

test("homepage has a roadmap preview section that uses external CSS only", () => {
  const html = read("index.html");
  assert.ok(html.includes('href="/assets/roadmap.css"'), "index.html missing /assets/roadmap.css");
  assert.ok(existsSync(path.join(distDir, "assets", "roadmap.css")), "dist missing assets/roadmap.css");
  assert.match(html, /<section[^>]*id="roadmap"[^>]*aria-labelledby="roadmap-title"/, "missing roadmap section");
  assert.ok(html.includes('id="roadmap-title"'), "roadmap section missing heading anchor");
  for (const phase of ["Now", "Next", "Later"]) {
    assert.ok(html.includes(`>${phase}<`), `roadmap missing ${phase} phase heading`);
  }
  assert.ok(html.includes('href="/#roadmap"'), "primary nav missing Roadmap link");
  assert.ok(!/\sstyle="/i.test(html), "index.html contains an inline style attribute");
});

test("roadmap copy does not promote an unverified Axiom build", () => {
  const html = read("index.html");
  for (const forbidden of [
    /QA[- ]cleared/i,
    /QA[- ]verified/i,
    /production-ready Axiom/i,
  ]) {
    assert.doesNotMatch(html, forbidden, `homepage claims an unverified release state: ${forbidden}`);
  }
  assert.match(html, /not completed clean-machine QA/i, "roadmap should state the open QA gate");
});

test("Now phase does not claim active-development projects are usable today", () => {
  const html = read("index.html");
  const now = html.match(/<article class="phase phase-now"[\s\S]*?<\/article>/);
  assert.ok(now, "missing Now phase card");
  for (const route of ["/desktop/", "/graph/", "/veritytrail/"]) {
    assert.ok(!now[0].includes(`href="${route}"`), `Now phase must not list ${route} as usable today`);
  }
  assert.doesNotMatch(html, /Public and usable today/, "overclaim copy is still present");
  const next = html.match(/<article class="phase phase-next"[\s\S]*?<\/article>/);
  assert.ok(next, "missing Next phase card");
  for (const route of ["/desktop/", "/graph/", "/veritytrail/"]) {
    assert.ok(next[0].includes(`href="${route}"`), `Next phase missing ${route} development status`);
  }
  assert.match(next[0], /Active development/, "Next phase should label these projects as active development");
});

test("umbrella pages share the same primary nav and footer", () => {
  const pages = UMBRELLA_PAGES.map((rel) => [rel, read(rel)]);
  const [baseRel, baseHtml] = pages[0];
  const baseNav = navHrefs(baseHtml);
  const baseFooter = footerItems(baseHtml);

  assert.ok(baseNav.includes("/#roadmap"), "primary nav missing Roadmap");
  assert.ok(
    baseFooter.some(([href, label]) => href === "/#roadmap" && label === "Roadmap"),
    "footer missing Roadmap",
  );
  assert.ok(
    baseFooter.some(([href, label]) => href === "/" && label === "Home"),
    "footer missing Home",
  );

  for (const [rel, html] of pages.slice(1)) {
    assert.deepEqual(navHrefs(html), baseNav, `${rel} primary nav differs from ${baseRel}`);
    assert.deepEqual(footerItems(html), baseFooter, `${rel} footer differs from ${baseRel}`);
  }
});
