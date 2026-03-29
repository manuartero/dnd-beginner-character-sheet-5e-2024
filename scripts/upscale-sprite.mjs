// upscale-sprite.mjs
// Scale pixel-art sprites Nx using nearest-neighbor interpolation (no blending)
//
// Usage:
//   node scripts/upscale-sprite.mjs [--input <file-or-dir>] [--scale <N>]
//
// Default input: public/assets/sprites
// Default scale: 4  (1px → 4px, e.g. 79×80 → 316×320)

import { execSync } from "node:child_process";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { basename, dirname, extname, join } from "node:path";
import { resolveFiles } from "./utils.mjs";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      input: { type: "string", default: "public/assets/sprites" },
      scale: { type: "string", default: "4" },
    },
  });

  const scale = Number(values.scale);

  if (!Number.isInteger(scale) || scale < 1) {
    console.error("--scale must be a positive integer");
    process.exit(1);
  }

  for (const file of resolveFiles(values.input)) {
    const name = basename(file, extname(file));
    const out = join(dirname(file), `${name}_${scale}x.png`);
    execSync(`magick "${file}" -filter point -resize ${scale * 100}% "${out}"`);
    console.log(`${file}  →  ${out}  (${scale}x)`);
  }
}
