import {
	ABILITY_LIST,
	computeModifier,
	formatModifier,
} from "../data/abilities";
import type {
	AbilityName,
	AbilityScores as AbilityScoresType,
} from "../data/types";
import styles from "./ability-scores.module.css";

interface AbilityScoresProps {
	scores: AbilityScoresType;
	editable: boolean;
	onScoreChange: (ability: AbilityName, value: number) => void;
}

export function AbilityScores({
	scores,
	editable,
	onScoreChange,
}: AbilityScoresProps) {
	return (
		<div className="section">
			<h2 className="section-title">Abilities</h2>
			<div className={styles.grid}>
				{ABILITY_LIST.map(({ key, short }) => {
					const score = scores[key];
					const mod = computeModifier(score);
					return (
						<div key={key} className={styles.abilityCard}>
							<span className={styles.label}>{short}</span>
							<span className={styles.modifier}>{formatModifier(mod)}</span>
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
								<span className={styles.scoreStatic}>{score}</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
