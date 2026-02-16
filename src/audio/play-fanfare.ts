import { getAudioContext } from "./audio-context";

const NOTES = [659, 784, 880, 1047, 1319];

export function playFanfare() {
  const audio = getAudioContext();
  const now = audio.currentTime;
  const noteDuration = 0.06;

  for (let i = 0; i < NOTES.length; i++) {
    const start = now + i * noteDuration;
    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = "square";
    osc.frequency.value = NOTES[i];

    const volume = i === NOTES.length - 1 ? 0.1 : 0.07;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      start + (i === NOTES.length - 1 ? 0.25 : noteDuration),
    );

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(start);
    osc.stop(start + (i === NOTES.length - 1 ? 0.25 : noteDuration));
  }
}
