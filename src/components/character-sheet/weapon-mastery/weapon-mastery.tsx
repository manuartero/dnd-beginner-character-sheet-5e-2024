import { Section } from "elements";
import styles from "./weapon-mastery.module.css";

import type { CharacterClass } from "src/models/classes";

type WeaponMasteryProps = {
  characterClass: CharacterClass;
};

export function WeaponMastery({
  characterClass: _characterClass,
}: WeaponMasteryProps) {
  return (
    <Section title="Weapon Mastery">
      <p className={styles.placeholder}>
        Weapon mastery selection — coming soon.
      </p>
    </Section>
  );
}
