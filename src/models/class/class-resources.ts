import { computeModifier } from "src/character/modifiers";
import classResourcesData from "src/data/class/class-resources.json";

import type { AbilityName, AbilityScores } from "src/models/common/abilities";
import type { CharacterClass } from "./classes";

export type ResourceId = string;

export type RestType = "short-rest" | "long-rest";

export type ResourceDefinition = {
  id: ResourceId;
  name: string;
  description: string;
  resetOn: RestType;
  icon: string;
};

export type CharacterResource = {
  resourceId: ResourceId;
  current: number;
  max: number;
};

type ProgressionValue = number | string;

type ClassResourceEntry = ResourceDefinition & {
  progression: Record<string, ProgressionValue>;
};

type ClassEntry = {
  resources: ClassResourceEntry[];
};

const CLASS_RESOURCES: Record<CharacterClass, ClassEntry> =
  classResourcesData as Record<CharacterClass, ClassEntry>;

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
): ResourceDefinition | undefined {
  for (const entry of Object.values(CLASS_RESOURCES)) {
    const found = entry.resources.find((r) => r.id === resourceId);
    if (found) {
      const { progression: _, ...definition } = found;
      return definition;
    }
  }
  return undefined;
}

export function getResourceResetOn(
  characterClass: CharacterClass,
  resourceId: ResourceId,
): RestType {
  const entry = CLASS_RESOURCES[characterClass]?.resources.find(
    (r) => r.id === resourceId,
  );
  return entry?.resetOn ?? "long-rest";
}

export function applyRest(
  type: RestType,
  resources: CharacterResource[],
  characterClass: CharacterClass,
): CharacterResource[] {
  return resources.map((r) =>
    type === "long-rest" ||
    getResourceResetOn(characterClass, r.resourceId) === type
      ? { ...r, current: r.max }
      : r,
  );
}

export function getResourcesForLevel(
  characterClass: CharacterClass,
  level: number,
  abilityScores: AbilityScores,
): CharacterResource[] {
  const classEntry = CLASS_RESOURCES[characterClass];
  if (!classEntry) return [];

  const resources: CharacterResource[] = [];
  const levelKey = String(level);

  for (const entry of classEntry.resources) {
    const rawMax = entry.progression[levelKey];
    if (rawMax === undefined) continue;

    const max = resolveMax(rawMax, abilityScores);
    if (max <= 0) continue;

    resources.push({
      resourceId: entry.id,
      current: max,
      max,
    });
  }

  return resources;
}
