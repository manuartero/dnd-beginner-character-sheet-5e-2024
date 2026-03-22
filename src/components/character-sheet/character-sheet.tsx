import c from "classnames";
import { ScreenFlash, Stepper } from "elements";
import { useState } from "react";
import { Inventory } from "src/components/inventory/inventory";
import { ProficiencyGrid } from "src/components/proficiency-grid/proficiency-grid";
import { useScrollDirection } from "src/hooks/use-scroll-direction";
import {
  computeArmorClass,
  computeInitiative,
  computeSpellAttack,
} from "src/models/character-stats";
import { saveCharacter } from "src/models/character-storage";
import { applyRest } from "src/models/class-resources";
import { CLASS_DETAILS } from "src/models/classes";
import {
  WIZARD_CANTRIP_SELECTION,
  WIZARD_LEVEL1_SELECTION,
  WIZARD_SPELLS_LEVEL_0,
  WIZARD_SPELLS_LEVEL_1,
} from "src/models/spells";
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

import type { Character } from "src/models/character";
import type { RestType } from "src/models/class-resources";

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
  const [hoveredRest, setHoveredRest] = useState<RestType | null>(null);
  const { isVisible } = useScrollDirection();

  function updateCharacter(patch: Partial<Character>) {
    const updated = { ...character, ...patch };
    saveCharacter(updated);
    onCharacterUpdate(updated);
  }

  const classDetails = CLASS_DETAILS[character.characterClass];
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

  const spellsReady =
    !isSpellcaster ||
    (character.spells.filter((s) => s.level === 0).length >=
      WIZARD_CANTRIP_SELECTION &&
      character.spells.filter((s) => s.level > 0).length >=
        WIZARD_LEVEL1_SELECTION);
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
    setHoveredRest(null);
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
            step === 3 ? (hoveredRest ?? undefined) : undefined
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
                selectedRest={hoveredRest}
                onSelect={setHoveredRest}
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
            availableCantrips={WIZARD_SPELLS_LEVEL_0}
            availableLevel1={WIZARD_SPELLS_LEVEL_1}
            selectedSpells={character.spells}
            cantripLimit={WIZARD_CANTRIP_SELECTION}
            level1Limit={WIZARD_LEVEL1_SELECTION}
            onSpellsChange={(spells) => updateCharacter({ spells })}
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
