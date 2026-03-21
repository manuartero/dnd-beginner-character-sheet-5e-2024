import c from "classnames";
import { ResourceChip, Section } from "elements";
import { useState } from "react";
import {
  getResourceDefinition,
  getResourceResetOn,
} from "src/models/class-resources";
import { resolveIconPath } from "src/models/icons";
import styles from "./resource-tracker.module.css";

import type { CharacterResource } from "src/models/class-resources";
import type { CharacterClass } from "src/models/classes";

type ResourceTrackerProps = {
  characterClass: CharacterClass;
  resources: CharacterResource[];
  onResourceChange: (resourceId: string, newCurrent: number) => void;
};

const RESOURCE_SHORT_NAMES: Record<string, string> = {
  rage: "RAGE",
  "bardic-inspiration": "BARD",
  "channel-divinity": "CHDIV",
  "wild-shape": "WILD",
  "second-wind": "2WND",
  "lay-on-hands": "LOH",
  "hunters-mark": "HUNT",
  "arcane-recovery": "ARC",
  "discipline-points": "DISC",
  "sorcery-points": "SORC",
  "spell-slot-1st": "SL.Ⅰ",
  "spell-slot-2nd": "SL.Ⅱ",
  "pact-magic-slot": "PACT",
};

type UseChip = {
  resourceId: string;
  useIndex: number;
  isReady: boolean;
  iconSrc: string;
  label: string;
  current: number;
};

type AnimatingChip = {
  resourceId: string;
  useIndex: number;
};

function buildChips(
  resources: CharacterResource[],
  characterClass: CharacterClass,
  resetFilter: "short-rest" | "long-rest",
): UseChip[] {
  return resources
    .filter(
      (r) => getResourceResetOn(characterClass, r.resourceId) === resetFilter,
    )
    .flatMap((r) => {
      const def = getResourceDefinition(r.resourceId);
      const iconSrc = resolveIconPath(def?.icon ?? "vol5/icon-vol5_02");
      const label =
        RESOURCE_SHORT_NAMES[r.resourceId] ??
        (def?.name ?? r.resourceId).slice(0, 5).toUpperCase();

      return Array.from({ length: r.max }, (_, i) => ({
        resourceId: r.resourceId,
        useIndex: i,
        isReady: i < r.current,
        iconSrc,
        label,
        current: r.current,
      }));
    });
}

function ResourceRow({
  resetType,
  label,
  chips,
  animatingChip,
  onChipClick,
}: {
  resetType: "short-rest" | "long-rest";
  label: string;
  chips: UseChip[];
  animatingChip: AnimatingChip | null;
  onChipClick: (chip: UseChip) => void;
}) {
  if (chips.length === 0) return null;

  return (
    <div className={styles.row}>
      <span
        className={c(
          styles.rowTag,
          resetType === "short-rest" ? styles.rowTagShort : styles.rowTagLong,
        )}
      >
        {label}
      </span>
      <fieldset className={styles.chipsRow} aria-label={label}>
        {chips.map((chip) => {
          const isDraining =
            animatingChip?.resourceId === chip.resourceId &&
            animatingChip?.useIndex === chip.useIndex;

          return (
            <ResourceChip
              key={`${chip.resourceId}-${chip.useIndex}`}
              iconSrc={chip.iconSrc}
              label={chip.label}
              isReady={chip.isReady}
              isDraining={isDraining}
              ariaLabel={`${chip.label}: ${chip.isReady ? "ready, click to spend" : "spent"}`}
              onClick={() => onChipClick(chip)}
            />
          );
        })}
      </fieldset>
    </div>
  );
}

export function ResourceTracker({
  characterClass,
  resources,
  onResourceChange,
}: ResourceTrackerProps) {
  const [animatingChip, setAnimatingChip] = useState<AnimatingChip | null>(
    null,
  );

  if (resources.length === 0) return null;

  const shortRestChips = buildChips(resources, characterClass, "short-rest");
  const longRestChips = buildChips(resources, characterClass, "long-rest");

  function handleChipClick(chip: UseChip) {
    if (animatingChip) return;
    setAnimatingChip({ resourceId: chip.resourceId, useIndex: chip.useIndex });
    setTimeout(() => {
      setAnimatingChip(null);
      onResourceChange(chip.resourceId, chip.current - 1);
    }, 320);
  }

  return (
    <Section accent title="Resources">
      <div className={styles.rows}>
        <ResourceRow
          resetType="short-rest"
          label="Short Rest"
          chips={shortRestChips}
          animatingChip={animatingChip}
          onChipClick={handleChipClick}
        />
        <ResourceRow
          resetType="long-rest"
          label="Long Rest"
          chips={longRestChips}
          animatingChip={animatingChip}
          onChipClick={handleChipClick}
        />
      </div>
    </Section>
  );
}
