# Models

Quick map of what lives here. Conventions in [`CLAUDE.md`](./CLAUDE.md).

## Tree

```
class/
  classes              12 D&D classes
  class-resources      rage, channel-divinity, spell-slots, ...

common/
  abilities            str/dex/con/int/wis/cha
  skills               18 skills
  rest-actions         short-rest, long-rest
  proficiency-details  light-armor, shields, simple-weapons, ...
  actions/
    combat             Attack, Dodge, Grapple, ...
    class              Second Wind, Sneak Attack, ...
    exploration        Search, Hide, Influence, ...
  gear/
    armor              13 armor + shield
    weapons            38 weapons
    weapon-properties  finesse, light, two-handed, ...
    weapon-mastery     cleave, graze, nick, ...
    equipment          (runtime inventory type)
  damage/
    damage-types       (type-only union)

origin/
  species              10 species
  backgrounds          16 backgrounds + origin feats

spells/
  spells               cantrips + level-1 across 8 caster classes
```

## Shapes (main fields only)

### `classes` — `classes.get({ id: "barbarian" })`
```ts
{
  id: "barbarian",
  label: "Barbarian",
  hitDie: "d12",
  primaryAbilities: ["str"],
  saves: "Strength & Constitution",
  proficiencies: {
    "light-armor": true, "medium-armor": true, "shields": true,
    "simple-weapons": true, "martial-weapons": true,
    skills: { n: 2, options: ["athletics", "intimidation", ...] },
  },
  startingEquipment: [[{ item: "greataxe", quantity: 1 }, ...], [...]],
  recommendedScores: { str: 15, dex: 13, con: 14, int: 8, wis: 12, cha: 10 },
}
```
Projections: `startingEquipment({id})`, `resources({id, level, abilityScores})`, `resourceResetOn({id, resourceId})`, `groupBy({by: "classification"})`.

### `classResources` — `classResources.get({ id: "rage" })`
```ts
{
  id: "rage",
  name: "Rage",
  description: "Enter a fierce rage for extra damage and resistance...",
  icon: "vol2/icon-vol2_65",
}
```

### `abilities`
```ts
{ id: "str", label: "Strength", short: "STR" }
```

### `skills`
```ts
{ name: "athletics", label: "Athletics", ability: "str" }
```

### `combatActions` / `classActions` / `explorationActions`
```ts
// combat
{ name: "Attack", timing: "action", description: "Make one melee or ranged attack..." }

// class (adds classRestriction / classificationRestriction)
{ name: "Sneak Attack", timing: "action", classRestriction: "rogue", description: "..." }

// exploration
{ name: "Search", category: "exploration", description: "..." }
```

### `restActions`
```ts
{
  id: "short-rest",
  label: "Short Rest",
  icon: "vol4/icon-vol4_09",
  description: "Restores short rest resources.",
}
```

### `proficiencyDetails`
```ts
{ id: "light-armor", label: "Light Armor", icon: "vol9/icon-vol9_317" }
```

### `armor`
```ts
{
  id: "leather-armor",
  name: "Leather Armor",
  category: "light",
  baseAc: 11,
  dexModifier: true,
  maxDexModifier: null,
  stealthDisadvantage: false,
}
```

### `weapons`
```ts
{
  id: "longsword",
  name: "Longsword",
  proficiency: "martial",
  range: "melee",
  damage: { dice: "1d8", type: "slashing" },
  mastery: "sap",
  properties: ["versatile"],
}
```

### `weaponProperties` / `weaponMastery`
```ts
// properties
{ id: "finesse", description: "When making an attack with a Finesse weapon..." }

// mastery
{ id: "cleave", description: "If you hit a creature with a melee attack..." }
```

### `DamageType`
Type only: `"slashing" | "piercing" | "bludgeoning" | "fire" | "cold" | ...`

### `species`
```ts
{
  id: "dragonborn",
  label: "Dragonborn",
  size: "Medium",
  speed: "30 ft.",
  traits: ["Dragon Ancestry", "Breath Weapon", "Damage Resistance", ...],
  description: "Descendants hatched from the eggs of chromatic and metallic dragons",
}
```

### `backgrounds`
```ts
{
  id: "acolyte",
  label: "Acolyte",
  originFeat: {
    id: "magic-initiate-cleric",
    name: "Magic Initiate (Cleric)",
    description: "...",
  },
  abilityOptions: ["int", "wis", "cha"],
  skillProficiencies: ["insight", "religion"],
}
```
Projection: `icon({id, variant?})`.

### `spells`
```ts
{
  id: "alarm",
  name: "Alarm",
  level: 1,
  school: "Abjuration",
  castingTime: "1 minute",
  range: "30 ft",
  components: "V, S, M (a tiny bell and a piece of fine silver wire)",
  duration: "8 hours",
  ritual: true,
  damage: { dice: "1d10", type: ["fire"] },  // on damaging spells
}
```
Projections: `findAll({cls, level})`, `limit({cls, level})`, `timing(spell)`, `groupByTiming(spells)`.

## Related

- **Raw JSON**: [`src/data/`](../data) — mirrors this folder.
- **Character domain** (state + derived stats): [`src/character/`](../character).
- **Storage** (localStorage I/O): [`src/services/character-storage.ts`](../services/character-storage.ts).
