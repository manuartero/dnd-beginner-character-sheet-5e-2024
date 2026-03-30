// find-merge-candidates.mjs
// Find cross-sprite color pairs that are visually close — candidates for global palette reduction.
// For each pair, one sprite's color can be replaced with the other's, shrinking the global palette by 1.
//
// Usage:
//   node scripts/find-merge-candidates.mjs [--top <N>] [--max-distance <N>]

import { readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { hexToRgb } from "./rgb.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPRITES_DIR = join(__dirname, "../public/assets/sprites");

function rgbDistance(hexA, hexB) {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  return Math.round(Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2));
}

function loadAllPalettes(dir) {
  const files = readdirSync(dir).filter(
    (f) => f.endsWith("-palette.json") && f !== "main.palette.json",
  );
  return files.map((f) => {
    const sprite = basename(f, "-palette.json");
    const entries = JSON.parse(readFileSync(join(dir, f), "utf8"));
    return { sprite, colors: entries.map((e) => e.hex) };
  });
}

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    top: { type: "string", default: "20" },
    "max-distance": { type: "string", default: "50" },
  },
});

const top = Number(values.top);
const maxDist = Number(values["max-distance"]);

const palettes = loadAllPalettes(SPRITES_DIR);

// Flat list of {hex, sprite}
const entries = palettes.flatMap(({ sprite, colors }) =>
  [...new Set(colors)].map((hex) => ({ hex, sprite })),
);

// Skip colors already shared across sprites (same hex in 2+ sprites)
const hexCounts = new Map();
for (const { hex } of entries) {
  hexCounts.set(hex, (hexCounts.get(hex) ?? 0) + 1);
}
const unique = entries.filter(({ hex }) => hexCounts.get(hex) === 1);

// All cross-sprite pairs within distance threshold
const candidates = [];
for (let i = 0; i < unique.length; i++) {
  for (let j = i + 1; j < unique.length; j++) {
    const a = unique[i];
    const b = unique[j];
    if (a.sprite === b.sprite) continue;
    const dist = rgbDistance(a.hex, b.hex);
    if (dist <= maxDist) {
      candidates.push({ dist, from: a, into: b });
    }
  }
}

candidates.sort((a, b) => a.dist - b.dist);
const shown = candidates.slice(0, top);

if (shown.length === 0) {
  console.log(`No candidates found within distance ${maxDist}.`);
  process.exit(0);
}

const col = (s, w) => String(s).padEnd(w);

console.log();
console.log(
  `${col("dist", 6)}${col("replace in", 14)}${col("from-hex", 12)}  →  ${col("keep in", 14)}${col("into-hex", 12)}`,
);
console.log("─".repeat(72));

for (const { dist, from, into } of shown) {
  console.log(
    `${col(dist, 6)}${col(from.sprite, 14)}${col(from.hex, 12)}  →  ${col(into.sprite, 14)}${col(into.hex, 12)}`,
  );
}

console.log();
console.log(`Showing ${shown.length} of ${candidates.length} pairs (max-distance: ${maxDist})`);
console.log();
console.log("To apply a merge:");
console.log(
  "  pnpm sprite:merge-colors --input public/assets/sprites/<replace-in>.png --merge FROM:INTO",
);
console.log();
