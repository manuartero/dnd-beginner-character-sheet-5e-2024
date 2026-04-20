import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteCharacter,
  loadCharacters,
  saveCharacter,
} from "./character-storage";

import type { Character } from "./character";

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    id: "test-id-1",
    name: "Thorn",
    race: "human",
    characterClass: "fighter",
    level: 1,
    abilityScores: { str: 16, dex: 12, con: 14, int: 8, wis: 10, cha: 10 },
    hp: { current: 12, max: 12 },
    ac: 16,
    proficiencyBonus: 2,
    spells: [],
    equipment: [],
    classResources: [{ resourceId: "second-wind", current: 1, max: 1 }],
    ...overrides,
  };
}

describe("character-storage", () => {
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    const mockStorage = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      length: 0,
      key: vi.fn(() => null),
    };
    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("loadCharacters()", () => {
    it("returns empty characters and zero drops when nothing stored", () => {
      expect(loadCharacters()).toEqual({ characters: [], droppedCount: 0 });
    });

    it("returns parsed characters that match the current schema", () => {
      const chars = [makeCharacter()];
      store["dnd-characters"] = JSON.stringify(chars);
      expect(loadCharacters()).toEqual({
        characters: chars,
        droppedCount: 0,
      });
    });

    it("returns empty characters and zero drops on corrupted JSON", () => {
      store["dnd-characters"] = "not-json{{{";
      expect(loadCharacters()).toEqual({ characters: [], droppedCount: 0 });
    });

    it("drops entries with unknown race and reports the count", () => {
      const bad = { ...makeCharacter(), race: "Half-Dragon" };
      store["dnd-characters"] = JSON.stringify([bad]);
      expect(loadCharacters()).toEqual({ characters: [], droppedCount: 1 });
    });

    it("drops entries with unknown class and reports the count", () => {
      const bad = { ...makeCharacter(), characterClass: "necromancer" };
      store["dnd-characters"] = JSON.stringify([bad]);
      expect(loadCharacters()).toEqual({ characters: [], droppedCount: 1 });
    });

    it("keeps valid entries and drops invalid ones from the same list", () => {
      const good = makeCharacter({ id: "good" });
      const bad = { ...makeCharacter({ id: "bad" }), race: "Half-Dragon" };
      store["dnd-characters"] = JSON.stringify([good, bad]);
      const result = loadCharacters();
      expect(result.characters).toHaveLength(1);
      expect(result.characters[0].id).toBe("good");
      expect(result.droppedCount).toBe(1);
    });
  });

  describe("saveCharacter()", () => {
    it("adds a new character", () => {
      const char = makeCharacter();
      saveCharacter(char);
      expect(loadCharacters().characters).toEqual([char]);
    });

    it("updates an existing character by id", () => {
      const char = makeCharacter();
      saveCharacter(char);
      const updated = { ...char, name: "Thorn the Brave" };
      saveCharacter(updated);
      const { characters } = loadCharacters();
      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe("Thorn the Brave");
    });

    it("adds multiple characters with different ids", () => {
      saveCharacter(makeCharacter({ id: "id-1", name: "Thorn" }));
      saveCharacter(makeCharacter({ id: "id-2", name: "Elara" }));
      expect(loadCharacters().characters).toHaveLength(2);
    });
  });

  describe("deleteCharacter()", () => {
    it("removes a character by id", () => {
      saveCharacter(makeCharacter({ id: "id-1" }));
      saveCharacter(makeCharacter({ id: "id-2" }));
      deleteCharacter("id-1");
      const { characters } = loadCharacters();
      expect(characters).toHaveLength(1);
      expect(characters[0].id).toBe("id-2");
    });

    it("does nothing if id not found", () => {
      saveCharacter(makeCharacter({ id: "id-1" }));
      deleteCharacter("nonexistent");
      expect(loadCharacters().characters).toHaveLength(1);
    });
  });
});
