import { getBackgroundIcon } from "./backgrounds";

describe("getBackgroundIcon()", () => {
  it("should return the correct icon path for a given background", () => {
    expect(getBackgroundIcon("artisan")).toBe(
      "/assets/vol5/BLACK/icon-vol5_70.svg",
    );
  });
});
