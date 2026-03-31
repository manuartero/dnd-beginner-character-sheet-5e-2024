import { TileRow } from "elements";
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

  if (sorted.length === 0) {
    return (
      <div className={styles.placeholder}>
        <span>--</span>
      </div>
    );
  }

  const items = sorted.map((v) => ({
    key: String(v),
    label: String(v),
    selected: v === selectedValue,
  }));

  return (
    <TileRow
      items={items}
      columns={3}
      onPick={(key) => {
        const v = Number(key);
        onPick(v === selectedValue ? null : v);
      }}
    />
  );
}
