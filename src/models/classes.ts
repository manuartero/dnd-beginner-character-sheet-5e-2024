import classDetailsData from "src/data/class-details.json";
import type { AbilityName } from "src/models/abilities";

export type CharacterClass =
	| "barbarian"
	| "bard"
	| "cleric"
	| "druid"
	| "fighter"
	| "monk"
	| "paladin"
	| "ranger"
	| "rogue"
	| "sorcerer"
	| "warlock"
	| "wizard";

export type ClassDetails = {
	label: string;
	hitDie: string;
	primaryAbilities: AbilityName[];
	saves: string;
	description: string;
};

export const CLASS_DETAILS: Record<CharacterClass, ClassDetails> =
	classDetailsData as Record<CharacterClass, ClassDetails>;

export const CLASS_LIST: { key: CharacterClass; label: string }[] =
	Object.entries(CLASS_DETAILS).map(([key, value]) => ({
		key: key as CharacterClass,
		label: value.label,
	}));
