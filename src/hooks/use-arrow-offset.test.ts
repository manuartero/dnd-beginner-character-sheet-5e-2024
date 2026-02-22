import { renderHook } from "@testing-library/react";
import { useArrowOffset } from "src/hooks/use-arrow-offset";
import { describe, expect, it } from "vitest";

describe("useArrowOffset()", () => {
  it("initially returns arrowOffset of 0 and empty buttonRefs map", () => {
    const { result } = renderHook(() => useArrowOffset(null));
    expect(result.current.arrowOffset).toBe(0);
    expect(result.current.buttonRefs.current.size).toBe(0);
  });

  it("keeps arrowOffset at 0 when expandedKey is null", () => {
    const { result } = renderHook(() => useArrowOffset(null));
    expect(result.current.arrowOffset).toBe(0);
  });

  it("keeps arrowOffset at 0 when expandedKey has no matching ref", () => {
    const { result } = renderHook(() => useArrowOffset("missing-key"));
    expect(result.current.arrowOffset).toBe(0);
  });

  it("keeps arrowOffset at 0 when matched button has no parent", () => {
    const { result, rerender } = renderHook(
      ({ expandedKey }: { expandedKey: string | null }) =>
        useArrowOffset(expandedKey),
      { initialProps: { expandedKey: null as string | null } },
    );

    const orphanButton = document.createElement("button");
    result.current.buttonRefs.current.set("action1", orphanButton);
    rerender({ expandedKey: "action1" });

    expect(result.current.arrowOffset).toBe(0);
  });
});
