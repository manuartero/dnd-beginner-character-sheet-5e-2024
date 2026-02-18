import { getArmorById } from "./armor";
import type { CharacterClass, StartingEquipmentItem } from "./classes";
import { CLASS_DETAILS } from "./classes";
import type { Equipment } from "./equipment";
import { GOLD_ICON } from "./equipment";
import { getWeaponById } from "./weapons";

function formatItemName(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toEquipment({ item, quantity }: StartingEquipmentItem): Equipment {
  const weapon = getWeaponById(item);
  if (weapon) {
    return {
      name: weapon.name,
      type: "weapon",
      icon: weapon.icon,
      damage: weapon.damage,
      properties: weapon.properties,
      ...(quantity > 1 ? { quantity } : {}),
    };
  }
  const armor = getArmorById(item);
  if (armor) {
    return {
      name: armor.name,
      type: armor.category === "shield" ? "shield" : "armor",
      icon: armor.icon,
      ac: armor.baseAc,
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
  return CLASS_DETAILS[characterClass].startingEquipment[0].map(toEquipment);
}
