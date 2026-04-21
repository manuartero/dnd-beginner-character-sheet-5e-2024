import { classes } from "src/models/class/classes";
import { species } from "src/models/origin/species";

import type { Character } from "src/character/character";

const STORAGE_KEY = "dnd-characters";

function isValidCharacter(raw: unknown): raw is Character {
  if (!raw || typeof raw !== "object") return false;
  const c = raw as Partial<Character>;
  return (
    typeof c.id === "string" &&
    typeof c.name === "string" &&
    typeof c.level === "number" &&
    !!c.race &&
    species.find({ id: c.race }) !== undefined &&
    !!c.characterClass &&
    classes.find({ id: c.characterClass }) !== undefined &&
    !!c.abilityScores &&
    !!c.hp &&
    Array.isArray(c.spells) &&
    Array.isArray(c.equipment) &&
    Array.isArray(c.classResources)
  );
}

export type LoadResult = {
  characters: Character[];
  corrupted: boolean;
};

export function loadCharacters(): LoadResult {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { characters: [], corrupted: false };
  }
  if (!raw) return { characters: [], corrupted: false };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { characters: [], corrupted: true };
  }
  if (!Array.isArray(parsed)) {
    return { characters: [], corrupted: true };
  }
  const characters = parsed.filter(isValidCharacter);
  return { characters, corrupted: characters.length < parsed.length };
}

export function saveCharacter(character: Character): void {
  const { characters } = loadCharacters();
  const index = characters.findIndex((c) => c.id === character.id);
  if (index >= 0) {
    characters[index] = character;
  } else {
    characters.push(character);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

export function deleteCharacter(id: string): void {
  const { characters } = loadCharacters();
  const filtered = characters.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
