import { useState } from "react";

export function useExpandable<T extends string>() {
  const [expandedKey, setExpandedKey] = useState<T | null>(null);

  function toggle(key: T) {
    setExpandedKey((prev) => (prev === key ? null : key));
  }

  return { expandedKey, toggle } as const;
}
