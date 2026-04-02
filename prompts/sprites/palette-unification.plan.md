# Palette Unification Plan

Global target: 1–2 unique colors per sprite. Replacements move toward a canonical warm ramp at **H25 S72**, stepping only in Lightness.

## Ideal ramp (H25 S72)

| L | Hex | Closest current |
|---|-----|-----------------|
| 16 | `#46240B` | `#3B1F17` (H13 S44) |
| 25 | `#6E3812` | `#832B10` (H14 S78) |
| 37 | `#A2531A` | `#A3541A` ✓ (H25 S72 — perfect) |
| 45 | `#C56520` | `#CD9419` (H41 S78) |
| 52 | `#DD762C` | `#BA724D` (H20 S44) |
| 65 | `#E69B65` | `#EA9364` (H21 S76) |
| 74 | `#ECB58D` | `#EFB88B` (H27 S76) |
| 92 | `#F9E8DC` | `#F3EBE0` (H35 S44) |

## Candidates

| Priority | Replace | → | Ideal | Δhsl | Sprites hit | Notes |
|----------|---------|---|-------|------|-------------|-------|
| 1 | `#F3EBE0` H35 S44 L92 | → | `#F9E8DC` H25 S72 L92 | low | cleric, rogue, sorcerer | near-white — subtle |
| 2 | `#3B1F17` H13 S44 L16 | → | `#46240B` H25 S72 L16 | med | barbarian, rogue, warlock, wizard | shadows go golden |
| 3 | `#832B10` H14 S78 L29 | → | `#6E3812` H25 S72 L25 | med | barbarian, rogue | darks go warmer |
| 4 | `#BA724D` H20 S44 L52 | → | `#DD762C` H25 S72 L52 | med | barbarian, sorcerer | saturation dip fixed |
| 5 | `#CD9419` H41 S78 L45 | → | `#C56520` H25 S72 L45 | med | cleric only | gold shifts more orange |
| 6 | `#D9CAB5` H35 S32 L78 | → | `#EDB483` H25 S72 L78 | high | sorcerer | beige → orange, big change |

## Applied

| Date | From | To | Result |
|------|------|----|--------|
| — | — | — | — |
