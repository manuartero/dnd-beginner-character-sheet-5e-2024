import type { CharacterClass } from "./types";

const CLASS_ICONS: Record<CharacterClass, string> = {
	fighter: "/class-icons/fighter.png",
	rogue: "/class-icons/rogue.png",
	wizard: "/class-icons/wizard.png",
};

// Full dictionary for all 12 D&D 5e classes (available as we expand)
const ALL_CLASS_ICONS: Record<string, string> = {
	barbarian: "/class-icons/barbarian.png",
	bard: "/class-icons/bard.png",
	cleric: "/class-icons/cleric.png",
	druid: "/class-icons/druid.png",
	fighter: "/class-icons/fighter.png",
	monk: "/class-icons/monk.png",
	paladin: "/class-icons/paladin.png",
	ranger: "/class-icons/ranger.png",
	rogue: "/class-icons/rogue.png",
	sorcerer: "/class-icons/sorcerer.png",
	warlock: "/class-icons/warlock.png",
	wizard: "/class-icons/wizard.png",
};

export function getClassIcon(characterClass: CharacterClass): string {
	return CLASS_ICONS[characterClass];
}

export { ALL_CLASS_ICONS };
