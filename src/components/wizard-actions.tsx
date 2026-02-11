import styles from "./creation-wizard.module.css";

interface WizardActionsProps {
	onBack?: () => void;
	onNext: () => void;
	nextLabel?: string;
	nextDisabled?: boolean;
}

export function WizardActions({
	onBack,
	onNext,
	nextLabel = "Next",
	nextDisabled,
}: WizardActionsProps) {
	return (
		<div className={styles.actions}>
			{onBack && (
				<button
					type="button"
					className={styles.backButton}
					onClick={onBack}
				>
					Back
				</button>
			)}
			<button
				type="button"
				className={styles.primaryButton}
				disabled={nextDisabled}
				onClick={onNext}
			>
				{nextLabel}
			</button>
		</div>
	);
}
