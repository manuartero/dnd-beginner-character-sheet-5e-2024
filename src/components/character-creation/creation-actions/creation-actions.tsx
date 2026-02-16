import styles from "../character-creation.module.css";

type CreationActionsProps = {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextSound?: string;
};

export function CreationActions({
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled,
  nextSound,
}: CreationActionsProps) {
  return (
    <div className={styles.actions}>
      {onBack && (
        <button type="button" className={styles.backButton} onClick={onBack}>
          Back
        </button>
      )}
      <button
        type="button"
        className={styles.primaryButton}
        disabled={nextDisabled}
        onClick={onNext}
        data-sound={nextSound}
      >
        {nextLabel}
      </button>
    </div>
  );
}
