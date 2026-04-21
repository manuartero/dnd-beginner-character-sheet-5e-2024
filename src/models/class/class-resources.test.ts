import {
  classResources,
  resolveResourceResetOn,
  resolveResourcesForLevel,
} from "./class-resources";

import type { AbilityScores } from "src/models/common/abilities";

const DEFAULT_SCORES: AbilityScores = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
};

describe("classResources.get()", () => {
  it("returns a definition for a known resource", () => {
    const def = classResources.get({ id: "rage" });
    expect(def.id).toBe("rage");
    expect(def.name).toBe("Rage");
  });

  it("throws on unknown resource", () => {
    expect(() => classResources.get({ id: "mana" })).toThrow(
      /Unknown resource/,
    );
  });
});

describe("classResources.find()", () => {
  it("returns a definition for a known resource", () => {
    expect(classResources.find({ id: "second-wind" })?.name).toBe(
      "Second Wind",
    );
  });

  it("returns undefined for unknown resource", () => {
    expect(classResources.find({ id: "mana" })).toBeUndefined();
  });
});

describe("classResources.list()", () => {
  it("returns every catalogued resource exactly once", () => {
    const ids = classResources.list().map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("rage");
    expect(ids).toContain("channel-divinity");
  });
});

describe("resolveResourceResetOn", () => {
  it("returns short-rest for cleric channel divinity", () => {
    expect(resolveResourceResetOn("cleric", "channel-divinity")).toBe(
      "short-rest",
    );
  });

  it("returns long-rest for paladin channel divinity (override)", () => {
    expect(resolveResourceResetOn("paladin", "channel-divinity")).toBe(
      "long-rest",
    );
  });

  it("returns short-rest for warlock pact magic", () => {
    expect(resolveResourceResetOn("warlock", "pact-magic-slot")).toBe(
      "short-rest",
    );
  });
});

describe("resolveResourcesForLevel", () => {
  it("returns rage for barbarian level 1", () => {
    expect(resolveResourcesForLevel("barbarian", 1, DEFAULT_SCORES)).toEqual([
      { resourceId: "rage", current: 2, max: 2 },
    ]);
  });

  it("returns rage with higher max at barbarian level 3", () => {
    expect(resolveResourcesForLevel("barbarian", 3, DEFAULT_SCORES)).toEqual([
      { resourceId: "rage", current: 3, max: 3 },
    ]);
  });

  it("returns second-wind for fighter level 1", () => {
    expect(resolveResourcesForLevel("fighter", 1, DEFAULT_SCORES)).toEqual([
      { resourceId: "second-wind", current: 1, max: 1 },
    ]);
  });

  it("returns empty array for rogue (no resources)", () => {
    expect(resolveResourcesForLevel("rogue", 1, DEFAULT_SCORES)).toEqual([]);
  });

  it("returns pact magic slot for warlock level 1", () => {
    expect(resolveResourcesForLevel("warlock", 1, DEFAULT_SCORES)).toEqual([
      { resourceId: "pact-magic-slot", current: 1, max: 1 },
    ]);
  });

  it("returns 2 pact magic slots for warlock level 2", () => {
    expect(resolveResourcesForLevel("warlock", 2, DEFAULT_SCORES)).toEqual([
      { resourceId: "pact-magic-slot", current: 2, max: 2 },
    ]);
  });

  it("returns empty for monk at level 1 (discipline points start at level 2)", () => {
    expect(resolveResourcesForLevel("monk", 1, DEFAULT_SCORES)).toEqual([]);
  });

  it("returns discipline points for monk at level 2", () => {
    expect(resolveResourcesForLevel("monk", 2, DEFAULT_SCORES)).toEqual([
      { resourceId: "discipline-points", current: 2, max: 2 },
    ]);
  });

  it("returns only spell slots for sorcerer at level 1 (sorcery points start at 0)", () => {
    expect(resolveResourcesForLevel("sorcerer", 1, DEFAULT_SCORES)).toEqual([
      { resourceId: "spell-slot-1st", current: 2, max: 2 },
    ]);
  });

  it("returns sorcery points and spell slots for sorcerer at level 3", () => {
    const ids = resolveResourcesForLevel("sorcerer", 3, DEFAULT_SCORES).map(
      (r) => r.resourceId,
    );
    expect(ids).toContain("sorcery-points");
    expect(ids).toContain("spell-slot-1st");
    expect(ids).toContain("spell-slot-2nd");
  });

  it("uses CHA modifier for bard bardic inspiration", () => {
    const highCha: AbilityScores = { ...DEFAULT_SCORES, cha: 16 };
    expect(resolveResourcesForLevel("bard", 1, highCha)[0]).toEqual({
      resourceId: "bardic-inspiration",
      current: 3,
      max: 3,
    });
  });

  it("enforces minimum 1 for ability-based resources", () => {
    const lowCha: AbilityScores = { ...DEFAULT_SCORES, cha: 8 };
    expect(resolveResourcesForLevel("bard", 1, lowCha)[0]).toEqual({
      resourceId: "bardic-inspiration",
      current: 1,
      max: 1,
    });
  });

  it("returns multiple resources for paladin at level 3", () => {
    const ids = resolveResourcesForLevel("paladin", 3, DEFAULT_SCORES).map(
      (r) => r.resourceId,
    );
    expect(ids).toContain("lay-on-hands");
    expect(ids).toContain("channel-divinity");
    expect(ids).toContain("spell-slot-1st");
  });

  it("filters out paladin channel divinity and spell slots at level 1 (max 0)", () => {
    const resources = resolveResourcesForLevel("paladin", 1, DEFAULT_SCORES);
    expect(resources).toHaveLength(1);
    expect(resources[0].resourceId).toBe("lay-on-hands");
  });

  it("returns spell slots for paladin at level 2 (half caster)", () => {
    const resources = resolveResourcesForLevel("paladin", 2, DEFAULT_SCORES);
    const slot = resources.find((r) => r.resourceId === "spell-slot-1st");
    expect(slot).toEqual({ resourceId: "spell-slot-1st", current: 2, max: 2 });
  });
});

