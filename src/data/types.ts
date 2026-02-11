export type { Background } from "./backgrounds";
export type { SkillName } from "./skills";

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

export type CharacterRace =
	| "aasimar"
	| "dragonborn"
	| "dwarf"
	| "elf"
	| "gnome"
	| "goliath"
	| "halfling"
	| "human"
	| "orc"
	| "tiefling";

export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type AbilityScores = Record<AbilityName, number>;

export type DamageType =
	| "slashing"
	| "piercing"
	| "bludgeoning"
	| "fire"
	| "cold"
	| "lightning"
	| "necrotic"
	| "radiant"
	| "force"
	| "poison"
	| "psychic"
	| "thunder"
	| "acid";

export type ActionTiming = "action" | "bonus-action" | "reaction";

export type Action = {
	name: string;
	timing: ActionTiming;
	icon?: string;
	description: string;
	classRestriction?: CharacterClass;
};

export type Spell = {
	name: string;
	level: number; // 0 = cantrip
	school: string;
	castingTime: string;
	range: string;
	components: string;
	duration: string;
	description: string;
	damage?: {
		dice: string;
		type: DamageType;
	};
	icon?: string;
};

export type Equipment = {
	name: string;
	type: "weapon" | "armor" | "shield" | "gear";
	attackBonus?: number;
	damage?: {
		dice: string;
		type: DamageType;
	};
	ac?: number;
	icon?: string;
	properties?: string[];
};

export type Character = {
	id: string;
	name: string;
	race: CharacterRace;
	characterClass: CharacterClass;
	background?: Background;
	level: number;
	abilityScores: AbilityScores;
	hp: { current: number; max: number };
	ac: number;
	proficiencyBonus: number;
	spells: Spell[];
	equipment: Equipment[];
};

export type AppView =
	| { kind: "character-list" }
	| { kind: "character-view"; characterId: string }
	| { kind: "character-creation" };
