import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionChip } from "./action-chip";

describe("<ActionChip />", () => {
  describe("action button behavior", () => {
    it("renders the label", () => {
      render(
        <ActionChip label="Attack" buttonRef={vi.fn()} onClick={vi.fn()} />,
      );
      expect(
        screen.getByRole("button", { name: "Attack" }),
      ).toBeInTheDocument();
    });

    it("renders an icon when provided", () => {
      render(
        <ActionChip
          label="Attack"
          iconSrc="/icons/sword.svg"
          buttonRef={vi.fn()}
          onClick={vi.fn()}
        />,
      );
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    });

    it("does not render an icon when omitted", () => {
      render(
        <ActionChip label="Attack" buttonRef={vi.fn()} onClick={vi.fn()} />,
      );
      expect(
        screen.queryByRole("img", { hidden: true }),
      ).not.toBeInTheDocument();
    });

    it("hides children when not expanded", () => {
      render(
        <ActionChip
          label="Attack"
          isSelected={false}
          buttonRef={vi.fn()}
          onClick={vi.fn()}
        >
          <p>Make one melee or ranged attack.</p>
        </ActionChip>,
      );
      expect(
        screen.queryByText("Make one melee or ranged attack."),
      ).not.toBeInTheDocument();
    });

    it("shows children when expanded", () => {
      render(
        <ActionChip
          label="Attack"
          isSelected
          buttonRef={vi.fn()}
          onClick={vi.fn()}
        >
          <p>Make one melee or ranged attack.</p>
        </ActionChip>,
      );
      expect(
        screen.getByText("Make one melee or ranged attack."),
      ).toBeInTheDocument();
    });

    it("sets aria-expanded when selected with children", () => {
      render(
        <ActionChip
          label="Attack"
          isSelected
          buttonRef={vi.fn()}
          onClick={vi.fn()}
        >
          <p>Description</p>
        </ActionChip>,
      );
      expect(screen.getByRole("button", { name: "Attack" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("sets aria-pressed when selected without children", () => {
      render(
        <ActionChip
          label="Attack"
          isSelected
          buttonRef={vi.fn()}
          onClick={vi.fn()}
        />,
      );
      expect(screen.getByRole("button", { name: "Attack" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("calls onClick when button is clicked", () => {
      const onClick = vi.fn();
      render(
        <ActionChip label="Attack" buttonRef={vi.fn()} onClick={onClick} />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Attack" }));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("combat chip behavior", () => {
    it("renders label and value", () => {
      render(
        <ActionChip
          label="AC"
          iconSrc="/shield.svg"
          value="13"
          buttonRef={vi.fn()}
          onClick={vi.fn()}
        />,
      );
      expect(
        screen.getByRole("button", { name: "AC: 13" }),
      ).toBeInTheDocument();
    });
  });
});
