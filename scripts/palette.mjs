// palette.mjs
// Sprite file resolution and ImageMagick palette extraction.

import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { toHex } from "./rgb.mjs";

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
