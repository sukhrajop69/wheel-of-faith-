import { useEffect, useRef } from "react";
import type { Theme } from "../lib/types";

type Props = {
  labels: string[];
  theme: Theme;
  rotationRad: number;
};

const THEME_COLORS: Record<Theme, string[]> = {
  red: ["#3a0a0a", "#5a1010", "#7a1414", "#991818", "#c01c1c"],
  blue: ["#071a2b", "#0b2740", "#0f3456", "#13426c", "#1a5690"],
  purple: ["#160a2b", "#220f40", "#2f1456", "#3d1a6c", "#5a28a0"],
  teal: ["#062522", "#083330", "#0a433e", "#0c524d", "#0f6b64"],
  gold: ["#2b2107", "#40310b", "#56410f", "#6c5113", "#90711a"],
  gray: ["#101013", "#16161a", "#1c1c22", "#24242b", "#2d2d36"]
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function FortuneWheelCanvas({ labels, theme, rotationRad }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(420, Math.max(290, Math.floor(window.innerWidth * 0.92)));
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.47;

    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r + 7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fill();
    ctx.restore();

    const n = Math.max(1, labels.length);
    const colors = THEME_COLORS[theme];

    const labelStep = n > 120 ? 5 : n > 80 ? 4 : n > 55 ? 3 : n > 34 ? 2 : 1;
    const fontSize = clamp(14 - n / 10, 7.5, 12);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotationRad);
    ctx.translate(-cx, -cy);

    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2;
      const a1 = ((i + 1) / n) * Math.PI * 2;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (i % labelStep !== 0) continue;

      const mid = (a0 + a1) / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(mid);

      const alpha = n > 80 ? 0.55 : 0.75;
      ctx.textAlign = "right";
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.font = `${fontSize}px ui-sans-serif, system-ui`;

      let text = labels[i];
      if (text.length > 18 && n > 55) text = text.slice(0, 16) + "…";

      ctx.fillText(text, r - 12, 4);
      ctx.restore();
    }

    ctx.restore();

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = "#0b0b0f";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy - r - 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-14, 26);
    ctx.lineTo(14, 26);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.20)";
    ctx.fill();
    ctx.restore();
  }, [labels, theme, rotationRad]);

  return <canvas ref={ref} className="rounded-full" aria-label="Wheel" />;
            }
