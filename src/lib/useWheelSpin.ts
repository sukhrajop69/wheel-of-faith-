import { useCallback, useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function normTau(a: number) {
  return ((a % TAU) + TAU) % TAU;
}

export function useWheelSpin() {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const setRot = useCallback((v: number) => {
    rotationRef.current = v;
    setRotation(v);
  }, []);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setRot(0);
  }, [setRot]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const spinToIndex = useCallback(
    async (opts: {
      index: number;
      count: number;
      rnd: () => number;
      durationMs?: number;
      turnsMin?: number;
      turnsMax?: number;
      onTick?: () => void;
    }) => {
      const {
        index,
        count,
        rnd,
        durationMs = 4200,
        turnsMin = 5,
        turnsMax = 8,
        onTick
      } = opts;

      if (count <= 0) return;

      const reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const dur = reduce ? 250 : durationMs;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const slice = TAU / count;
      const pointerAngle = -Math.PI / 2;
      const centerAngle = (index + 0.5) * slice;

      const desiredMod = normTau(pointerAngle - centerAngle);

      const from = rotationRef.current;
      const fromMod = normTau(from);
      const deltaMod = normTau(desiredMod - fromMod);

      const extraTurns =
        turnsMin + Math.floor(rnd() * (turnsMax - turnsMin + 1));

      const to = from + deltaMod + extraTurns * TAU;

      const lastTickRef = { v: Math.floor(from / slice) };

      await new Promise<void>((resolve) => {
        const t0 = performance.now();

        const frame = (now: number) => {
          const t = Math.min(1, (now - t0) / dur);
          const eased = easeOutCubic(t);
          const cur = from + (to - from) * eased;

          if (onTick) {
            const tickId = Math.floor(cur / slice);
            if (tickId !== lastTickRef.v) {
              lastTickRef.v = tickId;
              onTick();
            }
          }

          setRot(cur);

          if (t >= 1) {
            rafRef.current = null;
            resolve();
            return;
          }
          rafRef.current = requestAnimationFrame(frame);
        };

        rafRef.current = requestAnimationFrame(frame);
      });
    },
    [setRot]
  );

  return { rotation, spinToIndex, reset };
}
