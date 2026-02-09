import { useState } from "react";
import { getClassIcon } from "../data/class-icons";
import type { CharacterClass } from "../data/types";
import styles from "./character-header.module.css";

const CLASS_OPTIONS: { value: CharacterClass; label: string }[] = [
	{ value: "fighter", label: "Fighter" },
	{ value: "rogue", label: "Rogue" },
	{ value: "wizard", label: "Wizard" },
];

const CLASS_COLORS: Record<CharacterClass, string> = {
	fighter: "var(--color-fighter)",
	rogue: "var(--color-rogue)",
	wizard: "var(--color-wizard)",
};

interface CharacterHeaderProps {
	name: string;
	race: string;
	characterClass: CharacterClass;
	level: number;
	onNameChange: (name: string) => void;
	onRaceChange: (race: string) => void;
	onClassChange: (characterClass: CharacterClass) => void;
}

export function CharacterHeader({
	name,
	race,
	characterClass,
	level,
	onNameChange,
	onRaceChange,
	onClassChange,
}: CharacterHeaderProps) {
	const [isEditingName, setIsEditingName] = useState(!name);

	return (
		<header className={`character-header ${styles.header}`}>
			<img
				src={getClassIcon(characterClass)}
				alt={characterClass}
				className={`class-icon ${styles.classIcon}`}
			/>
			<div className={styles.details}>
				<div className={styles.topRow}>
					{isEditingName ? (
						<input
							type="text"
							value={name}
							onChange={(e) => onNameChange(e.target.value)}
							onBlur={() => name && setIsEditingName(false)}
							placeholder="Character name"
							className={styles.nameInput}
						/>
					) : (
						<button
							type="button"
							onClick={() => setIsEditingName(true)}
							className={styles.nameDisplay}
						>
							{name || "Unnamed"}
						</button>
					)}
					<span className={styles.levelBadge}>Lvl {level}</span>
				</div>

				<div className={styles.bottomRow}>
					<select
						value={characterClass}
						onChange={(e) => onClassChange(e.target.value as CharacterClass)}
						className={styles.select}
						style={{ color: CLASS_COLORS[characterClass] }}
					>
						{CLASS_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>

					<input
						type="text"
						value={race}
						onChange={(e) => onRaceChange(e.target.value)}
						placeholder="Race"
						className={styles.raceInput}
					/>
				</div>
			</div>
		</header>
	);
}
