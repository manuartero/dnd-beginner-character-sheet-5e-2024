import { describe, it, expect } from "vitest";
import { luminance, borderSeedPoints } from "./remove-background.mjs";

describe("luminance", () => {
  it("black has 0 luminance", () => expect(luminance("#000000")).toBe(0));
  it("white has max luminance", () => expect(luminance("#FFFFFF")).toBeCloseTo(255));
  it("pure red luminance matches formula", () => expect(luminance("#FF0000")).toBeCloseTo(0.299 * 255));
  it("pure green luminance matches formula", () => expect(luminance("#00FF00")).toBeCloseTo(0.587 * 255));
  it("pure blue luminance matches formula", () => expect(luminance("#0000FF")).toBeCloseTo(0.114 * 255));
  it("dark color < light color", () => expect(luminance("#111111")).toBeLessThan(luminance("#EEEEEE")));
});

describe("borderSeedPoints", () => {
  it("always includes all 4 corners", () => {
    const pts = borderSeedPoints(10, 10);
    const strs = pts.map(([x, y]) => `${x},${y}`);
    expect(strs).toContain("0,0");
    expect(strs).toContain("9,0");
    expect(strs).toContain("0,9");
    expect(strs).toContain("9,9");
  });

  it("returns no duplicate points", () => {
    const pts = borderSeedPoints(20, 20);
    const strs = pts.map(([x, y]) => `${x},${y}`);
    expect(new Set(strs).size).toBe(strs.length);
  });

  it("all points lie on the border", () => {
    const w = 16;
    const h = 12;
    const pts = borderSeedPoints(w, h);
    for (const [x, y] of pts) {
      const onBorder = x === 0 || x === w - 1 || y === 0 || y === h - 1;
      expect(onBorder, `(${x},${y}) not on border`).toBe(true);
    }
  });
});
