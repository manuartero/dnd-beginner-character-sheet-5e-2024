import { useEffect, useRef, useState } from "react";
import { AbilityCard } from "src/components/ability-card";
import { RetroRadio } from "src/components/character-creation/retro-radio";
import { HpTracker } from "src/components/character-sheet/hp-tracker";
import { Section } from "src/components/section";
import recommendedData from "src/data/recommended-scores.json";
import { useExpandable } from "src/hooks/use-expandable";
import type { AbilityName, AbilityScores } from "src/models/abilities";
import {
  ABILITY_LIST,
  computeModifier,
  formatModifier,
} from "src/models/abilities";
import { type CharacterClass, CLASS_DETAILS } from "src/models/classes";
import { OriginBonusPicker } from "./origin-bonus-picker";
import styles from "./step-abilities.module.css";
import { isValidScore } from "./validation";

type AbilityScoreMode = "quick-start" | "customize" | "advanced";

const STANDARD_ARRAY: number[] = recommendedData.standardArray;

const RECOMMENDED_SCORES: Record<string, AbilityScores> =
  recommendedData.recommended as Record<string, AbilityScores>;

const MODE_OPTIONS: {
  value: AbilityScoreMode;
  label: string;
  description: string;
}[] = [
  {
    value: "quick-start",
    label: "Quick Start",
    description: "Recommended scores for your class",
  },
  {
    value: "customize",
    label: "Customize",
    description: "Assign the standard array as you wish",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Type any value for each ability",
  },
];

function parseHitDieMax(hitDie: string): number {
  return Number.parseInt(hitDie.replace("d", ""), 10);
}

const EMPTY_SCORES: AbilityScores = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};

const DEFAULT_SCORES: AbilityScores = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
};

type StepAbilitiesProps = {
  characterClass: CharacterClass | null;
  scores: AbilityScores;
  onScoresChange: (scores: AbilityScores) => void;
  onHpMaxChange: (hpMax: number) => void;
  abilityOptions: [AbilityName, AbilityName, AbilityName] | null;
  abilityBonuses: Partial<Record<AbilityName, number>>;
  onAbilityBonusesChange: (
    bonuses: Partial<Record<AbilityName, number>>,
  ) => void;
};

