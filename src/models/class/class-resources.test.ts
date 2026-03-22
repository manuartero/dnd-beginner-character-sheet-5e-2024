import { describe, expect, it } from "vitest";
import {
  applyRest,
  getResourceDefinition,
  getResourceResetOn,
  getResourcesForLevel,
} from "./class-resources";

import type { AbilityScores } from "src/models/common/abilities";
import type { CharacterResource } from "./class-resources";

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

  it("returns pact magic slot for warlock level 1", () => {
    const resources = getResourcesForLevel("warlock", 1, DEFAULT_SCORES);
    expect(resources).toEqual([
      { resourceId: "pact-magic-slot", current: 1, max: 1 },
    ]);
  });

  it("returns 2 pact magic slots for warlock level 2", () => {
    const resources = getResourcesForLevel("warlock", 2, DEFAULT_SCORES);
    expect(resources).toEqual([
      { resourceId: "pact-magic-slot", current: 2, max: 2 },
    ]);
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

  it("returns only spell slots for sorcerer at level 1 (sorcery points start at 0)", () => {
    const resources = getResourcesForLevel("sorcerer", 1, DEFAULT_SCORES);
    expect(resources).toEqual([
      { resourceId: "spell-slot-1st", current: 2, max: 2 },
    ]);
  });

  it("returns sorcery points and spell slots for sorcerer at level 3", () => {
    const resources = getResourcesForLevel("sorcerer", 3, DEFAULT_SCORES);
    const ids = resources.map((r) => r.resourceId);
    expect(ids).toContain("sorcery-points");
    expect(ids).toContain("spell-slot-1st");
    expect(ids).toContain("spell-slot-2nd");
  });

  it("uses CHA modifier for bard bardic inspiration", () => {
    const highCha: AbilityScores = { ...DEFAULT_SCORES, cha: 16 };
    const resources = getResourcesForLevel("bard", 1, highCha);
    expect(resources[0]).toEqual({
      resourceId: "bardic-inspiration",
      current: 3,
      max: 3,
    });
  });

  it("enforces minimum 1 for ability-based resources", () => {
    const lowCha: AbilityScores = { ...DEFAULT_SCORES, cha: 8 };
    const resources = getResourcesForLevel("bard", 1, lowCha);
    expect(resources[0]).toEqual({
      resourceId: "bardic-inspiration",
      current: 1,
      max: 1,
    });
  });

  it("returns multiple resources for paladin at level 3", () => {
    const resources = getResourcesForLevel("paladin", 3, DEFAULT_SCORES);
    const ids = resources.map((r) => r.resourceId);
    expect(ids).toContain("lay-on-hands");
    expect(ids).toContain("channel-divinity");
    expect(ids).toContain("spell-slot-1st");
  });

  it("filters out paladin channel divinity and spell slots at level 1 (max 0)", () => {
    const resources = getResourcesForLevel("paladin", 1, DEFAULT_SCORES);
    expect(resources).toHaveLength(1);
    expect(resources[0].resourceId).toBe("lay-on-hands");
  });

  it("returns spell slots for paladin at level 2 (half caster)", () => {
    const resources = getResourcesForLevel("paladin", 2, DEFAULT_SCORES);
    const ids = resources.map((r) => r.resourceId);
    expect(ids).toContain("spell-slot-1st");
    const slot = resources.find((r) => r.resourceId === "spell-slot-1st");
    expect(slot).toEqual({ resourceId: "spell-slot-1st", current: 2, max: 2 });
  });
});

