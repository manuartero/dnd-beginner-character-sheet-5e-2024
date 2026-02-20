import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CombatStats } from "./combat-stats";

import type { StatResult } from "src/models/character-stats";

const initiative: StatResult = {
  total: 2,
  lines: [{ label: "DEX modifier", value: "+2" }],
};

const ac: StatResult = {
  total: 13,
  lines: [{ label: "Base AC", value: "13" }],
};

describe("<CombatStats />", () => {
  it("renders initiative, AC and spell attack chips", () => {
    render(<CombatStats initiative={initiative} ac={ac} spellAttack={null} />);

    expect(
      screen.getByRole("button", { name: "Initiative: +2" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AC: 13" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Spell Attack: —" }),
    ).toBeInTheDocument();
  });
});
