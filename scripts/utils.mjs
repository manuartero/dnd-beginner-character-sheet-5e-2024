// utils.mjs
// Shared pure helpers for sprite-tooling scripts.

import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

export function toHex(r, g, b) {
  return `#${[r, g, b].map((n) => Number(n).toString(16).padStart(2, "0").toUpperCase()).join("")}`;
}

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16),
  ];
}

export function normalize(hex) {
  return `#${hex.replace("#", "").toUpperCase()}`;
}

export function resolveFiles(target) {
  const stat = statSync(target);
  if (stat.isDirectory()) {
    return readdirSync(target)
      .filter((f) => extname(f) === ".png" && !f.endsWith("_4x.png"))
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
