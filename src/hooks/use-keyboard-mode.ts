import { useEffect, useState } from "react";

export function useKeyboardMode(): boolean {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") setIsKeyboardMode(true);
    }
    function onPointerDown() {
      setIsKeyboardMode(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return isKeyboardMode;
}
