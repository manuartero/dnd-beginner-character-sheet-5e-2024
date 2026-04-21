import { explorationActions } from "./exploration";

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
