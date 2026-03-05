import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AbilityCard } from "./ability-card";

// "dex" has skills (Acrobatics, Sleight of Hand, Stealth) → renders as button
// "con" has no skills → renders as div

describe("<AbilityCard /> display mode", () => {
  it("renders as a button when the ability has skills", () => {
    render(
      <AbilityCard
        mode="display"
        abilityKey="dex"
        score={14}
        onToggle={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "DEX" })).toBeInTheDocument();
  });

  it("button is not expanded by default", () => {
    render(
      <AbilityCard
        mode="display"
        abilityKey="dex"
        score={14}
        onToggle={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "DEX", expanded: false }),
    ).toBeInTheDocument();
  });

  it("renders without a button when the ability has no skills", () => {
    render(
      <AbilityCard
        mode="display"
        abilityKey="con"
        score={14}
        onToggle={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("clicking the button calls onToggle with the ability key", () => {
    const onToggle = vi.fn();
    render(
      <AbilityCard
        mode="display"
        abilityKey="dex"
        score={14}
        onToggle={onToggle}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "DEX" }));
    expect(onToggle).toHaveBeenCalledWith("dex");
  });

  it("shows the skill list and marks button expanded when flipped", () => {
    render(
      <AbilityCard
        mode="display"
        abilityKey="dex"
        score={14}
        isFlipped
        onToggle={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "DEX", expanded: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("skill list contains listitem entries when flipped", () => {
    render(
      <AbilityCard
        mode="display"
        abilityKey="dex"
        score={14}
        isFlipped
        onToggle={vi.fn()}
      />,
    );
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });
});

describe("<AbilityCard /> creation mode", () => {
  it("renders as a button when the ability has skills", () => {
    render(
      <AbilityCard
        mode="creation"
        abilityKey="dex"
        score={14}
        rawScore="14"
        bonus={0}
        onBlur={vi.fn()}
        onToggle={vi.fn()}
        onScoreChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "DEX" })).toBeInTheDocument();
  });

  it("renders without a toggle button when the ability has no skills", () => {
    render(
      <AbilityCard
        mode="creation"
        abilityKey="con"
        score={14}
        rawScore="14"
        bonus={0}
        onBlur={vi.fn()}
        onToggle={vi.fn()}
        onScoreChange={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a textbox for score input", () => {
    render(
      <AbilityCard
        mode="creation"
        abilityKey="con"
        score={14}
        rawScore="14"
        bonus={0}
        onBlur={vi.fn()}
        onToggle={vi.fn()}
        onScoreChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("does not render a textbox when readOnly", () => {
    render(
      <AbilityCard
        mode="creation"
        abilityKey="con"
        score={14}
        rawScore="14"
        bonus={0}
        readOnly
        onBlur={vi.fn()}
        onToggle={vi.fn()}
        onScoreChange={vi.fn()}
      />,
    );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("button is not expanded by default", () => {
    render(
      <AbilityCard
        mode="creation"
        abilityKey="dex"
        score={14}
        rawScore="14"
        bonus={0}
        onBlur={vi.fn()}
        onToggle={vi.fn()}
        onScoreChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "DEX", expanded: false }),
    ).toBeInTheDocument();
  });

  it("shows the skill list and marks button expanded when flipped", () => {
    render(
      <AbilityCard
        mode="creation"
        abilityKey="dex"
        score={14}
        rawScore="14"
        bonus={0}
        isFlipped
        onBlur={vi.fn()}
        onToggle={vi.fn()}
        onScoreChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "DEX", expanded: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});

describe("<AbilityCard /> assign mode", () => {
  it("renders as a button when the ability has skills", () => {
    render(
      <AbilityCard
        mode="assign"
        abilityKey="dex"
        score={14}
        bonus={0}
        availableValues={[15, 14, 13]}
        selectedValue={null}
        onToggle={vi.fn()}
        onAssign={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "DEX" })).toBeInTheDocument();
  });

  it("renders without a toggle button when the ability has no skills", () => {
    render(
      <AbilityCard
        mode="assign"
        abilityKey="con"
        score={14}
        bonus={0}
        availableValues={[15, 14, 13]}
        selectedValue={null}
        onToggle={vi.fn()}
        onAssign={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "CON" }),
    ).not.toBeInTheDocument();
  });

  it("renders score picker tiles as buttons", () => {
    render(
      <AbilityCard
        mode="assign"
        abilityKey="con"
        score={14}
        bonus={0}
        availableValues={[15, 14, 13]}
        selectedValue={null}
        onToggle={vi.fn()}
        onAssign={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "15" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "14" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "13" })).toBeInTheDocument();
  });

  it("shows the skill list and marks button expanded when flipped", () => {
    render(
      <AbilityCard
        mode="assign"
        abilityKey="dex"
        score={14}
        onToggle={vi.fn()}
        bonus={0}
        availableValues={[15, 14, 13]}
        selectedValue={null}
        onAssign={vi.fn()}
        isFlipped
      />,
    );
    expect(
      screen.getByRole("button", { name: "DEX", expanded: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
