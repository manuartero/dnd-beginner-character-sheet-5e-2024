import { species } from "./species";

describe("species.get()", () => {
  it("returns details for a known species", () => {
    const dwarf = species.get({ id: "dwarf" });
    expect(dwarf.id).toBe("dwarf");
    expect(dwarf.icon).toBe("/race-icons/dwarf.jpeg");
  });

  it("throws on unknown species", () => {
    expect(() => species.get({ id: "ogre" as unknown as "dwarf" })).toThrow(
      /Unknown species/,
    );
  });
});

describe("species.find()", () => {
  it("returns details for a known species", () => {
    expect(species.find({ id: "elf" })?.id).toBe("elf");
  });

  it("returns undefined for unknown species", () => {
    expect(species.find({ id: "ogre" })).toBeUndefined();
  });
});

describe("species.list()", () => {
  it("returns all 10 species", () => {
    expect(species.list()).toHaveLength(10);
  });

  it("every entry carries its .id", () => {
    for (const entry of species.list()) {
      expect(entry.id).toBeTruthy();
    }
  });
});
