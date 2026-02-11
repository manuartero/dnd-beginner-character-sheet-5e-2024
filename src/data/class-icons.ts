import type { CharacterClass } from "src/data/classes";

const CLASS_ICONS: Record<CharacterClass, string> = {
  barbarian: "/class-icons/barbarian.jpeg",
  bard: "/class-icons/bard.jpeg",
  cleric: "/class-icons/cleric.jpeg",
  druid: "/class-icons/druid.jpeg",
  fighter: "/class-icons/fighter.jpeg",
  monk: "/class-icons/monk.jpeg",
  paladin: "/class-icons/paladin.jpeg",
  ranger: "/class-icons/ranger.jpeg",
  rogue: "/class-icons/rogue.jpeg",
  sorcerer: "/class-icons/sorcerer.jpeg",
  warlock: "/class-icons/warlock.jpeg",
  wizard: "/class-icons/wizard.jpeg",
};

export function getClassIcon(characterClass: CharacterClass): string {
  return CLASS_ICONS[characterClass];
}
