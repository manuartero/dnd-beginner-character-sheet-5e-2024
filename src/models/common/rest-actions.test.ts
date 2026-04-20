import { restActions } from "./rest-actions";

import type { RestType } from "src/models/class/class-resources";

describe("restActions.get()", () => {
  it("returns details for short-rest", () => {
    expect(restActions.get({ id: "short-rest" }).label).toBe("Short Rest");
  });

  it("returns details for long-rest", () => {
    expect(restActions.get({ id: "long-rest" }).label).toBe("Long Rest");
  });

  it("throws on unknown rest action", () => {
    expect(() => restActions.get({ id: "nap" as unknown as RestType })).toThrow(
      /Unknown rest action/,
    );
  });
});

describe("restActions.list()", () => {
  it("returns both rest actions", () => {
    expect(restActions.list()).toHaveLength(2);
  });
});
