import { classes } from "./classes";

describe("classes.get()", () => {
  it("returns details for a known class", () => {
    const wizard = classes.get({ id: "wizard" });
    expect(wizard.id).toBe("wizard");
    expect(wizard.icon).toBe("/class-icons/wizard.svg");
  });

  it("throws on unknown class", () => {
    expect(() =>
      classes.get({ id: "necromancer" as unknown as "wizard" }),
    ).toThrow(/Unknown class/);
  });
});

describe("classes.find()", () => {
  it("returns details for a known class", () => {
    expect(classes.find({ id: "fighter" })?.id).toBe("fighter");
  });

  it("returns undefined for unknown class", () => {
    expect(classes.find({ id: "necromancer" })).toBeUndefined();
  });
});

describe("classes.list()", () => {
  it("returns all 12 classes", () => {
    expect(classes.list()).toHaveLength(12);
  });

  it("every entry carries its .id", () => {
    for (const entry of classes.list()) {
      expect(entry.id).toBeTruthy();
    }
  });
});

describe("classes.groupBy()", () => {
  it("partitions classes by classification in fixed order", () => {
    const groups = classes.groupBy({ by: "classification" });
    expect(groups.map((g) => g.key)).toEqual([
      "martial",
      "spell-caster",
      "versatile",
    ]);
  });

  it("returns every class exactly once across groups", () => {
    const groups = classes.groupBy({ by: "classification" });
    const flat = groups.flatMap((g) => g.items.map((c) => c.id));
    expect(flat.sort()).toEqual(
      classes
        .list()
        .map((c) => c.id)
        .sort(),
    );
  });

  it("items in each group share the group's classification", () => {
    const groups = classes.groupBy({ by: "classification" });
    for (const group of groups) {
      for (const item of group.items) {
        expect(item.manualClassification).toBe(group.key);
      }
    }
  });

  it("throws on unknown group axis", () => {
    expect(() =>
      classes.groupBy({ by: "color" as unknown as "classification" }),
    ).toThrow(/Unknown group axis/);
  });
});
