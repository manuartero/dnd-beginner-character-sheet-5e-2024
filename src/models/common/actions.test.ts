import { classActions, combatActions, explorationActions } from "./actions";

describe("combatActions.get()", () => {
  it("returns a combat action by name", () => {
    expect(combatActions.get({ name: "Attack" }).timing).toBe("action");
  });

  it("throws on unknown name", () => {
    expect(() => combatActions.get({ name: "Teleport" })).toThrow(
      /Unknown combat action/,
    );
  });
});

describe("combatActions.find()", () => {
  it("finds a combat action by name", () => {
    expect(combatActions.find({ name: "Dodge" })?.timing).toBe("action");
  });

  it("returns undefined for unknown name", () => {
    expect(combatActions.find({ name: "Teleport" })).toBeUndefined();
  });
});

describe("combatActions.list()", () => {
  it("returns the full combat action list", () => {
    const names = combatActions.list().map((a) => a.name);
    expect(names).toContain("Attack");
    expect(names).toContain("Opportunity Attack");
  });
});

describe("classActions.get()", () => {
  it("returns a class action by name", () => {
    expect(classActions.get({ name: "Second Wind" }).timing).toBe(
      "bonus-action",
    );
  });

  it("throws on unknown name", () => {
    expect(() => classActions.get({ name: "Fireball" })).toThrow(
      /Unknown class action/,
    );
  });
});

describe("classActions.find()", () => {
  it("finds a class action by name", () => {
    expect(classActions.find({ name: "Sneak Attack" })).toBeDefined();
  });

  it("returns undefined for unknown name", () => {
    expect(classActions.find({ name: "Fireball" })).toBeUndefined();
  });
});

describe("classActions.findAll()", () => {
  it("returns only fighter actions for fighter", () => {
    const names = classActions
      .findAll({ cls: "fighter", classification: "martial" })
      .map((a) => a.name);
    expect(names).toContain("Second Wind");
    expect(names).not.toContain("Sneak Attack");
  });

  it("returns rogue-only cunning actions for rogue", () => {
    const names = classActions
      .findAll({ cls: "rogue", classification: "martial" })
      .map((a) => a.name);
    expect(names).toContain("Cunning Action: Dash");
    expect(names).toContain("Cunning Action: Disengage");
    expect(names).toContain("Cunning Action: Hide");
    expect(names).toContain("Sneak Attack");
    expect(names).not.toContain("Second Wind");
  });

  it("returns empty array for class with no class actions", () => {
    expect(
      classActions.findAll({ cls: "wizard", classification: "spell-caster" }),
    ).toEqual([]);
  });
});

describe("explorationActions.get()", () => {
  it("returns an exploration action by name", () => {
    expect(explorationActions.get({ name: "Search" }).category).toBe(
      "exploration",
    );
  });

  it("throws on unknown name", () => {
    expect(() => explorationActions.get({ name: "Teleport" })).toThrow(
      /Unknown exploration action/,
    );
  });
});

describe("explorationActions.find()", () => {
  it("finds an exploration action by name", () => {
    expect(explorationActions.find({ name: "Influence" })?.category).toBe(
      "social",
    );
  });

  it("returns undefined for unknown name", () => {
    expect(explorationActions.find({ name: "Teleport" })).toBeUndefined();
  });
});

describe("explorationActions.findAll()", () => {
  it("includes Cast Ritual Spell for spell-casters", () => {
    const names = explorationActions
      .findAll({ classification: "spell-caster" })
      .map((a) => a.name);
    expect(names).toContain("Cast Ritual Spell");
  });

  it("includes Cast Ritual Spell for versatile classes", () => {
    const names = explorationActions
      .findAll({ classification: "versatile" })
      .map((a) => a.name);
    expect(names).toContain("Cast Ritual Spell");
  });

  it("excludes Cast Ritual Spell for martial classes", () => {
    const names = explorationActions
      .findAll({ classification: "martial" })
      .map((a) => a.name);
    expect(names).not.toContain("Cast Ritual Spell");
  });

  it("includes unrestricted actions for every classification", () => {
    for (const classification of [
      "martial",
      "spell-caster",
      "versatile",
    ] as const) {
      const names = explorationActions
        .findAll({ classification })
        .map((a) => a.name);
      expect(names).toContain("Hide");
      expect(names).toContain("Search");
      expect(names).toContain("Study");
      expect(names).toContain("Utilize");
      expect(names).toContain("Influence");
    }
  });
});

describe("explorationActions.list()", () => {
  it("returns the full exploration list", () => {
    expect(explorationActions.list().length).toBeGreaterThan(0);
  });
});
