import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("CSP on /* permits self-hosted fonts referenced in public/styles.css", () => {
  const styles = fs.readFileSync(path.join(rootDir, "public", "styles.css"), "utf8");
  const headers = fs.readFileSync(path.join(rootDir, "public", "_headers"), "utf8");

  assert.match(styles, /@font-face[\s\S]*\/assets\/fonts\//);
  const globalBlock = headers.split("\n# The Axiom site")[0];
  assert.match(globalBlock, /font-src\s+'self'/);
});
