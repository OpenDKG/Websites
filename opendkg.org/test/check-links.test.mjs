import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { checkSite } from "../scripts/check-links.mjs";

const page = ({ title, description, canonical, body, head = "" }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  ${head}
</head>
<body>
  <a class="skip" href="#main">Skip</a>
  <main id="main">${body}</main>
</body>
</html>`;

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "opendkg-links-"));
  await mkdir(path.join(root, "axiom"), { recursive: true });
  await writeFile(path.join(root, "icon.svg"), "<svg xmlns=\"http://www.w3.org/2000/svg\"></svg>");
  await writeFile(
    path.join(root, "index.html"),
    page({
      title: "Home",
      description: "Home description",
      canonical: "https://opendkg.org/",
      head: '<link rel="icon" href="/icon.svg">',
      body: '<h1>Home</h1><a href="/axiom/#what">Axiom</a><a href="#main">Main</a>',
    }),
  );
  await writeFile(
    path.join(root, "axiom", "index.html"),
    page({
      title: "Axiom",
      description: "Axiom description",
      canonical: "https://opendkg.org/axiom/",
      body: '<h1>Axiom</h1><h2 id="what">What</h2>',
    }),
  );
  await writeFile(
    path.join(root, "sitemap.xml"),
    `<?xml version="1.0"?><urlset><url><loc>https://opendkg.org/</loc></url><url><loc>https://opendkg.org/axiom/</loc></url></urlset>`,
  );
  return root;
}

test("accepts a valid site", async () => {
  const root = await fixture();
  try {
    const result = await checkSite(root);
    assert.deepEqual(result.errors, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects an exact-case route mismatch", async () => {
  const root = await fixture();
  try {
    const home = path.join(root, "index.html");
    const html = await readFile(home, "utf8");
    await writeFile(home, html.replace('href="/axiom/#what"', 'href="/Axiom/#what"'));
    const result = await checkSite(root);
    assert.match(result.errors.join("\n"), /missing target \/Axiom\/#what/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a missing anchor", async () => {
  const root = await fixture();
  try {
    const home = path.join(root, "index.html");
    const html = await readFile(home, "utf8");
    await writeFile(home, html.replace('href="/axiom/#what"', 'href="/axiom/#missing"'));
    const result = await checkSite(root);
    assert.match(result.errors.join("\n"), /missing anchor #missing/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
