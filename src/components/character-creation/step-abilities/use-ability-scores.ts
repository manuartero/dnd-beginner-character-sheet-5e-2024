import { useState } from "react";
import recommendedData from "src/data/recommended-scores.json";

import type { AbilityName, AbilityScores } from "src/models/abilities";
import type { CharacterClass } from "src/models/classes";

type AbilityScoreMode = "quick-start" | "customize" | "advanced";

const STANDARD_ARRAY: number[] = recommendedData.standardArray;

const RECOMMENDED_SCORES: Record<string, AbilityScores> =
  recommendedData.recommended as Record<string, AbilityScores>;

const EMPTY_SCORES: AbilityScores = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};

const DEFAULT_SCORES: AbilityScores = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
};

export const MODE_OPTIONS: {
  value: AbilityScoreMode;
  label: string;
  description: string;
}[] = [
  {
    value: "quick-start",
    label: "Quick Start",
    description: "Recommended scores for your class",
  },
  {
    value: "customize",
    label: "Customize",
    description: "Assign the standard array as you wish",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Type any value for each ability",
  },
];

function toRawScores(s: AbilityScores): Record<AbilityName, string> {
  const entries = Object.entries(s) as [AbilityName, number][];
  return Object.fromEntries(
    entries.map(([key, val]) => [key, String(val)]),
  ) as Record<AbilityName, string>;
}

type UseAbilityScoresParams = {
  characterClass: CharacterClass | null;
  scores: AbilityScores;
  onScoresChange: (scores: AbilityScores) => void;
};

export function useAbilityScores({
  characterClass,
  scores,
  onScoresChange,
}: UseAbilityScoresParams) {
  const [mode, setMode] = useState<AbilityScoreMode>("quick-start");
  const [rawScores, setRawScores] = useState<Record<AbilityName, string>>(() =>
    toRawScores(scores),
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [assignments, setAssignments] = useState<
    Record<AbilityName, number | null>
  >({
    str: null,
    dex: null,
    con: null,
    int: null,
    wis: null,
    cha: null,
  });

  function handleModeChange(newMode: AbilityScoreMode) {
    setMode(newMode);
    if (newMode === "quick-start" && characterClass) {
      const recommended = RECOMMENDED_SCORES[characterClass];
      onScoresChange(recommended);
      setRawScores(toRawScores(recommended));
    } else if (newMode === "customize") {
      onScoresChange(EMPTY_SCORES);
      setRawScores(toRawScores(EMPTY_SCORES));
      setAssignments({
        str: null,
        dex: null,
        con: null,
        int: null,
        wis: null,
        cha: null,
      });
    } else {
      onScoresChange(DEFAULT_SCORES);
      setRawScores(toRawScores(DEFAULT_SCORES));
    }
  }

  function handleScoreChange(ability: AbilityName, value: string) {
    setRawScores((prev) => ({ ...prev, [ability]: value }));
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      onScoresChange({ ...scores, [ability]: parsed });
    }
  }

  function handleAssign(ability: AbilityName, value: number | null) {
    const next = { ...assignments, [ability]: value };
    setAssignments(next);
    const nextScores = { ...EMPTY_SCORES };
    for (const [key, val] of Object.entries(next)) {
      if (val !== null) {
        nextScores[key as AbilityName] = val;
      }
    }
    onScoresChange(nextScores);
    setRawScores(toRawScores(nextScores));
  }

  function handleBlur(ability: AbilityName) {
    setTouched((prev) => ({ ...prev, [ability]: true }));
  }

  function computeAvailableValues(ability: AbilityName): number[] {
    const usedValues = Object.entries(assignments)
      .filter(([key, val]) => key !== ability && val !== null)
      .map(([, val]) => val as number);

    const pool = [...STANDARD_ARRAY];
    for (const used of usedValues) {
      const idx = pool.indexOf(used);
      if (idx !== -1) {
        pool.splice(idx, 1);
      }
    }
    return pool;
  }

  return {
    mode,
    rawScores,
    assignments,
    touched,
    handleModeChange,
    handleScoreChange,
    handleAssign,
    handleBlur,
    computeAvailableValues,
  };
}
