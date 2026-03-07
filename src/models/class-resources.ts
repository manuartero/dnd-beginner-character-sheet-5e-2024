import classResourcesData from "src/data/class-resources.json";
import classProgressionData from "src/data/class-progression.json";
import { computeModifier } from "./abilities";

import type { AbilityName, AbilityScores } from "./abilities";
import type { CharacterClass } from "./classes";

export type ResourceId = string;

export type ResourceDefinition = {
  id: ResourceId;
  name: string;
  description: string;
  resetOn: "short-rest" | "long-rest";
};

export type CharacterResource = {
  resourceId: ResourceId;
  current: number;
  max: number;
};

type ProgressionValue = number | string;

type ClassResourceEntry = {
  resourceId: ResourceId;
  resetOn: "short-rest" | "long-rest";
  progression: Record<string, ProgressionValue>;
};

type ClassProgressionEntry = {
  resources: ClassResourceEntry[];
};

const RESOURCE_DEFINITIONS: Record<ResourceId, ResourceDefinition> =
  classResourcesData as Record<ResourceId, ResourceDefinition>;

const CLASS_PROGRESSION: Record<CharacterClass, ClassProgressionEntry> =
  classProgressionData as Record<CharacterClass, ClassProgressionEntry>;

const ABILITY_MOD_KEYS: Record<string, AbilityName> = {
  "cha-mod": "cha",
  "wis-mod": "wis",
  "int-mod": "int",
  "str-mod": "str",
  "dex-mod": "dex",
  "con-mod": "con",
};

function resolveMax(
  value: ProgressionValue,
  abilityScores: AbilityScores,
): number {
  if (typeof value === "number") return value;
  const ability = ABILITY_MOD_KEYS[value];
  if (ability) {
    return Math.max(1, computeModifier(abilityScores[ability]));
  }
  return 0;
}

export function getResourceDefinition(
  resourceId: ResourceId,
): ResourceDefinition {
  return RESOURCE_DEFINITIONS[resourceId];
}

export function getResourceResetOn(
  characterClass: CharacterClass,
  resourceId: ResourceId,
): "short-rest" | "long-rest" {
  const entry = CLASS_PROGRESSION[characterClass]?.resources.find(
    (r) => r.resourceId === resourceId,
  );
  if (entry) return entry.resetOn;
  return RESOURCE_DEFINITIONS[resourceId]?.resetOn ?? "long-rest";
}

export function getResourcesForLevel(
  characterClass: CharacterClass,
  level: number,
  abilityScores: AbilityScores,
): CharacterResource[] {
  const progression = CLASS_PROGRESSION[characterClass];
  if (!progression) return [];

  const resources: CharacterResource[] = [];
  const levelKey = String(level);

  for (const entry of progression.resources) {
    const rawMax = entry.progression[levelKey];
    if (rawMax === undefined) continue;

    const max = resolveMax(rawMax, abilityScores);
    if (max <= 0) continue;

    resources.push({
      resourceId: entry.resourceId,
      current: max,
      max,
    });
  }

  return resources;
}
