#!/bin/bash
# Blocks npm and yarn commands. Use pnpm exclusively (per CLAUDE.md).

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qw 'npm' || echo "$COMMAND" | grep -qw 'yarn'; then
  echo "Blocked: Use pnpm instead of npm/yarn (per CLAUDE.md)." >&2
  exit 2
fi

exit 0
