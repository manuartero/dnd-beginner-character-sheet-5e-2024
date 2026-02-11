import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteCharacter,
  loadCharacters,
  saveCharacter,
} from "src/data/character-storage";
import type { Character } from "src/data/types";

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

  describe("loadCharacters", () => {
    it("returns empty array when nothing stored", () => {
      expect(loadCharacters()).toEqual([]);
    });

    it("returns parsed characters", () => {
      const chars = [makeCharacter()];
      store["dnd-characters"] = JSON.stringify(chars);
      expect(loadCharacters()).toEqual(chars);
    });

    it("returns empty array on corrupted data", () => {
      store["dnd-characters"] = "not-json{{{";
      expect(loadCharacters()).toEqual([]);
    });

    it("migrates old string race to lowercase", () => {
      const oldChar = { ...makeCharacter(), race: "Human" };
      store["dnd-characters"] = JSON.stringify([oldChar]);
      const loaded = loadCharacters();
      expect(loaded[0].race).toBe("human");
    });

    it("migrates unknown race to human", () => {
      const oldChar = { ...makeCharacter(), race: "Half-Dragon" };
      store["dnd-characters"] = JSON.stringify([oldChar]);
      const loaded = loadCharacters();
      expect(loaded[0].race).toBe("human");
    });
  });

  describe("saveCharacter", () => {
    it("adds a new character", () => {
      const char = makeCharacter();
      saveCharacter(char);
      expect(loadCharacters()).toEqual([char]);
    });

    it("updates an existing character by id", () => {
      const char = makeCharacter();
      saveCharacter(char);
      const updated = { ...char, name: "Thorn the Brave" };
      saveCharacter(updated);
      const loaded = loadCharacters();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].name).toBe("Thorn the Brave");
    });

    it("adds multiple characters with different ids", () => {
      saveCharacter(makeCharacter({ id: "id-1", name: "Thorn" }));
      saveCharacter(makeCharacter({ id: "id-2", name: "Elara" }));
      expect(loadCharacters()).toHaveLength(2);
    });
  });

  describe("deleteCharacter", () => {
    it("removes a character by id", () => {
      saveCharacter(makeCharacter({ id: "id-1" }));
      saveCharacter(makeCharacter({ id: "id-2" }));
      deleteCharacter("id-1");
      const loaded = loadCharacters();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].id).toBe("id-2");
    });

    it("does nothing if id not found", () => {
      saveCharacter(makeCharacter({ id: "id-1" }));
      deleteCharacter("nonexistent");
      expect(loadCharacters()).toHaveLength(1);
    });
  });
});
