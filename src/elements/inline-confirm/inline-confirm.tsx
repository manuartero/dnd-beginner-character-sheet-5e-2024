import styles from "./inline-confirm.module.css";

type InlineConfirmProps = {
  label?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function InlineConfirm({
  label = "Remove?",
  onConfirm,
  onCancel,
}: InlineConfirmProps) {
  return (
    <fieldset role="alertdialog" aria-label={label} className={styles.root}>
      <legend className={styles.label}>{label}</legend>
      <div className={styles.actions}>
        <button type="button" className={styles.yes} onClick={onConfirm}>
          Yes
        </button>
        <button type="button" className={styles.no} onClick={onCancel}>
          No
        </button>
      </div>
    </fieldset>
  );
}
