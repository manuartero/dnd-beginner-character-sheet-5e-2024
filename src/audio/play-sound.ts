import { getAudioContext } from "./audio-context";

type Note = {
  frequency: number;
  duration: number;
  volume?: number;
};

export type SoundVariant = "click" | "select" | "fanfare";

const DEFAULT_VOLUME = 0.08;

const SOUNDS: Record<SoundVariant, Note[]> = {
  click: [{ frequency: 880, duration: 0.06 }],
  select: [
    { frequency: 660, duration: 0.05 },
    { frequency: 990, duration: 0.07 },
  ],
  fanfare: [
    { frequency: 659, duration: 0.06, volume: 0.07 },
    { frequency: 784, duration: 0.06, volume: 0.07 },
    { frequency: 880, duration: 0.06, volume: 0.07 },
    { frequency: 1047, duration: 0.06, volume: 0.07 },
    { frequency: 1319, duration: 0.25, volume: 0.1 },
  ],
};

export function play8BitSound(variant: SoundVariant) {
  const audio = getAudioContext();
  const now = audio.currentTime;
  let offset = 0;

  for (const note of SOUNDS[variant]) {
    const start = now + offset;
    const vol = note.volume ?? DEFAULT_VOLUME;

    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = "square";
    osc.frequency.value = note.frequency;

    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + note.duration);

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(start);
    osc.stop(start + note.duration);

    offset += note.duration;
  }
}
