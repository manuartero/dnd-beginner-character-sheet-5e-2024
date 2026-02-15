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
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("renders without buttons in creation mode", () => {
    render(<HpTracker mode="creation" max={12} />);
    expect(screen.queryByRole("button", { name: "-" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "+" })).not.toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("HP")).toBeInTheDocument();
  });
});
