#!/bin/bash
# Blocks creation of files with non-kebab-case names (per CLAUDE.md).

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
BASENAME=$(basename "$FILE_PATH")

# Only check source files
if [[ ! "$BASENAME" =~ \.(ts|tsx|css|astro)$ ]]; then
  exit 0
fi

# Skip well-known config files
if [[ "$BASENAME" =~ ^(astro\.config|vitest\.config|vite\.config|tsconfig|env\.d)\. ]]; then
  exit 0
fi

# kebab-case: lowercase letters, digits, hyphens, and dots only
if [[ ! "$BASENAME" =~ ^[a-z0-9][a-z0-9.\-]*$ ]]; then
  echo "Blocked: File name '$BASENAME' must use kebab-case (per CLAUDE.md)." >&2
  exit 2
fi

exit 0
