// global-replace-color.mjs
// Replace one color with another across every sprite in the folder,
// then regenerates _4x.png for each affected sprite and rebuilds main.palette.json.
//
// Usage:
//   node scripts/global-replace-color.mjs --from "#ab0034" --to "#9b0145"

import { execSync } from "node:child_process";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { extractPalette, resolveFiles, updateMainPalette } from "./palette.mjs";
import { normalize } from "./rgb.mjs";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      from: { type: "string" },
      to: { type: "string" },
      input: { type: "string", default: "public/assets/sprites" },
      "dry-run": { type: "boolean", default: false },
    },
  });

  if (!values.from || !values.to) {
    console.error("Usage: --from <hex> --to <hex> [--input <dir>] [--dry-run]");
    process.exit(1);
  }

  const from = normalize(values.from);
  const to = normalize(values.to);
  const dryRun = values["dry-run"];

  if (from === to) {
    console.log("--from and --to are identical, nothing to do.");
    process.exit(0);
  }

  console.log(`\nReplacing ${from}  →  ${to}\n`);

  const affected = [];

  for (const file of resolveFiles(values.input)) {
    const palette = extractPalette(file);
    const hasColor = palette.some((c) => c.hex === from);

    if (!hasColor) {
      console.log(`  skip  ${file}  (color not present)`);
      continue;
    }

    if (dryRun) {
      const pixels = palette.find((c) => c.hex === from).pixels;
      console.log(`  [dry-run]  ${file}  (${pixels}px would be replaced)`);
      continue;
    }

    execSync(
      `magick "${file}" -fuzz 0% -fill "${to}" -opaque "${from}" PNG32:"${file}"`,
    );

    const name = basename(file, extname(file));
    const scale = 4;
    const upscaled = join(dirname(file), `${name}_${scale}x.png`);
    execSync(
      `magick "${file}" -filter point -resize ${scale * 100}% "${upscaled}"`,
    );

    const newPalette = extractPalette(file);
    updateMainPalette(file, newPalette);

    console.log(`  done  ${file}  →  ${upscaled}`);
    affected.push(file);
  }

  if (!dryRun) {
    console.log(
      `\n${affected.length} sprite(s) updated. main.palette.json rebuilt.`,
    );
  }
}
