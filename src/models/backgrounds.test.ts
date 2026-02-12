import { getBackgroundIcon, getSkillLabel } from "./backgrounds";

describe("getSkillLabel()", () => {
  it("should return the correct label for a given skill", () => {
    expect(getSkillLabel("athletics")).toBe("Athletics");
  });
});

describe("getBackgroundIcon()", () => {
  it("should return the correct icon path for a given background", () => {
    expect(getBackgroundIcon("artisan")).toBe(
      "/assets/vol5/BLACK/icon-vol5_81.svg",
    );
  });
});
