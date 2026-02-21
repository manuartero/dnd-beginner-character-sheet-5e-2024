import { AbilityScores } from "src/components/character-sheet/ability-scores";
import { CharacterHeader } from "src/components/character-sheet/character-header";
import { HpTracker } from "src/components/character-sheet/hp-tracker";

import type { Character } from "src/models/character";

type CharacterOverviewProps = {
  character: Character;
  onHpChange: (value: number) => void;
};

export function CharacterOverview({
  character,
  onHpChange,
}: CharacterOverviewProps) {
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
      <AbilityScores
        scores={character.abilityScores}
        proficiencyBonus={character.proficiencyBonus}
      />
    </>
  );
}
