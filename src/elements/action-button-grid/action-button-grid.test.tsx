import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionButtonGrid } from "./action-button-grid";

describe("<ActionButtonGrid />", () => {
  it("renders each action as a button", () => {
    render(
      <ActionButtonGrid
        actions={[
          { name: "Attack", description: "Strike with a weapon." },
          { name: "Dash", description: "Move farther this turn." },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: "Attack" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dash" })).toBeInTheDocument();
  });

  it("toggles expanded state per selected action button", () => {
    render(
      <ActionButtonGrid
        actions={[
          { name: "Attack", description: "Strike with a weapon." },
          { name: "Dash", description: "Move farther this turn." },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Attack" }));
    expect(
      screen.getByRole("button", { name: "Attack", expanded: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Dash", expanded: false }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Dash" }));
    expect(
      screen.getByRole("button", { name: "Dash", expanded: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Attack", expanded: false }),
    ).toBeInTheDocument();
  });
});
