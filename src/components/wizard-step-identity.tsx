import { getClassIcon } from "../data/class-icons";
import { CLASS_LIST } from "../data/classes";
import { RACE_LIST } from "../data/races";
import type { CharacterClass, CharacterRace } from "../data/types";
import cardStyles from "./wizard-card.module.css";
import styles from "./wizard-step-identity.module.css";

interface WizardStepIdentityProps {
	name: string;
	characterClass: CharacterClass | null;
	race: CharacterRace | null;
	onNameChange: (name: string) => void;
	onClassChange: (characterClass: CharacterClass) => void;
	onRaceChange: (race: CharacterRace) => void;
}

export function WizardStepIdentity({
	name,
	characterClass,
	race,
	onNameChange,
	onClassChange,
	onRaceChange,
}: WizardStepIdentityProps) {
	return (
		<>
			<div className="section">
				<h2 className="section-title">Name</h2>
				<input
					type="text"
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
					placeholder="Character name"
					className={styles.nameInput}
				/>
			</div>

			<div className="section">
				<h2 className="section-title">Class</h2>
				<div className={styles.classGrid}>
					{CLASS_LIST.map(({ key, label }) => (
						<button
							key={key}
							type="button"
							className={`${cardStyles.card} ${characterClass === key ? cardStyles.cardSelected : ""}`}
							onClick={() => onClassChange(key)}
						>
							<img
								src={getClassIcon(key)}
								alt={label}
								className={cardStyles.cardIcon}
							/>
							<span className={cardStyles.cardLabel}>{label}</span>
						</button>
					))}
				</div>
			</div>

			<div className="section">
				<h2 className="section-title">Species</h2>
				<div className={styles.raceGrid}>
					{RACE_LIST.map(({ key, label }) => (
						<button
							key={key}
							type="button"
							className={`${cardStyles.card} ${race === key ? cardStyles.cardSelected : ""}`}
							onClick={() => onRaceChange(key)}
						>
							<img
								src="/race-icons/placeholder.png"
								alt={label}
								className={cardStyles.cardIcon}
							/>
							<span className={cardStyles.cardLabel}>{label}</span>
						</button>
					))}
				</div>
			</div>
		</>
	);
}
