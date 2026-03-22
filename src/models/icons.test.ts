import { resolveIconPath } from "./icons";

describe("resolveIconPath()", () => {
  it("builds the default BLACK variant path", () => {
    expect(resolveIconPath("vol1/icon-vol1_42")).toBe(
      "/assets/vol1/BLACK/icon-vol1_42.svg",
    );
  });

  it("builds a WHITE variant path", () => {
    expect(resolveIconPath("vol1/icon-vol1_42", { variant: "WHITE" })).toBe(
      "/assets/vol1/WHITE/icon-vol1_42.svg",
    );
  });
});
