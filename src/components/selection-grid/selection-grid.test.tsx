import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SelectionGrid } from "./selection-grid";

const ITEMS = [
  { key: "wizard", label: "Wizard", icon: "/wizard.png" },
  { key: "fighter", label: "Fighter", icon: "/fighter.png" },
  { key: "rogue", label: "Rogue", icon: "/rogue.png" },
];

describe("<SelectionGrid />", () => {
  it("renders a button for each item", () => {
    render(
      <SelectionGrid items={ITEMS} selectedKey={null} onSelect={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Wizard" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fighter" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rogue" })).toBeInTheDocument();
  });

  it("no button is pressed when selectedKey is null", () => {
    render(
      <SelectionGrid items={ITEMS} selectedKey={null} onSelect={vi.fn()} />,
    );
    expect(
      screen.queryByRole("button", { pressed: true }),
    ).not.toBeInTheDocument();
  });

  it("marks the selected button as pressed", () => {
    render(
      <SelectionGrid items={ITEMS} selectedKey="fighter" onSelect={vi.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: "Fighter", pressed: true }),
    ).toBeInTheDocument();
  });

  it("calls onSelect with the item key when clicked", () => {
    const onSelect = vi.fn();
    render(
      <SelectionGrid items={ITEMS} selectedKey={null} onSelect={onSelect} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Rogue" }));
    expect(onSelect).toHaveBeenCalledWith("rogue");
  });
});
