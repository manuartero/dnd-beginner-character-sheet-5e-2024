import styles from "src/components/character-creation/character-creation.module.css";

type CreationActionsProps = {
  nextLabel?: string;
  nextSound?: string;
  nextDisabled?: boolean;
  onBack?: () => void;
  onNext: () => void;
};

export function CreationActions({
  nextLabel = "Next",
  nextSound,
  nextDisabled,
  onBack,
  onNext,
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
