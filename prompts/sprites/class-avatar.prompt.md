# Class Avatar Sprite Prompts

32×32px · 4 colors · transparent background · Game Boy pixel art · front-facing idle pose

## Template

```
A {CLASS} character sprite in Game Boy pixel art style, 4 colors only using classic Game Boy
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
- Custom/tiefling variants may use up to 6 colors to accommodate extra skin tone; deviate from the 4-color template explicitly in the prompt

## Prompts used

**Cleric**
> A Dwarf male Cleric character sprite in Game Boy pixel art style, 64x64 pixels, front-facing idle pose, 6-color palette: deep dark brown outline (#100800), dark warm brown (#584800) for armor shadows and beard depth, golden-amber (#c8a820) for rune-inscribed plate armor and warhammer head, warm near-white (#f8f8c0) for armor highlights and carved rune trim, ruddy tan (#a85030) for dwarf skin on face and hands, brilliant pure white (#f8f8f8) for holy symbol divine glow, stocky barrel-chested dwarf build — thick legs, wide frame, visibly massive strength beneath the bulk, full dwarven rune plate armor with ancestral runes etched across every surface, wide bushy beard braided with iron rings, warhammer held casually in off-hand at side, holy symbol raised high in main hand with brilliant white divine light blazing from it and short rays radiating outward, chunky pixelated outlines, SOLID BRIGHT MAGENTA background (#FF00FF), retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)

**Barbarian**
> A female Orc Barbarian character sprite in Game Boy pixel art style, 4 colors only using classic Game Boy Barbarian palette (#1a0000 #6b1a08 #c44020 #f0a070), 32x32 pixels, front-facing idle pose, massive muscular frame, tattered fur-trimmed leather vest, bare arms showing bulging muscles, prominent lower tusks jutting upward from jaw, fierce battle-worn face, massive greataxe held in both hands, small wolf cub at feet, chunky pixelated outlines, no background, transparent background, retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)

**Druid**
> A druid character sprite in Game Boy pixel art style, 4 colors only using deep forest green palette (#0f380f #306230 #8bac0f #9bbc0f), 32x32 pixels, front-facing idle pose, stocky overweight build, HOODED cloak with hood UP covering the head, leaf and vine details on cloak hem, wooden staff topped with a small glowing orb, owl or frog sitting on shoulder, chunky pixelated outlines, SOLID BRIGHT MAGENTA background (#FF00FF), retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view). IMPORTANT: all 4 colors must be dark forest greens — the lightest shade (#9bbc0f) is a muted olive-sage, NOT neon yellow, NOT lime green, NOT banana yellow.

**Fighter**
> A tiny female Fighter character sprite in Game Boy pixel art style, 4 colors only using classic Game Boy Fighter palette (#040408 #202838 #607080 #c8d0d8), 32x32 pixels, front-facing idle pose, half-plate armor with visible leather pauldrons and bracers, open-faced helmet showing her face, longsword in hand, kite shield on arm, none — a single battle-worn scar, chunky pixelated outlines, no background, transparent background, retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)

**Rogue**
> A tiny tall Tiefling Rogue character sprite in Game Boy pixel art style, 32x32 pixels, front-facing idle pose, 6-color palette: dark near-black outline (#030305), deep dark blue-grey (#181820), mid blue-grey (#404058), light silver-grey (#9090a8) for the cloak and armor, warm reddish-purple (#7a2040) for tiefling skin on face and hands, warm brown (#6b3a1a) for leather chest piece and bracers, dark hooded cloak pushed back revealing small curved horns, tight leather armor with visible belt and buckle details, slender tall frame, dagger in raised hand, second dagger at belt, a tiny rat on shoulder, thin devil tail curling from cloak hem, chunky pixelated outlines, no background, transparent background, retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)

**Wizard**
> A wizard character sprite in Game Boy pixel art style, 4 colors only using classic Game Boy wizard palette (#020810 #0c2060 #3070d0 #c0d8ff), 32x32 pixels, front-facing idle pose, long battle-worn robes with star pattern trim and leather field straps across the chest, short wide-brim adventurer's hat (NOT a tall pointed hat), full thick beard, tall staff with gem on top, a small glowing scroll orbiting around him (NOT behind him, wrapping around the figure), tiny arcane runes floating around the character as a magical aura, chunky pixelated outlines, SOLID BRIGHT MAGENTA background (#FF00FF), retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)

**Sorcerer**
> A female Aasimar Sorcerer character sprite in Game Boy pixel art style, 32x32 pixels, front-facing idle pose, 6-color palette: dark near-black outline (#080010), deep crimson-dark (#3a0010), vivid red (#c02030) for flames and clothing details, warm rose-gold (#f8a080) for robe highlights and flame tips, warm light skin (#e8c490) for face and hands, bright near-white (#f4f0e8) for large feathered aasimar wings spread slightly behind her, gorgeous elegant flowing crimson sorcerer robes with ornate gold-red trim and arcane runes, low neckline, dramatic silhouette, arcane orb held forward no staff, large feathered wings fanned slightly behind back — NO halo, vivid red magical flames flickering around her body as an arcane aura — at her feet, along her arms, framing the wings — NO animal companion, chunky pixelated outlines, no background, transparent background, retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)

**Warlock**
> A Dragonborn Warlock character sprite in Game Boy pixel art style, 32x32 pixels, front-facing idle pose, 6-color palette: dark near-black outline (#030008), deep warlock purple (#180030), mid eldritch purple (#5a1878) for armor sigils and blade glow, deep bronze shadow (#5a2800) for scale shadows and wing membrane, warm copper (#b06020) for draconic scales and skin, bright copper highlight (#e8a040) for scale ridges and wing edges, tall muscular draconic build with reptilian head and snout, copper-bronze scales visible on face arms and chest, folded draconic wings tucked close behind back, light leather armor with eldritch sigils, glowing psionic blade of crackling purple energy held forward in main hand, small draconic wyrmling familiar coiled on the off-hand forearm, chunky pixelated outlines, no background, transparent background, retro RPG handheld game aesthetic, 1990s portable game sprite "no anti-aliasing, hard pixel edges, low resolution dithering", character facing right (3/4 right-facing view)
