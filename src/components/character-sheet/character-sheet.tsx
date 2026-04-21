import c from "classnames";
import { ScreenFlash, Stepper } from "elements";
import { useState } from "react";
import {
  computeArmorClass,
  computeInitiative,
  computeSpellAttack,
} from "src/character/character-stats";
import { Inventory } from "src/components/inventory/inventory";
import { ProficiencyGrid } from "src/components/proficiency-grid/proficiency-grid";
import { useScrollDirection } from "src/hooks/use-scroll-direction";
import { applyRest } from "src/models/class/class-resources";
import { classes } from "src/models/class/classes";
import { spells } from "src/models/spells/spells";
import { saveCharacter } from "src/services/character-storage";
import { ActionBar } from "./action-bar";
import { CharacterOverview } from "./character-overview";
import styles from "./character-sheet.module.css";
import { CombatStats } from "./combat-stats";
import { ExplorationBar } from "./exploration-bar";
import { ResourceTracker } from "./resource-tracker";
import { RestBar } from "./rest-bar";
import { SpellBook } from "./spell-book";
import { SpellCards } from "./spell-cards";
import { WeaponMastery } from "./weapon-mastery";

import type { Character } from "src/character/character";
import type { RestType } from "src/models/class/class-resources";

const STEP_LABELS = ["Stats", "Combat", "Explore", "Spells & Skills", "Gear"];

const WEAPON_MASTERY_CLASSES = new Set([
  "fighter",
  "paladin",
  "ranger",
  "rogue",
]);

type CharacterSheetProps = {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
};

export function CharacterSheet({
  character,
  onCharacterUpdate,
}: CharacterSheetProps) {
  const [step, setStep] = useState(1);
  const [selectedRest, setSelectedRest] = useState<RestType | null>(null);
  const { isVisible } = useScrollDirection();

  function updateCharacter(patch: Partial<Character>) {
    const updated = { ...character, ...patch };
    saveCharacter(updated);
    onCharacterUpdate(updated);
  }

  const classDetails = classes.get({ id: character.characterClass });
  const isSpellcaster = classDetails.manualClassification !== "martial";
  const needsWeaponMastery = WEAPON_MASTERY_CLASSES.has(
    character.characterClass,
  );

  const ritualSpells = character.spells.filter((s) => s.ritual);

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

  const cls = character.characterClass;
  const spellsReady =
    !isSpellcaster ||
    (character.spells.filter((s) => s.level === 0).length >=
      spells.limit({ cls, level: 0 }) &&
      character.spells.filter((s) => s.level > 0).length >=
        spells.limit({ cls, level: 1 }));
  const warnedSteps = spellsReady ? [] : [4];

  const resourceChangeHandler = (resourceId: string, newCurrent: number) => {
    const classResources = character.classResources.map((r) =>
      r.resourceId === resourceId
        ? { ...r, current: Math.max(0, Math.min(newCurrent, r.max)) }
        : r,
    );
    updateCharacter({ classResources });
  };

  const restHandler = (type: RestType) => {
    updateCharacter({
      classResources: applyRest(
        type,
        character.classResources,
        character.characterClass,
      ),
    });
    setSelectedRest(null);
  };

  return (
    <>
      <ScreenFlash trigger={step} />

      {/* Resource HUD — visible on Combat and Explore tabs */}
      {character.classResources.length > 0 && (step === 2 || step === 3) && (
        <ResourceTracker
          characterClass={character.characterClass}
          resources={character.classResources}
          onResourceChange={resourceChangeHandler}
          highlightResetType={
            step === 3 ? (selectedRest ?? undefined) : undefined
          }
        />
      )}

      <div className={styles.sheet}>
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
            <CombatStats
              initiative={initiative}
              ac={ac}
              spellAttack={spellAttack}
            />
            <ActionBar
              characterClass={character.characterClass}
              spells={character.spells}
            />
          </>
        )}

        {step === 3 && (
          <>
            <ExplorationBar characterClass={character.characterClass} />
            {character.classResources.length > 0 && (
              <RestBar
                selectedRest={selectedRest}
                onSelect={setSelectedRest}
                onRest={restHandler}
              />
            )}
            {isSpellcaster && ritualSpells.length > 0 && (
              <SpellCards spells={ritualSpells} />
            )}
          </>
        )}

        {step === 4 && isSpellcaster && (
          <SpellBook
            availableCantrips={spells.findAll({ cls, level: 0 })}
            availableLevel1={spells.findAll({ cls, level: 1 })}
            selectedSpells={character.spells}
            cantripLimit={spells.limit({ cls, level: 0 })}
            level1Limit={spells.limit({ cls, level: 1 })}
            onSpellsChange={(updatedSpells) =>
              updateCharacter({ spells: updatedSpells })
            }
          />
        )}

        {step === 4 && needsWeaponMastery && (
          <WeaponMastery characterClass={character.characterClass} />
        )}

        {step === 5 && (
          <>
            <Inventory
              mode="editable"
              equipment={character.equipment}
              onEquipmentChange={(equipment) => updateCharacter({ equipment })}
            />
            <ProficiencyGrid proficiencies={classDetails.proficiencies} />
          </>
        )}
      </div>

      {/* Smart bottom nav — hides on scroll down, reappears on scroll up */}
      <nav className={c(styles.fixedNav, !isVisible && styles.fixedNavHidden)}>
        <Stepper
          current={step}
          total={5}
          labels={STEP_LABELS}
          warnedSteps={warnedSteps}
          onStepChange={setStep}
        />
      </nav>
    </>
  );
}
