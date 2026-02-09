import { getClassIcon } from "../data/class-icons";
import type { Character } from "../data/types";
import styles from "./character-list.module.css";

interface CharacterListProps {
	characters: Character[];
	onSelect: (characterId: string) => void;
	onNew: () => void;
}

export function CharacterList({
	characters,
	onSelect,
	onNew,
}: CharacterListProps) {
	return (
		<div className={styles.container}>
			<h2 className="section-title">Characters</h2>
			<div className={styles.grid}>
				{characters.map((char) => (
					<button
						key={char.id}
						type="button"
						className={`section ${styles.card}`}
						onClick={() => onSelect(char.id)}
					>
						<img
							src={getClassIcon(char.characterClass)}
							alt={char.characterClass}
							className={`class-icon ${styles.cardIcon}`}
						/>
						<span className={styles.cardName}>{char.name || "Unnamed"}</span>
						<span className={styles.cardLevel}>Lvl {char.level}</span>
					</button>
				))}
				<button type="button" className={styles.newCard} onClick={onNew}>
					<span className={styles.newLabel}>+ New</span>
				</button>
			</div>
		</div>
	);
}
