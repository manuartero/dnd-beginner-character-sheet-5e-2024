import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopMenu } from "./top-menu";

describe("<TopMenu />", () => {
  it("renders a navigation element", () => {
    render(<TopMenu title="Test" showBack={false} onBack={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
