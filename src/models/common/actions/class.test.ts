import { classActions } from "./class";

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
