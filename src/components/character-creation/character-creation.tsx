import { useState } from "react";
import { totalBonuses } from "src/components/character-creation/total-bonuses";
import type { AbilityName, AbilityScores } from "src/models/abilities";
import type { Background } from "src/models/backgrounds";
import { BACKGROUND_LIST } from "src/models/backgrounds";
import type { Character } from "src/models/character";
import { saveCharacter } from "src/models/character-storage";
import type { CharacterClass } from "src/models/classes";
import type { Species } from "src/models/species";
import styles from "./character-creation.module.css";
import { CreationActions } from "./creation-actions";
import { isValidHp, isValidScore, StepAbilities } from "./step-abilities";
import { StepClass } from "./step-class";
import { StepName } from "./step-name";
import { StepOrigin } from "./step-origin";
import { StepSpecies } from "./step-species";

type CharacterCreationProps = {
  onSave: (character: Character) => void;
};

type DraftState = {
  name: string;
  characterClass: CharacterClass | null;
  race: Species | null;
  background: Background | null;
  abilityScores: AbilityScores;
  abilityBonuses: Partial<Record<AbilityName, number>>;
  hpMax: number;
};

export function CharacterCreation({ onSave }: CharacterCreationProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [draft, setDraft] = useState<DraftState>({
    name: "",
    characterClass: null,
    race: null,
    background: null,
    abilityScores: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    abilityBonuses: {},
    hpMax: 10,
  });

  const step1Complete = draft.characterClass !== null;

  const step2Complete = draft.race !== null;

  const step3Complete = draft.background !== null;

  const step4Complete =
    Object.values(draft.abilityScores).every((v) => isValidScore(String(v))) &&
    isValidHp(String(draft.hpMax)) &&
    totalBonuses(draft.abilityBonuses) === 3;

  const step5Complete = draft.name.trim() !== "";

  const backgroundEntry = draft.background
    ? BACKGROUND_LIST.find((b) => b.key === draft.background)
    : null;

  function handleBackgroundChange(background: Background) {
    setDraft((prev) => ({
      ...prev,
      background,
      abilityBonuses: {},
    }));
  }

  function handleCreate() {
    if (!draft.characterClass || !draft.race) return;
    const character: Character = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      race: draft.race,
      characterClass: draft.characterClass,
      background: draft.background ?? undefined,
      level: 1,
      abilityScores: draft.abilityScores,
      hp: { current: draft.hpMax, max: draft.hpMax },
      ac: 10,
      proficiencyBonus: 2,
      spells: [],
      equipment: [],
    };
    saveCharacter(character);
    onSave(character);
  }

  return (
    <>
      <div className={styles.stepIndicator}>
        <button
          type="button"
          className={`${styles.dot} ${step >= 1 ? styles.dotActive : ""}`}
          onClick={() => setStep(1)}
        />
        <button
          type="button"
          className={`${styles.dot} ${step >= 2 ? styles.dotActive : ""}`}
          onClick={() => setStep(2)}
        />
        <button
          type="button"
          className={`${styles.dot} ${step >= 3 ? styles.dotActive : ""}`}
          onClick={() => setStep(3)}
        />
        <button
          type="button"
          className={`${styles.dot} ${step >= 4 ? styles.dotActive : ""}`}
          onClick={() => setStep(4)}
        />
        <button
          type="button"
          className={`${styles.dot} ${step >= 5 ? styles.dotActive : ""}`}
          onClick={() => setStep(5)}
        />
      </div>

      {step === 1 && (
        <>
          <StepClass
            characterClass={draft.characterClass}
            onClassChange={(characterClass) =>
              setDraft((prev) => ({
                ...prev,
                characterClass,
              }))
            }
          />
          <CreationActions
            onNext={() => setStep(2)}
            nextDisabled={!step1Complete}
          />
        </>
      )}

      {step === 2 && (
        <>
          <StepSpecies
            race={draft.race}
            onRaceChange={(race) => setDraft((prev) => ({ ...prev, race }))}
          />
          <CreationActions
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            nextDisabled={!step2Complete}
          />
        </>
      )}

      {step === 3 && (
        <>
          <StepOrigin
            background={draft.background}
            onBackgroundChange={handleBackgroundChange}
          />
          <CreationActions
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
            nextDisabled={!step3Complete}
          />
        </>
      )}

      {step === 4 && (
        <>
          <StepAbilities
            characterClass={draft.characterClass}
            scores={draft.abilityScores}
            hpMax={draft.hpMax}
            onScoresChange={(abilityScores) =>
              setDraft((prev) => ({
                ...prev,
                abilityScores,
              }))
            }
            onHpMaxChange={(hpMax) => setDraft((prev) => ({ ...prev, hpMax }))}
            abilityOptions={backgroundEntry?.abilityOptions ?? null}
            abilityBonuses={draft.abilityBonuses}
            onAbilityBonusesChange={(abilityBonuses) =>
              setDraft((prev) => ({
                ...prev,
                abilityBonuses,
              }))
            }
          />
          <CreationActions
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
            nextDisabled={!step4Complete}
          />
        </>
      )}

      {step === 5 && (
        <>
          <StepName
            name={draft.name}
            onNameChange={(name) => setDraft((prev) => ({ ...prev, name }))}
          />
          <CreationActions
            onBack={() => setStep(4)}
            onNext={handleCreate}
            nextLabel="Create"
            nextDisabled={!step5Complete}
          />
        </>
      )}
    </>
  );
}
