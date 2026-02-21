import c from "classnames";
import styles from "./stepper.module.css";

type StepperProps = {
  current: number;
  total: number;
  completedSteps?: number[];
  warnedSteps?: number[];
  labels?: string[];
  onStepChange: (step: number) => void;
};

export function Stepper({
  current,
  total,
  completedSteps = [],
  warnedSteps = [],
  labels,
  onStepChange,
}: StepperProps) {
  return (
    <div className={styles.stepIndicator}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
        const isActive = current === n;
        const isCompleted = completedSteps.includes(n);
        const isWarned = warnedSteps.includes(n);
        const label = labels?.[n - 1];
        return (
          <button
            key={n}
            type="button"
            aria-label={`Step ${n}${isCompleted ? ", completed" : ""}${isWarned ? ", action needed" : ""}${isActive ? ", current" : ""}`}
            aria-current={isActive ? "step" : undefined}
            className={c(
              label ? styles.tab : styles.dot,
              isActive && (label ? styles.activeTab : styles.dotActive),
              isCompleted && styles.dotCompleted,
              isWarned && styles.tabWarned,
            )}
            onClick={() => onStepChange(n)}
          >
            {label ?? null}
          </button>
        );
      })}
    </div>
  );
}
