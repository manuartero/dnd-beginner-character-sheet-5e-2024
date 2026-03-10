import c from "classnames";
import { Section } from "elements";
import { useState } from "react";
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

const RESOURCE_ICONS: Record<string, string> = {
  rage: "★",
  "bardic-inspiration": "♪",
  "channel-divinity": "◇",
  "wild-shape": "◈",
  "second-wind": "○",
  "lay-on-hands": "◆",
  "hunters-mark": "◎",
  "arcane-recovery": "●",
  "discipline-points": "▲",
  "sorcery-points": "◉",
  "spell-slot-1st": "Ⅰ",
  "spell-slot-2nd": "Ⅱ",
  "pact-magic-slot": "∞",
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
  icon: string;
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
    .flatMap((r) =>
      Array.from({ length: r.max }, (_, i) => ({
        resourceId: r.resourceId,
        useIndex: i,
        isReady: i < r.current,
        icon: RESOURCE_ICONS[r.resourceId] ?? "◦",
        label:
          RESOURCE_SHORT_NAMES[r.resourceId] ??
          (getResourceDefinition(r.resourceId)?.name ?? r.resourceId)
            .slice(0, 5)
            .toUpperCase(),
        current: r.current,
      })),
    );
}

function UseChipButton({
  chip,
  animatingChip,
  onClick,
}: {
  chip: UseChip;
  animatingChip: AnimatingChip | null;
  onClick: (chip: UseChip) => void;
}) {
  const isAnimating =
    animatingChip?.resourceId === chip.resourceId &&
    animatingChip?.useIndex === chip.useIndex;

  return (
    <button
      type="button"
      aria-label={`${chip.label}: ${chip.isReady ? "ready, click to spend" : "spent"}`}
      disabled={!chip.isReady}
      className={c(
        styles.chip,
        !chip.isReady && styles.chipSpent,
        isAnimating && styles.chipDraining,
      )}
      onClick={() => onClick(chip)}
    >
      <span className={styles.chipIcon} aria-hidden>
        {chip.icon}
      </span>
      <span className={styles.chipLabel}>{chip.label}</span>
    </button>
  );
}

function ResourceRow({
  resetType,
  label,
  symbol,
  chips,
  animatingChip,
  onChipClick,
}: {
  resetType: "short-rest" | "long-rest";
  label: string;
  symbol: string;
  chips: UseChip[];
  animatingChip: AnimatingChip | null;
  onChipClick: (chip: UseChip) => void;
}) {
  if (chips.length === 0) return null;

  return (
    <div className={styles.row}>
      <span
        className={c(
          styles.rowLabel,
          resetType === "short-rest"
            ? styles.rowLabelShort
            : styles.rowLabelLong,
        )}
        aria-label={label}
        title={label}
      >
        {symbol}
      </span>
      <div className={styles.chipsRow} role="group" aria-label={label}>
        {chips.map((chip) => (
          <UseChipButton
            key={`${chip.resourceId}-${chip.useIndex}`}
            chip={chip}
            animatingChip={animatingChip}
            onClick={onChipClick}
          />
        ))}
      </div>
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
    setAnimatingChip({ resourceId: chip.resourceId, useIndex: chip.useIndex });
    setTimeout(() => {
      setAnimatingChip(null);
      onResourceChange(chip.resourceId, chip.current - 1);
    }, 320);
  }

  return (
    <Section accent title="Class Resources">
      <div className={styles.rows}>
        <ResourceRow
          resetType="short-rest"
          label="Short Rest"
          symbol="↺"
          chips={shortRestChips}
          animatingChip={animatingChip}
          onChipClick={handleChipClick}
        />
        <ResourceRow
          resetType="long-rest"
          label="Long Rest"
          symbol="☽"
          chips={longRestChips}
          animatingChip={animatingChip}
          onChipClick={handleChipClick}
        />
      </div>
    </Section>
  );
}
