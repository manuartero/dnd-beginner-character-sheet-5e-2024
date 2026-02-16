import { useEffect, useRef, useState } from "react";
import styles from "./screen-flash.module.css";

type ScreenFlashProps = {
  trigger: number | string;
};

export function ScreenFlash({ trigger }: ScreenFlashProps) {
  const [flashing, setFlashing] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFlashing(true);
  }, [trigger]);

  if (!flashing) return null;

  return (
    <div className={styles.overlay} onAnimationEnd={() => setFlashing(false)} />
  );
}
