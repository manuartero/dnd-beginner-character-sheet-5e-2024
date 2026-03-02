#!/bin/bash
# Reads coverage/coverage-summary.json and updates the coverage badge in README.md.
# Run after `pnpm test:coverage`.

SUMMARY="./coverage/coverage-summary.json"

if [[ ! -f "$SUMMARY" ]]; then
  echo "Coverage summary not found at $SUMMARY — run 'pnpm test:coverage' first." >&2
  exit 1
fi

PCT=$(node -e "const s=JSON.parse(require('fs').readFileSync('$SUMMARY','utf8'));console.log(Math.round(s.total.lines.pct))")

if   [[ $PCT -ge 80 ]]; then COLOR="brightgreen"
elif [[ $PCT -ge 60 ]]; then COLOR="yellow"
elif [[ $PCT -ge 40 ]]; then COLOR="orange"
else                         COLOR="red"
fi

BADGE="![Coverage](https://img.shields.io/badge/coverage-${PCT}%25-${COLOR})"

sed -i '' "s|!\[Coverage\](https://img\.shields\.io/badge/coverage-[^)]*)|${BADGE}|" README.md

if ! git diff --quiet README.md; then
  git add README.md
  git commit -m "chore: update coverage badge [${PCT}%]"
  echo "Coverage badge updated → ${PCT}% (${COLOR})"
else
  echo "Coverage badge already up to date (${PCT}%)"
fi
