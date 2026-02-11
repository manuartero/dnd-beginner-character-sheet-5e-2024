import { useState } from "react";
import {
	ABILITY_LIST,
	computeModifier,
	formatModifier,
} from "../data/abilities";
import {
	computeSkillModifier,
	DEFAULT_PROFICIENCIES,
	skillsForAbility,
} from "../data/skills";
import type {
	AbilityName,
	AbilityScores as AbilityScoresType,
} from "../data/types";
import styles from "./ability-scores.module.css";

function modifierColorClass(mod: number): string {
	if (mod < 0) return styles.modifierNegative;
	if (mod === 0) return styles.modifierNeutral;
	if (mod >= 3) return styles.modifierHigh;
	return styles.modifierPositive;
}

interface AbilityScoresProps {
	scores: AbilityScoresType;
	editable: boolean;
	onScoreChange: (ability: AbilityName, value: number) => void;
	proficiencyBonus?: number;
}

export function AbilityScores({
	scores,
	editable,
	onScoreChange,
	proficiencyBonus = 2,
}: AbilityScoresProps) {
	const [flippedAbility, setFlippedAbility] = useState<AbilityName | null>(
		null,
	);

	function handleCardClick(key: AbilityName) {
		if (editable) return;
		const skills = skillsForAbility(key);
		if (skills.length === 0) return;
		setFlippedAbility((prev) => (prev === key ? null : key));
	}

	return (
		<div className="section">
			<h2 className="section-title">Abilities</h2>
			<div className={styles.grid}>
				{ABILITY_LIST.map(({ key, short }) => {
					const score = scores[key];
					const mod = computeModifier(score);
					const skills = skillsForAbility(key);
					const hasSkills = skills.length > 0;
					const isFlipped = !editable && flippedAbility === key;
					const isClickable = !editable && hasSkills;

					const cardContent = (
						<>
							<span className={styles.label}>{short}</span>
							{isFlipped ? (
								<div className={styles.skillList}>
									{skills.map((skill) => {
										const isProficient = DEFAULT_PROFICIENCIES.includes(
											skill.name,
										);
										const skillMod = computeSkillModifier({
											abilityModifier: mod,
											proficiencyBonus,
											isProficient,
										});
										return (
											<div
												key={skill.name}
												className={`${styles.skillRow} ${isProficient ? styles.skillProficient : ""}`}
											>
												<span className={styles.skillName}>{skill.label}</span>
												<span className={styles.skillModifier}>
													{formatModifier(skillMod)}
												</span>
											</div>
										);
									})}
								</div>
							) : (
								<>
									{editable ? (
										<input
											type="number"
											min={1}
											max={30}
											value={score}
											onChange={(e) => {
												const parsed = Number.parseInt(e.target.value, 10);
												if (!Number.isNaN(parsed)) {
													onScoreChange(key, parsed);
												}
											}}
											className={styles.scoreInput}
										/>
									) : (
										<span className={styles.score}>Score: {score}</span>
									)}
									<span
										className={`${styles.modifier} ${modifierColorClass(mod)}`}
									>
										{formatModifier(mod)}
									</span>
								</>
							)}
						</>
					);

					if (isClickable) {
						return (
							<button
								key={key}
								type="button"
								className={`${styles.abilityCard} ${styles.abilityCardClickable} ${isFlipped ? styles.abilityCardActive : ""}`}
								onClick={() => handleCardClick(key)}
							>
								{cardContent}
							</button>
						);
					}

					return (
						<div key={key} className={styles.abilityCard}>
							{cardContent}
						</div>
					);
				})}
			</div>
		</div>
	);
}
