import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAbilityScores } from "./use-ability-scores";

import type { AbilityScores } from "src/models/abilities";

const DEFAULT_SCORES: AbilityScores = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
};

describe("useAbilityScores()", () => {
  it("initializes in quick-start mode", () => {
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange: vi.fn(),
      }),
    );
    expect(result.current.mode).toBe("quick-start");
  });

  it("initializes rawScores from scores prop", () => {
    const customScores: AbilityScores = {
      str: 15,
      dex: 14,
      con: 13,
      int: 12,
      wis: 10,
      cha: 8,
    };

    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: customScores,
        onScoresChange: vi.fn(),
      }),
    );
    expect(result.current.rawScores.str).toBe("15");
    expect(result.current.rawScores.cha).toBe("8");
  });

  it("switches to customize mode and resets assignments", () => {
    const onScoresChange = vi.fn();
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange,
      }),
    );

    act(() => {
      result.current.handleModeChange("customize");
    });

    expect(result.current.mode).toBe("customize");
    expect(onScoresChange).toHaveBeenCalledWith(
      expect.objectContaining({ str: 0, dex: 0 }),
    );
    expect(result.current.assignments.str).toBeNull();
  });

  it("switches to advanced mode with default scores", () => {
    const onScoresChange = vi.fn();
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange,
      }),
    );

    act(() => {
      result.current.handleModeChange("advanced");
    });

    expect(result.current.mode).toBe("advanced");
    expect(onScoresChange).toHaveBeenCalledWith(DEFAULT_SCORES);
    expect(result.current.rawScores.str).toBe("10");
  });

  it("switches to quick-start mode and applies recommended scores", () => {
    const onScoresChange = vi.fn();
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange,
      }),
    );

    act(() => {
      result.current.handleModeChange("advanced");
    });
    onScoresChange.mockClear();

    act(() => {
      result.current.handleModeChange("quick-start");
    });

    expect(result.current.mode).toBe("quick-start");
    expect(onScoresChange).toHaveBeenCalledWith(
      expect.objectContaining({ str: 15, con: 14 }),
    );
  });

  it("handleScoreChange updates rawScores and calls onScoresChange", () => {
    const onScoresChange = vi.fn();
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange,
      }),
    );

    act(() => {
      result.current.handleScoreChange("str", "16");
    });

    expect(result.current.rawScores.str).toBe("16");
    expect(onScoresChange).toHaveBeenCalledWith(
      expect.objectContaining({ str: 16 }),
    );
  });

  it("handleScoreChange does not call onScoresChange for non-numeric input", () => {
    const onScoresChange = vi.fn();
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange,
      }),
    );

    onScoresChange.mockClear();

    act(() => {
      result.current.handleScoreChange("str", "abc");
    });

    expect(result.current.rawScores.str).toBe("abc");
    expect(onScoresChange).not.toHaveBeenCalled();
  });

  it("handleBlur marks ability as touched", () => {
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange: vi.fn(),
      }),
    );

    expect(result.current.touched.str).toBeUndefined();

    act(() => {
      result.current.handleBlur("str");
    });

    expect(result.current.touched.str).toBe(true);
  });

  it("handleAssign sets assignment and updates scores", () => {
    const onScoresChange = vi.fn();
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange,
      }),
    );

    act(() => {
      result.current.handleModeChange("customize");
    });
    onScoresChange.mockClear();

    act(() => {
      result.current.handleAssign("str", 15);
    });

    expect(result.current.assignments.str).toBe(15);
    expect(onScoresChange).toHaveBeenCalledWith(
      expect.objectContaining({ str: 15 }),
    );
  });

  it("computeAvailableValues excludes already-assigned values", () => {
    const { result } = renderHook(() =>
      useAbilityScores({
        characterClass: "fighter",
        scores: DEFAULT_SCORES,
        onScoresChange: vi.fn(),
      }),
    );

    act(() => {
      result.current.handleModeChange("customize");
    });

    act(() => {
      result.current.handleAssign("str", 15);
    });

    const available = result.current.computeAvailableValues("dex");
    expect(available).not.toContain(15);
    expect(available).toContain(14);
  });
});
