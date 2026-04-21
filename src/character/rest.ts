import { classes } from "src/models/class/classes";

import type {
  CharacterResource,
  RestType,
} from "src/models/class/class-resources";
import type { CharacterClass } from "src/models/class/classes";

export function applyRest(
  type: RestType,
  resources: CharacterResource[],
  characterClass: CharacterClass,
): CharacterResource[] {
  return resources.map((r) =>
    type === "long-rest" ||
    classes.resourceResetOn({
      id: characterClass,
      resourceId: r.resourceId,
    }) === type
      ? { ...r, current: r.max }
      : r,
  );
}
