import { classes } from "src/models/class/classes";
import { species } from "src/models/origin/species";

import type { Character } from "src/character/character";

const STORAGE_KEY = "dnd-characters";

type ValidationResult =
  | { ok: true; character: Character }
  | { ok: false; reason: string };

function validateCharacter(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "not an object" };
  }
  const c = raw as Partial<Character>;
  if (typeof c.id !== "string") return { ok: false, reason: "missing id" };
  if (typeof c.name !== "string") return { ok: false, reason: "missing name" };
  if (typeof c.level !== "number")
    return { ok: false, reason: "missing level" };
  if (!c.race || !species.find({ id: c.race })) {
    return { ok: false, reason: `unknown race: ${c.race}` };
  }
  if (!c.characterClass || !classes.find({ id: c.characterClass })) {
    return { ok: false, reason: `unknown class: ${c.characterClass}` };
  }
  if (!c.abilityScores) return { ok: false, reason: "missing abilityScores" };
  if (!c.hp) return { ok: false, reason: "missing hp" };
  if (!Array.isArray(c.spells)) return { ok: false, reason: "missing spells" };
  if (!Array.isArray(c.equipment)) {
    return { ok: false, reason: "missing equipment" };
  }
  if (!Array.isArray(c.classResources)) {
    return { ok: false, reason: "missing classResources" };
  }
  return { ok: true, character: c as Character };
}

export type LoadResult = {
  characters: Character[];
  corrupted: boolean;
  unavailable: boolean;
};

export function loadCharacters(): LoadResult {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    console.warn("localStorage read failed", e);
    return { characters: [], corrupted: false, unavailable: true };
  }
  if (!raw) return { characters: [], corrupted: false, unavailable: false };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { characters: [], corrupted: true, unavailable: false };
  }
  if (!Array.isArray(parsed)) {
    return { characters: [], corrupted: true, unavailable: false };
  }
  const characters: Character[] = [];
  let corrupted = false;
  for (const entry of parsed) {
    const result = validateCharacter(entry);
    if (result.ok) {
      characters.push(result.character);
    } else {
      corrupted = true;
      const id =
        entry && typeof entry === "object" && "id" in entry
          ? (entry as { id: unknown }).id
          : "<no-id>";
      console.warn(
        `character-storage: dropping invalid entry id=${String(id)}: ${result.reason}`,
      );
    }
  }
  return { characters, corrupted, unavailable: false };
}

export function saveCharacter(character: Character): void {
  const { characters } = loadCharacters();
  const index = characters.findIndex((c) => c.id === character.id);
  if (index >= 0) {
    characters[index] = character;
  } else {
    characters.push(character);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch (e) {
    console.warn("localStorage write failed", e);
    throw e;
  }
}

export function deleteCharacter(id: string): void {
  const { characters } = loadCharacters();
  const filtered = characters.filter((c) => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn("localStorage write failed", e);
    throw e;
  }
}
