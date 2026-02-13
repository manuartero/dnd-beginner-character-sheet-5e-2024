import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HpTracker } from "./hp-tracker";

describe("<HpTracker />", () => {
  it("renders decrement and increment buttons", () => {
    render(
      <HpTracker
        current={10}
        max={20}
        editable={false}
        onCurrentChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });
});
