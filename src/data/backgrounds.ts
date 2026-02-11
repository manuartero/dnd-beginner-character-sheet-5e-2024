import type { AbilityName } from "src/data/abilities";
import type { SkillName } from "src/data/skills";
import { SKILLS } from "src/data/skills";

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

const ORIGIN_FEAT_DESCRIPTIONS: Record<OriginFeat, string> = {
  alert:
    "Add Proficiency Bonus to Initiative. Swap Initiative with a willing ally.",
  crafter:
    "Proficiency with 3 Artisan's Tools. 20% discount on nonmagical items. Craft temporary items during a Short Rest.",
  healer:
    "Use a Healer's Kit to let a creature spend Hit Dice to heal, adding your Proficiency Bonus. Reroll 1s.",
  lucky:
    "Gain Luck Points equal to Proficiency Bonus after a Long Rest. Spend to gain Advantage or impose Disadvantage on attacks against you.",
  "magic-initiate-cleric":
    "Learn 2 Cleric cantrips and one 1st-level Cleric spell. Cast the spell once per Long Rest without a spell slot.",
  "magic-initiate-druid":
    "Learn 2 Druid cantrips and one 1st-level Druid spell. Cast the spell once per Long Rest without a spell slot.",
  "magic-initiate-wizard":
    "Learn 2 Wizard cantrips and one 1st-level Wizard spell. Cast the spell once per Long Rest without a spell slot.",
  musician:
    "Proficiency with 3 musical instruments. After a rest, grant Heroic Inspiration to allies (up to Proficiency Bonus).",
  "savage-attacker":
    "Once per turn on a weapon hit, roll damage dice twice and use either result.",
  skilled: "Gain proficiency in any 3 skills or tools.",
  "tavern-brawler":
    "Unarmed Strikes deal 1d4 + STR mod. Proficiency with improvised weapons. Reroll 1s on damage. Push target 5 ft on hit.",
  tough: "HP max increases by 2 per character level.",
};

export function getOriginFeatDescription(feat: OriginFeat): string {
  return ORIGIN_FEAT_DESCRIPTIONS[feat];
}

export function getSkillLabel(skill: SkillName): string {
  const entry = SKILLS.find((s) => s.name === skill);
  return entry ? entry.label : skill;
}

export const BACKGROUND_LIST: BackgroundEntry[] = [
  {
    key: "acolyte",
    label: "Acolyte",
    originFeat: "magic-initiate-cleric",
    originFeatLabel: "Magic Initiate (Cleric)",
    abilityOptions: ["int", "wis", "cha"],
    skillProficiencies: ["insight", "religion"],
  },
  {
    key: "artisan",
    label: "Artisan",
    originFeat: "crafter",
    originFeatLabel: "Crafter",
    abilityOptions: ["str", "dex", "int"],
    skillProficiencies: ["investigation", "persuasion"],
  },
  {
    key: "charlatan",
    label: "Charlatan",
    originFeat: "skilled",
    originFeatLabel: "Skilled",
    abilityOptions: ["dex", "con", "cha"],
    skillProficiencies: ["deception", "sleight-of-hand"],
  },
  {
    key: "criminal",
    label: "Criminal",
    originFeat: "alert",
    originFeatLabel: "Alert",
    abilityOptions: ["dex", "con", "int"],
    skillProficiencies: ["sleight-of-hand", "stealth"],
  },
  {
    key: "entertainer",
    label: "Entertainer",
    originFeat: "musician",
    originFeatLabel: "Musician",
    abilityOptions: ["str", "dex", "cha"],
    skillProficiencies: ["acrobatics", "performance"],
  },
  {
    key: "farmer",
    label: "Farmer",
    originFeat: "tough",
    originFeatLabel: "Tough",
    abilityOptions: ["str", "con", "wis"],
    skillProficiencies: ["animal-handling", "nature"],
  },
  {
    key: "guard",
    label: "Guard",
    originFeat: "alert",
    originFeatLabel: "Alert",
    abilityOptions: ["str", "con", "wis"],
    skillProficiencies: ["athletics", "perception"],
  },
  {
    key: "guide",
    label: "Guide",
    originFeat: "magic-initiate-druid",
    originFeatLabel: "Magic Initiate (Druid)",
    abilityOptions: ["dex", "con", "wis"],
    skillProficiencies: ["stealth", "survival"],
  },
  {
    key: "hermit",
    label: "Hermit",
    originFeat: "healer",
    originFeatLabel: "Healer",
    abilityOptions: ["con", "wis", "cha"],
    skillProficiencies: ["medicine", "religion"],
  },
  {
    key: "merchant",
    label: "Merchant",
    originFeat: "lucky",
    originFeatLabel: "Lucky",
    abilityOptions: ["con", "int", "cha"],
    skillProficiencies: ["animal-handling", "persuasion"],
  },
  {
    key: "noble",
    label: "Noble",
    originFeat: "skilled",
    originFeatLabel: "Skilled",
    abilityOptions: ["str", "int", "cha"],
    skillProficiencies: ["history", "persuasion"],
  },
  {
    key: "sage",
    label: "Sage",
    originFeat: "magic-initiate-wizard",
    originFeatLabel: "Magic Initiate (Wizard)",
    abilityOptions: ["con", "int", "wis"],
    skillProficiencies: ["arcana", "history"],
  },
  {
    key: "sailor",
    label: "Sailor",
    originFeat: "tavern-brawler",
    originFeatLabel: "Tavern Brawler",
    abilityOptions: ["str", "dex", "con"],
    skillProficiencies: ["acrobatics", "perception"],
  },
  {
    key: "scribe",
    label: "Scribe",
    originFeat: "skilled",
    originFeatLabel: "Skilled",
    abilityOptions: ["dex", "int", "wis"],
    skillProficiencies: ["investigation", "perception"],
  },
  {
    key: "soldier",
    label: "Soldier",
    originFeat: "savage-attacker",
    originFeatLabel: "Savage Attacker",
    abilityOptions: ["str", "dex", "con"],
    skillProficiencies: ["athletics", "intimidation"],
  },
  {
    key: "wayfarer",
    label: "Wayfarer",
    originFeat: "lucky",
    originFeatLabel: "Lucky",
    abilityOptions: ["dex", "wis", "cha"],
    skillProficiencies: ["insight", "stealth"],
  },
];
