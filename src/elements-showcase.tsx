import {
  AbilityCard,
  ActionChip,
  CastSpellGrid,
  ChipGrid,
  InlineConfirm,
  RetroRadio,
  RowList,
  ScreenFlash,
  ScreenFlashProvider,
  Section,
  Stepper,
} from "elements";
import { useState } from "react";
import { resolveIconPath } from "src/models/icons";

function ShowcaseBlock({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: "2rem",
        border: "1px dashed var(--color-border, #444)",
        padding: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "var(--color-muted, #888)",
          marginBottom: "0.5rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {"<"}
        {name}
        {" />"}
      </h2>
      {children}
    </div>
  );
}

const SAMPLE_ICON = resolveIconPath("vol1/icon-vol1_29");

export function ElementsShowcase() {
  const [step, setStep] = useState(1);
  const [radioValue, setRadioValue] = useState("a");
  const [selectedGrid, setSelectedGrid] = useState<string | null>("opt1");
  const [flashTrigger, setFlashTrigger] = useState(0);

  return (
    <ScreenFlashProvider>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "1rem" }}>
        <h1
          style={{
            fontFamily: "monospace",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Elements
        </h1>

        <ShowcaseBlock name="Section">
          <Section title="Example Section">
            <p>Content inside a Section element.</p>
          </Section>
        </ShowcaseBlock>

        <ShowcaseBlock name="AbilityCard">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
            }}
          >
            <AbilityCard mode="display" abilityKey="str" score={16} />

            <AbilityCard
              mode="creation"
              abilityKey="con"
              score={14}
              rawScore="14"
              bonus={1}
              onScoreChange={() => {}}
            />
            <AbilityCard
              mode="creation"
              abilityKey="wis"
              score={10}
              rawScore="10"
              bonus={0}
              readOnly
            />
            <AbilityCard mode="display" abilityKey="dex" score={12} isFlipped />
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock name="Stepper">
          <Stepper
            current={step}
            total={4}
            labels={["One", "Two", "Three", "Four"]}
            completedSteps={[1, 2]}
            warnedSteps={[3]}
            onStepChange={setStep}
          />
        </ShowcaseBlock>

        <ShowcaseBlock name="ChipGrid">
          <ChipGrid
            actions={[
              {
                key: "opt1",
                label: "Fighter",
                icon: SAMPLE_ICON,
                description: "A versatile warrior skilled in combat.",
              },
              {
                key: "opt2",
                label: "Wizard",
                icon: SAMPLE_ICON,
                description:
                  "A master of arcane magic with a wide range of spells.",
              },
              {
                key: "opt3",
                label: "Rogue",
                icon: SAMPLE_ICON,
                description:
                  "A stealthy and dexterous character, skilled in sneaking and thievery.",
              },
            ]}
            selectedKey={selectedGrid}
            onSelect={setSelectedGrid}
          />
        </ShowcaseBlock>

        <ShowcaseBlock name="ActionChip">
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <ActionChip
              label="AC"
              iconSrc={SAMPLE_ICON}
              value="15"
              buttonRef={() => {}}
              onClick={() => {}}
            />
            <ActionChip
              label="Init"
              iconSrc={SAMPLE_ICON}
              value="+2"
              isInactive
              buttonRef={() => {}}
              onClick={() => {}}
            />
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock name="InlineConfirm">
          <InlineConfirm
            label="Delete this item?"
            onConfirm={() => alert("Confirmed")}
            onCancel={() => alert("Cancelled")}
          />
        </ShowcaseBlock>

        <ShowcaseBlock name="RetroRadio">
          <RetroRadio
            options={[
              { value: "a", label: "Option A", description: "First option" },
              { value: "b", label: "Option B", description: "Second option" },
              { value: "c", label: "Option C" },
            ]}
            selected={radioValue}
            name="showcase-radio"
            onSelect={setRadioValue}
          />
        </ShowcaseBlock>

        <ShowcaseBlock name="RowList">
          <RowList
            title="Equipment"
            ariaLabel="Sample equipment list"
            items={[
              { index: 0, item: "Longsword" },
              { index: 1, item: "Shield" },
              { index: 2, item: "Chain mail" },
            ]}
            renderItem={(item) => <span>{item}</span>}
          />
        </ShowcaseBlock>

        <ShowcaseBlock name="CastSpellGrid">
          <CastSpellGrid
            spells={[
              {
                id: "demo-1",
                name: "Fire Bolt",
                level: 0,
                school: "Evocation",
                castingTime: "1 action",
                range: "120 feet",
                duration: "Instantaneous",
                components: "V, S",
                description: "A beam of fire shoots from your hand.",
                damage: { dice: "1d10", type: "fire" },
                concentration: false,
                ritual: false,
              },
              {
                id: "demo-2",
                name: "Shield",
                level: 1,
                school: "Abjuration",
                castingTime: "1 reaction",
                range: "Self",
                duration: "1 round",
                components: "V, S",
                description:
                  "An invisible barrier of magical force appears and protects you.",
                concentration: false,
                ritual: false,
              },
            ]}
          />
        </ShowcaseBlock>

        <ShowcaseBlock name="ScreenFlash">
          <ScreenFlash trigger={flashTrigger} />
          <button type="button" onClick={() => setFlashTrigger((n) => n + 1)}>
            Trigger Flash
          </button>
        </ShowcaseBlock>
      </div>
    </ScreenFlashProvider>
  );
}
