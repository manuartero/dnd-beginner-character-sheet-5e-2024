## Plan Mode

**Always enter Plan mode before starting** when the task involves any of the following:

- Designing or redesigning a UI component (layout, placement, interaction model)
- Deciding where a component lives in the app (routing, page structure, sticky/fixed positioning)
- Writing or rewriting more than one file at a time
- Any task where the user describes *what they want* but leaves *how* open (e.g. "design X", "create X", "figure out where Y goes")
- Architectural decisions (lifting state, new data flows, new models or types)

/---

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Standards

- import: use absolute `src/*` paths.
- use relative imports only for same-folder files (for example CSS modules).
- use `import type` for type-only imports.
- prefer `type` for data shapes; reserve `interface` for behavior contracts.
- Prefer plain functions and closures over `class` syntax.
- Use **function factories** for encapsulation and polymorphism
- no `this`, no `new`, no class-based patterns.

### Folder layout

- Forbidden folders: `src/utils/`, `src/types/`, `src/helpers/`. No catch-alls.
- Name every folder by its domain. Types live with their domain — e.g. `Character` type in `src/character/`, `Equipment` type in `src/models/common/gear/`, not a shared `types/` folder.
- If a helper doesn't belong to an existing domain folder, prefer folding it into the model it serves as a projection (e.g. `classes.startingEquipment({id})`) over creating a standalone file.
- When a standalone file is genuinely needed, pick a per-domain folder name. Accepted non-domain folders: `src/data/` (JSON data), `src/services/` (I/O), `src/lib/` (low-level primitives).
