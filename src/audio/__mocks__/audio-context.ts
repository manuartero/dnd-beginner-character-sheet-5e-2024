import { vi } from "vitest";

export const start = vi.fn();
export const stop = vi.fn();
export const connect = vi.fn();
export const setValueAtTime = vi.fn();
export const exponentialRamp = vi.fn();
export const oscillators: { type: string; frequency: { value: number } }[] = [];

export function resetAudioMocks() {
  start.mockClear();
  stop.mockClear();
  connect.mockClear();
  setValueAtTime.mockClear();
  exponentialRamp.mockClear();
  oscillators.length = 0;
}

export function getAudioContext() {
  return {
    currentTime: 0,
    destination: {},
    createOscillator: () => {
      const osc = {
        type: "",
        frequency: { value: 0 },
        connect,
        start,
        stop,
      };
      oscillators.push(osc);
      return osc;
    },
    createGain: () => ({
      gain: {
        value: 0,
        setValueAtTime,
        exponentialRampToValueAtTime: exponentialRamp,
      },
      connect,
    }),
  };
}
