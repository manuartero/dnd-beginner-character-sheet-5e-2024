import { describe, expect, it } from "vitest";
import {
  getResourceDefinition,
  getResourceResetOn,
  getResourcesForLevel,
} from "./class-resources";

import type { AbilityScores } from "./abilities";

const DEFAULT_SCORES: AbilityScores = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
};

describe("getResourceDefinition", () => {
  it("resolves a known resource", () => {
    const def = getResourceDefinition("rage");
    expect(def).toBeDefined();
    expect(def.name).toBe("Rage");
    expect(def.id).toBe("rage");
  });
});

describe("getResourceResetOn", () => {
  it("returns short-rest for cleric channel divinity", () => {
    expect(getResourceResetOn("cleric", "channel-divinity")).toBe("short-rest");
  });

  it("returns long-rest for paladin channel divinity (override)", () => {
    expect(getResourceResetOn("paladin", "channel-divinity")).toBe("long-rest");
  });
});

describe("getResourcesForLevel", () => {
  it("returns rage for barbarian level 1", () => {
    const resources = getResourcesForLevel("barbarian", 1, DEFAULT_SCORES);
    expect(resources).toEqual([{ resourceId: "rage", current: 2, max: 2 }]);
  });

  it("returns rage with higher max at barbarian level 3", () => {
    const resources = getResourcesForLevel("barbarian", 3, DEFAULT_SCORES);
    expect(resources).toEqual([{ resourceId: "rage", current: 3, max: 3 }]);
  });

  it("returns second-wind for fighter level 1", () => {
    const resources = getResourcesForLevel("fighter", 1, DEFAULT_SCORES);
    expect(resources).toEqual([
      { resourceId: "second-wind", current: 1, max: 1 },
    ]);
  });

  it("returns empty array for rogue (no resources)", () => {
    const resources = getResourcesForLevel("rogue", 1, DEFAULT_SCORES);
    expect(resources).toEqual([]);
  });

  it("returns empty array for warlock (pact magic handled separately)", () => {
    const resources = getResourcesForLevel("warlock", 1, DEFAULT_SCORES);
    expect(resources).toEqual([]);
  });

  it("returns empty for monk at level 1 (discipline points start at level 2)", () => {
    const resources = getResourcesForLevel("monk", 1, DEFAULT_SCORES);
    expect(resources).toEqual([]);
  });

  it("returns discipline points for monk at level 2", () => {
    const resources = getResourcesForLevel("monk", 2, DEFAULT_SCORES);
    expect(resources).toEqual([
      { resourceId: "discipline-points", current: 2, max: 2 },
    ]);
  });

  it("returns empty for sorcerer at level 1", () => {
    const resources = getResourcesForLevel("sorcerer", 1, DEFAULT_SCORES);
    expect(resources).toEqual([]);
  });

  it("returns sorcery points for sorcerer at level 3", () => {
    const resources = getResourcesForLevel("sorcerer", 3, DEFAULT_SCORES);
    expect(resources).toEqual([
      { resourceId: "sorcery-points", current: 3, max: 3 },
    ]);
  });

  it("uses CHA modifier for bard bardic inspiration", () => {
    const highCha: AbilityScores = { ...DEFAULT_SCORES, cha: 16 };
    const resources = getResourcesForLevel("bard", 1, highCha);
    expect(resources).toEqual([
      { resourceId: "bardic-inspiration", current: 3, max: 3 },
    ]);
  });

  it("enforces minimum 1 for ability-based resources", () => {
    const lowCha: AbilityScores = { ...DEFAULT_SCORES, cha: 8 };
    const resources = getResourcesForLevel("bard", 1, lowCha);
    expect(resources).toEqual([
      { resourceId: "bardic-inspiration", current: 1, max: 1 },
    ]);
  });

  it("returns multiple resources for paladin", () => {
    const resources = getResourcesForLevel("paladin", 3, DEFAULT_SCORES);
    expect(resources).toHaveLength(2);
    expect(resources[0]).toEqual({
      resourceId: "lay-on-hands",
      current: 15,
      max: 15,
    });
    expect(resources[1]).toEqual({
      resourceId: "channel-divinity",
      current: 1,
      max: 1,
    });
  });

  it("filters out paladin channel divinity at level 1 (max 0)", () => {
    const resources = getResourcesForLevel("paladin", 1, DEFAULT_SCORES);
    expect(resources).toHaveLength(1);
    expect(resources[0].resourceId).toBe("lay-on-hands");
  });
});
