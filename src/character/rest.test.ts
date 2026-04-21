import { applyRest } from "./rest";

import type { CharacterResource } from "src/models/class/class-resources";

function res(
  resourceId: string,
  current: number,
  max: number,
): CharacterResource {
  return { resourceId, current, max };
}

describe("applyRest", () => {
  it("short rest resets only short-rest resources (fighter)", () => {
    const result = applyRest(
      "short-rest",
      [res("second-wind", 0, 1)],
      "fighter",
    );
    expect(result[0].current).toBe(1);
  });

  it("short rest does not reset long-rest resources (barbarian)", () => {
    const result = applyRest("short-rest", [res("rage", 0, 3)], "barbarian");
    expect(result[0].current).toBe(0);
  });

  it("short rest resets short-rest but not long-rest (cleric)", () => {
    const result = applyRest(
      "short-rest",
      [res("channel-divinity", 0, 1), res("spell-slot-1st", 0, 2)],
      "cleric",
    );
    expect(
      result.find((r) => r.resourceId === "channel-divinity")?.current,
    ).toBe(1);
    expect(result.find((r) => r.resourceId === "spell-slot-1st")?.current).toBe(
      0,
    );
  });

  it("long rest resets all resources regardless of type", () => {
    const result = applyRest(
      "long-rest",
      [res("channel-divinity", 0, 1), res("spell-slot-1st", 0, 2)],
      "cleric",
    );
    expect(
      result.find((r) => r.resourceId === "channel-divinity")?.current,
    ).toBe(1);
    expect(result.find((r) => r.resourceId === "spell-slot-1st")?.current).toBe(
      2,
    );
  });

  it("does not mutate resources already at max", () => {
    const result = applyRest(
      "short-rest",
      [res("second-wind", 1, 1)],
      "fighter",
    );
    expect(result[0].current).toBe(1);
  });
});
