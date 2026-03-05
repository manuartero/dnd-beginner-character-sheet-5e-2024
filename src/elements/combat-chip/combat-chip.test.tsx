import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CombatChip } from "./combat-chip";

describe("<CombatChip />", () => {
  it("renders label and value", () => {
    render(
      <CombatChip
        label="AC"
        iconSrc="/shield.svg"
        iconAlt="Shield"
        value="13"
        isExpanded={false}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "AC: 13" })).toBeInTheDocument();
  });
});
