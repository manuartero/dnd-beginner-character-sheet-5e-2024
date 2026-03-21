import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 60; // px from top — always show nav above this

/**
 * Returns whether the nav should be visible based on scroll direction.
 * - Near the top (< threshold): always visible
 * - Scrolling up: visible
 * - Scrolling down: hidden
 */
export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY < SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else if (currentY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current) {
        setIsVisible(false);
      }

      lastScrollY.current = currentY;
    }

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isVisible };
}
