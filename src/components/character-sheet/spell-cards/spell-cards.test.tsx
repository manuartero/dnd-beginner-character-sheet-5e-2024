import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpellCards } from "./spell-cards";

import type { Spell } from "src/models/spells/spells";

const fireBolt: Spell = {
  id: "fire-bolt",
  name: "Fire Bolt",
  level: 0,
  school: "Evocation",
  castingTime: "1 action",
  range: "120 feet",
  components: "V, S",
  duration: "Instantaneous",
  description: "A beam of fire",
  damage: { dice: "1d10", type: ["fire"] },
};

describe("<SpellCards />", () => {
  it("renders the Spells section", () => {
    render(<SpellCards spells={[fireBolt]} />);
    expect(screen.getByRole("region", { name: "Spells" })).toBeInTheDocument();
  });

  it("staged spell has aria-label indicating 'preparing'", () => {
    render(
      <SpellCards
        spells={[fireBolt]}
        stagedSpellIds={["fire-bolt"]}
        onStagedSpellClick={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", {
        name: "Fire Bolt, preparing — click to remove",
      }),
    ).toBeInTheDocument();
  });

  it("non-staged spell has aria-label indicating 'prepared' when in SpellBook context", () => {
    render(
      <SpellCards
        spells={[fireBolt]}
        stagedSpellIds={[]}
        onStagedSpellClick={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Fire Bolt, prepared" }),
    ).toBeInTheDocument();
  });
});
