import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CastSpellGrid } from "./cast-spell-grid";

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

describe("<CastSpellGrid />", () => {
  it("renders cantrips under a 'Cantrips (unlimited)' group", () => {
    const spells = [
      makeSpell({ id: "fire-bolt", name: "Fire Bolt", level: 0 }),
    ];
    render(<CastSpellGrid spells={spells} />);

    expect(screen.getByText("Cantrips (unlimited)")).toBeInTheDocument();
    expect(screen.getByText("Fire Bolt")).toBeInTheDocument();
  });

  it("renders level 1 spells under a 'Level 1' group", () => {
    const spells = [
      makeSpell({ id: "magic-missile", name: "Magic Missile", level: 1 }),
    ];
    render(<CastSpellGrid spells={spells} />);

    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Magic Missile")).toBeInTheDocument();
  });

  it("renders both groups when mixed levels exist", () => {
    const spells = [
      makeSpell({ id: "fire-bolt", name: "Fire Bolt", level: 0 }),
      makeSpell({ id: "magic-missile", name: "Magic Missile", level: 1 }),
    ];
    render(<CastSpellGrid spells={spells} />);

    expect(screen.getByText("Cantrips (unlimited)")).toBeInTheDocument();
    expect(screen.getByText("Level 1")).toBeInTheDocument();
  });

  it("does not render a cantrips group when there are no cantrips", () => {
    const spells = [
      makeSpell({ id: "magic-missile", name: "Magic Missile", level: 1 }),
    ];
    render(<CastSpellGrid spells={spells} />);

    expect(screen.queryByText("Cantrips (unlimited)")).not.toBeInTheDocument();
  });

  it("expands spell details when a spell is clicked", () => {
    const spells = [
      makeSpell({
        id: "fire-bolt",
        name: "Fire Bolt",
        level: 0,
        range: "120 ft",
        description: "You hurl a mote of fire.",
      }),
    ];
    render(<CastSpellGrid spells={spells} />);

    fireEvent.click(screen.getByText("Fire Bolt"));

    expect(screen.getByText("120 ft")).toBeInTheDocument();
    expect(screen.getByText("You hurl a mote of fire.")).toBeInTheDocument();
  });

  it("collapses expanded spell when clicked again", () => {
    const spells = [
      makeSpell({
        id: "fire-bolt",
        name: "Fire Bolt",
        level: 0,
        description: "You hurl a mote of fire.",
      }),
    ];
    render(<CastSpellGrid spells={spells} />);

    fireEvent.click(screen.getByText("Fire Bolt"));
    expect(screen.getByText("You hurl a mote of fire.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Fire Bolt"));
    expect(
      screen.queryByText("You hurl a mote of fire."),
    ).not.toBeInTheDocument();
  });

  it("shows damage result badge", () => {
    const spells = [
      makeSpell({
        id: "fire-bolt",
        name: "Fire Bolt",
        level: 0,
        damage: { dice: "1d10", type: "fire" },
      }),
    ];
    render(<CastSpellGrid spells={spells} />);

    expect(screen.getByText("1d10 fire")).toBeInTheDocument();
  });

  it("shows concentration keyword when expanded", () => {
    const spells = [
      makeSpell({
        id: "fog-cloud",
        name: "Fog Cloud",
        level: 1,
        concentration: true,
      }),
    ];
    render(<CastSpellGrid spells={spells} />);

    fireEvent.click(screen.getByText("Fog Cloud"));
    expect(screen.getByText("Concentration")).toBeInTheDocument();
  });
});
