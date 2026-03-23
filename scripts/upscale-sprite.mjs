// upscale-sprite.mjs
// Scale pixel-art sprites Nx using nearest-neighbor interpolation (no blending)
//
// Usage:
//   node scripts/upscale-sprite.mjs [--input <file-or-dir>] [--scale <N>]
//
// Default input: public/assets/sprites
// Default scale: 4  (1px → 4px, e.g. 79×80 → 316×320)

import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { parseArgs } from "node:util";
import { basename, extname, join } from "node:path";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: "string", default: "public/assets/sprites" },
    scale: { type: "string", default: "4" },
  },
});

const input = values.input;
const scale = Number(values.scale);

if (!Number.isInteger(scale) || scale < 1) {
  console.error("--scale must be a positive integer");
  process.exit(1);
}

function resolveFiles(target) {
  const stat = statSync(target);
  if (stat.isDirectory()) {
    return readdirSync(target)
      .filter((f) => extname(f) === ".png" && !f.includes("_4x"))
      .map((f) => join(target, f));
  }
  return [target];
}

for (const file of resolveFiles(input)) {
  const name = basename(file, extname(file));
  const out = join(file.replace(/[^/]+$/, ""), `${name}_4x.png`);
  execSync(`magick "${file}" -filter point -resize ${scale * 100}% "${out}"`);
  console.log(`${file}  →  ${out}  (${scale}x)`);
}
