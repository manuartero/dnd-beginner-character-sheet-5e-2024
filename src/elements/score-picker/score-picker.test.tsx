import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScorePicker } from "./score-picker";

describe("<ScorePicker />", () => {
  it("renders a button for each available value", () => {
    render(
      <ScorePicker
        availableValues={[15, 14, 13]}
        selectedValue={null}
        onPick={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "15" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "14" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "13" })).toBeInTheDocument();
  });

  it("marks the selected value as pressed", () => {
    render(
      <ScorePicker
        availableValues={[15, 14]}
        selectedValue={15}
        onPick={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "15" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "14" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("calls onPick with the value when clicking an unselected button", () => {
    const onPick = vi.fn();
    render(
      <ScorePicker
        availableValues={[15]}
        selectedValue={null}
        onPick={onPick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "15" }));
    expect(onPick).toHaveBeenCalledWith(15);
  });

  it("calls onPick with null when clicking the already-selected button", () => {
    const onPick = vi.fn();
    render(
      <ScorePicker availableValues={[15]} selectedValue={15} onPick={onPick} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "15" }));
    expect(onPick).toHaveBeenCalledWith(null);
  });

  it("renders no buttons when availableValues is empty", () => {
    render(
      <ScorePicker
        availableValues={[]}
        selectedValue={null}
        onPick={vi.fn()}
      />,
    );
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
