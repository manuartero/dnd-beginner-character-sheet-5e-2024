// color-analysis.mjs
// Extract the color palette from pixel-art sprites and write <name>-palette.json
//
// Usage:
//   node scripts/color-analysis.mjs [--input <file-or-dir>]
//
// Default input: public/assets/sprites

import { execSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { basename, dirname, extname, join } from "node:path";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: { input: { type: "string", default: "public/assets/sprites" } },
});

const input = values.input;

function resolveFiles(target) {
  const stat = statSync(target);
  if (stat.isDirectory()) {
    return readdirSync(target)
      .filter((f) => extname(f) === ".png" && !f.endsWith("_4x.png"))
      .map((f) => join(target, f));
  }
  return [target];
}

function toHex(r, g, b) {
  return `#${[r, g, b].map((n) => Number(n).toString(16).padStart(2, "0").toUpperCase()).join("")}`;
}

function extractPalette(file) {
  const raw = execSync(`magick "${file}" -format "%c" histogram:info:`, {
    encoding: "utf8",
  });

  const seen = new Set();
  const colors = [];
  const re = /(\d+):.*?\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)/g;

  for (const match of raw.matchAll(re)) {
    const [, count, r, g, b, a] = match;
    if (Number.parseFloat(a) <= 0.5) continue;
    const hex = toHex(r, g, b);
    if (!seen.has(hex)) {
      seen.add(hex);
      colors.push({ hex, pixels: Number(count) });
    }
  }

  return colors.sort((a, b) => b.pixels - a.pixels);
}

for (const file of resolveFiles(input)) {
  const palette = extractPalette(file);
  const name = basename(file, extname(file));
  const out = join(dirname(file), `${name}-palette.json`);
  writeFileSync(out, JSON.stringify(palette, null, 2) + "\n");
  console.log(`${file}  →  ${out}  (${palette.length} colors)`);
}
