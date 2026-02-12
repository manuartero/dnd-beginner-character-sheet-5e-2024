import type { AbilityName } from "src/data/abilities";
import type { SkillName } from "src/data/skills";
import { SKILLS } from "src/data/skills";
import backgroundListData from "../../public/data/background-list.json";
import originFeatDescriptions from "../../public/data/origin-feat-descriptions.json";

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

export function getSkillLabel(skill: SkillName): string {
  const entry = SKILLS.find((s) => s.name === skill);
  return entry ? entry.label : skill;
}

export const BACKGROUND_LIST: BackgroundEntry[] =
  backgroundListData as BackgroundEntry[];
