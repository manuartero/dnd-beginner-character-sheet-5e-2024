import { Section } from "src/components/section";
import { type CharacterClass, getClassIcon } from "src/models/classes";
import { SPECIES_LIST } from "src/models/species";
import styles from "./character-header.module.css";

import type { Species } from "src/models/species";

type CharacterHeaderProps = {
  name: string;
  race: Species;
  characterClass: CharacterClass;
  level: number;
};

function getRaceLabel(race: Species): string {
  return SPECIES_LIST.find((r) => r.key === race)?.label ?? race;
}

export function CharacterHeader({
  name,
  race,
  characterClass,
  level,
}: CharacterHeaderProps) {
  return (
    <Section title="Character Info">
      <header className={styles.header}>
        <span
          role="img"
          aria-label={characterClass}
          className={styles.classIcon}
          style={{
            maskImage: `url(${getClassIcon(characterClass)})`,
            WebkitMaskImage: `url(${getClassIcon(characterClass)})`,
          }}
        />
        <div className={styles.details}>
          <div className={styles.topRow}>
            <span className={styles.nameStatic}>{name || "Unnamed"}</span>
            <span className={styles.levelBadge}>Lvl {level}</span>
          </div>

          <div className={styles.bottomRow}>
            <span className={styles.classStatic}>
              {characterClass.charAt(0).toUpperCase() + characterClass.slice(1)}
            </span>
            <span className={styles.raceStatic}>{getRaceLabel(race)}</span>
          </div>
        </div>
      </header>
    </Section>
  );
}
