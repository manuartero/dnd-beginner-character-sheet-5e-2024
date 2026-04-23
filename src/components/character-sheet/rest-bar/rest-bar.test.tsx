import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RestBar } from "./rest-bar";

describe("<RestBar />", () => {
  it("renders Short Rest and Long Rest chips", () => {
    render(<RestBar selectedRest={null} onSelect={vi.fn()} onRest={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /short rest/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /long rest/i }),
    ).toBeInTheDocument();
  });

  it("calls onSelect with 'short-rest' when Short Rest chip is clicked", () => {
    const onSelect = vi.fn();
    render(
      <RestBar selectedRest={null} onSelect={onSelect} onRest={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /short rest/i }));
    expect(onSelect).toHaveBeenCalledWith("short-rest");
  });

  it("calls onSelect with 'long-rest' when Long Rest chip is clicked", () => {
    const onSelect = vi.fn();
    render(
      <RestBar selectedRest={null} onSelect={onSelect} onRest={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /long rest/i }));
    expect(onSelect).toHaveBeenCalledWith("long-rest");
  });

  it("calls onSelect(null) when the already-selected chip is clicked (toggle deselect)", () => {
    const onSelect = vi.fn();
    render(
      <RestBar
        selectedRest="short-rest"
        onSelect={onSelect}
        onRest={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /short rest/i }));
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it("shows 'Take Rest' confirm button when a rest is selected", () => {
    render(
      <RestBar selectedRest="short-rest" onSelect={vi.fn()} onRest={vi.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: /take rest/i }),
    ).toBeInTheDocument();
  });

  it("does not show confirm button when no rest is selected", () => {
    render(<RestBar selectedRest={null} onSelect={vi.fn()} onRest={vi.fn()} />);
    expect(
      screen.queryByRole("button", { name: /take rest/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onRest('short-rest') when short rest confirm is clicked", () => {
    const onRest = vi.fn();
    render(
      <RestBar selectedRest="short-rest" onSelect={vi.fn()} onRest={onRest} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /take rest/i }));
    expect(onRest).toHaveBeenCalledWith("short-rest");
  });

  it("calls onRest('long-rest') when long rest confirm is clicked", () => {
    const onRest = vi.fn();
    render(
      <RestBar selectedRest="long-rest" onSelect={vi.fn()} onRest={onRest} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /take rest/i }));
    expect(onRest).toHaveBeenCalledWith("long-rest");
  });
});
