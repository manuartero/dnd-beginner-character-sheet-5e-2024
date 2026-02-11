import { useState } from "react";
import { getClassIcon } from "../data/class-icons";
import type { Character } from "../data/types";
import styles from "./character-list.module.css";

interface CharacterListProps {
	characters: Character[];
	onSelect: (characterId: string) => void;
	onNew: () => void;
	onDelete: (characterId: string) => void;
}

export function CharacterList({
	characters,
	onSelect,
	onNew,
	onDelete,
}: CharacterListProps) {
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

	return (
		<div className={styles.container}>
			<h2 className="section-title">Characters</h2>
			<div className={styles.grid}>
				{characters.map((char) => (
					<div key={char.id} className={`section ${styles.card}`}>
						{confirmDeleteId === char.id ? (
							<div className={styles.confirmContent}>
								<span className={styles.confirmText}>Delete?</span>
								<div className={styles.confirmActions}>
									<button
										type="button"
										className={styles.confirmYes}
										onClick={() => {
											onDelete(char.id);
											setConfirmDeleteId(null);
										}}
									>
										Yes
									</button>
									<button
										type="button"
										className={styles.confirmNo}
										onClick={() => setConfirmDeleteId(null)}
									>
										No
									</button>
								</div>
							</div>
						) : (
							<>
								<button
									type="button"
									className={styles.deleteButton}
									onClick={() => setConfirmDeleteId(char.id)}
								>
									x
								</button>
								<button
									type="button"
									className={styles.cardBody}
									onClick={() => onSelect(char.id)}
								>
									<img
										src={getClassIcon(char.characterClass)}
										alt={char.characterClass}
										className={`class-icon ${styles.cardIcon}`}
									/>
									<span className={styles.cardName}>
										{char.name || "Unnamed"}
									</span>
									<span className={styles.cardLevel}>Lvl {char.level}</span>
								</button>
							</>
						)}
					</div>
				))}
				<button type="button" className={styles.newCard} onClick={onNew}>
					<span className={styles.newLabel}>+ New</span>
				</button>
			</div>
		</div>
	);
}
