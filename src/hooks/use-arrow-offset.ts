import { useLayoutEffect, useRef, useState } from "react";

export function useArrowOffset(expandedKey: string | null) {
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const [arrowOffset, setArrowOffset] = useState(0);

  useLayoutEffect(() => {
    if (!expandedKey) return;
    const button = buttonRefs.current.get(expandedKey);
    if (!button) return;
    const grid = button.parentElement;
    if (!grid) return;
    const btnRect = button.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    setArrowOffset(btnRect.left + btnRect.width / 2 - gridRect.left);
  }, [expandedKey]);

  return { buttonRefs, arrowOffset };
}
