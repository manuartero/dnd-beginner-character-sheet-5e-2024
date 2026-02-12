import type { CharacterRace } from "src/models/races";
import speciesDetailsData from "../data/species-details.json";

export type SpeciesDetails = {
  size: string;
  speed: string;
  traits: string[];
  description: string;
};

export const SPECIES_DETAILS = speciesDetailsData as Record<
  CharacterRace,
  SpeciesDetails
>;
