import { Section } from "elements";
import { type CharacterClass, classes } from "src/models/class/classes";
import { species } from "src/models/origin/species";
import styles from "./character-header.module.css";

import type { Species } from "src/models/origin/species";

type CharacterHeaderProps = {
  name: string;
  race: Species;
  characterClass: CharacterClass;
  level: number;
};

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
            maskImage: `url(${classes.get(characterClass).icon})`,
            WebkitMaskImage: `url(${classes.get(characterClass).icon})`,
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
            <span className={styles.raceStatic}>{species.get(race).label}</span>
          </div>
        </div>
      </header>
    </Section>
  );
}
