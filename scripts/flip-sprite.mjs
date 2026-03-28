// flip-sprite.mjs
// Flip pixel-art sprites horizontally (mirror).
//
// Usage:
//   node scripts/flip-sprite.mjs [--input <file-or-dir>]

import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: "string", default: "public/assets/sprites" },
  },
});

function resolveFiles(target) {
  const stat = statSync(target);
  if (stat.isDirectory()) {
    return readdirSync(target)
      .filter((f) => extname(f) === ".png" && !f.endsWith("_4x.png"))
      .map((f) => join(target, f));
  }
  return [target];
}

for (const file of resolveFiles(values.input)) {
  execSync(`magick "${file}" -flop PNG32:"${file}"`);
  console.log(`flipped  ${file}`);
}
