# Class Avatar Sprite Prompts

32×32px · 4 colors · transparent background · Game Boy pixel art · front-facing idle pose

## Template

```
A tiny {CLASS} character sprite in Game Boy pixel art style, 4 colors only using classic Game Boy
{CLASS} palette ({PALETTE}), 32x32 pixels, front-facing idle pose, {CLOTHING}, {WEAPON},
{COMPANION}, chunky pixelated outlines, no background, transparent background, retro RPG handheld
game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution
dithering", character facing right (3/4 right-facing view)
```

## Classes

Palette order: **darkest → dark → light → lightest**

| Class     | Palette                                           | Clothing                                       | Weapon                                          | Companion                              |
|-----------|---------------------------------------------------|------------------------------------------------|-------------------------------------------------|----------------------------------------|
| Barbarian | `#1a0000` `#6b1a08` `#c44020` `#f0a070`           | tattered fur-trimmed leather vest, bare arms   | massive greataxe held in both hands             | small wolf cub at feet                 |
| Bard      | `#0d0020` `#4a1870` `#a050d0` `#f0d060`           | colorful patchwork cloak, feathered cap        | lute slung on back, thin rapier at hip          | tiny songbird perched on hat brim      |
| Cleric    | `#100800` `#584800` `#c8a820` `#f8f8c0`           | flowing robes with holy symbol on chest        | mace at side, small shield on arm               | radiant halo of 2-3 light pixels       |
| Druid     | `#0f380f` `#306230` `#8bac0f` `#9bbc0f`           | hooded cloak with leaf/vine details            | wooden staff topped with a small glowing orb    | owl or frog sitting on shoulder        |
| Fighter   | `#040408` `#202838` `#607080` `#c8d0d8`           | full plate armor, closed helmet with visor     | longsword in hand, kite shield on arm           | none — a single battle-worn scar       |
| Monk      | `#0c0400` `#503008` `#c07820` `#f8c870`           | simple gi with wide sash belt                  | quarterstaff held upright, or open-hand stance  | small bead bracelet detail             |
| Paladin   | `#080810` `#404860` `#c0a830` `#f0f0d0`           | gleaming full plate with cape, holy crest      | longsword raised slightly, tower shield         | tiny angelic wings pixel detail        |
| Ranger    | `#050200` `#2a1808` `#6b4820` `#c8a060`           | hooded leather armor, forest-green cloak       | longbow held at side, quiver on back            | small deer fawn or fox at feet         |
| Rogue     | `#030305` `#181820` `#404058` `#9090a8`           | dark hooded cloak, tight leather armor         | dagger in raised hand, second dagger at belt    | a tiny rat on shoulder                 |
| Sorcerer  | `#080010` `#380868` `#9040d0` `#f8d0ff`           | flowing robe with arcane rune trim             | arcane orb held forward, no staff               | tiny purple flame or wisp floating by  |
| Warlock   | `#030008` `#180030` `#5a1878` `#d060e0`           | dark tattered robe with eldritch sigil         | pact tome or eldritch-glowing short blade       | small tentacle or eye motif on cloak   |
| Wizard    | `#020810` `#0c2060` `#3070d0` `#c0d8ff`           | long robes with star pattern trim, pointed hat | tall staff with gem on top, spellbook at side   | small cat familiar or floating scroll  |

## Notes

- Darkest shade = outline color
- Companion: 4-6 pixel blob, must read clearly at 32px
- Generator tends to upscale — run `scripts/upscale-sprite.mjs` if needed

## Iteration log

- Druid (2026-03-28): v1 accepted. Original prompt recovered post-hoc.
