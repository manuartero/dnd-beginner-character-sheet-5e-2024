import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionButton } from "./action-button";

describe("<ActionButton />", () => {
  it("renders the action name", () => {
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Attack" })).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        icon="combat.common.actions.attack"
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByRole("img", { name: "Attack" })).toBeInTheDocument();
  });

  it("does not render an icon when omitted", () => {
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("hides description when not expanded", () => {
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        isExpanded={false}
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );
    expect(
      screen.queryByText("Make one melee or ranged attack."),
    ).not.toBeInTheDocument();
  });

  it("shows description when expanded", () => {
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        isExpanded
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );
    expect(
      screen.getByText("Make one melee or ranged attack."),
    ).toBeInTheDocument();
  });

  it("sets aria-expanded correctly", () => {
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        isExpanded
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Attack" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("calls onClick when button is clicked", () => {
    const onClick = vi.fn();
    render(
      <ActionButton
        name="Attack"
        description="Make one melee or ranged attack."
        arrowOffset={0}
        buttonRef={vi.fn()}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Attack" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
