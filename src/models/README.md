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
  id, label, hitDie,
  primaryAbilities, saves,
  proficiencies: { "light-armor", "shields", "simple-weapons", skills, ... },
  startingEquipment: [...],
  recommendedScores: { str, dex, con, int, wis, cha },
}
```
Projections: `startingEquipment({id})`, `resources({id, level, abilityScores})`, `resourceResetOn({id, resourceId})`, `groupBy({by: "classification"})`.

### `classResources` — `classResources.get({ id: "rage" })`
```ts
{ id, name, description, icon }
```

### `abilities`
```ts
{ id, label, short }
```

### `skills`
```ts
{ name, label, ability }
```

### `combatActions` / `classActions` / `explorationActions`
```ts
{ name, timing, description, icon? }
// classActions adds: classRestriction?, classificationRestriction?
// explorationActions: category + classificationRestriction?
```

### `restActions`
```ts
{ id, label, icon, description }
```

### `proficiencyDetails`
```ts
{ id, label, icon }
```

### `armor`
```ts
{ id, name, category, baseAc, dexModifier, maxDexModifier, stealthDisadvantage }
```

### `weapons`
```ts
{ id, name, proficiency, range, damage: { dice, type }, mastery, properties }
```

### `weaponProperties` / `weaponMastery`
```ts
{ id, description }
```

### `DamageType`
Type only: `"slashing" | "piercing" | "bludgeoning" | "fire" | "cold" | ...`

### `species`
```ts
{ id, label, size, speed, traits, description }
```

### `backgrounds`
```ts
{ id, label, originFeat, abilityOptions, skillProficiencies }
```
Projection: `icon({id, variant?})`.

### `spells`
```ts
{ id, name, level, school, castingTime, range, components, duration, damage? }
```
Projections: `findAll({cls, level})`, `limit({cls, level})`, `timing(spell)`, `groupByTiming(spells)`.

## Related

- **Raw JSON**: [`src/data/`](../data) — mirrors this folder.
- **Character domain** (state + derived stats): [`src/character/`](../character).
- **Storage** (localStorage I/O): [`src/services/character-storage.ts`](../services/character-storage.ts).
