# Models tier conventions

## Purpose

`src/models/` is the bridge between raw JSON data and the components layer.

Components never touch JSON directly and never perform lookups, `.find()`, or `.map()` projections over raw data. They call typed methods on a model object.

## Module shape

Each module exports **a single object named after the entity** (singular: `species`, `spells`). The object exposes a small, consistent API.

```ts
// src/models/origin/species.ts
export const species = {
  get(id: Species): SpeciesDetails { ... },
  find(id: string): SpeciesDetails | undefined { ... },
  list(): { id: Species; details: SpeciesDetails }[] { ... },
};
```

Types are exported alongside (the narrow id union + the details shape):

```ts
export type Species = "elf" | "dwarf" | ...;
export type SpeciesDetails = { label: string; icon: string; ... };
```

## Standard methods

| Method      | Use when                                             | Input         | Returns                      |
| ----------- | ---------------------------------------------------- | ------------- | ---------------------------- |
| `get(id)`   | id is known and typed                                | entity type   | details (never undefined)    |
| `find(id)`  | id is untrusted (storage, URL, user input, raw JSON) | `string`      | details or `undefined`       |
| `list()`    | iteration (chip grids, validation, dropdowns)        | —             | `{ id; details }[]` or similar |

Additional query methods are fine when consumers need them (e.g. `spells.limit({ cls, level })`). Keep names verb-like and results typed.

Not every module needs all three — add only what real consumers use.

## Anti-patterns

- ❌ Exporting raw `RECORD` / `LIST` constants for components to iterate → wrap in `list()`.
- ❌ Exporting standalone helpers like `getXxxIcon(id)` → use `model.get(id).icon`.
- ❌ Letting components write `.find((r) => r.key === id)` → that logic belongs in the model.
- ❌ Multiple flat exports per entity (e.g. `WIZARD_SPELLS_LEVEL_0`, `WIZARD_CANTRIP_SELECTION`) → collapse into one object + query methods.

## Reference implementations

- `src/models/origin/species.ts`
- `src/models/spells/spells.ts`
