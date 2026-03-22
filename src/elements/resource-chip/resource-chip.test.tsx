import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceChip } from "./resource-chip";

describe("<ResourceChip />", () => {
  it("renders a button with the label", () => {
    render(
      <ResourceChip
        iconSrc="/icons/rage.svg"
        label="RAGE"
        isReady
        ariaLabel="Rage: ready, click to spend"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Rage: ready, click to spend" }),
    ).toBeInTheDocument();
    expect(screen.getByText("RAGE")).toBeInTheDocument();
  });

  it("renders the icon as a masked span", () => {
    render(
      <ResourceChip
        iconSrc="/icons/rage.svg"
        label="RAGE"
        isReady
        ariaLabel="Rage"
      />,
    );
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("is disabled when not ready", () => {
    render(
      <ResourceChip
        iconSrc="/icons/rage.svg"
        label="RAGE"
        isReady={false}
        ariaLabel="Rage: spent"
      />,
    );
    expect(screen.getByRole("button", { name: "Rage: spent" })).toBeDisabled();
  });

  it("is enabled when ready", () => {
    render(
      <ResourceChip
        iconSrc="/icons/rage.svg"
        label="RAGE"
        isReady
        ariaLabel="Rage"
      />,
    );
    expect(screen.getByRole("button", { name: "Rage" })).toBeEnabled();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <ResourceChip
        iconSrc="/icons/rage.svg"
        label="RAGE"
        isReady
        ariaLabel="Rage"
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Rage" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled (not ready)", () => {
    const onClick = vi.fn();
    render(
      <ResourceChip
        iconSrc="/icons/rage.svg"
        label="RAGE"
        isReady={false}
        ariaLabel="Rage: spent"
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Rage: spent" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
