import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./stepper";

describe("<Stepper />", () => {
  it("renders step buttons", () => {
    render(<Stepper current={1} total={3} onStepChange={vi.fn()} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("applies completed class to all completed steps including active", () => {
    render(
      <Stepper
        current={1}
        total={3}
        completedSteps={[1, 2]}
        onStepChange={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].className).toMatch(/dotActive/);
    expect(buttons[0].className).toMatch(/dotCompleted/);
    expect(buttons[1].className).toMatch(/dotCompleted/);
    expect(buttons[2].className).not.toMatch(/dotCompleted/);
  });
});
