import { resolveStartingEquipment } from "./starting-equipment";

describe("resolveStartingEquipment()", () => {
  it("returns equipment for fighter", () => {
    const equipment = resolveStartingEquipment("fighter");
    expect(equipment.length).toBeGreaterThan(0);
  });

  it("resolves weapons with correct type", () => {
    const equipment = resolveStartingEquipment("fighter");
    const weapons = equipment.filter((e) => e.type === "weapon");
    expect(weapons.length).toBeGreaterThan(0);
    for (const weapon of weapons) {
      expect(weapon.damage).toBeDefined();
    }
  });

  it("resolves armor with correct type", () => {
    const equipment = resolveStartingEquipment("fighter");
    const armor = equipment.filter((e) => e.type === "armor");
    expect(armor.length).toBeGreaterThan(0);
    for (const piece of armor) {
      expect(piece.ac).toBeDefined();
    }
  });

  it("resolves shields as type 'shield' not 'armor'", () => {
    const equipment = resolveStartingEquipment("cleric");
    const shields = equipment.filter((e) => e.name === "Shield");
    expect(shields).toHaveLength(1);
    expect(shields[0].type).toBe("shield");
  });

  it("resolves gold as type 'money'", () => {
    const equipment = resolveStartingEquipment("fighter");
    const money = equipment.filter((e) => e.type === "money");
    expect(money).toHaveLength(1);
    expect(money[0].name).toBe("Gold");
    expect(money[0].quantity).toBeGreaterThan(0);
  });

  it("returns equipment for all classes without throwing", () => {
    const classes = [
      "barbarian",
      "bard",
      "cleric",
      "druid",
      "fighter",
      "monk",
      "paladin",
      "ranger",
      "rogue",
      "sorcerer",
      "warlock",
      "wizard",
    ] as const;
    for (const cls of classes) {
      expect(() => resolveStartingEquipment(cls)).not.toThrow();
    }
  });
});