export function StepAbilities({
  characterClass,
  scores,
  onScoresChange,
  onHpMaxChange,
  abilityOptions,
  abilityBonuses,
  onAbilityBonusesChange,
}: StepAbilitiesProps) {
  const primaryAbilities = characterClass
    ? CLASS_DETAILS[characterClass].primaryAbilities
    : [];

  const [mode, setMode] = useState<AbilityScoreMode>("quick-start");

  const [rawScores, setRawScores] = useState<Record<AbilityName, string>>(
    () => {
      const entries = Object.entries(scores) as [AbilityName, number][];
      return Object.fromEntries(
        entries.map(([key, val]) => [key, String(val)]),
      ) as Record<AbilityName, string>;
    },
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { expandedKey: flippedAbility, toggle: toggleFlip } =
    useExpandable<AbilityName>();

  const onScoresChangeRef = useRef(onScoresChange);
  onScoresChangeRef.current = onScoresChange;

  useEffect(() => {
    if (mode === "quick-start" && characterClass) {
      const recommended = RECOMMENDED_SCORES[characterClass];
      onScoresChangeRef.current(recommended);
      const entries = Object.entries(recommended) as [AbilityName, number][];
      setRawScores(
        Object.fromEntries(entries.map(([k, v]) => [k, String(v)])) as Record<
          AbilityName,
          string
        >,
      );
    }
  }, [mode, characterClass]);

  const onHpMaxChangeRef = useRef(onHpMaxChange);
  onHpMaxChangeRef.current = onHpMaxChange;

  const conScore = scores.con + (abilityBonuses.con ?? 0);
  const conModifier = computeModifier(conScore);
  const hitDieMax = characterClass
    ? parseHitDieMax(CLASS_DETAILS[characterClass].hitDie)
    : 0;
  const calculatedHp = characterClass
    ? Math.max(1, hitDieMax + conModifier)
    : 0;

  useEffect(() => {
    if (calculatedHp > 0) {
      onHpMaxChangeRef.current(calculatedHp);
    }
  }, [calculatedHp]);

  const [assignments, setAssignments] = useState<
    Record<AbilityName, number | null>
  >({
    str: null,
    dex: null,
    con: null,
    int: null,
    wis: null,
    cha: null,
  });

  function handleModeChange(newMode: AbilityScoreMode) {
    setMode(newMode);
    if (newMode === "quick-start" && characterClass) {
      const recommended = RECOMMENDED_SCORES[characterClass];
      onScoresChange(recommended);
      syncRawScores(recommended);
    } else if (newMode === "customize") {
      onScoresChange(EMPTY_SCORES);
      syncRawScores(EMPTY_SCORES);
      setAssignments({
        str: null,
        dex: null,
        con: null,
        int: null,
        wis: null,
        cha: null,
      });
    } else {
      onScoresChange(DEFAULT_SCORES);
      syncRawScores(DEFAULT_SCORES);
    }
  }

  function syncRawScores(s: AbilityScores) {
    const entries = Object.entries(s) as [AbilityName, number][];
    setRawScores(
      Object.fromEntries(
        entries.map(([key, val]) => [key, String(val)]),
      ) as Record<AbilityName, string>,
    );
  }

  function handleScoreChange(ability: AbilityName, value: string) {
    setRawScores((prev) => ({ ...prev, [ability]: value }));
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      onScoresChange({ ...scores, [ability]: parsed });
    }
  }

  function handleAssign(ability: AbilityName, value: number | null) {
    const next = { ...assignments, [ability]: value };
    setAssignments(next);
    const nextScores = { ...EMPTY_SCORES };
    for (const [key, val] of Object.entries(next)) {
      if (val !== null) {
        nextScores[key as AbilityName] = val;
      }
    }
    onScoresChange(nextScores);
    syncRawScores(nextScores);
  }

  function handleBlur(ability: AbilityName) {
    setTouched((prev) => ({ ...prev, [ability]: true }));
  }

  function computeAvailableValues(ability: AbilityName): number[] {
    const usedValues = Object.entries(assignments)
      .filter(([key, val]) => key !== ability && val !== null)
      .map(([, val]) => val as number);

    const pool = [...STANDARD_ARRAY];
    for (const used of usedValues) {
      const idx = pool.indexOf(used);
      if (idx !== -1) {
        pool.splice(idx, 1);
      }
    }
    return pool;
  }

  return (
    <>
      <Section title="Ability Scores">
        <div className={styles.modeSelector}>
          <RetroRadio
            options={MODE_OPTIONS}
            selected={mode}
            name="ability-score-mode"
            onSelect={handleModeChange}
          />
        </div>

        <div className={styles.grid}>
          {ABILITY_LIST.map(({ key, short }) => {
            const bonus = abilityBonuses[key] ?? 0;

            if (mode === "quick-start") {
              const raw = rawScores[key];
              const baseScore = Number.parseInt(raw, 10) || 10;
              return (
                <AbilityCard
                  key={key}
                  mode="creation"
                  readOnly
                  abilityKey={key}
                  short={short}
                  score={baseScore + bonus}
                  isFlipped={flippedAbility === key}
                  proficiencyBonus={2}
                  onToggle={toggleFlip}
                  rawScore={raw}
                  isPrimary={primaryAbilities.includes(key)}
                  bonus={bonus}
                  showError={false}
                  onScoreChange={handleScoreChange}
                  onBlur={handleBlur}
                />
              );
            }

            if (mode === "customize") {
              const selected = assignments[key];
              const baseScore = selected ?? 10;
              return (
                <AbilityCard
                  key={key}
                  mode="assign"
                  abilityKey={key}
                  short={short}
                  score={baseScore + bonus}
                  isFlipped={flippedAbility === key}
                  proficiencyBonus={2}
                  onToggle={toggleFlip}
                  isPrimary={primaryAbilities.includes(key)}
                  bonus={bonus}
                  availableValues={computeAvailableValues(key)}
                  selectedValue={selected}
                  onAssign={handleAssign}
                />
              );
            }

            const raw = rawScores[key];
            const showError = touched[key] && !isValidScore(raw);
            const baseScore = isValidScore(raw) ? Number.parseInt(raw, 10) : 10;
            return (
              <AbilityCard
                key={key}
                mode="creation"
                abilityKey={key}
                short={short}
                score={baseScore + bonus}
                isFlipped={flippedAbility === key}
                proficiencyBonus={2}
                onToggle={toggleFlip}
                rawScore={raw}
                isPrimary={primaryAbilities.includes(key)}
                bonus={bonus}
                showError={showError}
                onScoreChange={handleScoreChange}
                onBlur={handleBlur}
              />
            );
          })}
        </div>
      </Section>

      {abilityOptions && (
        <OriginBonusPicker
          abilityOptions={abilityOptions}
          abilityBonuses={abilityBonuses}
          onAbilityBonusesChange={onAbilityBonusesChange}
        />
      )}

      {characterClass && calculatedHp > 0 && (
        <HpTracker
          mode="creation"
          max={calculatedHp}
          description={`Hit Die: ${CLASS_DETAILS[characterClass].hitDie} (from ${CLASS_DETAILS[characterClass].label}) + CON modifier (${formatModifier(conModifier)})`}
        />
      )}
    </>
  );
}
