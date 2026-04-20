import speciesDetailsData from "src/data/origin/species-details.json";

export type Species =
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

export type SpeciesDetails = {
  label: string;
  icon: string;
  size: string;
  speed: string;
  traits: string[];
  description: string;
};

const DATA = speciesDetailsData as Record<Species, SpeciesDetails>;

export const species = {
  get(id: Species): SpeciesDetails {
    return DATA[id];
  },
  find(id: string): SpeciesDetails | undefined {
    return (DATA as Record<string, SpeciesDetails>)[id];
  },
  list(): { id: Species; details: SpeciesDetails }[] {
    return Object.entries(DATA).map(([id, details]) => ({
      id: id as Species,
      details,
    }));
  },
};
