import speciesDetailsData from "src/data/species-details.json";

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

export const SPECIES_DETAILS = speciesDetailsData as Record<
	Species,
	SpeciesDetails
>;

export const SPECIES_LIST: { key: Species; label: string }[] =
	Object.entries(SPECIES_DETAILS).map(([key, value]) => ({
		key: key as Species,
		label: value.label,
	}));

export function getSpeciesIcon(species: Species): string {
	return SPECIES_DETAILS[species].icon;
}
