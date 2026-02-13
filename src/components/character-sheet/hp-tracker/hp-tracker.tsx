import { Section } from "src/components/section";
import styles from "./hp-tracker.module.css";

type HpTrackerProps = {
  current: number;
  max: number;
  editable: boolean;
  onCurrentChange: (value: number) => void;
  onMaxChange?: (value: number) => void;
};

export function HpTracker({
  current,
  max,
  editable,
  onCurrentChange,
  onMaxChange,
}: HpTrackerProps) {
  const ratio = max > 0 ? current / max : 0;
  const barColor = ratio > 0.5 ? "var(--color-hp-full)" : "var(--color-hp-low)";

  return (
    <Section title="Hit Points">
      {!editable && (
        <div className={styles.barContainer}>
          <div
            className={styles.barFill}
            style={{
              width: `${Math.max(0, Math.min(100, ratio * 100))}%`,
              backgroundColor: barColor,
            }}
          />
        </div>
      )}

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => onCurrentChange(Math.max(0, current - 1))}
          className={styles.button}
        >
          -
        </button>

        <div className={styles.hpDisplay}>
          {editable ? (
            <input
              type="number"
              min={0}
              value={current}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) onCurrentChange(parsed);
              }}
              className={styles.hpInput}
            />
          ) : (
            <span className={styles.hpStatic}>{current}</span>
          )}
          <span className={styles.separator}>/</span>
          {editable ? (
            <input
              type="number"
              min={1}
              value={max}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) onMaxChange?.(parsed);
              }}
              className={styles.hpInput}
            />
          ) : (
            <span className={styles.hpStatic}>{max}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onCurrentChange(Math.min(max, current + 1))}
          className={styles.button}
        >
          +
        </button>
      </div>
    </Section>
  );
}
