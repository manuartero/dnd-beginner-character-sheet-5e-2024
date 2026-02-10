import { useState } from "react";
import { saveCharacter } from "../data/character-storage";
import type {
	AbilityScores,
	Character,
	CharacterClass,
	CharacterRace,
} from "../data/types";
import styles from "./creation-wizard.module.css";
import {
	isValidHp,
	isValidScore,
	WizardStepAbilities,
} from "./wizard-step-abilities";
import { WizardStepIdentity } from "./wizard-step-identity";

interface CreationWizardProps {
	onSave: (character: Character) => void;
}

interface DraftState {
	name: string;
	characterClass: CharacterClass | null;
	race: CharacterRace | null;
	abilityScores: AbilityScores;
	hpMax: number;
}

export function CreationWizard({ onSave }: CreationWizardProps) {
	const [step, setStep] = useState<1 | 2>(1);
	const [draft, setDraft] = useState<DraftState>({
		name: "",
		characterClass: null,
		race: null,
		abilityScores: {
			str: 10,
			dex: 10,
			con: 10,
			int: 10,
			wis: 10,
			cha: 10,
		},
		hpMax: 10,
	});

	const step1Complete =
		draft.name.trim() !== "" &&
		draft.characterClass !== null &&
		draft.race !== null;

	const step2Complete =
		Object.values(draft.abilityScores).every((v) => isValidScore(String(v))) &&
		isValidHp(String(draft.hpMax));

	function handleCreate() {
		if (!draft.characterClass || !draft.race) return;
		const character: Character = {
			id: crypto.randomUUID(),
			name: draft.name.trim(),
			race: draft.race,
			characterClass: draft.characterClass,
			level: 1,
			abilityScores: draft.abilityScores,
			hp: { current: draft.hpMax, max: draft.hpMax },
			ac: 10,
			proficiencyBonus: 2,
			spells: [],
			equipment: [],
		};
		saveCharacter(character);
		onSave(character);
	}

	return (
		<>
			<div className={styles.stepIndicator}>
				<button
					type="button"
					className={`${styles.dot} ${step >= 1 ? styles.dotActive : ""}`}
					onClick={() => setStep(1)}
				/>
				<button
					type="button"
					className={`${styles.dot} ${step >= 2 ? styles.dotActive : ""}`}
					onClick={() => setStep(2)}
				/>
			</div>

			{step === 1 && (
				<>
					<WizardStepIdentity
						name={draft.name}
						characterClass={draft.characterClass}
						race={draft.race}
						onNameChange={(name) => setDraft((prev) => ({ ...prev, name }))}
						onClassChange={(characterClass) =>
							setDraft((prev) => ({ ...prev, characterClass }))
						}
						onRaceChange={(race) => setDraft((prev) => ({ ...prev, race }))}
					/>
					<div className={styles.actions}>
						<button
							type="button"
							className={styles.primaryButton}
							disabled={!step1Complete}
							onClick={() => setStep(2)}
						>
							Next
						</button>
					</div>
				</>
			)}

			{step === 2 && (
				<>
					<WizardStepAbilities
						scores={draft.abilityScores}
						hpMax={draft.hpMax}
						onScoresChange={(abilityScores) =>
							setDraft((prev) => ({ ...prev, abilityScores }))
						}
						onHpMaxChange={(hpMax) => setDraft((prev) => ({ ...prev, hpMax }))}
					/>
					<div className={styles.actions}>
						<button
							type="button"
							className={styles.backButton}
							onClick={() => setStep(1)}
						>
							Back
						</button>
						<button
							type="button"
							className={styles.primaryButton}
							disabled={!step2Complete}
							onClick={handleCreate}
						>
							Create
						</button>
					</div>
				</>
			)}
		</>
	);
}
