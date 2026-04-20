import { classes } from "./classes";

describe("classes.get()", () => {
  it("returns details for a known class", () => {
    expect(classes.get({ id: "wizard" }).icon).toBe("/class-icons/wizard.svg");
  });
});
