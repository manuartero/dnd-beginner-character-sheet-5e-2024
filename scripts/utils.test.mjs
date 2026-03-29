import { describe, it, expect, vi } from "vitest";
import { toHex, hexToRgb, normalize } from "./utils.mjs";

describe("toHex", () => {
  it("converts black", () => expect(toHex(0, 0, 0)).toBe("#000000"));
  it("converts white", () => expect(toHex(255, 255, 255)).toBe("#FFFFFF"));
  it("converts a mid-tone color", () => expect(toHex(18, 52, 86)).toBe("#123456"));
  it("pads single-digit components", () => expect(toHex(1, 2, 3)).toBe("#010203"));
});

describe("hexToRgb", () => {
  it("parses black", () => expect(hexToRgb("#000000")).toEqual([0, 0, 0]));
  it("parses white", () => expect(hexToRgb("#FFFFFF")).toEqual([255, 255, 255]));
  it("round-trips with toHex", () => {
    const [r, g, b] = hexToRgb("#1A2B3C");
    expect(toHex(r, g, b)).toBe("#1A2B3C");
  });
  it("handles lowercase hex", () => expect(hexToRgb("#ff0000")).toEqual([255, 0, 0]));
});

describe("normalize", () => {
  it("uppercases lowercase hex", () => expect(normalize("#abcdef")).toBe("#ABCDEF"));
  it("adds missing #", () => expect(normalize("FF0000")).toBe("#FF0000"));
  it("is idempotent on canonical input", () => expect(normalize("#FF0000")).toBe("#FF0000"));
});
