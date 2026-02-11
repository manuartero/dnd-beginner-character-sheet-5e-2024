import { useState } from "react";
import type { Background } from "src/data/backgrounds";
import { BACKGROUND_LIST } from "src/data/backgrounds";
import { saveCharacter } from "src/data/character-storage";
import type {
  AbilityName,
  AbilityScores,
  Character,
  CharacterClass,
  CharacterRace,
} from "src/data/types";
import { totalBonuses } from "src/utils/total-bonuses";
import styles from "./creation-wizard.module.css";
import { WizardActions } from "src/components/wizard-actions";
import {
  isValidHp,
  isValidScore,
  WizardStepAbilities,
} from "src/components/wizard-step-abilities";
import { WizardStepIdentity } from "src/components/wizard-step-identity";
import { WizardStepOrigin } from "src/components/wizard-step-origin";

interface CreationWizardProps {
  onSave: (character: Character) => void;
}

interface DraftState {
  name: string;
  characterClass: CharacterClass | null;
  race: CharacterRace | null;
  background: Background | null;
  abilityScores: AbilityScores;
  abilityBonuses: Partial<Record<AbilityName, number>>;
  hpMax: number;
}

export function CreationWizard({ onSave }: CreationWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
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

  const step1Complete =
    draft.name.trim() !== "" &&
    draft.characterClass !== null &&
    draft.race !== null;

  const step2Complete = draft.background !== null;

  const step3Complete =
    Object.values(draft.abilityScores).every((v) => isValidScore(String(v))) &&
    isValidHp(String(draft.hpMax)) &&
    totalBonuses(draft.abilityBonuses) === 3;

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
      </div>

      {step === 1 && (
        <>
          <WizardStepIdentity
            name={draft.name}
            characterClass={draft.characterClass}
            race={draft.race}
            onNameChange={(name) => setDraft((prev) => ({ ...prev, name }))}
            onClassChange={(characterClass) =>
              setDraft((prev) => ({
                ...prev,
                characterClass,
              }))
            }
            onRaceChange={(race) => setDraft((prev) => ({ ...prev, race }))}
          />
          <WizardActions
            onNext={() => setStep(2)}
            nextDisabled={!step1Complete}
          />
        </>
      )}

      {step === 2 && (
        <>
          <WizardStepOrigin
            background={draft.background}
            onBackgroundChange={handleBackgroundChange}
          />
          <WizardActions
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            nextDisabled={!step2Complete}
          />
        </>
      )}

      {step === 3 && (
        <>
          <WizardStepAbilities
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
          <WizardActions
            onBack={() => setStep(2)}
            onNext={handleCreate}
            nextLabel="Create"
            nextDisabled={!step3Complete}
          />
        </>
      )}
    </>
  );
}
