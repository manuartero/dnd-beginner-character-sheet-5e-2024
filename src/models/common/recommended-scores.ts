import recommendedData from "src/data/class/recommended-scores.json";

import type { AbilityScores } from "src/models/common/abilities";

export const STANDARD_ARRAY: number[] = recommendedData.standardArray;

export const RECOMMENDED_SCORES: Record<string, AbilityScores> =
  recommendedData.recommended as Record<string, AbilityScores>;
