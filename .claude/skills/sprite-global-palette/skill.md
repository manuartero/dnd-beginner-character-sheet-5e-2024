---
name: sprite-global-palette
description: Iteratively reduce the global cross-sprite palette one color at a time. Use when the user wants to unify colors across character sprites or shrink the main palette.
version: 1.1.0
---

# Sprite Global Palette

## When to use this skill
When the user wants to shrink the total number of unique colors across all sprites.
Always process **one color at a time** — find one candidate, apply one merge, verify, done.

Invoke with: `/sprite-global-palette`

---

## Phase 1 — Find one color to remove

```
pnpm sprite:candidates
```

This prints a ranked table of cross-sprite color pairs sorted by RGB distance (smallest = safest):

```
dist  replace in    from-hex      →  keep in       into-hex
9     fighter       #BEC1C8       →  rogue         #B9BBC3
18    barbarian     #EA9364       →  sorcerer      #EA826A
...
```

**Pick the top row** (lowest distance). That is your target.
- Distance < 30: safe to apply directly.
- Distance 30–50: apply and do a visual check before confirming.

---

## Phase 2 — Remove one color

With the chosen row (`replace-in` sprite, `FROM` hex, `INTO` hex):

**Step 1 — Apply the merge**
```
pnpm sprite:merge-colors --input public/assets/sprites/<replace-in>.png --merge FROM:INTO
```

**Step 2 — Upscale and display**
```
pnpm sprite:upscale --input public/assets/sprites/<replace-in>.png --scale 4
```
Read and display `<name>_4x.png`. Confirm no visible change.

**Step 3 — Rebuild main palette**
```
pnpm sprite:build-palette
```
Report the new total unique color count from `main.palette.json`.

---

## Done for this round
One color removed. Stop here and wait for the user to confirm before continuing.
