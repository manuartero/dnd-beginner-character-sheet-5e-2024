---
name: sprite-global-palette
description: Iteratively reduce the global cross-sprite palette one color at a time. Use when the user wants to unify colors across character sprites or shrink the main palette.
version: 2.0.0
---

# Sprite Global Palette

## When to use this skill
When the user wants to shrink the total number of unique colors across all sprites.
Always process **one color at a time** — find one candidate, apply one merge, verify, done.

Invoke with: `/sprite-global-palette`

---

## Phase 1 — Analyze the palette

Run both tools to understand the current state:

```
pnpm sprite:candidates
pnpm sprite:analyze
```

`sprite:candidates` ranks cross-sprite color pairs by RGB distance (lowest = safest merge).
`sprite:analyze` groups colors by hue family and flags near-duplicate candidates.

**Pick one candidate** — prefer the lowest distance pair from `sprite:candidates`.
- Distance < 30: safe to apply directly.
- Distance 30–50: apply and do a visual check before confirming.

---

## Phase 2 — Apply the merge globally

With the chosen `FROM` and `INTO` hex values:

**Step 1 — Dry run first**
```
pnpm sprite:replace --from <FROM> --to <INTO> --dry-run
```
Confirm which sprites are affected and how many pixels will change.

**Step 2 — Apply**
```
pnpm sprite:replace --from <FROM> --to <INTO>
```
This replaces the color in **every sprite** that contains it, regenerates all `_4x.png` upscales, and rebuilds `main.palette.json` automatically.

**Step 3 — Visual check**
Read and display the `_4x.png` for each affected sprite. Confirm no visible degradation.

---

## Done for this round
One color removed globally. Stop here and wait for the user to confirm before continuing.
