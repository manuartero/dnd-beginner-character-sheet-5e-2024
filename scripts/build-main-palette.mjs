// build-main-palette.mjs
// Rebuild main.palette.json by reading all sprite PNGs directly.
//
// Usage:
//   node scripts/build-main-palette.mjs [--input <dir>] [--output <file>]

import { writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { extractPalette, resolveFiles } from "./palette.mjs";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: "string", default: "public/assets/sprites" },
    output: {
      type: "string",
      default: "public/assets/sprites/main.palette.json",
    },
  },
});

const spriteFiles = resolveFiles(values.input);

/** @type {Map<string, { sprites: Record<string, number>, totalPixels: number }>} */
const combined = new Map();

for (const file of spriteFiles) {
  const spriteName = file.replace(/.*\//, "").replace(/\.png$/, "");
  for (const { hex, pixels } of extractPalette(file)) {
    if (combined.has(hex)) {
      const entry = combined.get(hex);
      entry.sprites[spriteName] = pixels;
      entry.totalPixels += pixels;
    } else {
      combined.set(hex, {
        sprites: { [spriteName]: pixels },
        totalPixels: pixels,
      });
    }
  }
}

const result = [...combined.entries()]
  .map(([hex, { sprites, totalPixels }]) => ({ hex, sprites, totalPixels }))
  .sort((a, b) => b.totalPixels - a.totalPixels);

writeFileSync(values.output, `${JSON.stringify(result, null, 2)}\n`);
console.log(
  `Wrote ${values.output}  (${result.length} unique colors across ${spriteFiles.length} sprites)`,
);
