import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AbilityCard } from "./ability-card";

describe("<AbilityCard />", () => {
  it("renders as a button in display mode with skills", () => {
    render(
      <AbilityCard
        mode="display"
        abilityKey="dex"
        short="DEX"
        score={14}
        isFlipped={false}
        proficiencyBonus={2}
        onToggle={vi.fn()}
      />,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
