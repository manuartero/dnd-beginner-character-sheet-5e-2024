import { getSkillLabel } from "./backgrounds";

describe("getSkillLabel()", () => {
  it("should return the correct label for a given skill", () => {
    expect(getSkillLabel("athletics")).toBe("Athletics");
  });
});
