import { useState } from "react";
import { Inventory } from "src/components/inventory/inventory";
import { ProficiencyGrid } from "src/components/proficiency-grid";
import { ScreenFlash } from "src/components/screen-flash/screen-flash";
import { Stepper } from "src/components/stepper/stepper";
import { saveCharacter } from "src/models/character-storage";
import { CLASS_DETAILS } from "src/models/classes";
import {
  WIZARD_SPELLS_LEVEL_0,
  WIZARD_SPELLS_LEVEL_1,
} from "src/models/spells";
import { ActionBar } from "./action-bar";
import { CharacterOverview } from "./character-overview";
import { ExplorationBar } from "./exploration-bar";
import { SpellCards } from "./spell-cards";

import type { Character } from "src/models/character";

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
        <CharacterOverview
          character={character}
          onHpChange={(value) =>
            updateCharacter({ hp: { ...character.hp, current: value } })
          }
        />
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
          <Inventory
            mode="editable"
            equipment={character.equipment}
            onEquipmentChange={(equipment) => updateCharacter({ equipment })}
          />
          <ProficiencyGrid
            proficiencies={
              CLASS_DETAILS[character.characterClass].proficiencies
            }
          />
        </>
      )}
    </>
  );
}
