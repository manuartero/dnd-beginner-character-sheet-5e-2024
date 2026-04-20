import { backgrounds } from "./backgrounds";

describe("backgrounds.icon()", () => {
  it("returns the resolved icon path for a given background", () => {
    expect(backgrounds.icon({ id: "artisan" })).toBe(
      "/assets/vol5/BLACK/icon-vol5_70.svg",
    );
  });
});
