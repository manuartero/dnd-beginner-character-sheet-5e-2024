// color-analysis.mjs
// Extract the color palette from pixel-art sprites and write <name>-palette.json
//
// Usage:
//   node scripts/color-analysis.mjs [--input <file-or-dir>]
//
// Default input: public/assets/sprites

import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { extractPalette, resolveFiles, updateMainPalette } from "./palette.mjs";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: { input: { type: "string", default: "public/assets/sprites" } },
  });

  for (const file of resolveFiles(values.input)) {
    const palette = extractPalette(file);
    updateMainPalette(file, palette);
    console.log(`${file}  →  main.palette.json  (${palette.length} colors)`);
  }
}
