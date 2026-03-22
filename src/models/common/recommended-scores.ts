import recommendedData from "src/data/class/recommended-scores.json";

import type { CharacterClass } from "src/models/class/classes";
import type { AbilityScores } from "src/models/common/abilities";

export const STANDARD_ARRAY: number[] = recommendedData.standardArray;

export const RECOMMENDED_SCORES: Record<CharacterClass, AbilityScores> =
  recommendedData.recommended as Record<CharacterClass, AbilityScores>;
