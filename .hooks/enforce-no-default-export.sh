#!/bin/bash
# Blocks default exports in TypeScript/JavaScript source files (per CLAUDE.md).
# Exceptions: config files and .astro files.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check TypeScript/JavaScript source files
if [[ ! "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]]; then
  exit 0
fi

# Skip config files that may require default exports
if [[ "$FILE_PATH" =~ (astro\.config|vitest\.config|vite\.config|\.d\.ts$) ]]; then
  exit 0
fi

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

if [[ "$TOOL_NAME" == "Write" ]]; then
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // empty')
elif [[ "$TOOL_NAME" == "Edit" ]]; then
  CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // empty')
else
  exit 0
fi

if echo "$CONTENT" | grep -qE '^\s*export\s+default\s'; then
  echo "Blocked: Default exports are forbidden. Use named exports instead (per CLAUDE.md)." >&2
  exit 2
fi

exit 0
