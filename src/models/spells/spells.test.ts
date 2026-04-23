import { spells } from "./spells";

import type { Spell } from "./spells";

function makeSpell(overrides: Partial<Spell> = {}): Spell {
  return {
    id: "test-spell",
    name: "Test Spell",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 ft",
    components: "V, S",
    duration: "Instantaneous",
    concentration: false,
    ritual: false,
    description: "A test spell.",
    ...overrides,
  };
}

describe("spells.get()", () => {
  it("returns a known spell by id", () => {
    const bolt = spells.get({ id: "fire-bolt" });
    expect(bolt.name).toBeTruthy();
    expect(bolt.level).toBe(0);
  });

  it("throws on unknown id", () => {
    expect(() => spells.get({ id: "meteor-shower" })).toThrow(/Unknown spell/);
  });
});

describe("spells.find()", () => {
  it("returns a known spell by id", () => {
    expect(spells.find({ id: "fire-bolt" })).toBeDefined();
  });

  it("returns undefined for unknown id", () => {
    expect(spells.find({ id: "meteor-shower" })).toBeUndefined();
  });
});

describe("spells.list()", () => {
  it("returns every cantrip and level-1 spell", () => {
    const list = spells.list();
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((s) => typeof s.id === "string")).toBe(true);
  });
});

describe("spells.findAll()", () => {
  it("returns wizard level-1 spells", () => {
    expect(spells.findAll({ cls: "wizard", level: 1 }).length).not.toBe(0);
  });

  it("returns wizard cantrips (level 0)", () => {
    expect(spells.findAll({ cls: "wizard", level: 0 }).length).not.toBe(0);
  });

  it("returns empty array for non-caster class", () => {
    expect(spells.findAll({ cls: "fighter", level: 0 })).toEqual([]);
    expect(spells.findAll({ cls: "fighter", level: 1 })).toEqual([]);
  });

  it("returns empty array for half-casters at level 0 (no cantrips)", () => {
    expect(spells.findAll({ cls: "paladin", level: 0 })).toEqual([]);
    expect(spells.findAll({ cls: "ranger", level: 0 })).toEqual([]);
  });
});

describe("spells.limit()", () => {
  it("returns cantrip and level-1 selection counts for full casters", () => {
    expect(spells.limit({ cls: "wizard", level: 0 })).toBe(3);
    expect(spells.limit({ cls: "wizard", level: 1 })).toBe(6);
  });

  it("returns 0 for non-caster class", () => {
    expect(spells.limit({ cls: "fighter", level: 0 })).toBe(0);
    expect(spells.limit({ cls: "fighter", level: 1 })).toBe(0);
  });

  it("returns 0 for half-casters (paladin, ranger) at level 1 creation", () => {
    expect(spells.limit({ cls: "paladin", level: 1 })).toBe(0);
    expect(spells.limit({ cls: "ranger", level: 1 })).toBe(0);
  });
});

describe("spells.timing()", () => {
  it("returns 'action' for '1 action' casting time", () => {
    expect(spells.timing(makeSpell({ castingTime: "1 action" }))).toBe(
      "action",
    );
  });

  it("returns 'bonus-action' for '1 bonus action' casting time", () => {
    expect(spells.timing(makeSpell({ castingTime: "1 bonus action" }))).toBe(
      "bonus-action",
    );
  });

  it("returns 'reaction' for reaction casting times", () => {
    const shield = makeSpell({
      castingTime:
        "1 reaction, which you take when you are hit by an attack roll or targeted by the Magic Missile spell",
    });
    expect(spells.timing(shield)).toBe("reaction");

    const featherFall = makeSpell({
      castingTime:
        "1 reaction, which you take when you or a creature within 60 feet of you falls",
    });
    expect(spells.timing(featherFall)).toBe("reaction");
  });

  it("returns null for non-combat casting times", () => {
    expect(spells.timing(makeSpell({ castingTime: "1 minute" }))).toBe(null);
    expect(spells.timing(makeSpell({ castingTime: "1 hour" }))).toBe(null);
    expect(spells.timing(makeSpell({ castingTime: "10 minutes" }))).toBe(null);
  });
});

describe("spells.groupByTiming()", () => {
  it("groups spells into the correct timing buckets", () => {
    const groups = spells.groupByTiming([
      makeSpell({ id: "fire-bolt", castingTime: "1 action" }),
      makeSpell({ id: "shield", castingTime: "1 reaction, when hit" }),
      makeSpell({ id: "blade-ward", castingTime: "1 bonus action" }),
      makeSpell({ id: "alarm", castingTime: "1 minute" }),
    ]);

    expect(groups.action).toHaveLength(1);
    expect(groups.action[0].id).toBe("fire-bolt");
    expect(groups["bonus-action"]).toHaveLength(1);
    expect(groups["bonus-action"][0].id).toBe("blade-ward");
    expect(groups.reaction).toHaveLength(1);
    expect(groups.reaction[0].id).toBe("shield");
  });

  it("excludes non-combat spells", () => {
    const groups = spells.groupByTiming([
      makeSpell({ id: "alarm", castingTime: "1 minute" }),
      makeSpell({ id: "find-familiar", castingTime: "1 hour" }),
    ]);

    expect(groups.action).toHaveLength(0);
    expect(groups["bonus-action"]).toHaveLength(0);
    expect(groups.reaction).toHaveLength(0);
  });

  it("returns empty arrays when given no spells", () => {
    const groups = spells.groupByTiming([]);

    expect(groups.action).toHaveLength(0);
    expect(groups["bonus-action"]).toHaveLength(0);
    expect(groups.reaction).toHaveLength(0);
  });
});
