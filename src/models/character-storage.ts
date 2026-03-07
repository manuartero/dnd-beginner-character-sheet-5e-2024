import { getResourcesForLevel } from "./class-resources";
import { GOLD_ICON } from "./equipment";
import { SPECIES_LIST } from "./species";

import type { AbilityScores } from "./abilities";
import type { Character } from "./character";
import type { CharacterResource } from "./class-resources";
import type { CharacterClass } from "./classes";
import type { Equipment } from "./equipment";
import type { Species } from "./species";

const STORAGE_KEY = "dnd-characters";

const VALID_SPECIES: Species[] = SPECIES_LIST.map((r) => r.key);

function migrateRace(raw: string): Species {
  const lower = raw.toLowerCase().trim();
  if (VALID_SPECIES.includes(lower as Species)) {
    return lower as Species;
  }
  return "human";
}

function migrateEquipment(equipment: Equipment[]): Equipment[] {
  return equipment.map((item) => {
    if (item.name === "Gp" && item.type === "gear") {
      return {
        name: "Gold",
        type: "money",
        icon: GOLD_ICON,
        quantity: item.quantity ?? 0,
      };
    }
    return item;
  });
}

function migrateClassResources(
  existing: CharacterResource[] | undefined,
  characterClass: CharacterClass,
  level: number,
  abilityScores: AbilityScores,
): CharacterResource[] {
  if (Array.isArray(existing) && existing.length > 0) return existing;
  return getResourcesForLevel(characterClass, level, abilityScores);
}

function migrateCharacter(raw: Record<string, unknown>): Character {
  const character = {
    ...(raw as unknown as Character),
    race: migrateRace(String(raw.race ?? "human")),
  };
  if (Array.isArray(character.equipment)) {
    character.equipment = migrateEquipment(character.equipment);
  }
  character.classResources = migrateClassResources(
    character.classResources,
    character.characterClass,
    character.level,
    character.abilityScores,
  );
  return character;
}

export function loadCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    return parsed.map(migrateCharacter);
  } catch {
    return [];
  }
}

export function saveCharacter(character: Character): void {
  const characters = loadCharacters();
  const index = characters.findIndex((c) => c.id === character.id);
  if (index >= 0) {
    characters[index] = character;
  } else {
    characters.push(character);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

export function deleteCharacter(id: string): void {
  const characters = loadCharacters().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}
