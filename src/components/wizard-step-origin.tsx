import { ABILITY_LIST } from "../data/abilities";
import type { Background } from "../data/backgrounds";
import {
	BACKGROUND_LIST,
	getOriginFeatDescription,
	getSkillLabel,
} from "../data/backgrounds";
import type { AbilityName } from "../data/types";
import cardStyles from "./wizard-card.module.css";
import styles from "./wizard-step-origin.module.css";

function abilityShortLabel(key: AbilityName): string {
	return ABILITY_LIST.find((a) => a.key === key)?.short ?? key;
}

interface WizardStepOriginProps {
	background: Background | null;
	onBackgroundChange: (background: Background) => void;
}

export function WizardStepOrigin({
	background,
	onBackgroundChange,
}: WizardStepOriginProps) {
	const selected = BACKGROUND_LIST.find((b) => b.key === background);

	return (
		<div className="section">
			<h2 className="section-title">Background</h2>
			<div className={styles.backgroundGrid}>
				{BACKGROUND_LIST.map(({ key, label }) => (
					<button
						key={key}
						type="button"
						className={`${cardStyles.card} ${background === key ? cardStyles.cardSelected : ""}`}
						onClick={() => onBackgroundChange(key)}
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
			{selected && (
				<div className={styles.originInfo}>
					<div className={styles.infoBox}>
						<span>Skill Proficiencies:</span>
						<ul className={styles.skillList}>
							{selected.skillProficiencies.map((skill) => (
								<li key={skill} className={styles.skillItem}>
									{getSkillLabel(skill)}
								</li>
							))}
						</ul>
					</div>
					<div className={styles.infoBox}>
						<span>Ability Bonuses:</span>
						<div className={styles.abilityBonuses}>
							{selected.abilityOptions.map((ability) => (
								<span key={ability} className={styles.abilityBadge}>
									{abilityShortLabel(ability)}
								</span>
							))}
						</div>
					</div>
					<div className={styles.infoBox}>
						Origin Feat:{" "}
						<span className={styles.featLabel}>{selected.originFeatLabel}</span>
						<div className={styles.featDescription}>
							{getOriginFeatDescription(selected.originFeat)
								.split(". ")
								.filter(Boolean)
								.map((sentence) => (
									<p key={sentence}>
										{sentence.endsWith(".") ? sentence : `${sentence}.`}
									</p>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
