import { Section } from "elements";
import styles from "./hp-tracker.module.css";

type HpTrackerSheetProps = {
  mode?: "sheet";
  current: number;
  max: number;
  editable: boolean;
  onCurrentChange: (value: number) => void;
  onMaxChange?: (value: number) => void;
};

type HpTrackerCreationProps = {
  mode: "creation";
  max: number;
  description?: string;
};

type HpTrackerProps = HpTrackerSheetProps | HpTrackerCreationProps;

function blockColor(ratio: number, dynamicColor: boolean): string {
  if (!dynamicColor) return "var(--color-hp-full)";
  if (ratio > 0.5) return "var(--color-hp-full)";
  if (ratio > 0.25) return "var(--color-highlight)";
  return "var(--color-hp-low)";
}

function HpBar({
  current,
  max,
  dynamicColor,
}: {
  current: number;
  max: number;
  dynamicColor: boolean;
}) {
  const ratio = max > 0 ? current / max : 0;
  const color = blockColor(ratio, dynamicColor);
  const blocks = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={styles.barContainer}>
      {blocks.map((hp) => (
        <span
          key={hp}
          className={styles.barBlock}
          style={hp <= current ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
}

export function HpTracker(props: HpTrackerProps) {
  if (props.mode === "creation") {
    return (
      <Section title="Hit Points">
        <HpBar current={props.max} max={props.max} dynamicColor={false} />
        <div className={styles.creationDisplay}>
          <span className={styles.hpStatic}>{props.max}</span>
          <span className={styles.hpUnit}>HP</span>
        </div>
        {props.description && (
          <p className={styles.creationDescription}>{props.description}</p>
        )}
      </Section>
    );
  }

  const { current, max, editable, onCurrentChange, onMaxChange } = props;

  return (
    <Section title="Hit Points">
      <HpBar current={current} max={max} dynamicColor />

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
