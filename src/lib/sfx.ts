let audioCtx: AudioContext | null = null;

function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return audioCtx;
}

function beep({
  freq,
  durationMs,
  gain,
  type = "triangle"
}: {
  freq: number;
  durationMs: number;
  gain: number;
  type?: OscillatorType;
}) {
  const ac = ctx();
  const t0 = ac.currentTime;

  const osc = ac.createOscillator();
  const g = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);

  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + durationMs / 1000);

  osc.connect(g);
  g.connect(ac.destination);

  osc.start(t0);
  osc.stop(t0 + durationMs / 1000 + 0.02);
}

export async function unlockAudio() {
  const ac = ctx();
  if (ac.state === "suspended") await ac.resume();
}

export function tickSound() {
  beep({ freq: 850, durationMs: 22, gain: 0.06, type: "square" });
}

export function winSound() {
  beep({ freq: 520, durationMs: 80, gain: 0.08, type: "sine" });
  setTimeout(() => beep({ freq: 780, durationMs: 90, gain: 0.08, type: "sine" }), 80);
}
