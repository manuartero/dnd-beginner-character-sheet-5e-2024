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
  id: Species;
  label: string;
  icon: string;
  size: string;
  speed: string;
  traits: string[];
  description: string;
};

const RAW = speciesDetailsData as Record<Species, Omit<SpeciesDetails, "id">>;
const DATA: SpeciesDetails[] = Object.entries(RAW).map(([id, v]) => ({
  id: id as Species,
  ...v,
}));
const BY_ID = new Map(DATA.map((s) => [s.id, s]));

export const species = {
  get({ id }: { id: Species }): SpeciesDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown species: ${id}`);
    return found;
  },
  find({ id }: { id: string }): SpeciesDetails | undefined {
    return BY_ID.get(id as Species);
  },
  list(): SpeciesDetails[] {
    return DATA;
  },
};
