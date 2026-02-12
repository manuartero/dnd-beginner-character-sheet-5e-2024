import type { CharacterRace } from "src/models/races";
import { RACE_LIST } from "src/models/races";
import type { Character } from "src/models/types";

const STORAGE_KEY = "dnd-characters";

const VALID_RACES: CharacterRace[] = RACE_LIST.map((r) => r.key);

function migrateRace(raw: string): CharacterRace {
  const lower = raw.toLowerCase().trim();
  if (VALID_RACES.includes(lower as CharacterRace)) {
    return lower as CharacterRace;
  }
  return "human";
}

function migrateCharacter(raw: Record<string, unknown>): Character {
  return {
    ...(raw as unknown as Character),
    race: migrateRace(String(raw.race ?? "human")),
  };
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
