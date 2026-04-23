import { combatActions } from "./combat";

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
