import { useEffect, useRef, useState } from "react";
import styles from "./screen-flash.module.css";
import { useScreenFlash } from "./screen-flash-context";

type ScreenFlashProps = {
  trigger: number | string;
};

export function ScreenFlash({ trigger }: ScreenFlashProps) {
  const { flashEnabled } = useScreenFlash();
  const [flashing, setFlashing] = useState(false);
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (!flashEnabled) return;
    if (prevTrigger.current === trigger) {
      return;
    }
    prevTrigger.current = trigger;
    setFlashing(true);
  }, [trigger, flashEnabled]);

  if (!flashing) {
    return null;
  }

  return (
    <div className={styles.overlay} onAnimationEnd={() => setFlashing(false)} />
  );
}
