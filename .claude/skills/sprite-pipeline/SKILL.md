---
name: sprite-pipeline
description: Full sprite processing pipeline for D&D character sprites — analyze, merge colors, remove background, re-check palette, and upscale. Use when a new sprite PNG arrives from the AI design team and needs to be prepped for the repo.
version: 1.0.0
---

# Sprite Pipeline

## When to use this skill
When a new character sprite arrives from the AI design team and needs to be processed for the repo.

Invoke with: `/sprite-pipeline`

## Inputs
- `--input <file>`: path to the sprite PNG (e.g. `public/assets/sprites/rogue.png`)

## Pre-flight check
**If the input file is not a `.png`, ABORT immediately with:**
```
⚠️  Input is not a PNG — did you forget to convert it first?
    JPEG/WEBP inputs must be converted to PNG before running the pipeline.
    Aborting.
```
JPEG input means the user forgot a prior step. Do not attempt conversion.

## Pipeline (run in this exact order)

### Step 1 — Color analysis
```
pnpm sprite:colors --input <file>
```
Read the palette JSON and report how many colors were found.

### Step 2 — Merge colors (BEFORE background removal)
```
pnpm sprite:merge-colors --input <file> --target 10
```
**Critical:** merge MUST happen before remove-background. This consolidates near-identical background colors into one, so the background removal flood-fill works correctly. If you remove background first, the outline color (near-black) may match the background and wipe the sprite.

### Step 3 — Remove background
```
pnpm sprite:remove-background --input <file>
```
Report which border color was detected and removed.

### Step 4 — Re-check palette
```
pnpm sprite:colors --input <file>
```
Show the final palette table with color roles (outline, skin, leather, cloak, etc.).

### Step 5 — Upscale
```
pnpm sprite:upscale --input <file> --scale 4
```
After upscaling, read and display the `<name>_4x.png` result image for visual confirmation.

### Step 6 — Rebuild main palette
```
pnpm sprite:build-palette
```
Report the new total unique color count from `main.palette.json`.

## Output
- `<name>.png` — processed sprite (transparent background, 10 colors)
- `<name>_4x.png` — upscaled version (the suffix follows `_<scale>x`, e.g. `_4x` for `--scale 4`)
- `main.palette.json` — updated global palette (single source of truth)

## Notes
- Target 10 colors is the established sweet spot for these sprites (enough for skin, leather, cloak, outline, highlights)
- Output suffix is dynamic: `--scale 2` → `_2x.png`, `--scale 4` → `_4x.png`
