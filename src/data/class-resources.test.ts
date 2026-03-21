import { describe, expect, it } from "vitest";
import classProgressionData from "./class-progression.json";
import classResourcesData from "./class-resources.json";

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

describe("class-resources data integrity", () => {
  it("class-progression.json covers all 12 classes", () => {
    const classes = Object.keys(classProgressionData);
    expect(classes.sort()).toEqual(EXPECTED_CLASSES.sort());
  });

  it("every resourceId in class-progression.json exists in class-resources.json", () => {
    const definedIds = new Set(Object.keys(classResourcesData));

    for (const [className, entry] of Object.entries(classProgressionData)) {
      for (const resource of entry.resources) {
        expect(
          definedIds.has(resource.resourceId),
          `${className} references unknown resourceId "${resource.resourceId}"`,
        ).toBe(true);
      }
    }
  });

  it("progression levels are valid numbers between 1 and 20", () => {
    for (const [className, entry] of Object.entries(classProgressionData)) {
      for (const resource of entry.resources) {
        for (const levelStr of Object.keys(resource.progression)) {
          const level = Number(levelStr);
          expect(
            Number.isInteger(level) && level >= 1 && level <= 20,
            `${className}/${resource.resourceId} has invalid level "${levelStr}"`,
          ).toBe(true);
        }
      }
    }
  });

  it("each resource definition has required fields", () => {
    for (const [id, def] of Object.entries(classResourcesData)) {
      expect(def.id, `${id} missing id`).toBe(id);
      expect(def.name, `${id} missing name`).toBeTruthy();
      expect(def.description, `${id} missing description`).toBeTruthy();
      expect(
        ["short-rest", "long-rest"].includes(def.resetOn),
        `${id} has invalid resetOn "${def.resetOn}"`,
      ).toBe(true);
      expect(def.icon, `${id} missing icon`).toBeTruthy();
    }
  });
});
