import { useEffect, useRef, useState } from "react";
import styles from "./screen-flash.module.css";

type ScreenFlashProps = {
  trigger: number | string;
};

export function ScreenFlash({ trigger }: ScreenFlashProps) {
  const [flashing, setFlashing] = useState(false);
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (prevTrigger.current === trigger) {
      return;
    }
    prevTrigger.current = trigger;
    setFlashing(true);
  }, [trigger]);

  if (!flashing) {
    return null;
  }

  return (
    <div className={styles.overlay} onAnimationEnd={() => setFlashing(false)} />
  );
}
