import c from "classnames";
import { Section } from "elements";
import { useExpandable } from "src/hooks/use-expandable";
import {
  getResourceDefinition,
  getResourceResetOn,
} from "src/models/class-resources";
import styles from "./resource-tracker.module.css";

import type { CharacterResource } from "src/models/class-resources";
import type { CharacterClass } from "src/models/classes";

type ResourceTrackerProps = {
  characterClass: CharacterClass;
  resources: CharacterResource[];
  onResourceChange: (resourceId: string, newCurrent: number) => void;
};

const RESET_LABELS: Record<string, string> = {
  "short-rest": "Short Rest",
  "long-rest": "Long Rest",
};

function ResourcePips({
  current,
  max,
  onPipClick,
}: {
  current: number;
  max: number;
  onPipClick: (index: number) => void;
}) {
  const pips = Array.from({ length: max }, (_, i) => i);
  return (
    <div className={styles.pipsContainer}>
      {pips.map((i) => (
        <button
          key={i}
          type="button"
          className={c(styles.pip, i < current && styles.pipFilled)}
          onClick={() => onPipClick(i)}
          aria-label={i < current ? "Spend use" : "Recover use"}
        />
      ))}
    </div>
  );
}

export function ResourceTracker({
  characterClass,
  resources,
  onResourceChange,
}: ResourceTrackerProps) {
  const { expandedKey, toggle } = useExpandable<string>();

  if (resources.length === 0) return null;

  return (
    <Section title="Class Resources">
      {resources.map((resource) => {
        const definition = getResourceDefinition(resource.resourceId);
        const resetOn = getResourceResetOn(characterClass, resource.resourceId);
        const isExpanded = expandedKey === resource.resourceId;

        return (
          <div key={resource.resourceId}>
            <div
              className={styles.resourceRow}
              onClick={() => toggle(resource.resourceId)}
            >
              <div className={styles.resourceInfo}>
                <span className={styles.resourceName}>
                  {definition?.name ?? resource.resourceId}
                </span>
                <span className={styles.restBadge}>
                  {RESET_LABELS[resetOn] ?? resetOn}
                </span>
              </div>
              <ResourcePips
                current={resource.current}
                max={resource.max}
                onPipClick={(i) => {
                  if (i < resource.current) {
                    onResourceChange(resource.resourceId, i);
                  } else {
                    onResourceChange(resource.resourceId, i + 1);
                  }
                }}
              />
            </div>
            {isExpanded && definition?.description && (
              <p className={styles.description}>{definition.description}</p>
            )}
          </div>
        );
      })}
    </Section>
  );
}
