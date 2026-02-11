import { act, renderHook } from "@testing-library/react";
import { useExpandable } from "src/hooks/use-expandable";

describe("useExpandable()", () => {
  it("initially has null expandedKey", () => {
    const { result } = renderHook(() => useExpandable<string>());
    expect(result.current.expandedKey).toBeNull();
  });

  it("toggles expandedKey correctly", () => {
    const { result } = renderHook(() => useExpandable<string>());

    act(() => {
      result.current.toggle("key1");
    });
    expect(result.current.expandedKey).toBe("key1");

    act(() => {
      result.current.toggle("key1");
    });
    expect(result.current.expandedKey).toBeNull();

    act(() => {
      result.current.toggle("key2");
    });
    expect(result.current.expandedKey).toBe("key2");
  });
});
