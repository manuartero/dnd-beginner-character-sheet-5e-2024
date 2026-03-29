// remove-background.mjs
// Remove the background from pixel-art sprites using filltoborder from all 4 corners.
// Auto-detects the sprite outline (darkest color) as the fill boundary.
//
// Usage:
//   node scripts/remove-background.mjs [--input <file-or-dir>] [--dry-run]

import { execSync } from "node:child_process";
import { copyFileSync, mkdtempSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { extractPalette, resolveFiles } from "./utils.mjs";

export function luminance(hex) {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function borderSeedPoints(w, h) {
  const xs = [...new Set([0, 1, Math.floor(w / 4), Math.floor(w / 2), Math.floor(3 * w / 4), w - 2, w - 1])];
  const ys = [...new Set([0, 1, Math.floor(h / 4), Math.floor(h / 2), Math.floor(3 * h / 4), h - 2, h - 1])];
  const pts = new Set();
  for (const x of xs) { pts.add(`${x},0`); pts.add(`${x},${h - 1}`); }
  for (const y of ys) { pts.add(`0,${y}`); pts.add(`${w - 1},${y}`); }
  return [...pts].map((s) => s.split(",").map(Number));
}

function pixelAlpha(file, x, y) {
  return Number(
    execSync(`magick "${file}" -format "%[fx:p{${x},${y}}.a]" info:`, { encoding: "utf8" }).trim(),
  );
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      input: { type: "string", default: "public/assets/sprites" },
      "dry-run": { type: "boolean", default: false },
    },
  });

  const dryRun = values["dry-run"];

  for (const file of resolveFiles(values.input)) {
    const palette = extractPalette(file);

    if (palette.length === 0) {
      console.log(`\n${file}`);
      console.log("  no opaque pixels — skipped.");
      continue;
    }

    const borderColor = palette.reduce((darkest, c) =>
      luminance(c.hex) < luminance(darkest.hex) ? c : darkest,
    ).hex;

    const w = Number(execSync(`magick identify -format "%w" "${file}"`, { encoding: "utf8" }).trim());
    const h = Number(execSync(`magick identify -format "%h" "${file}"`, { encoding: "utf8" }).trim());
    const seeds = borderSeedPoints(w, h).filter(([x, y]) => pixelAlpha(file, x, y) > 0.5);

    console.log(`\n${file}`);
    console.log(`  border color: ${borderColor}`);

    if (seeds.length === 0) {
      console.log("  background already transparent — skipped.");
      continue;
    }

    if (dryRun) {
      console.log("  [dry-run] skipped.");
      continue;
    }

    const tmpDir = mkdtempSync(join(tmpdir(), "remove-bg-"));
    const tmpFile = join(tmpDir, basename(file));
    copyFileSync(file, tmpFile);

    const draws = seeds.map(([x, y]) => `-draw "color ${x},${y} filltoborder"`).join(" ");
    execSync(
      `magick "${tmpFile}" -alpha set -bordercolor "${borderColor}" -fill none ${draws} PNG32:"${tmpFile}"`,
    );
    renameSync(tmpFile, file);

    const newPalette = extractPalette(file);
    const name = basename(file, extname(file));
    const paletteOut = join(dirname(file), `${name}-palette.json`);
    writeFileSync(paletteOut, JSON.stringify(newPalette, null, 2) + "\n");

    console.log(`  done → ${newPalette.length} colors (palette JSON updated)`);
  }
}
