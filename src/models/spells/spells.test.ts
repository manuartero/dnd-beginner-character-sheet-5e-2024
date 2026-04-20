import { spells } from "./spells";

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
