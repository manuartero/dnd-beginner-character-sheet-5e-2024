import { describe, expect, it } from "vitest";
import {
  greedyMerges,
  parseExplicitMerges,
  rgbDistance,
} from "./reduce-palette.mjs";

describe("rgbDistance", () => {
  it("returns 0 for identical colors", () =>
    expect(rgbDistance([0, 0, 0], [0, 0, 0])).toBe(0));
  it("returns correct distance for black and white", () => {
    expect(rgbDistance([0, 0, 0], [255, 255, 255])).toBeCloseTo(
      Math.sqrt(3 * 255 ** 2),
    );
  });
  it("is symmetric", () => {
    const a = [100, 150, 200];
    const b = [50, 80, 30];
    expect(rgbDistance(a, b)).toBe(rgbDistance(b, a));
  });
});

describe("greedyMerges", () => {
  it("reduces 3 colors to 2 by merging the closest pair", () => {
    const colors = [
      { hex: "#FF0000", pixels: 100 }, // red
      { hex: "#FE0000", pixels: 50 }, // near-red (closest to red)
      { hex: "#0000FF", pixels: 200 }, // blue (far from both reds)
    ];
    const merges = greedyMerges(colors, 2);
    expect(merges).toHaveLength(1);
    expect(merges[0].from).toBe("#FE0000"); // smaller pixel count merges into larger
    expect(merges[0].into).toBe("#FF0000");
  });

  it("returns empty array when already at target", () => {
    const colors = [
      { hex: "#FF0000", pixels: 10 },
      { hex: "#00FF00", pixels: 10 },
    ];
    expect(greedyMerges(colors, 2)).toEqual([]);
  });
});

describe("parseExplicitMerges", () => {
  it("returns merge entries for valid input", () => {
    const palette = new Set(["#FF0000", "#00FF00"]);
    const result = parseExplicitMerges(["#FF0000:#00FF00"], palette);
    expect(result).toEqual([
      { from: "#FF0000", into: "#00FF00", explicit: true },
    ]);
  });

  it("normalizes hex casing", () => {
    const palette = new Set(["#FF0000", "#00FF00"]);
    const result = parseExplicitMerges(["ff0000:00ff00"], palette);
    expect(result[0]).toMatchObject({ from: "#FF0000", into: "#00FF00" });
  });
});
