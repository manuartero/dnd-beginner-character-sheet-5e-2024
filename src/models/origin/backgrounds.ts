import backgroundListData from "src/data/origin/background-list.json";
import originFeatDescriptions from "src/data/origin/origin-feat-descriptions.json";
import { resolveIconPath } from "src/lib/icons";

import type { IconVariant } from "src/lib/icons";
import type { AbilityName } from "src/models/common/abilities";
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

export type OriginFeatEntry = {
  id: OriginFeat;
  name: string;
  description: string;
};

export type BackgroundEntry = {
  id: Background;
  label: string;
  icon: string;
  originFeat: OriginFeatEntry;
  abilityOptions: [AbilityName, AbilityName, AbilityName];
  skillProficiencies: [SkillName, SkillName];
};

type RawBackground = {
  key: Background;
  label: string;
  icon: string;
  originFeat: OriginFeat;
  originFeatLabel: string;
  abilityOptions: [AbilityName, AbilityName, AbilityName];
  skillProficiencies: [SkillName, SkillName];
};

const FEAT_DESCRIPTIONS = originFeatDescriptions as Record<OriginFeat, string>;
const RAW = backgroundListData as RawBackground[];

const DATA: BackgroundEntry[] = RAW.map((r) => ({
  id: r.key,
  label: r.label,
  icon: r.icon,
  originFeat: {
    id: r.originFeat,
    name: r.originFeatLabel,
    description: FEAT_DESCRIPTIONS[r.originFeat],
  },
  abilityOptions: r.abilityOptions,
  skillProficiencies: r.skillProficiencies,
}));

const BY_ID = new Map(DATA.map((b) => [b.id, b]));

const PLACEHOLDER_ICON = "/race-icons/placeholder.png";

export const backgrounds = {
  get({ id }: { id: Background }): BackgroundEntry {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown background: ${id}`);
    return found;
  },
  find({ id }: { id: string }): BackgroundEntry | undefined {
    return BY_ID.get(id as Background);
  },
  list(): BackgroundEntry[] {
    return DATA;
  },
  icon({ id, variant }: { id: Background; variant?: IconVariant }): string {
    const entry = BY_ID.get(id);
    if (!entry?.icon) return PLACEHOLDER_ICON;
    return resolveIconPath(entry.icon, { variant: variant ?? "BLACK" });
  },
};
