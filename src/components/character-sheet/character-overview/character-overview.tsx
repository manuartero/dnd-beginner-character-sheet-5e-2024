import { computeArmorClass } from "src/models/compute-ac";
import { AbilityScores } from "../ability-scores";
import { AcDisplay } from "../ac-display";
import { CharacterHeader } from "../character-header";
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
  const { total, lines } = computeArmorClass({
    equipment: character.equipment,
    abilityScores: character.abilityScores,
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
      <AcDisplay total={total} lines={lines} />
      <AbilityScores
        scores={character.abilityScores}
        proficiencyBonus={character.proficiencyBonus}
      />
    </>
  );
}
