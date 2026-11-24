#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const opendkgPublicDir = path.join(repoRoot, "opendkg.org", "public");
const distDir = path.join(repoRoot, "dist");

const PROJECT_SITES = [
  { src: "axiom", out: "axiom" },
  { src: "Desktop", out: "desktop" },
  { src: "Graph", out: "graph" },
  { src: "VerityTrail", out: "veritytrail" },
];

const RESERVED_PUBLIC_DIRS = new Set(PROJECT_SITES.map((site) => site.out));

const EXCLUDED_ROOT_ITEMS = new Set([
  ".git",
  ".github",
  ".gitignore",
  ".gitattributes",
  "README.md",
  "node_modules",
  ".DS_Store",
  "Thumbs.db",
]);

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

// Copy opendkg.org/public into dist/, ignoring any stray local project-site folders.
cpSync(opendkgPublicDir, distDir, {
  recursive: true,
  filter: (src) => {
    const rel = path.relative(opendkgPublicDir, src);
    if (!rel) return true;
    const top = rel.split(path.sep)[0].toLowerCase();
    if (RESERVED_PUBLIC_DIRS.has(top)) return false;
    const base = path.basename(src);
    return base !== ".DS_Store" && base !== "Thumbs.db";
  },
});

for (const site of PROJECT_SITES) {
  const srcDir = path.join(repoRoot, site.src);
  const outDir = path.join(distDir, site.out);
  mkdirSync(outDir, { recursive: true });
  cpSync(srcDir, outDir, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(srcDir, src);
      if (!rel) return true;
      const top = rel.split(path.sep)[0];
      if (EXCLUDED_ROOT_ITEMS.has(top)) return false;
      const base = path.basename(src);
      return base !== ".DS_Store" && base !== "Thumbs.db";
    },
  });
}

console.log(
  `Built dist/ from opendkg.org/public and ${PROJECT_SITES.map((s) => `${s.src} -> /${s.out}/`).join(", ")}`,
);
