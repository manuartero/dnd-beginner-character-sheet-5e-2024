import { armor } from "./armor";

import type { ArmorId } from "./armor";

describe("armor.get()", () => {
  it("returns armor by id", () => {
    expect(armor.get({ id: "leather-armor" }).name).toBe("Leather Armor");
  });

  it("throws on unknown id", () => {
    expect(() => armor.get({ id: "mithril" as unknown as ArmorId })).toThrow(
      /Unknown armor/,
    );
  });
});

describe("armor.find()", () => {
  it("finds armor by id", () => {
    expect(armor.find({ id: "leather-armor" })?.name).toBe("Leather Armor");
  });

  it("returns undefined for unknown id", () => {
    expect(armor.find({ id: "mithril" })).toBeUndefined();
  });
});

describe("armor.list()", () => {
  it("contains 13 armor entries", () => {
    expect(armor.list()).toHaveLength(13);
  });
});
