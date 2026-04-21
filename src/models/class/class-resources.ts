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
  icon: string;
};

export type CharacterResource = {
  resourceId: ResourceId;
  current: number;
  max: number;
};

type ProgressionValue = number | string;

type ClassResourceEntry = ResourceDefinition & {
  resetOn: RestType;
  progression: Record<string, ProgressionValue>;
};

type ClassEntry = { resources: ClassResourceEntry[] };

const CLASS_RESOURCES: Record<CharacterClass, ClassEntry> =
  classResourcesData as Record<CharacterClass, ClassEntry>;

const ALL: ResourceDefinition[] = [];
const BY_ID = new Map<ResourceId, ResourceDefinition>();
for (const classEntry of Object.values(CLASS_RESOURCES)) {
  for (const r of classEntry.resources) {
    if (!BY_ID.has(r.id)) {
      const def: ResourceDefinition = {
        id: r.id,
        name: r.name,
        description: r.description,
        icon: r.icon,
      };
      BY_ID.set(r.id, def);
      ALL.push(def);
    }
  }
}

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

export function resolveResourcesForLevel(
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

    resources.push({ resourceId: entry.id, current: max, max });
  }

  return resources;
}

export function resolveResourceResetOn(
  characterClass: CharacterClass,
  resourceId: ResourceId,
): RestType {
  const entry = CLASS_RESOURCES[characterClass]?.resources.find(
    (r) => r.id === resourceId,
  );
  return entry?.resetOn ?? "long-rest";
}

export const classResources = {
  get({ id }: { id: ResourceId }): ResourceDefinition {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown resource: ${id}`);
    return found;
  },
  find({ id }: { id: string }): ResourceDefinition | undefined {
    return BY_ID.get(id);
  },
  list(): ResourceDefinition[] {
    return ALL;
  },
};
