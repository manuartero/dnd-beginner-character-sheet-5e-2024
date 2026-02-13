import c from "classnames";
import styles from "./stepper.module.css";

type StepperProps = {
  current: number;
  total: number;
  onStepChange: (step: number) => void;
};

export function Stepper({ current, total, onStepChange }: StepperProps) {
  return (
    <div className={styles.stepIndicator}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={c(styles.dot, current === n && styles.dotActive)}
          onClick={() => onStepChange(n)}
        />
      ))}
    </div>
  );
}
