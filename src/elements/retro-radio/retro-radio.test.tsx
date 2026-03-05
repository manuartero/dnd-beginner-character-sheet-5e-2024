import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RetroRadio } from "./retro-radio";

const OPTIONS = [
  { value: "a", label: "Option A", description: "First option" },
  { value: "b", label: "Option B", description: "Second option" },
  { value: "c", label: "Option C" },
];

describe("<RetroRadio />", () => {
  it("renders a radiogroup with all options as radio buttons", () => {
    render(
      <RetroRadio
        options={OPTIONS}
        selected="a"
        name="test"
        legend="Pick one"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByRole("group", { name: "Pick one" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("marks the selected option as checked", () => {
    render(
      <RetroRadio
        options={OPTIONS}
        selected="b"
        name="test"
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByRole("radio", { name: /Option B/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Option A/ })).not.toBeChecked();
  });

  it("calls onSelect when clicking an option", () => {
    const onSelect = vi.fn();
    render(
      <RetroRadio
        options={OPTIONS}
        selected="a"
        name="test"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: /Option C/ }));
    expect(onSelect).toHaveBeenCalledWith("c");
  });

  it("renders description text for options that have one", () => {
    render(
      <RetroRadio
        options={OPTIONS}
        selected="a"
        name="test"
        onSelect={vi.fn()}
      />,
    );
    const radioA = screen.getByRole("radio", { name: /First option/ });
    expect(radioA).toBeInTheDocument();
    const radioC = screen.getByRole("radio", { name: /Option C/ });
    expect(radioC).toBeInTheDocument();
  });
});
