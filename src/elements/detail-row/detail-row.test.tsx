import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DetailRow } from "./detail-row";

describe("<DetailRow />", () => {
  it("renders the label as a term", () => {
    render(<DetailRow label="Range">120 ft</DetailRow>);
    expect(screen.getByRole("term")).toHaveTextContent("Range");
  });

  it("renders the children as a definition", () => {
    render(<DetailRow label="Range">120 ft</DetailRow>);
    expect(screen.getByRole("definition")).toHaveTextContent("120 ft");
  });
});
