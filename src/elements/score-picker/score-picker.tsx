import c from "classnames";
import styles from "./score-picker.module.css";

type ScorePickerProps = {
  availableValues: number[];
  selectedValue: number | null;
  onPick: (value: number | null) => void;
};

export function ScorePicker({
  availableValues,
  selectedValue,
  onPick,
}: ScorePickerProps) {
  const sorted = [...availableValues].sort((a, b) => b - a);

  function handleClick(e: React.MouseEvent, value: number) {
    e.stopPropagation();
    onPick(value === selectedValue ? null : value);
  }

  if (sorted.length === 0) {
    return (
      <div className={styles.picker}>
        <span className={styles.placeholder}>--</span>
      </div>
    );
  }

  return (
    <div className={styles.picker}>
      {sorted.map((value) => (
        <button
          key={value}
          type="button"
          className={c(
            styles.tile,
            value === selectedValue && styles.tileSelected,
          )}
          onClick={(e) => handleClick(e, value)}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
