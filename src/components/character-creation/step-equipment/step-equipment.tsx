import { Section } from "src/components/section";
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

export function StepEquipment({ characterClass }: StepEquipmentProps) {
  const equipment = CLASS_DETAILS[characterClass].startingEquipment[0];

  return (
    <Section title="Starting Equipment">
      <div className={styles.list}>
        {equipment.map(({ item, quantity }) => {
          const weapon = getWeaponById(item);
          const name = weapon ? weapon.name : formatItemName(item);

          return (
            <div key={item} className={styles.itemRow}>
              {weapon && (
                <img
                  src={resolveIconPath(weapon.icon)}
                  alt={name}
                  className={styles.icon}
                />
              )}
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{name}</span>
                {weapon && (
                  <span className={styles.itemMeta}>
                    {weapon.damage.dice} {weapon.damage.type}
                  </span>
                )}
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
