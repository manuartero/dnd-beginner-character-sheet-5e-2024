import { act, renderHook } from "@testing-library/react";
import { useKeyboardMode } from "src/hooks/use-keyboard-mode";

describe("useKeyboardMode()", () => {
  it("returns false initially", () => {
    const { result } = renderHook(() => useKeyboardMode());
    expect(result.current).toBe(false);
  });

  it("returns true after Tab keydown", () => {
    const { result } = renderHook(() => useKeyboardMode());

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    });

    expect(result.current).toBe(true);
  });

  it("ignores non-Tab keydown", () => {
    const { result } = renderHook(() => useKeyboardMode());

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    expect(result.current).toBe(false);
  });

  it("returns false after pointerdown", () => {
    const { result } = renderHook(() => useKeyboardMode());

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    });
    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new PointerEvent("pointerdown"));
    });
    expect(result.current).toBe(false);
  });

  it("removes event listeners on unmount", () => {
    const { result, unmount } = renderHook(() => useKeyboardMode());

    unmount();

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    });

    expect(result.current).toBe(false);
  });
});
