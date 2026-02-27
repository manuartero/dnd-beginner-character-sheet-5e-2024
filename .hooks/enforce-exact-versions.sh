#!/bin/bash
# Blocks caret (^) or tilde (~) version ranges in package.json (per CLAUDE.md).

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check package.json
if [[ "$(basename "$FILE_PATH")" != "package.json" ]]; then
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

if echo "$CONTENT" | grep -qE '"[\^~][0-9]'; then
  echo "Blocked: Use exact dependency versions in package.json (no ^ or ~, per CLAUDE.md)." >&2
  exit 2
fi

exit 0
