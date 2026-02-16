import { getAudioContext } from "./audio-context";

export function playSelect() {
  const audio = getAudioContext();
  const now = audio.currentTime;

  const gain = audio.createGain();
  gain.connect(audio.destination);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  const osc1 = audio.createOscillator();
  osc1.type = "square";
  osc1.frequency.value = 660;
  osc1.connect(gain);
  osc1.start(now);
  osc1.stop(now + 0.05);

  const osc2 = audio.createOscillator();
  osc2.type = "square";
  osc2.frequency.value = 990;
  osc2.connect(gain);
  osc2.start(now + 0.05);
  osc2.stop(now + 0.12);
}
