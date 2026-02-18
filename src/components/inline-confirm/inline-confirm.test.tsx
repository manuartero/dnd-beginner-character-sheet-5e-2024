import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InlineConfirm } from "./inline-confirm";

describe("<InlineConfirm />", () => {
  it("renders the default label", () => {
    render(<InlineConfirm onConfirm={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText("Remove?")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(
      <InlineConfirm label="Delete?" onConfirm={vi.fn()} onCancel={vi.fn()} />,
    );
    expect(screen.getByText("Delete?")).toBeInTheDocument();
  });

  it("calls onConfirm when Yes is clicked", () => {
    const onConfirm = vi.fn();
    render(<InlineConfirm onConfirm={onConfirm} onCancel={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Yes" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel when No is clicked", () => {
    const onCancel = vi.fn();
    render(<InlineConfirm onConfirm={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: "No" }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("has an accessible alertdialog role", () => {
    render(<InlineConfirm onConfirm={vi.fn()} onCancel={vi.fn()} />);
    expect(
      screen.getByRole("alertdialog", { name: "Remove?" }),
    ).toBeInTheDocument();
  });
});
