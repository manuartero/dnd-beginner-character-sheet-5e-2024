import { ChipGrid, Section } from "elements";
import { resolveIconPath } from "src/models/icons";
import styles from "./rest-bar.module.css";

import type { GridAction } from "elements";

type RestType = "short-rest" | "long-rest";

type RestBarProps = {
  selectedRest: RestType | null;
  onSelect: (type: RestType | null) => void;
  onRest: (type: RestType) => void;
};

export function RestBar({ selectedRest, onSelect, onRest }: RestBarProps) {
  function handleSelect(key: string) {
    const type = key as RestType;
    onSelect(selectedRest === type ? null : type);
  }

  const actions: GridAction[] = [
    {
      key: "short-rest",
      label: "Short Rest",
      icon: resolveIconPath("vol4/icon-vol4_09"),
      renderExpanded: () => (
        <div className={styles.confirmRow}>
          <p className={styles.confirmText}>
            Restores short rest resources.
          </p>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={() => onRest("short-rest")}
          >
            Take Rest
          </button>
        </div>
      ),
    },
    {
      key: "long-rest",
      label: "Long Rest",
      icon: resolveIconPath("vol4/icon-vol4_08"),
      renderExpanded: () => (
        <div className={styles.confirmRow}>
          <p className={styles.confirmText}>
            Restores all resources.
          </p>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={() => onRest("long-rest")}
          >
            Take Rest
          </button>
        </div>
      ),
    },
  ];

  return (
    <Section title="Rest">
      <ChipGrid
        actions={actions}
        selectedKey={selectedRest}
        onSelect={handleSelect}
      />
    </Section>
  );
}
