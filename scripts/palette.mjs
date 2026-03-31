// palette.mjs
// Sprite file resolution and ImageMagick palette extraction.

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { toHex } from "./rgb.mjs";

/**
 * Update main.palette.json for a single sprite in-place.
 * @param {string} spriteFile - path to the sprite PNG
 * @param {{ hex: string, pixels: number }[]} newPalette
 */
export function updateMainPalette(spriteFile, newPalette) {
  const spriteName = basename(spriteFile, extname(spriteFile));
  const mainPath = join(spriteFile, "../main.palette.json");
  const entries = JSON.parse(readFileSync(mainPath, "utf8"));

  // Strip this sprite from all existing entries; drop entries with no sprites left
  const stripped = entries
    .map(({ hex, sprites, totalPixels }) => {
      const pixels = sprites[spriteName] ?? 0;
      const { [spriteName]: _removed, ...rest } = sprites;
      return { hex, sprites: rest, totalPixels: totalPixels - pixels };
    })
    .filter(({ sprites }) => Object.keys(sprites).length > 0);

  // Merge new palette in
  for (const { hex, pixels } of newPalette) {
    const existing = stripped.find((e) => e.hex === hex);
    if (existing) {
      existing.sprites[spriteName] = pixels;
      existing.totalPixels += pixels;
    } else {
      stripped.push({
        hex,
        sprites: { [spriteName]: pixels },
        totalPixels: pixels,
      });
    }
  }

  stripped.sort((a, b) => b.totalPixels - a.totalPixels);
  writeFileSync(mainPath, `${JSON.stringify(stripped, null, 2)}\n`);
}

export function resolveFiles(target) {
  const stat = statSync(target);
  if (stat.isDirectory()) {
    return readdirSync(target)
      .filter((f) => extname(f) === ".png" && !/_\d+x\.png$/.test(f))
      .map((f) => join(target, f));
  }
  return [target];
}

export function extractPalette(file) {
  const raw = execSync(`magick "${file}" -format "%c" histogram:info:`, {
    encoding: "utf8",
  });
  const seen = new Set();
  const colors = [];
  const re = /(\d+):.*?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/g;
  for (const match of raw.matchAll(re)) {
    const [, count, r, g, b, a] = match;
    if (a !== undefined && Number.parseFloat(a) <= 0.5) continue;
    const hex = toHex(r, g, b);
    if (!seen.has(hex)) {
      seen.add(hex);
      colors.push({ hex, pixels: Number(count) });
    }
  }
  return colors.sort((a, b) => b.pixels - a.pixels);
}
