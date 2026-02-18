import { useState } from "react";
import { EquipmentList } from "src/components/equipment-list/equipment-list";
import { ProficiencyGrid } from "src/components/proficiency-grid";
import { ScreenFlash } from "src/components/screen-flash/screen-flash";
import { Stepper } from "src/components/stepper/stepper";
import type { Character } from "src/models/character";
import { saveCharacter } from "src/models/character-storage";
import { CLASS_DETAILS } from "src/models/classes";
import {
  WIZARD_SPELLS_LEVEL_0,
  WIZARD_SPELLS_LEVEL_1,
} from "src/models/spells";
import { AbilityScores } from "./ability-scores";
import { ActionBar } from "./action-bar";
import { CharacterHeader } from "./character-header";
import { ExplorationBar } from "./exploration-bar";
import { HpTracker } from "./hp-tracker";
import { SpellCards } from "./spell-cards";

const WIZARD_SPELLS = [...WIZARD_SPELLS_LEVEL_0, ...WIZARD_SPELLS_LEVEL_1];

type CharacterSheetProps = {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
};

export function CharacterSheet({
  character,
  onCharacterUpdate,
}: CharacterSheetProps) {
  const [step, setStep] = useState(1);

  function updateCharacter(patch: Partial<Character>) {
    const updated = { ...character, ...patch };
    saveCharacter(updated);
    onCharacterUpdate(updated);
  }

  const spells = character.characterClass === "wizard" ? WIZARD_SPELLS : [];

  return (
    <>
      <ScreenFlash trigger={step} />
      <Stepper current={step} total={3} onStepChange={setStep} />

      {step === 1 && (
        <>
          <CharacterHeader
            name={character.name}
            race={character.race}
            characterClass={character.characterClass}
            level={character.level}
          />
          <HpTracker
            current={character.hp.current}
            max={character.hp.max}
            editable={false}
            onCurrentChange={(value) =>
              updateCharacter({ hp: { ...character.hp, current: value } })
            }
          />
          <AbilityScores
            scores={character.abilityScores}
            proficiencyBonus={character.proficiencyBonus}
          />
        </>
      )}

      {step === 2 && (
        <>
          <ActionBar characterClass={character.characterClass} />
          <ExplorationBar />

          {spells.length > 0 && <SpellCards spells={spells} />}
        </>
      )}

      {step === 3 && (
        <>
          <ProficiencyGrid
            proficiencies={
              CLASS_DETAILS[character.characterClass].proficiencies
            }
          />
          <EquipmentList
            mode="editable"
            equipment={character.equipment}
            onEquipmentChange={(equipment) => updateCharacter({ equipment })}
          />
        </>
      )}
    </>
  );
}
