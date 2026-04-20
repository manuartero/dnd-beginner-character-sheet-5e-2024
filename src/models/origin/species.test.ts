import { species } from "./species";

describe("species.get()", () => {
  it("returns details for a known species", () => {
    expect(species.get("dwarf").icon).toBe("/race-icons/dwarf.jpeg");
  });
});
