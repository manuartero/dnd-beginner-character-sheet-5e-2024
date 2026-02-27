#!/bin/bash
# Blocks creation of files inside utils/ directories (per CLAUDE.md).

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if echo "$FILE_PATH" | grep -q '/utils/'; then
  echo "Blocked: Do not create files in utils/ directories. Place helpers near their consumers with descriptive names (per CLAUDE.md)." >&2
  exit 2
fi

exit 0
