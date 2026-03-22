import { getSpeciesIcon } from "./species";

describe("getSpeciesIcon()", () => {
  it("should return the correct icon path for a given species", () => {
    expect(getSpeciesIcon("dwarf")).toBe("/race-icons/dwarf.jpeg");
  });
});
