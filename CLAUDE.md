# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

D&D 5th Edition beginner-friendly character sheet application.

## Tech Stack

- **Astro** — static site framework
- **React 19** — interactive components (via `@astrojs/react`)
- **CSS Modules** — component styles in `*.module.css` files; global resets and utilities stay in `global.css`
- **pnpm** — package manager
- **Biome** — linter and formatter
- **Vitest** — test runner

## Build Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm preview      # preview production build
pnpm check        # run Biome linter/formatter check
pnpm format       # auto-format with Biome
pnpm test         # run tests once
pnpm test:watch   # run tests in watch mode
```

## Code Standards

- Use **pnpm** exclusively; npm and yarn are not allowed.
- **Exact dependency versions** in package.json (`"1.2.3"`, not `"^1.2.3"` or `"~1.2.3"`).
- Enforce **Biome** in CI.
- TypeScript **strict mode** must be enabled.
- Use **kebab-case** for all file names (e.g., `content-card.tsx`).
- Use **direct imports** only; no barrel imports.
- **Named exports** only (`export function …`); default exports forbidden unless required by a dependency.
- Use `import type { ... } from '...'` for type-only imports.
- `any` type must have an explicit justification comment.
- **Prefer `type` over `interface`** for regular object definitions. Use `interface` only for semantic behavior contracts (e.g., `interface Runnable`, `interface Serializable`). For plain data shapes, use `type`.
- No emojis in code or comments.
- Keep functions small and focused (guideline: < 50 lines).
- Prefer meaningful names over explanatory comments.
- Apply DRY, but prioritize clarity.
- Types must be shared between CMS schemas and webapp code; no copy-pasting identical type definitions.
- Generated types from Strapi schemas must be used in webapp.
- **Use absolute imports** from `src/` for all cross-folder imports (e.g., `import { X } from "src/data/types"`). Use relative imports only for same-folder files (CSS modules, index re-exports).
- **No `utils/` folders.** Do not create catch-all utility directories. Instead, create a standalone file named after the function it exports (e.g., `src/data/get-foo.ts` instead of `src/utils/get-foo.ts`). Place it in the most relevant existing folder, close to its consumers.

### Style: Functions over Classes

Prefer plain functions and closures over the `class` syntax. Use **function factories** for encapsulation and polymorphism instead of abstract classes or inheritance hierarchies. Keep things straightforward with function scopes — no `this`, no `new`, no class-based patterns.

### Function Signature Rule

- 1 argument: direct parameter if obvious.
- 2 arguments: use object destructuring if the second is complex/config-like.
- 3+ arguments: always use object destructuring for parameters beyond the first.

## Language Policy

All repository artifacts (code, comments, commit messages, docs) must be written in English.
