import { getClassIcon } from "./classes";

describe("getClassIcon()", () => {
  it("should return the correct icon path for a given character class", () => {
    expect(getClassIcon("wizard")).toBe("/class-icons/wizard.jpeg");
  });
});
