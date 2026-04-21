import { abilities } from "./abilities";

describe("abilities.get()", () => {
  it("returns details for a known ability", () => {
    expect(abilities.get({ id: "str" })).toEqual({
      id: "str",
      label: "Strength",
      short: "STR",
    });
  });

  it("throws on unknown ability", () => {
    expect(() => abilities.get({ id: "luck" as unknown as "str" })).toThrow(
      /Unknown ability/,
    );
  });
});

describe("abilities.list()", () => {
  it("returns all six abilities in canonical order", () => {
    expect(abilities.list().map((a) => a.id)).toEqual([
      "str",
      "dex",
      "con",
      "int",
      "wis",
      "cha",
    ]);
  });
});
