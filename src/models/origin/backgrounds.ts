import backgroundListData from "src/data/origin/background-list.json";
import originFeatDescriptions from "src/data/origin/origin-feat-descriptions.json";
import { resolveIconPath } from "src/models/common/icons";

import type { AbilityName } from "src/models/common/abilities";
import type { IconVariant } from "src/models/common/icons";
import type { SkillName } from "src/models/common/skills";

export type Background =
  | "acolyte"
  | "artisan"
  | "charlatan"
  | "criminal"
  | "entertainer"
  | "farmer"
  | "guard"
  | "guide"
  | "hermit"
  | "merchant"
  | "noble"
  | "sage"
  | "sailor"
  | "scribe"
  | "soldier"
  | "wayfarer";

export type OriginFeat =
  | "alert"
  | "crafter"
  | "healer"
  | "lucky"
  | "magic-initiate-cleric"
  | "magic-initiate-druid"
  | "magic-initiate-wizard"
  | "musician"
  | "savage-attacker"
  | "skilled"
  | "tavern-brawler"
  | "tough";

export type BackgroundEntry = {
  key: Background;
  label: string;
  icon: string;
  originFeat: OriginFeat;
  originFeatLabel: string;
  abilityOptions: [AbilityName, AbilityName, AbilityName];
  skillProficiencies: [SkillName, SkillName];
};

const DATA = backgroundListData as BackgroundEntry[];
const BY_KEY = new Map(DATA.map((b) => [b.key, b]));
const FEAT_DESCRIPTIONS = originFeatDescriptions as Record<OriginFeat, string>;

const PLACEHOLDER_ICON = "/race-icons/placeholder.png";

export const backgrounds = {
  get(id: Background): BackgroundEntry {
    const found = BY_KEY.get(id);
    if (!found) throw new Error(`Unknown background: ${id}`);
    return found;
  },
  find(id: string): BackgroundEntry | undefined {
    return BY_KEY.get(id as Background);
  },
  list(): BackgroundEntry[] {
    return DATA;
  },
  icon(id: Background, opts?: { variant?: IconVariant }): string {
    const entry = BY_KEY.get(id);
    if (!entry?.icon) return PLACEHOLDER_ICON;
    return resolveIconPath(entry.icon, { variant: opts?.variant ?? "BLACK" });
  },
};

export const originFeats = {
  describe(id: OriginFeat): string {
    return FEAT_DESCRIPTIONS[id];
  },
};
