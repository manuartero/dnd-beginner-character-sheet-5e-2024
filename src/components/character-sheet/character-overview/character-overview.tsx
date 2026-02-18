import {
  computeArmorClass,
  computeInitiative,
  computeSpellAttack,
} from "src/models/character-stats";
import { AbilityScores } from "../ability-scores";
import { CharacterHeader } from "../character-header";
import { CombatStats } from "../combat-stats";
import { HpTracker } from "../hp-tracker";

import type { Character } from "src/models/character";

type CharacterOverviewProps = {
  character: Character;
  onHpChange: (value: number) => void;
};

export function CharacterOverview({
  character,
  onHpChange,
}: CharacterOverviewProps) {
  const ac = computeArmorClass({
    equipment: character.equipment,
    abilityScores: character.abilityScores,
  });
  const initiative = computeInitiative(character.abilityScores);
  const spellAttack = computeSpellAttack({
    characterClass: character.characterClass,
    abilityScores: character.abilityScores,
    proficiencyBonus: character.proficiencyBonus,
  });

  return (
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
        onCurrentChange={onHpChange}
      />
      <CombatStats initiative={initiative} ac={ac} spellAttack={spellAttack} />
      <AbilityScores
        scores={character.abilityScores}
        proficiencyBonus={character.proficiencyBonus}
      />
    </>
  );
}
