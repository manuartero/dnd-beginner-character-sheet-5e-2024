import { type CharacterClass, getClassIcon } from "src/models/classes";
import type { Species } from "src/models/species";
import { SPECIES_LIST } from "src/models/species";
import styles from "./character-header.module.css";

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
    <header className={styles.header}>
      <img
        src={getClassIcon(characterClass)}
        alt={characterClass}
        className={styles.classIcon}
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
  );
}
