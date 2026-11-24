#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const opendkgPublicDir = path.join(repoRoot, "opendkg.org", "public");
const axiomSrcDir = path.join(repoRoot, "axiom");
const distDir = path.join(repoRoot, "dist");
const distAxiomDir = path.join(distDir, "axiom");

const AXIOM_EXCLUDED_ROOT_ITEMS = new Set([
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

// Copy opendkg.org/public into dist/, ignoring any stray local axiom/ folder.
cpSync(opendkgPublicDir, distDir, {
  recursive: true,
  filter: (src) => {
    const rel = path.relative(opendkgPublicDir, src);
    if (!rel) return true;
    const top = rel.split(path.sep)[0];
    if (top === "axiom") return false;
    const base = path.basename(src);
    return base !== ".DS_Store" && base !== "Thumbs.db";
  },
});

// Copy axiom/ into dist/axiom/, excluding repository housekeeping files.
mkdirSync(distAxiomDir, { recursive: true });
cpSync(axiomSrcDir, distAxiomDir, {
  recursive: true,
  filter: (src) => {
    const rel = path.relative(axiomSrcDir, src);
    if (!rel) return true;
    const top = rel.split(path.sep)[0];
    if (AXIOM_EXCLUDED_ROOT_ITEMS.has(top)) return false;
    const base = path.basename(src);
    return base !== ".DS_Store" && base !== "Thumbs.db";
  },
});

console.log("Built dist/ from opendkg.org/public and axiom/");
