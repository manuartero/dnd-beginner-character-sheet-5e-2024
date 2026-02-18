import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionButton } from "./action-button";

const defaultProps = {
  name: "Attack",
  description: "Make one melee or ranged attack.",
  isExpanded: false,
  arrowOffset: 0,
  buttonRef: vi.fn(),
  onClick: vi.fn(),
};

describe("<ActionButton />", () => {
  it("renders the action name", () => {
    render(<ActionButton {...defaultProps} />);
    expect(screen.getByText("Attack")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(
      <ActionButton {...defaultProps} icon="combat.common.actions.attack" />,
    );
    expect(screen.getByRole("img", { name: "Attack" })).toBeInTheDocument();
  });

  it("does not render an icon when omitted", () => {
    render(<ActionButton {...defaultProps} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("hides description when not expanded", () => {
    render(<ActionButton {...defaultProps} isExpanded={false} />);
    expect(
      screen.queryByText("Make one melee or ranged attack."),
    ).not.toBeInTheDocument();
  });

  it("shows description when expanded", () => {
    render(<ActionButton {...defaultProps} isExpanded={true} />);
    expect(
      screen.getByText("Make one melee or ranged attack."),
    ).toBeInTheDocument();
  });

  it("sets aria-expanded correctly", () => {
    render(<ActionButton {...defaultProps} isExpanded={true} />);
    expect(screen.getByRole("button", { name: "Attack" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("calls onClick when button is clicked", () => {
    const onClick = vi.fn();
    render(<ActionButton {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Attack" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
