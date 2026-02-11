import { useState } from "react";
import {
	ABILITY_LIST,
	computeModifier,
	formatModifier,
} from "../../data/abilities";
import type { AbilityName, AbilityScores } from "../../data/types";
import { totalBonuses } from "../../utils/total-bonuses";
import styles from "./wizard-step-abilities.module.css";

interface WizardStepAbilitiesProps {
	scores: AbilityScores;
	hpMax: number;
	onScoresChange: (scores: AbilityScores) => void;
	onHpMaxChange: (hpMax: number) => void;
	abilityOptions: [AbilityName, AbilityName, AbilityName] | null;
	abilityBonuses: Partial<Record<AbilityName, number>>;
	onAbilityBonusesChange: (
		bonuses: Partial<Record<AbilityName, number>>,
	) => void;
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
	abilityOptions,
	abilityBonuses,
	onAbilityBonusesChange,
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

	const remaining = 3 - totalBonuses(abilityBonuses);

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

	function handleBonusClick(ability: AbilityName) {
		const current = abilityBonuses[ability] ?? 0;
		if (remaining > 0) {
			onAbilityBonusesChange({
				...abilityBonuses,
				[ability]: current + 1,
			});
		} else if (current > 0) {
			const next = { ...abilityBonuses };
			if (current === 1) {
				delete next[ability];
			} else {
				next[ability] = current - 1;
			}
			onAbilityBonusesChange(next);
		}
	}

	function handleBonusRightClick(e: React.MouseEvent, ability: AbilityName) {
		e.preventDefault();
		const current = abilityBonuses[ability] ?? 0;
		if (current > 0) {
			const next = { ...abilityBonuses };
			if (current === 1) {
				delete next[ability];
			} else {
				next[ability] = current - 1;
			}
			onAbilityBonusesChange(next);
		}
	}

	return (
		<>
			<div className="section">
				<h2 className="section-title">Ability Scores</h2>
				<div className={styles.grid}>
					{ABILITY_LIST.map(({ key, short }) => {
						const raw = rawScores[key];
						const showError = touched[key] && !isValidScore(raw);
						const bonus = abilityBonuses[key] ?? 0;
						const baseScore = isValidScore(raw) ? Number.parseInt(raw, 10) : 10;
						const displayMod = formatModifier(
							computeModifier(baseScore + bonus),
						);
						return (
							<div key={key} className={styles.abilityCard}>
								<span className={styles.modifier}>{displayMod}</span>
								{bonus > 0 && (
									<span className={styles.bonusBadge}>+{bonus}</span>
								)}
								<span className={styles.label}>{short}</span>
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

			{abilityOptions && (
				<div className="section">
					<h2 className="section-title">Origin Bonus</h2>
					<p className={styles.bonusHint}>
						{remaining} bonus {remaining === 1 ? "point" : "points"} remaining
					</p>
					<div className={styles.bonusGrid}>
						{ABILITY_LIST.map(({ key, short }) => {
							const eligible = abilityOptions.includes(key);
							const allocated = abilityBonuses[key] ?? 0;
							return (
								<button
									key={key}
									type="button"
									disabled={!eligible}
									className={`${styles.bonusCell} ${eligible ? styles.bonusCellEligible : ""} ${allocated > 0 ? styles.bonusCellActive : ""}`}
									onClick={() => eligible && handleBonusClick(key)}
									onContextMenu={(e) =>
										eligible && handleBonusRightClick(e, key)
									}
								>
									<span className={styles.bonusAbility}>{short}</span>
									{allocated > 0 && (
										<span className={styles.bonusCount}>+{allocated}</span>
									)}
								</button>
							);
						})}
					</div>
				</div>
			)}

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
