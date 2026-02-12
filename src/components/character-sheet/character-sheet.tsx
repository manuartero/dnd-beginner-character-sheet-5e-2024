import { saveCharacter } from "src/models/character-storage";
import { WIZARD_CANTRIPS, WIZARD_SPELLS_LEVEL_1 } from "src/models/spells";
import type { Character } from "src/models/types";
import { AbilityScores } from "./ability-scores";
import { ActionBar } from "./action-bar";
import { CharacterHeader } from "./character-header";
import { EquipmentList } from "./equipment-list";
import { HpTracker } from "./hp-tracker";
import { SpellCards } from "./spell-cards";

type CharacterSheetProps = {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
};

export function CharacterSheet({
  character,
  onCharacterUpdate,
}: CharacterSheetProps) {
  function updateCharacter(patch: Partial<Character>) {
    const updated = { ...character, ...patch };
    saveCharacter(updated);
    onCharacterUpdate(updated);
  }

  const spells =
    character.characterClass === "wizard"
      ? [...WIZARD_CANTRIPS, ...WIZARD_SPELLS_LEVEL_1]
      : [];

  return (
    <>
      <CharacterHeader
        name={character.name}
        race={character.race}
        characterClass={character.characterClass}
        level={character.level}
      />

      <AbilityScores
        scores={character.abilityScores}
        editable={false}
        proficiencyBonus={character.proficiencyBonus}
      />

      <HpTracker
        current={character.hp.current}
        max={character.hp.max}
        editable={false}
        onCurrentChange={(value) =>
          updateCharacter({ hp: { ...character.hp, current: value } })
        }
      />

      <ActionBar characterClass={character.characterClass} />

      {spells.length > 0 && <SpellCards spells={spells} />}

      <EquipmentList
        equipment={character.equipment}
        onEquipmentChange={(equipment) => updateCharacter({ equipment })}
      />
    </>
  );
}
