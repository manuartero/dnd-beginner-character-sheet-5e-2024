import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CreationActions } from "./creation-actions";

describe("<CreationActions />", () => {
  it("renders the Next button", () => {
    render(<CreationActions onNext={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("renders a custom next label", () => {
    render(<CreationActions onNext={vi.fn()} nextLabel="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("does not render a Back button when onBack is omitted", () => {
    render(<CreationActions onNext={vi.fn()} />);
    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
  });

  it("renders a Back button when onBack is provided", () => {
    render(<CreationActions onNext={vi.fn()} onBack={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  });

  it("calls onNext when Next is clicked", () => {
    const onNext = vi.fn();
    render(<CreationActions onNext={onNext} />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("calls onBack when Back is clicked", () => {
    const onBack = vi.fn();
    render(<CreationActions onNext={vi.fn()} onBack={onBack} />);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("Next button is disabled when nextDisabled is true", () => {
    render(<CreationActions onNext={vi.fn()} nextDisabled />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("Next button is enabled by default", () => {
    render(<CreationActions onNext={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
  });
});
