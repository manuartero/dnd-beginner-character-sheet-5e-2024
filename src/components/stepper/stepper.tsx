import c from "classnames";
import styles from "./stepper.module.css";

type StepperProps = {
  current: number;
  total: number;
  completedSteps?: number[];
  onStepChange: (step: number) => void;
};

export function Stepper({
  current,
  total,
  completedSteps = [],
  onStepChange,
}: StepperProps) {
  return (
    <div className={styles.stepIndicator}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
        const isActive = current === n;
        const isCompleted = completedSteps.includes(n);
        return (
          <button
            key={n}
            type="button"
            aria-label={`Step ${n}${isCompleted ? ", completed" : ""}${isActive ? ", current" : ""}`}
            aria-current={isActive ? "step" : undefined}
            className={c(
              styles.dot,
              isActive && styles.dotActive,
              isCompleted && styles.dotCompleted,
            )}
            onClick={() => onStepChange(n)}
          >
            {null}
          </button>
        );
      })}
    </div>
  );
}
