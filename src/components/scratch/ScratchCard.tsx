"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

type Props = {
  hint: string;
  prizeLabel: string;
  prize: string;
};

const W = 256;
const H = 341;
const BRUSH = 24;
const REVEAL_AT = 0.55; // ratio gratté qui révèle tout

export function ScratchCard({ hint, prizeLabel, prize }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // Dessine le voile (dégradé bleu + texte d'invite)
  const paintCover = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#0055a4");
      g.addColorStop(1, "#003e7a");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "600 15px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(hint, W / 2, H / 2);
    },
    [hint],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    paintCover(ctx);

    let moves = 0;
    const erase = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
      ctx.fill();
      if (++moves % 6 === 0) checkProgress(ctx);
    };

    const checkProgress = (c: CanvasRenderingContext2D) => {
      const { data } = c.getImageData(0, 0, W * dpr, H * dpr);
      let clear = 0;
      for (let i = 3; i < data.length; i += 40) if (data[i] === 0) clear++;
      const ratio = clear / (data.length / 40);
      if (ratio > REVEAL_AT) setRevealed(true);
    };

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
    };

    const down = (e: PointerEvent) => {
      drawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      const { x, y } = pos(e);
      erase(x, y);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current) return;
      const { x, y } = pos(e);
      erase(x, y);
    };
    const up = () => {
      drawing.current = false;
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [paintCover]);

  // Confetti à la révélation gagnante
  useEffect(() => {
    if (!revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.4 };
    confetti({
      particleCount: 90,
      spread: 72,
      origin,
      scalar: 0.9,
      colors: ["#FF6B00", "#0055A4", "#4DA6FF", "#ffffff"],
    });
  }, [revealed]);

  return (
    <div className="relative">
      <div
        className="absolute -inset-6 -z-10 rounded-full blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,107,0,.35), transparent)" }}
        aria-hidden
      />
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-white shadow-xl ring-1 ring-line"
        style={{ width: W, height: H }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs uppercase tracking-widest text-mist">{prizeLabel}</span>
          <span className="font-display text-4xl font-bold text-orange-500">{prize}</span>
        </div>

        <canvas
          ref={canvasRef}
          role="img"
          aria-label={revealed ? `${prizeLabel}: ${prize}` : hint}
          className={`absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-500 ${
            revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />

        {!revealed && (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="absolute bottom-2 right-2 rounded-full bg-black/30 px-2 py-1 text-[11px] text-white/80 hover:bg-black/50"
          >
            Révéler
          </button>
        )}
      </div>
    </div>
  );
}
