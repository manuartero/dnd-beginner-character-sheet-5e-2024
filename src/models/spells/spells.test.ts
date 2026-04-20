import { spells } from "./spells";

describe("spells.get()", () => {
  it("returns wizard level-1 spells", () => {
    expect(spells.get({ cls: "wizard", level: 1 }).length).not.toBe(0);
  });
});
