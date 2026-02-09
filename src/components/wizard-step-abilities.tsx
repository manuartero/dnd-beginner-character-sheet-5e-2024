import { useState } from "react";
import {
	ABILITY_LIST,
	computeModifier,
	formatModifier,
} from "../data/abilities";
import type { AbilityName, AbilityScores } from "../data/types";
import styles from "./wizard-step-abilities.module.css";

interface WizardStepAbilitiesProps {
	scores: AbilityScores;
	hpMax: number;
	onScoresChange: (scores: AbilityScores) => void;
	onHpMaxChange: (hpMax: number) => void;
}

function isValidScore(value: string): boolean {
	if (value === "") return false;
	const num = Number.parseInt(value, 10);
	return !Number.isNaN(num) && num >= 3 && num <= 18;
}

function isValidHp(value: string): boolean {
	if (value === "") return false;
	const num = Number.parseInt(value, 10);
	return !Number.isNaN(num) && num >= 1;
}

export function WizardStepAbilities({
	scores,
	hpMax,
	onScoresChange,
	onHpMaxChange,
}: WizardStepAbilitiesProps) {
	const [rawScores, setRawScores] = useState<Record<AbilityName, string>>(
		() => {
			const entries = Object.entries(scores) as [AbilityName, number][];
			return Object.fromEntries(
				entries.map(([key, val]) => [key, String(val)]),
			) as Record<AbilityName, string>;
		},
	);
	const [rawHp, setRawHp] = useState(String(hpMax));
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	function handleScoreChange(ability: AbilityName, value: string) {
		setRawScores((prev) => ({ ...prev, [ability]: value }));
		const parsed = Number.parseInt(value, 10);
		if (!Number.isNaN(parsed)) {
			onScoresChange({ ...scores, [ability]: parsed });
		}
	}

	function handleHpChange(value: string) {
		setRawHp(value);
		const parsed = Number.parseInt(value, 10);
		if (!Number.isNaN(parsed)) {
			onHpMaxChange(parsed);
		}
	}

	function handleBlur(field: string) {
		setTouched((prev) => ({ ...prev, [field]: true }));
	}

	return (
		<>
			<div className="section">
				<h2 className="section-title">Ability Scores</h2>
				<div className={styles.grid}>
					{ABILITY_LIST.map(({ key, short }) => {
						const raw = rawScores[key];
						const showError = touched[key] && !isValidScore(raw);
						const displayMod = isValidScore(raw)
							? formatModifier(computeModifier(Number.parseInt(raw, 10)))
							: "+0";
						return (
							<div key={key} className={styles.abilityCard}>
								<span className={styles.label}>{short}</span>
								<span className={styles.modifier}>{displayMod}</span>
								<input
									type="text"
									maxLength={2}
									inputMode="numeric"
									value={raw}
									onChange={(e) => handleScoreChange(key, e.target.value)}
									onBlur={() => handleBlur(key)}
									className={`${styles.scoreInput} ${showError ? styles.scoreInputError : ""}`}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div className="section">
				<h2 className="section-title">Hit Points</h2>
				<div className={styles.hpRow}>
					<span className={styles.hpLabel}>HP Max</span>
					<input
						type="text"
						inputMode="numeric"
						value={rawHp}
						onChange={(e) => handleHpChange(e.target.value)}
						onBlur={() => handleBlur("hp")}
						className={`${styles.hpInput} ${touched.hp && !isValidHp(rawHp) ? styles.hpInputError : ""}`}
					/>
				</div>
			</div>
		</>
	);
}

export { isValidScore, isValidHp };
