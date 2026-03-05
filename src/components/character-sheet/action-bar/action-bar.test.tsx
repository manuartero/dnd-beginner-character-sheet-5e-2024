import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionBar } from "./action-bar";

import type { Spell } from "src/models/spells";

function makeSpell(overrides: Partial<Spell> = {}): Spell {
  return {
    id: "test-spell",
    name: "Test Spell",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 ft",
    components: "V, S",
    duration: "Instantaneous",
    concentration: false,
    ritual: false,
    description: "A test spell.",
    ...overrides,
  };
}

const CAST_SPELL_ACCESSIBLE_NAME = "Cast a Spell";

describe("<ActionBar />", () => {
  it("renders the Combat section", () => {
    render(<ActionBar characterClass="fighter" spells={[]} />);
    expect(screen.getByRole("region", { name: "Combat" })).toBeInTheDocument();
  });

  it("does not show Cast a Spell for martial classes", () => {
    render(<ActionBar characterClass="fighter" spells={[]} />);
    expect(
      screen.queryByRole("button", { name: CAST_SPELL_ACCESSIBLE_NAME }),
    ).not.toBeInTheDocument();
  });

  it("shows disabled Cast a Spell for spellcasters with no spells", () => {
    render(<ActionBar characterClass="wizard" spells={[]} />);
    const buttons = screen.getAllByRole("button", {
      name: CAST_SPELL_ACCESSIBLE_NAME,
    });
    for (const button of buttons) {
      expect(button).toBeDisabled();
    }
  });

  it("shows enabled Cast a Spell in Actions when action spells exist", () => {
    const spells = [makeSpell({ id: "fire-bolt", castingTime: "1 action" })];
    render(<ActionBar characterClass="wizard" spells={spells} />);

    const buttons = screen.getAllByRole("button", {
      name: CAST_SPELL_ACCESSIBLE_NAME,
    });
    const enabledButtons = buttons.filter((b) => !b.hasAttribute("disabled"));
    expect(enabledButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows enabled Cast a Spell when bonus action spells exist", () => {
    const spells = [
      makeSpell({ id: "blade-ward", castingTime: "1 bonus action" }),
    ];
    render(<ActionBar characterClass="wizard" spells={spells} />);

    const buttons = screen.getAllByRole("button", {
      name: CAST_SPELL_ACCESSIBLE_NAME,
    });
    const enabledButtons = buttons.filter((b) => !b.hasAttribute("disabled"));
    expect(enabledButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows enabled Cast a Spell when reaction spells exist", () => {
    const spells = [
      makeSpell({ id: "shield", castingTime: "1 reaction, when hit" }),
    ];
    render(<ActionBar characterClass="wizard" spells={spells} />);

    const buttons = screen.getAllByRole("button", {
      name: CAST_SPELL_ACCESSIBLE_NAME,
    });
    const enabledButtons = buttons.filter((b) => !b.hasAttribute("disabled"));
    expect(enabledButtons.length).toBeGreaterThanOrEqual(1);
  });
});
