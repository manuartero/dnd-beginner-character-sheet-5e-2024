import { proficiencyDetails } from "./proficiency-details";

import type { ProficiencyKey } from "src/models/class/classes";

describe("proficiencyDetails.get()", () => {
  it("returns details for a known proficiency", () => {
    const entry = proficiencyDetails.get({ id: "light-armor" });
    expect(entry.id).toBe("light-armor");
    expect(entry.label).toBe("Light Armor");
    expect(entry.icon).toBeTruthy();
  });

  it("throws on unknown proficiency", () => {
    expect(() =>
      proficiencyDetails.get({
        id: "spoon-proficiency" as unknown as ProficiencyKey,
      }),
    ).toThrow(/Unknown proficiency/);
  });
});

describe("proficiencyDetails.list()", () => {
  it("returns all 6 proficiency entries", () => {
    expect(proficiencyDetails.list()).toHaveLength(6);
  });

  it("every entry carries its .id", () => {
    for (const entry of proficiencyDetails.list()) {
      expect(entry.id).toBeTruthy();
    }
  });
});
