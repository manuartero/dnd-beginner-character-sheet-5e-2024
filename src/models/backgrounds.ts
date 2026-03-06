import backgroundListData from "src/data/background-list.json";
import originFeatDescriptions from "src/data/origin-feat-descriptions.json";
import { resolveIconPath } from "./icons";

import type { AbilityName } from "./abilities";
import type { SkillName } from "./skills";

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

type BackgroundEntry = {
  key: Background;
  label: string;
  icon: string;
  originFeat: OriginFeat;
  originFeatLabel: string;
  abilityOptions: [AbilityName, AbilityName, AbilityName];
  skillProficiencies: [SkillName, SkillName];
};

const ORIGIN_FEAT_DESCRIPTIONS = originFeatDescriptions as Record<
  OriginFeat,
  string
>;

export function getOriginFeatDescription(feat: OriginFeat): string {
  return ORIGIN_FEAT_DESCRIPTIONS[feat];
}

export const BACKGROUND_LIST: BackgroundEntry[] =
  backgroundListData as BackgroundEntry[];

const BACKGROUNDS_BY_KEY = new Map(BACKGROUND_LIST.map((b) => [b.key, b]));

export function getBackgroundIcon(
  background: Background,
  { variant = "BLACK" }: { variant?: "BLACK" | "WHITE" } = {},
): string {
  const entry = BACKGROUNDS_BY_KEY.get(background);
  if (!entry?.icon) {
    return "/race-icons/placeholder.png";
  }
  return resolveIconPath(entry.icon, { variant });
}