describe("spell slot progressions", () => {
  it("wizard level 1: 2 first-level slots, no second-level", () => {
    const resources = resolveResourcesForLevel("wizard", 1, DEFAULT_SCORES);
    expect(resources.find((r) => r.resourceId === "spell-slot-1st")).toEqual({
      resourceId: "spell-slot-1st",
      current: 2,
      max: 2,
    });
    expect(
      resources.find((r) => r.resourceId === "spell-slot-2nd"),
    ).toBeUndefined();
  });

  it("wizard level 3: 4 first-level slots, 2 second-level slots", () => {
    const resources = resolveResourcesForLevel("wizard", 3, DEFAULT_SCORES);
    expect(resources.find((r) => r.resourceId === "spell-slot-1st")).toEqual({
      resourceId: "spell-slot-1st",
      current: 4,
      max: 4,
    });
    expect(resources.find((r) => r.resourceId === "spell-slot-2nd")).toEqual({
      resourceId: "spell-slot-2nd",
      current: 2,
      max: 2,
    });
  });

  it("wizard level 4: 4 first-level, 3 second-level", () => {
    const resources = resolveResourcesForLevel("wizard", 4, DEFAULT_SCORES);
    expect(resources.find((r) => r.resourceId === "spell-slot-1st")?.max).toBe(
      4,
    );
    expect(resources.find((r) => r.resourceId === "spell-slot-2nd")?.max).toBe(
      3,
    );
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
      const resources = resolveResourcesForLevel(cls, 3, DEFAULT_SCORES);
      expect(
        resources.find((r) => r.resourceId === "spell-slot-1st")?.max,
        `${cls} 1st-level slots at level 3`,
      ).toBe(4);
      expect(
        resources.find((r) => r.resourceId === "spell-slot-2nd")?.max,
        `${cls} 2nd-level slots at level 3`,
      ).toBe(2);
    }
  });

  it("half casters (ranger) get no slots at level 1, slots at level 2", () => {
    const lvl1 = resolveResourcesForLevel("ranger", 1, DEFAULT_SCORES);
    expect(lvl1.find((r) => r.resourceId === "spell-slot-1st")).toBeUndefined();

    const lvl2 = resolveResourcesForLevel("ranger", 2, DEFAULT_SCORES);
    expect(lvl2.find((r) => r.resourceId === "spell-slot-1st")?.max).toBe(2);
  });
});
