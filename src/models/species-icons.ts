import type { CharacterRace } from "src/models/races";

const SPECIES_ICONS: Record<CharacterRace, string> = {
  aasimar: "/race-icons/aasimar.jpeg",
  dragonborn: "/race-icons/dragonborn.jpeg",
  dwarf: "/race-icons/dwarf.jpeg",
  elf: "/race-icons/elf.jpeg",
  gnome: "/race-icons/gnome.jpeg",
  goliath: "/race-icons/goliath.png",
  halfling: "/race-icons/halfling.jpeg",
  human: "/race-icons/human.jpeg",
  orc: "/race-icons/orc.png",
  tiefling: "/race-icons/tiefling.jpeg",
};

export function getSpeciesIcon(race: CharacterRace): string {
  return SPECIES_ICONS[race];
}
