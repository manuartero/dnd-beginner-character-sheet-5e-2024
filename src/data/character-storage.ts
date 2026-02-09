import type { Character } from "./types";

const STORAGE_KEY = "dnd-characters";

export function loadCharacters(): Character[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		return JSON.parse(raw) as Character[];
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
