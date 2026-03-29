// flip-sprite.mjs
// Flip pixel-art sprites horizontally (mirror).
//
// Usage:
//   node scripts/flip-sprite.mjs [--input <file-or-dir>]

import { execSync } from "node:child_process";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { resolveFiles } from "./utils.mjs";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      input: { type: "string", default: "public/assets/sprites" },
    },
  });

  for (const file of resolveFiles(values.input)) {
    execSync(`magick "${file}" -flop PNG32:"${file}"`);
    console.log(`flipped  ${file}`);
  }
}
