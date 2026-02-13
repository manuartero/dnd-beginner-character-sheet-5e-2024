import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./stepper";

describe("<Stepper />", () => {
  it("renders step buttons", () => {
    render(<Stepper current={1} total={3} onStepChange={vi.fn()} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});
