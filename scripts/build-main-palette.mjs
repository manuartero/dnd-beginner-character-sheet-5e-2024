// build-main-palette.mjs
// Combine all per-sprite palette JSONs into a single main.palette.json.
//
// Usage:
//   node scripts/build-main-palette.mjs [--input <dir>] [--output <file>]

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { parseArgs } from "node:util";

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

const dir = values.input;
const outputFile = values.output;

const paletteFiles = readdirSync(dir)
  .filter((f) => f.endsWith("-palette.json"))
  .map((f) => join(dir, f));

/** @type {Map<string, { sprites: string[], totalPixels: number }>} */
const combined = new Map();

for (const file of paletteFiles) {
  const spriteName = basename(file, "-palette.json");
  const entries = JSON.parse(readFileSync(file, "utf8"));
  for (const { hex, pixels } of entries) {
    if (combined.has(hex)) {
      const entry = combined.get(hex);
      entry.sprites.push(spriteName);
      entry.totalPixels += pixels;
    } else {
      combined.set(hex, { sprites: [spriteName], totalPixels: pixels });
    }
  }
}

const result = [...combined.entries()]
  .map(([hex, { sprites, totalPixels }]) => ({ hex, sprites, totalPixels }))
  .sort((a, b) => b.totalPixels - a.totalPixels);

writeFileSync(outputFile, `${JSON.stringify(result, null, 2)}\n`);
console.log(
  `Wrote ${outputFile}  (${result.length} unique colors across ${paletteFiles.length} sprites)`,
);
