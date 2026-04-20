import { classes } from "src/models/class/classes";
import { armor } from "./armor";
import { GOLD_ICON } from "./equipment";
import { weapons } from "./weapons";

import type {
  CharacterClass,
  StartingEquipmentItem,
} from "src/models/class/classes";
import type { Equipment } from "./equipment";

function formatItemName(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toEquipment({ item, quantity }: StartingEquipmentItem): Equipment {
  const weapon = weapons.find(item);
  if (weapon) {
    return {
      name: weapon.name,
      type: "weapon",
      icon: weapon.icon,
      damage: weapon.damage,
      properties: weapon.properties,
      equipped: true,
      ...(quantity > 1 ? { quantity } : {}),
    };
  }
  const armorItem = armor.find(item);
  if (armorItem) {
    return {
      name: armorItem.name,
      type: armorItem.category === "shield" ? "shield" : "armor",
      icon: armorItem.icon,
      ac: armorItem.baseAc,
      equipped: true,
      ...(quantity > 1 ? { quantity } : {}),
    };
  }
  if (item === "gp") {
    return {
      name: "Gold",
      type: "money",
      icon: GOLD_ICON,
      quantity,
    };
  }
  return {
    name: formatItemName(item),
    type: "gear",
    ...(quantity > 1 ? { quantity } : {}),
  };
}

export function resolveStartingEquipment(
  characterClass: CharacterClass,
): Equipment[] {
  return classes.get(characterClass).startingEquipment[0].map(toEquipment);
}
