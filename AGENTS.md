## Plan Mode

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