describe("spell slot progressions", () => {
  it("wizard level 1: 2 first-level slots, no second-level", () => {
    const resources = getResourcesForLevel("wizard", 1, DEFAULT_SCORES);
    const slot1 = resources.find((r) => r.resourceId === "spell-slot-1st");
    const slot2 = resources.find((r) => r.resourceId === "spell-slot-2nd");
    expect(slot1).toEqual({ resourceId: "spell-slot-1st", current: 2, max: 2 });
    expect(slot2).toBeUndefined();
  });

  it("wizard level 3: 4 first-level slots, 2 second-level slots", () => {
    const resources = getResourcesForLevel("wizard", 3, DEFAULT_SCORES);
    const slot1 = resources.find((r) => r.resourceId === "spell-slot-1st");
    const slot2 = resources.find((r) => r.resourceId === "spell-slot-2nd");
    expect(slot1).toEqual({ resourceId: "spell-slot-1st", current: 4, max: 4 });
    expect(slot2).toEqual({ resourceId: "spell-slot-2nd", current: 2, max: 2 });
  });

  it("wizard level 4: 4 first-level, 3 second-level", () => {
    const resources = getResourcesForLevel("wizard", 4, DEFAULT_SCORES);
    const slot1 = resources.find((r) => r.resourceId === "spell-slot-1st");
    const slot2 = resources.find((r) => r.resourceId === "spell-slot-2nd");
    expect(slot1?.max).toBe(4);
    expect(slot2?.max).toBe(3);
  });

  it("all full casters share the same slot progression", () => {
    const fullCasters = [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "wizard",
    ] as const;
    for (const cls of fullCasters) {
      const resources = getResourcesForLevel(cls, 3, DEFAULT_SCORES);
      const slot1 = resources.find((r) => r.resourceId === "spell-slot-1st");
      const slot2 = resources.find((r) => r.resourceId === "spell-slot-2nd");
      expect(slot1?.max, `${cls} 1st-level slots at level 3`).toBe(4);
      expect(slot2?.max, `${cls} 2nd-level slots at level 3`).toBe(2);
    }
  });

  it("half casters (ranger) get no slots at level 1, slots at level 2", () => {
    const lvl1 = getResourcesForLevel("ranger", 1, DEFAULT_SCORES);
    expect(lvl1.find((r) => r.resourceId === "spell-slot-1st")).toBeUndefined();

    const lvl2 = getResourcesForLevel("ranger", 2, DEFAULT_SCORES);
    const slot = lvl2.find((r) => r.resourceId === "spell-slot-1st");
    expect(slot?.max).toBe(2);
  });

  it("warlock pact magic resets on short rest", () => {
    expect(getResourceResetOn("warlock", "pact-magic-slot")).toBe("short-rest");
  });
});

function res(
  resourceId: string,
  current: number,
  max: number,
): CharacterResource {
  return { resourceId, current, max };
}

describe("applyRest", () => {
  it("short rest resets only short-rest resources (fighter)", () => {
    const resources = [res("second-wind", 0, 1)];
    const result = applyRest("short-rest", resources, "fighter");
    expect(result[0].current).toBe(1);
  });

  it("short rest does not reset long-rest resources (barbarian)", () => {
    const resources = [res("rage", 0, 3)];
    const result = applyRest("short-rest", resources, "barbarian");
    expect(result[0].current).toBe(0);
  });

  it("short rest resets short-rest but not long-rest (cleric)", () => {
    const resources = [
      res("channel-divinity", 0, 1),
      res("spell-slot-1st", 0, 2),
    ];
    const result = applyRest("short-rest", resources, "cleric");
    expect(
      result.find((r) => r.resourceId === "channel-divinity")?.current,
    ).toBe(1);
    expect(result.find((r) => r.resourceId === "spell-slot-1st")?.current).toBe(
      0,
    );
  });

  it("long rest resets all resources regardless of type", () => {
    const resources = [
      res("channel-divinity", 0, 1),
      res("spell-slot-1st", 0, 2),
    ];
    const result = applyRest("long-rest", resources, "cleric");
    expect(
      result.find((r) => r.resourceId === "channel-divinity")?.current,
    ).toBe(1);
    expect(result.find((r) => r.resourceId === "spell-slot-1st")?.current).toBe(
      2,
    );
  });

  it("does not mutate resources already at max", () => {
    const resources = [res("second-wind", 1, 1)];
    const result = applyRest("short-rest", resources, "fighter");
    expect(result[0].current).toBe(1);
  });
});
