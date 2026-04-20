# Models tier conventions

## Purpose

`src/models/` is the bridge between raw JSON data and the components layer.

Components never touch JSON directly and never perform lookups, `.find()`, or `.map()` projections over raw data. They call typed methods on a model object.

## Module shape

Each module exports **a single object named after the entity** (singular: `species`, `spells`). The object exposes a small, consistent API.

```ts
// src/models/origin/species.ts
export const species = {
  get({ id }: { id: Species }): SpeciesDetails { ... },
  find({ id }: { id: string }): SpeciesDetails | undefined { ... },
  list(): SpeciesDetails[] { ... },
};
```

Types are exported alongside (the narrow id union + the details shape):

```ts
export type Species = "elf" | "dwarf" | ...;
export type SpeciesDetails = { id: Species; label: string; icon: string; ... };
```

## Standard methods

| Method                | Use when                                                | Returns                      |
| --------------------- | ------------------------------------------------------- | ---------------------------- |
| `get(criteria)`       | caller expects exactly one match; any other case = bug  | `T` (throws on 0 or >1)      |
| `find(criteria)`      | caller expects 0 or 1 match (unknown id, search)        | `T \| undefined` (throws on >1) |
| `findAll(criteria)`   | filter / multi-match query                              | `T[]` (empty array on 0)     |
| `groupBy({ by })`     | partition records by a field                            | `{ key; items: T[] }[]` (ordered) |
| `list()`              | all records, no criteria (UI grids, tests, pickers)     | `T[]`                        |

Add only what real consumers use — not every module needs all five.

## Rules

- **All criteria are objects.** No positional ids. `get({ id })`, `find({ name })`, `findAll({ cls, level })`.
- **Criteria keys mirror entity fields.** If the entity has `.id`, query by `{ id }`. If `.name`, by `{ name }`. Composite criteria are fine: `spells.findAll({ cls, level })`.
- **`get` and `find` throw on ambiguous match (>1).** Multiple matches means a model-level bug — surface it rather than silently picking one.
- **`find` returns `undefined`** (idiomatic TS, mirrors `Array.prototype.find`).
- **No `getAll`.** `findAll` covers it; a strict-only multi-query variant adds noise without carrying its weight.
- **`groupBy` returns raw keys**, not display labels. Labels live in the UI consumer. The result is an **ordered array** of `{ key, items }` so group order is preserved.
- **Entities carry their identity field (flat `T[]`).** If the data source keys records by id in a map, fold `.id` into each value at read time — don't make consumers handle `{ id, details }` wrappers.
- **Non-CRUD projections are allowed** when they're not lookups (`backgrounds.icon({ id })`, `spells.limit({ cls, level })`). Filter-style helpers (`forClass`, `findByName`, `forAbility`) are **not** — those fold into `find` / `findAll`.

## Anti-patterns

- ❌ Positional args: `classes.get("wizard")` → use `classes.get({ id: "wizard" })`.
- ❌ Wrapped return shapes: `list(): { id; details }[]` → flatten with `.id` on the entity.
- ❌ Exporting raw `RECORD` / `LIST` constants for components to iterate → wrap in `list()`.
- ❌ Standalone helpers like `getXxxIcon(id)` → `model.get({id}).icon` or `model.icon({id})` projection.
- ❌ Ad-hoc plural-query names (`forClass`, `findByName`, `forAbility`) → `findAll({ ... })` or `find({ ... })`.
- ❌ Letting components write `.find((r) => r.key === id)` → belongs in the model.
- ❌ `get` silently returning a fallback on unknown id → let it throw.

## Reference implementations

- `src/models/origin/species.ts`
- `src/models/spells/spells.ts`
