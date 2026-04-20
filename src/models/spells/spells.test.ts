import { spells } from "./spells";

describe("spells.findAll()", () => {
  it("returns wizard level-1 spells", () => {
    expect(spells.findAll({ cls: "wizard", level: 1 }).length).not.toBe(0);
  });
});
