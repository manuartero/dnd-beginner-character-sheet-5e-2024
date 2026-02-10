import type { Background } from "../data/backgrounds";
import { BACKGROUND_LIST } from "../data/backgrounds";
import cardStyles from "./wizard-card.module.css";
import styles from "./wizard-step-origin.module.css";

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
				<div className={styles.featInfo}>
					Origin Feat:{" "}
					<span className={styles.featLabel}>{selected.originFeatLabel}</span>
				</div>
			)}
		</div>
	);
}
