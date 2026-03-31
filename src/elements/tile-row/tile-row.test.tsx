import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TileRow } from "./tile-row";

import type { TileItem } from "./tile-row";

const ITEMS: TileItem[] = [
  { key: "d6", label: "d6" },
  { key: "d8", label: "d8" },
  { key: "d10", label: "d10", selected: true },
  { key: "d12", label: "d12", dimmed: true },
];

describe("<TileRow /> — read-only", () => {
  it("renders items as listitem roles", () => {
    render(<TileRow items={ITEMS} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders no buttons in read-only mode", () => {
    render(<TileRow items={ITEMS} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders badge text in read-only mode", () => {
    const items: TileItem[] = [{ key: "str", label: "STR", badge: "+2" }];
    render(<TileRow items={items} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("renders selected item in read-only mode", () => {
    render(<TileRow items={ITEMS} />);
    expect(screen.getByText("d10")).toBeInTheDocument();
  });
});

describe("<TileRow /> — interactive", () => {
  it("renders items as buttons with aria-label", () => {
    render(<TileRow items={ITEMS} onPick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "d6" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "d8" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "d10" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "d12" })).toBeInTheDocument();
  });

  it("marks selected item as aria-pressed", () => {
    render(<TileRow items={ITEMS} onPick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "d10" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "d6" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("marks dimmed item as aria-disabled", () => {
    render(<TileRow items={ITEMS} onPick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "d12" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("calls onPick when clicking a non-dimmed item", () => {
    const onPick = vi.fn();
    render(<TileRow items={ITEMS} onPick={onPick} />);
    fireEvent.click(screen.getByRole("button", { name: "d6" }));
    expect(onPick).toHaveBeenCalledWith("d6");
  });

  it("does not call onPick when clicking a dimmed item", () => {
    const onPick = vi.fn();
    render(<TileRow items={ITEMS} onPick={onPick} />);
    fireEvent.click(screen.getByRole("button", { name: "d12" }));
    expect(onPick).not.toHaveBeenCalled();
  });

  it("includes badge text in aria-label", () => {
    const items: TileItem[] = [{ key: "str", label: "STR", badge: "+2" }];
    render(<TileRow items={items} onPick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "STR +2" })).toBeInTheDocument();
  });

  it("calls onUnpick on right-click", () => {
    const onUnpick = vi.fn();
    render(<TileRow items={ITEMS} onPick={vi.fn()} onUnpick={onUnpick} />);
    fireEvent.contextMenu(screen.getByRole("button", { name: "d6" }));
    expect(onUnpick).toHaveBeenCalledWith("d6");
  });

  it("does not call onPick on right-click when onUnpick is not provided", () => {
    const onPick = vi.fn();
    render(<TileRow items={ITEMS} onPick={onPick} />);
    fireEvent.contextMenu(screen.getByRole("button", { name: "d6" }));
    expect(onPick).not.toHaveBeenCalled();
  });

  it("does not call onUnpick on right-click of dimmed item", () => {
    const onUnpick = vi.fn();
    render(<TileRow items={ITEMS} onPick={vi.fn()} onUnpick={onUnpick} />);
    fireEvent.contextMenu(screen.getByRole("button", { name: "d12" }));
    expect(onUnpick).not.toHaveBeenCalled();
  });
});
