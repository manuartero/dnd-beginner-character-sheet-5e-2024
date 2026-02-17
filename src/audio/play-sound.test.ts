import { vi } from "vitest";
import { oscillators, resetAudioMocks, start } from "./__mocks__/audio-context";
import { play8BitSound } from "./play-sound";

vi.mock("./audio-context");

describe("play8BitSound()", () => {
  beforeEach(resetAudioMocks);

  it("click: single square wave at 880Hz", () => {
    play8BitSound("click");

    expect(oscillators).toHaveLength(1);
    expect(oscillators[0].type).toBe("square");
    expect(oscillators[0].frequency.value).toBe(880);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("select: two ascending square wave notes", () => {
    play8BitSound("select");

    expect(oscillators).toHaveLength(2);
    expect(oscillators[0].frequency.value).toBe(660);
    expect(oscillators[1].frequency.value).toBe(990);
    expect(start).toHaveBeenCalledTimes(2);
  });

  it("fanfare: ascending arpeggio of 5 notes", () => {
    play8BitSound("fanfare");

    expect(oscillators).toHaveLength(5);
    expect(oscillators.every((o) => o.type === "square")).toBe(true);

    const frequencies = oscillators.map((o) => o.frequency.value);
    for (let i = 1; i < frequencies.length; i++) {
      expect(frequencies[i]).toBeGreaterThan(frequencies[i - 1]);
    }

    expect(start).toHaveBeenCalledTimes(5);
  });
});
