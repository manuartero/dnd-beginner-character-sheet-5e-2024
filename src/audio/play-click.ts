import { getAudioContext } from "./audio-context";

export function playClick() {
  const audio = getAudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = 880;
  gain.gain.value = 0.08;

  oscillator.connect(gain);
  gain.connect(audio.destination);

  const now = audio.currentTime;
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  oscillator.start(now);
  oscillator.stop(now + 0.06);
}
