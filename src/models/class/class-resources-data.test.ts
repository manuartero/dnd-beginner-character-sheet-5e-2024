import classResourcesData from "src/data/class/class-resources.json";
import { applyRest } from "src/models/class/class-resources";
import { describe, expect, it } from "vitest";

import type { CharacterResource } from "src/models/class/class-resources";

const EXPECTED_CLASSES = [
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
];

function res(
  resourceId: string,
  current: number,
  max: number,
): CharacterResource {
  return { resourceId, current, max };
}

describe("applyRest()", () => {
  it("short rest resets only short-rest resources (fighter)", () => {
    const resources = [res("second-wind", 0, 1)];
    const result = applyRest("short-rest", resources, "fighter");
    expect(result[0].current).toBe(1);
  });

  it("short rest does not reset long-rest resources (barbarian)", () => {
    const resources = [res("rage", 0, 3)];
    const result = applyRest("short-rest", resources, "barbarian");
    expect(result[0].current).toBe(0);
  });

  it("short rest resets short-rest but not long-rest (cleric)", () => {
    const resources = [
      res("channel-divinity", 0, 1),
      res("spell-slot-1st", 0, 2),
    ];
    const result = applyRest("short-rest", resources, "cleric");
    expect(
      result.find((r) => r.resourceId === "channel-divinity")?.current,
    ).toBe(1);
    expect(result.find((r) => r.resourceId === "spell-slot-1st")?.current).toBe(
      0,
    );
  });

  it("long rest resets all resources regardless of type", () => {
    const resources = [
      res("channel-divinity", 0, 1),
      res("spell-slot-1st", 0, 2),
    ];
    const result = applyRest("long-rest", resources, "cleric");
    expect(
      result.find((r) => r.resourceId === "channel-divinity")?.current,
    ).toBe(1);
    expect(result.find((r) => r.resourceId === "spell-slot-1st")?.current).toBe(
      2,
    );
  });

  it("does not mutate resources already at max", () => {
    const resources = [res("second-wind", 1, 1)];
    const result = applyRest("short-rest", resources, "fighter");
    expect(result[0].current).toBe(1);
  });
});

describe("class-resources data integrity", () => {
  it("covers all 12 classes", () => {
    const classes = Object.keys(classResourcesData);
    expect(classes.sort()).toEqual(EXPECTED_CLASSES.sort());
  });

  it("progression levels are valid numbers between 1 and 20", () => {
    for (const [className, entry] of Object.entries(classResourcesData)) {
      for (const resource of entry.resources) {
        for (const levelStr of Object.keys(resource.progression)) {
          const level = Number(levelStr);
          expect(
            Number.isInteger(level) && level >= 1 && level <= 20,
            `${className}/${resource.id} has invalid level "${levelStr}"`,
          ).toBe(true);
        }
      }
    }
  });

  it("each resource has required fields", () => {
    for (const [className, entry] of Object.entries(classResourcesData)) {
      for (const resource of entry.resources) {
        expect(resource.id, `${className} resource missing id`).toBeTruthy();
        expect(resource.name, `${resource.id} missing name`).toBeTruthy();
        expect(
          resource.description,
          `${resource.id} missing description`,
        ).toBeTruthy();
        expect(
          ["short-rest", "long-rest"].includes(resource.resetOn),
          `${resource.id} has invalid resetOn "${resource.resetOn}"`,
        ).toBe(true);
        expect(resource.icon, `${resource.id} missing icon`).toBeTruthy();
      }
    }
  });
});
