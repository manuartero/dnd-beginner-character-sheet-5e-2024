// reduce-palette.mjs
// Reduce a sprite's color palette by merging colors explicitly or by proximity.
//
// Usage:
//   node scripts/reduce-palette.mjs --input <file> [--merge from:into ...] [--target <N>] [--dry-run]
//
// --merge applies first; --target fills the rest with greedy RGB-distance merges.

import { execSync } from "node:child_process";
import { copyFileSync, mkdtempSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { extractPalette } from "./palette.mjs";
import { hexToRgb, normalize } from "./rgb.mjs";

export function rgbDistance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
  );
}

export function parseExplicitMerges(rawMerges, paletteHexes) {
  const merges = [];
  for (const raw of rawMerges) {
    const parts = raw.split(":");
    if (parts.length !== 2) {
      console.error(`Error: --merge must be "FROM:INTO", got: ${raw}`);
      process.exit(1);
    }
    const from = normalize(parts[0]);
    const into = normalize(parts[1]);
    if (!paletteHexes.has(from)) {
      console.error(`Error: color ${from} not found in palette`);
      process.exit(1);
    }
    merges.push({ from, into, explicit: true });
  }
  return merges;
}

export function greedyMerges(colors, target) {
  const state = colors.map((c) => ({ ...c, rgb: hexToRgb(c.hex) }));
  const merges = [];

  while (state.length > target) {
    let minDist = Infinity;
    let fi = null;
    let ti = null;

    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state.length; j++) {
        if (i === j) continue;
        const d = rgbDistance(state[i].rgb, state[j].rgb);
        if (d < minDist) {
          minDist = d;
          if (state[i].pixels <= state[j].pixels) {
            fi = i;
            ti = j;
          } else {
            fi = j;
            ti = i;
          }
        }
      }
    }

    merges.push({
      from: state[fi].hex,
      into: state[ti].hex,
      distance: Math.round(minDist),
    });
    state[ti] = { ...state[ti], pixels: state[ti].pixels + state[fi].pixels };
    state.splice(fi, 1);
  }

  return merges;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      input: { type: "string" },
      merge: { type: "string", multiple: true, default: [] },
      target: { type: "string" },
      "dry-run": { type: "boolean", default: false },
    },
  });

  if (!values.input) {
    console.error("Error: --input <file> is required");
    process.exit(1);
  }

  const inputFile = values.input;
  const dryRun = values["dry-run"];

  const palette = extractPalette(inputFile);
  console.log(`\nInput:  ${inputFile}  (${palette.length} colors)`);

  const paletteHexes = new Set(palette.map((c) => c.hex));

  const explicitMerges = parseExplicitMerges(values.merge, paletteHexes);

  let remaining = palette.map((c) => ({ ...c }));
  const appliedExplicitMerges = [];
  for (const merge of explicitMerges) {
    const fromEntry = remaining.find((c) => c.hex === merge.from);
    if (!fromEntry) continue;
    const intoEntry = remaining.find((c) => c.hex === merge.into);
    if (intoEntry) {
      intoEntry.pixels += fromEntry.pixels;
    }
    remaining = remaining.filter((c) => c.hex !== merge.from);
    appliedExplicitMerges.push(merge);
  }

  const targetCount = values.target ? Number(values.target) : remaining.length;
  const autoMerges =
    remaining.length > targetCount ? greedyMerges(remaining, targetCount) : [];

  const allMerges = [...appliedExplicitMerges, ...autoMerges];

  if (allMerges.length === 0) {
    console.log("Nothing to merge.");
    process.exit(0);
  }

  const finalCount = remaining.length - autoMerges.length;
  console.log(`\nMerge plan (${palette.length} → ${finalCount} colors):\n`);
  for (const { from, into, distance, explicit } of allMerges) {
    const tag = explicit ? "[explicit]" : `[auto, distance ${distance}]`;
    console.log(`  ${from}  →  ${into}  ${tag}`);
  }

  if (dryRun) {
    console.log("\n[dry-run] No changes written.");
    process.exit(0);
  }

  const tmpDir = mkdtempSync(join(tmpdir(), "reduce-palette-"));
  const tmpFile = join(tmpDir, basename(inputFile));
  copyFileSync(inputFile, tmpFile);

  const replacements = allMerges
    .map(({ from, into }) => `-fuzz 1% -fill "${into}" -opaque "${from}"`)
    .join(" ");

  const typeInfo = execSync(`magick identify -format "%[type]" "${tmpFile}"`, {
    encoding: "utf8",
  }).trim();
  const hasAlpha = typeInfo.includes("Alpha");
  const formatFlag = hasAlpha ? "PNG32:" : "";

  execSync(`magick "${tmpFile}" ${replacements} "${formatFlag}${tmpFile}"`);
  renameSync(tmpFile, inputFile);

  const newPalette = extractPalette(inputFile);
  const name = basename(inputFile, extname(inputFile));
  const paletteOut = join(dirname(inputFile), `${name}-palette.json`);
  writeFileSync(paletteOut, `${JSON.stringify(newPalette, null, 2)}\n`);

  console.log(
    `\nDone. Wrote ${inputFile} and ${paletteOut}  (${newPalette.length} colors)`,
  );
}
