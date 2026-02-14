import { Section } from "src/components/section";
import { getArmorById } from "src/models/armor";
import type { CharacterClass } from "src/models/classes";
import { CLASS_DETAILS } from "src/models/classes";
import { resolveIconPath } from "src/models/icons";
import { getWeaponById } from "src/models/weapons";
import styles from "./step-equipment.module.css";

type StepEquipmentProps = {
  characterClass: CharacterClass;
};

function formatItemName(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveItem(id: string): {
  name: string;
  icon: string | null;
  meta: string | null;
} {
  const weapon = getWeaponById(id);
  if (weapon) {
    return {
      name: weapon.name,
      icon: weapon.icon,
      meta: `${weapon.damage.dice} ${weapon.damage.type}`,
    };
  }
  const armor = getArmorById(id);
  if (armor) {
    return {
      name: armor.name,
      icon: armor.icon,
      meta: `AC ${armor.baseAc}${armor.dexModifier ? " + Dex" : ""}`,
    };
  }
  return { name: formatItemName(id), icon: null, meta: null };
}

export function StepEquipment({ characterClass }: StepEquipmentProps) {
  const equipment = CLASS_DETAILS[characterClass].startingEquipment[0];

  return (
    <Section title="Starting Equipment">
      <div className={styles.list}>
        {equipment.map(({ item, quantity }) => {
          const { name, icon, meta } = resolveItem(item);

          return (
            <div key={item} className={styles.itemRow}>
              {icon && (
                <img
                  src={resolveIconPath(icon)}
                  alt={name}
                  className={styles.icon}
                />
              )}
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{name}</span>
                {meta && <span className={styles.itemMeta}>{meta}</span>}
              </div>
              {quantity > 1 && (
                <span className={styles.quantity}>x{quantity}</span>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
