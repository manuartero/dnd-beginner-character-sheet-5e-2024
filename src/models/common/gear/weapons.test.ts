import { weapons } from "./weapons";

import type { WeaponId } from "./weapons";

describe("weapons.get()", () => {
  it("returns a weapon by id", () => {
    expect(weapons.get({ id: "longsword" }).name).toBe("Longsword");
  });

  it("throws on unknown id", () => {
    expect(() =>
      weapons.get({ id: "lightsaber" as unknown as WeaponId }),
    ).toThrow(/Unknown weapon/);
  });
});

describe("weapons.find()", () => {
  it("finds a weapon by id", () => {
    const weapon = weapons.find({ id: "longsword" });
    expect(weapon?.name).toBe("Longsword");
    expect(weapon?.damage.dice).toBe("1d8");
    expect(weapon?.proficiency).toBe("martial");
    expect(weapon?.range).toBe("melee");
  });

  it("returns undefined for unknown id", () => {
    expect(weapons.find({ id: "lightsaber" })).toBeUndefined();
  });
});

describe("weapons.list()", () => {
  it("contains 38 weapons", () => {
    expect(weapons.list()).toHaveLength(38);
  });
});
