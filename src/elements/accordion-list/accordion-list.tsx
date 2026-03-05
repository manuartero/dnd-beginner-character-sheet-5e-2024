import c from "classnames";
import { createContext, useContext } from "react";
import { useExpandable } from "src/hooks/use-expandable";
import styles from "./accordion-list.module.css";

import type { ReactNode } from "react";

export { styles as accordionStyles };

type AccordionContext = {
  expandedKey: string | null;
  toggle: (key: string) => void;
};

const AccordionCtx = createContext<AccordionContext | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionCtx);
  if (!ctx) throw new Error("AccordionItem must be used inside AccordionList");
  return ctx;
}

type AccordionListProps = {
  children: ReactNode;
};

export function AccordionList({ children }: AccordionListProps) {
  const { expandedKey, toggle } = useExpandable<string>();

  return (
    <AccordionCtx.Provider value={{ expandedKey, toggle }}>
      <div className={styles.container}>{children}</div>
    </AccordionCtx.Provider>
  );
}

type AccordionGroupProps = {
  label: string;
  children: ReactNode;
};

export function AccordionGroup({ label, children }: AccordionGroupProps) {
  return (
    <div className={styles.group}>
      <h4 className={styles.groupLabel}>{label}</h4>
      <div className={styles.itemList}>{children}</div>
    </div>
  );
}

type AccordionItemProps = {
  itemKey: string;
  header: ReactNode;
  children: ReactNode;
};

export function AccordionItem({
  itemKey,
  header,
  children,
}: AccordionItemProps) {
  const { expandedKey, toggle } = useAccordion();
  const isExpanded = expandedKey === itemKey;

  return (
    <button
      type="button"
      className={c(styles.entry, isExpanded && styles.entryExpanded)}
      aria-expanded={isExpanded}
      onClick={() => toggle(itemKey)}
    >
      <div className={styles.entryHeader}>{header}</div>
      {isExpanded && <div className={styles.details}>{children}</div>}
    </button>
  );
}
