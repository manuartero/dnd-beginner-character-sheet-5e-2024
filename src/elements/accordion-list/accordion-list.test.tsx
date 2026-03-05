import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AccordionGroup, AccordionItem, AccordionList } from "./accordion-list";

describe("<AccordionList />", () => {
  it("renders grouped items with labels", () => {
    render(
      <AccordionList>
        <AccordionGroup label="Group A">
          <AccordionItem itemKey="a1" header={<span>Item A1</span>}>
            <p>Details A1</p>
          </AccordionItem>
        </AccordionGroup>
        <AccordionGroup label="Group B">
          <AccordionItem itemKey="b1" header={<span>Item B1</span>}>
            <p>Details B1</p>
          </AccordionItem>
        </AccordionGroup>
      </AccordionList>,
    );

    expect(screen.getByText("Group A")).toBeInTheDocument();
    expect(screen.getByText("Group B")).toBeInTheDocument();
    expect(screen.getByText("Item A1")).toBeInTheDocument();
    expect(screen.getByText("Item B1")).toBeInTheDocument();
  });

  it("expands item on click", () => {
    render(
      <AccordionList>
        <AccordionGroup label="Group">
          <AccordionItem itemKey="a" header={<span>Header</span>}>
            <p>Expanded content</p>
          </AccordionItem>
        </AccordionGroup>
      </AccordionList>,
    );

    expect(screen.queryByText("Expanded content")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Header"));
    expect(screen.getByText("Expanded content")).toBeInTheDocument();
  });

  it("collapses item when clicked again", () => {
    render(
      <AccordionList>
        <AccordionGroup label="Group">
          <AccordionItem itemKey="a" header={<span>Header</span>}>
            <p>Expanded content</p>
          </AccordionItem>
        </AccordionGroup>
      </AccordionList>,
    );

    fireEvent.click(screen.getByText("Header"));
    expect(screen.getByText("Expanded content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Header"));
    expect(screen.queryByText("Expanded content")).not.toBeInTheDocument();
  });

  it("only expands one item at a time", () => {
    render(
      <AccordionList>
        <AccordionGroup label="Group">
          <AccordionItem itemKey="a" header={<span>First</span>}>
            <p>First details</p>
          </AccordionItem>
          <AccordionItem itemKey="b" header={<span>Second</span>}>
            <p>Second details</p>
          </AccordionItem>
        </AccordionGroup>
      </AccordionList>,
    );

    fireEvent.click(screen.getByText("First"));
    expect(screen.getByText("First details")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Second"));
    expect(screen.getByText("Second details")).toBeInTheDocument();
    expect(screen.queryByText("First details")).not.toBeInTheDocument();
  });

  it("sets aria-expanded on buttons", () => {
    render(
      <AccordionList>
        <AccordionGroup label="Group">
          <AccordionItem itemKey="a" header={<span>Header</span>}>
            <p>Details</p>
          </AccordionItem>
        </AccordionGroup>
      </AccordionList>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
