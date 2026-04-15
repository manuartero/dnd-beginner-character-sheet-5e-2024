import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HpTracker } from "./hp-tracker";

describe("<HpTracker />", () => {
  it("renders decrement and increment buttons in sheet mode", () => {
    render(
      <HpTracker
        mode="sheet"
        current={10}
        max={20}
        editable={false}
        onCurrentChange={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Decrease HP" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Increase HP" }),
    ).toBeInTheDocument();
  });

  it("renders without buttons in creation mode", () => {
    render(<HpTracker mode="creation" max={12} />);
    expect(
      screen.queryByRole("button", { name: "Decrease HP" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Increase HP" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("HP")).toBeInTheDocument();
  });

  it("announces current HP and status via aria-live region", () => {
    render(
      <HpTracker
        mode="sheet"
        current={15}
        max={20}
        editable={false}
        onCurrentChange={vi.fn()}
      />,
    );
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("15 / 20 HP — Healthy");
  });

  it("announces Wounded status when HP is between 25% and 50%", () => {
    render(
      <HpTracker
        mode="sheet"
        current={6}
        max={20}
        editable={false}
        onCurrentChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("6 / 20 HP — Wounded");
  });

  it("announces Critical status when HP is at or below 25%", () => {
    render(
      <HpTracker
        mode="sheet"
        current={2}
        max={20}
        editable={false}
        onCurrentChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "2 / 20 HP — Critical",
    );
  });
});
