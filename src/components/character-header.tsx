import { getClassIcon } from "../data/class-icons";
import { CLASS_COLORS } from "../data/classes";
import { RACE_LIST } from "../data/races";
import type { CharacterClass, CharacterRace } from "../data/types";
import styles from "./character-header.module.css";

interface CharacterHeaderProps {
	name: string;
	race: CharacterRace;
	characterClass: CharacterClass;
	level: number;
}

function getRaceLabel(race: CharacterRace): string {
	return RACE_LIST.find((r) => r.key === race)?.label ?? race;
}

export function CharacterHeader({
	name,
	race,
	characterClass,
	level,
}: CharacterHeaderProps) {
	return (
		<header className={`character-header ${styles.header}`}>
			<img
				src={getClassIcon(characterClass)}
				alt={characterClass}
				className={`class-icon ${styles.classIcon}`}
			/>
			<div className={styles.details}>
				<div className={styles.topRow}>
					<span className={styles.nameStatic}>{name || "Unnamed"}</span>
					<span className={styles.levelBadge}>Lvl {level}</span>
				</div>

				<div className={styles.bottomRow}>
					<span
						className={styles.classStatic}
						style={{ color: CLASS_COLORS[characterClass] }}
					>
						{characterClass.charAt(0).toUpperCase() + characterClass.slice(1)}
					</span>
					<span className={styles.raceStatic}>{getRaceLabel(race)}</span>
				</div>
			</div>
		</header>
	);
}
