import { ChipGrid, Section } from "elements";
import { resolveIconPath } from "src/models/common/icons";
import { restActions } from "src/models/common/rest-actions";
import styles from "./rest-bar.module.css";

import type { GridAction } from "elements";
import type { RestType } from "src/models/class/class-resources";

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

  const actions: GridAction[] = restActions.list().map((action) => ({
    key: action.id,
    label: action.label,
    icon: resolveIconPath(action.icon),
    renderExpanded: () => (
      <div className={styles.confirmRow}>
        <p className={styles.confirmText}>{action.description}</p>
        <button
          type="button"
          className={styles.confirmBtn}
          onClick={() => onRest(action.id)}
        >
          Take Rest
        </button>
      </div>
    ),
  }));

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
