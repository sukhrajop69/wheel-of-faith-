import { useEffect, useMemo, useState } from "react";
import FortuneWheelCanvas from "./FortuneWheelCanvas";
import Controls from "./Controls";
import type { Node } from "../lib/types";

type Props = {
  node: Node;
  resultText: string;
  onSpin: () => void;
  onNext: () => void;
  spinDisabled: boolean;
  nextDisabled: boolean;
  rotationRad: number;

  progressText: string;
  soundOn: boolean;
  vibrateOn: boolean;
  onToggleSound: () => void;
  onToggleVibrate: () => void;
};

export default function WheelStage({
  node,
  resultText,
  onSpin,
  onNext,
  spinDisabled,
  nextDisabled,
  rotationRad,
  progressText,
  soundOn,
  vibrateOn,
  onToggleSound,
  onToggleVibrate
}: Props) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!resultText) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 260);
    return () => clearTimeout(t);
  }, [resultText]);

  const resultClass = useMemo(() => {
    return pulse ? "scale-[1.03] opacity-100" : "scale-100 opacity-100";
  }, [pulse]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between text-white">
      <div className="pt-10 w-full flex flex-col items-center px-6">
        <div className="w-full max-w-md flex items-center justify-between mb-4 text-xs text-white/60">
          <div>{progressText}</div>
          <div className="flex gap-2">
            <button
              onClick={onToggleSound}
              className="px-3 py-1 rounded-full bg-zinc-900/70 border border-white/10"
              aria-label="Toggle sound"
              title="Sound"
            >
              Sound: {soundOn ? "On" : "Off"}
            </button>
            <button
              onClick={onToggleVibrate}
              className="px-3 py-1 rounded-full bg-zinc-900/70 border border-white/10"
              aria-label="Toggle vibration"
              title="Vibration"
            >
              Vibrate: {vibrateOn ? "On" : "Off"}
            </button>
          </div>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-zinc-900/70 border border-white/10 text-blue-400 font-semibold text-lg shadow">
          <span className="mr-2">{node.icon}</span>
          {node.label}
        </div>

        <div className={`mt-7 text-center text-4xl font-bold tracking-tight transition-transform duration-200 ${resultClass}`}>
          {resultText || "Tap SPIN"}
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="mb-6">
          <FortuneWheelCanvas
            labels={node.segments.map((s) => s.label)}
            theme={node.theme}
            rotationRad={rotationRad}
          />
        </div>

        <Controls
          onSpin={onSpin}
          onNext={onNext}
          spinDisabled={spinDisabled}
          nextDisabled={nextDisabled}
        />
      </div>
    </div>
  );
}
