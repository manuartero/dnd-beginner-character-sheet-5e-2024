// color-analysis.mjs
// Extract the color palette from pixel-art sprites and write <name>-palette.json
//
// Usage:
//   node scripts/color-analysis.mjs [--input <file-or-dir>]
//
// Default input: public/assets/sprites

import { writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { extractPalette, resolveFiles } from "./palette.mjs";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: { input: { type: "string", default: "public/assets/sprites" } },
  });

  for (const file of resolveFiles(values.input)) {
    const palette = extractPalette(file);
    const name = basename(file, extname(file));
    const out = join(dirname(file), `${name}-palette.json`);
    writeFileSync(out, JSON.stringify(palette, null, 2) + "\n");
    console.log(`${file}  →  ${out}  (${palette.length} colors)`);
  }
}
