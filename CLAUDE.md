# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

D&D 5th Edition beginner-friendly character sheet application.

## Status

This is a new repository with no source code yet. Update this file as the project takes shape.

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
- No emojis in code or comments.
- Keep functions small and focused (guideline: < 50 lines).
- Prefer meaningful names over explanatory comments.
- Apply DRY, but prioritize clarity.
- Types must be shared between CMS schemas and webapp code; no copy-pasting identical type definitions.
- Generated types from Strapi schemas must be used in webapp.

### Style: Functions over Classes

Prefer plain functions and closures over the `class` syntax. Use **function factories** for encapsulation and polymorphism instead of abstract classes or inheritance hierarchies. Keep things straightforward with function scopes — no `this`, no `new`, no class-based patterns.

### Function Signature Rule

- 1 argument: direct parameter if obvious.
- 2 arguments: use object destructuring if the second is complex/config-like.
- 3+ arguments: always use object destructuring for parameters beyond the first.

## Language Policy

All repository artifacts (code, comments, commit messages, docs) must be written in English.
