// analyze-palette.mjs
// HSL-based analysis of the global sprite palette.
// Groups colors by hue family and flags near-duplicate hues as merge candidates.
//
// Usage:
//   node scripts/analyze-palette.mjs

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { hexToHsl, hslDistance } from "./rgb.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PALETTE_PATH = join(
  __dirname,
  "../public/assets/sprites/main.palette.json",
);
const HUE_TOLERANCE = 20; // degrees — colors within this hue range are grouped together
const FLAG_DISTANCE = 30; // hslDistance threshold for flagging near-duplicate candidates

const entries = JSON.parse(readFileSync(PALETTE_PATH, "utf8"));

// Enrich with HSL
const colors = entries.map(({ hex, sprites, totalPixels }) => {
  const [h, s, l] = hexToHsl(hex);
  return { hex, sprites, totalPixels, h, s, l };
});

// Group by hue family using greedy clustering
const groups = [];
for (const color of [...colors].sort((a, b) => a.h - b.h)) {
  const group = groups.find((g) => {
    const dh = Math.min(
      Math.abs(g.centerHue - color.h),
      360 - Math.abs(g.centerHue - color.h),
    );
    return dh <= HUE_TOLERANCE;
  });
  if (group) {
    group.colors.push(color);
    group.centerHue = Math.round(
      group.colors.reduce((sum, c) => sum + c.h, 0) / group.colors.length,
    );
  } else {
    groups.push({ centerHue: color.h, colors: [color] });
  }
}

// Sort groups by total pixel weight descending
groups.sort(
  (a, b) =>
    b.colors.reduce((s, c) => s + c.totalPixels, 0) -
    a.colors.reduce((s, c) => s + c.totalPixels, 0),
);

// --- Output ---

console.log("\n=== Palette Hue Analysis ===\n");

for (const group of groups) {
  const totalPx = group.colors.reduce((s, c) => s + c.totalPixels, 0);
  const hueLabel =
    group.centerHue === 0 && group.colors.every((c) => c.s === 0)
      ? "grey/neutral"
      : `hue ~${group.centerHue}°`;

  console.log(
    `── ${hueLabel}  (${group.colors.length} color${group.colors.length > 1 ? "s" : ""}, ${totalPx}px total)`,
  );

  const sorted = [...group.colors].sort((a, b) => a.l - b.l);
  for (const c of sorted) {
    const spriteList = Object.keys(c.sprites).join(", ");
    console.log(
      `   ${c.hex}  H${c.h} S${c.s} L${c.l}  [${spriteList}]  ${c.totalPixels}px`,
    );
  }

  // Flag near-duplicate candidates within the group
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const dist = hslDistance(sorted[i].hex, sorted[j].hex);
      if (dist <= FLAG_DISTANCE) {
        const spritesA = Object.keys(sorted[i].sprites);
        const spritesB = Object.keys(sorted[j].sprites);
        const overlap = spritesA.some((s) => spritesB.includes(s));
        if (!overlap) {
          console.log(
            `   ⚑  merge candidate: ${sorted[i].hex} → ${sorted[j].hex}  (hsl-dist ${Math.round(dist)}, different sprites)`,
          );
        }
      }
    }
  }

  console.log();
}

// Cross-group complement hints (basic: flag hue pairs ~180° apart)
console.log("=== Complementary Hue Pairs ===\n");
for (let i = 0; i < groups.length; i++) {
  for (let j = i + 1; j < groups.length; j++) {
    const dh = Math.min(
      Math.abs(groups[i].centerHue - groups[j].centerHue),
      360 - Math.abs(groups[i].centerHue - groups[j].centerHue),
    );
    if (Math.abs(dh - 180) <= 30) {
      console.log(
        `  hue ~${groups[i].centerHue}°  ↔  hue ~${groups[j].centerHue}°  (complementary, Δhue=${dh}°)`,
      );
    }
  }
}
console.log();
