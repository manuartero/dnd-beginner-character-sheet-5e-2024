# AGENTS.md

## Project mission

Build a beginner-first D&D 5e (2024) character sheet that answers the in-session question: "what can I do right now?" with low-friction, icon-led UI.

Canonical product vision lives in `SPEC.md`. Design decisions that extend the spec live in `DESIGN-spells-resources.md`.

## Tech stack and commands

- Framework: Astro + React 19
- Styling: CSS Modules + global styles in `src/styles/`
- Tooling: pnpm, Biome, Vitest

Use pnpm exclusively:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm test
```

## Hard standards

These standards are enforced for all new work and refactors:

- Use `pnpm` only; do not use npm/yarn.
- Keep exact dependency versions in `package.json` (no `^` or `~`).
- Keep TypeScript strict mode enabled.
- Use kebab-case file names.
- Use named exports only unless a dependency requires default export.
- Use direct imports only; do not introduce barrel imports/exports.
- For cross-folder imports, use absolute `src/*` paths.
- Use relative imports only for same-folder files (for example CSS modules).
- Use `import type` for type-only imports.
- Prefer `type` for data shapes; reserve `interface` for behavior contracts.
- Do not introduce `any` without an explicit justification comment.
- Do not create `utils/` catch-all folders; place helper files near consumers with specific names.
- Keep repository artifacts in English.

## Working agreements for agents

- Start with non-mutating exploration (`rg`, `sed`, `git diff`) before edits.
- Prefer minimal, targeted changes that preserve existing architecture and naming patterns.
- Run validation after changes:
  - Docs-only changes: `pnpm lint` and `pnpm test` when feasible.
  - Code changes: relevant tests plus `pnpm lint`.
- When product behavior or scope changes, update docs in the same change:
  - Canonical scope/vision: `SPEC.md`
  - Entry-level summary: `README.md`
  - Focused design decisions: `DESIGN-*.md`
- For reviews, prioritize correctness, regressions, and missing test coverage over style nits.

### Style: Functions over Classes

Prefer plain functions and closures over the `class` syntax. Use **function factories** for encapsulation and polymorphism instead of abstract classes or inheritance hierarchies. Keep things straightforward with function scopes — no `this`, no `new`, no class-based patterns.

### Function Signature Rule

- 1 argument: direct parameter if obvious.
- 2 arguments: use object destructuring if the second is complex/config-like.
- 3+ arguments: always use object destructuring for parameters beyond the first.

## Standards quick scan (Feb 20, 2026)

Current scan snapshot for `src/`:

- Barrel export files (`index.ts`): `26`
- Same-folder relative imports (`./`): `111` (mostly expected for local modules, styles, and tests)
- Naming exception found: `src/audio/__mocks__/audio-context.ts` (underscore directory conflicts with strict kebab-case)

This scan is report-only and does not include refactors.

## Standards backlog (ordered)

1. Replace barrel imports/exports (`index.ts`) with direct imports.
2. Convert cross-folder relative imports to absolute `src/*` imports.
3. Resolve naming exceptions (including test mock directory strategy).
4. Strengthen automated enforcement via lint/check rules where feasible.

## Instruction precedence

When instructions conflict, use this precedence:

1. System/developer/user instructions
2. `AGENTS.md`
3. `CLAUDE.md` details
