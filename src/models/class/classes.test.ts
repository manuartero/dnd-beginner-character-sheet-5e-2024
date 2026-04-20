import { classes } from "./classes";

describe("classes.get()", () => {
  it("returns details for a known class", () => {
    expect(classes.get("wizard").icon).toBe("/class-icons/wizard.svg");
  });
});
