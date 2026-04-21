import { armor } from "./armor";

describe("armor.get()", () => {
  it("returns armor by id", () => {
    expect(armor.get({ id: "leather-armor" }).name).toBe("Leather Armor");
  });

  it("returns armor by name (case-insensitive)", () => {
    expect(armor.get({ name: "LEATHER ARMOR" }).id).toBe("leather-armor");
  });

  it("throws on unknown id", () => {
    expect(() => armor.get({ id: "mithril" })).toThrow(/Unknown armor/);
  });

  it("throws on unknown name", () => {
    expect(() => armor.get({ name: "Mithril" })).toThrow(/Unknown armor/);
  });
});

describe("armor.find()", () => {
  it("finds armor by id", () => {
    expect(armor.find({ id: "leather-armor" })?.name).toBe("Leather Armor");
  });

  it("finds armor by exact name", () => {
    expect(armor.find({ name: "Leather Armor" })?.id).toBe("leather-armor");
  });

  it("finds armor case-insensitively by name", () => {
    expect(armor.find({ name: "leather armor" })).toBeDefined();
    expect(armor.find({ name: "LEATHER ARMOR" })).toBeDefined();
  });

  it("returns undefined for unknown id", () => {
    expect(armor.find({ id: "mithril" })).toBeUndefined();
  });

  it("returns undefined for unknown name", () => {
    expect(armor.find({ name: "Mithril" })).toBeUndefined();
  });
});

describe("armor.list()", () => {
  it("contains 13 armor entries", () => {
    expect(armor.list()).toHaveLength(13);
  });
});
