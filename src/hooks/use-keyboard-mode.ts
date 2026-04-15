import { useEffect, useState } from "react";

export function useKeyboardMode(): boolean {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useEffect(() => {
    let isActive = true;

    function onKeyDown(e: KeyboardEvent) {
      if (isActive && e.key === "Tab") setIsKeyboardMode(true);
    }
    function onPointerDown() {
      if (isActive) setIsKeyboardMode(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      isActive = false;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return isKeyboardMode;
}
