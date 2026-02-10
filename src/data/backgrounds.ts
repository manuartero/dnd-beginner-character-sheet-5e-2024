import type { AbilityName } from "./types";

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

interface BackgroundEntry {
	key: Background;
	label: string;
	originFeat: OriginFeat;
	originFeatLabel: string;
	abilityOptions: [AbilityName, AbilityName, AbilityName];
}

export const BACKGROUND_LIST: BackgroundEntry[] = [
	{
		key: "acolyte",
		label: "Acolyte",
		originFeat: "magic-initiate-cleric",
		originFeatLabel: "Magic Initiate (Cleric)",
		abilityOptions: ["int", "wis", "cha"],
	},
	{
		key: "artisan",
		label: "Artisan",
		originFeat: "crafter",
		originFeatLabel: "Crafter",
		abilityOptions: ["str", "dex", "int"],
	},
	{
		key: "charlatan",
		label: "Charlatan",
		originFeat: "skilled",
		originFeatLabel: "Skilled",
		abilityOptions: ["dex", "con", "cha"],
	},
	{
		key: "criminal",
		label: "Criminal",
		originFeat: "alert",
		originFeatLabel: "Alert",
		abilityOptions: ["dex", "con", "int"],
	},
	{
		key: "entertainer",
		label: "Entertainer",
		originFeat: "musician",
		originFeatLabel: "Musician",
		abilityOptions: ["str", "dex", "cha"],
	},
	{
		key: "farmer",
		label: "Farmer",
		originFeat: "tough",
		originFeatLabel: "Tough",
		abilityOptions: ["str", "con", "wis"],
	},
	{
		key: "guard",
		label: "Guard",
		originFeat: "alert",
		originFeatLabel: "Alert",
		abilityOptions: ["str", "con", "wis"],
	},
	{
		key: "guide",
		label: "Guide",
		originFeat: "magic-initiate-druid",
		originFeatLabel: "Magic Initiate (Druid)",
		abilityOptions: ["dex", "con", "wis"],
	},
	{
		key: "hermit",
		label: "Hermit",
		originFeat: "healer",
		originFeatLabel: "Healer",
		abilityOptions: ["con", "wis", "cha"],
	},
	{
		key: "merchant",
		label: "Merchant",
		originFeat: "lucky",
		originFeatLabel: "Lucky",
		abilityOptions: ["con", "int", "cha"],
	},
	{
		key: "noble",
		label: "Noble",
		originFeat: "skilled",
		originFeatLabel: "Skilled",
		abilityOptions: ["str", "int", "cha"],
	},
	{
		key: "sage",
		label: "Sage",
		originFeat: "magic-initiate-wizard",
		originFeatLabel: "Magic Initiate (Wizard)",
		abilityOptions: ["con", "int", "wis"],
	},
	{
		key: "sailor",
		label: "Sailor",
		originFeat: "tavern-brawler",
		originFeatLabel: "Tavern Brawler",
		abilityOptions: ["str", "dex", "con"],
	},
	{
		key: "scribe",
		label: "Scribe",
		originFeat: "skilled",
		originFeatLabel: "Skilled",
		abilityOptions: ["dex", "int", "wis"],
	},
	{
		key: "soldier",
		label: "Soldier",
		originFeat: "savage-attacker",
		originFeatLabel: "Savage Attacker",
		abilityOptions: ["str", "dex", "con"],
	},
	{
		key: "wayfarer",
		label: "Wayfarer",
		originFeat: "lucky",
		originFeatLabel: "Lucky",
		abilityOptions: ["dex", "wis", "cha"],
	},
];
