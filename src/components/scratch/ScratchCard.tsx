"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { BallIcon } from "@/components/ui/icons";

type Props = {
  hint: string;
  prizeLabel: string;
  prize: string;
};

const W = 272;
const H = 360;
const BRUSH = 26;
const REVEAL_AT = 0.55;

export function ScratchCard({ hint, prizeLabel, prize }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const paintCover = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.globalCompositeOperation = "source-over";
      // dégradé diagonal bleu
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#0e6fd6");
      g.addColorStop(0.55, "#0055a4");
      g.addColorStop(1, "#013a72");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      // halo lumineux
      const r = ctx.createRadialGradient(W * 0.3, H * 0.25, 10, W * 0.3, H * 0.25, W);
      r.addColorStop(0, "rgba(255,255,255,0.22)");
      r.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = r;
      ctx.fillRect(0, 0, W, H);
      // sheen diagonal
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      ctx.beginPath();
      ctx.moveTo(-40, H);
      ctx.lineTo(W * 0.45, H);
      ctx.lineTo(W * 0.75, 0);
      ctx.lineTo(W * 0.3, 0);
      ctx.closePath();
      ctx.fill();
      // sparkles
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (const [sx, sy, sr] of [
        [40, 70, 2],
        [220, 120, 1.5],
        [60, 280, 1.5],
        [210, 300, 2],
      ] as const) {
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      // texte
      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.textAlign = "center";
      ctx.font = "800 30px Inter, system-ui, sans-serif";
      ctx.fillText("GRATTE", W / 2, H / 2 - 6);
      ctx.font = "500 13px Inter, system-ui, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText(hint, W / 2, H / 2 + 20);
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
    const checkProgress = (c: CanvasRenderingContext2D) => {
      const { data } = c.getImageData(0, 0, W * dpr, H * dpr);
      let clear = 0;
      for (let i = 3; i < data.length; i += 40) if (data[i] === 0) clear++;
      if (clear / (data.length / 40) > REVEAL_AT) setRevealed(true);
    };
    const erase = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
      ctx.fill();
      if (++moves % 6 === 0) checkProgress(ctx);
    };
    const pos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: ((e.clientX - rect.left) / rect.width) * W, y: ((e.clientY - rect.top) / rect.height) * H };
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

  useEffect(() => {
    if (!revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
      : { x: 0.5, y: 0.4 };
    confetti({ particleCount: 110, spread: 78, origin, scalar: 0.95, colors: ["#FF6B00", "#0055A4", "#4DA6FF", "#ffffff"] });
  }, [revealed]);

  return (
    <div className="relative">
      {/* glow */}
      <div
        className="absolute -inset-8 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,107,0,.45), transparent)" }}
        aria-hidden
      />
      {/* anneau dégradé */}
      <div
        className="rounded-[1.7rem] p-[2px] shadow-2xl"
        style={{ background: "linear-gradient(150deg, #ff8a3d, #ff6b00 35%, #0055a4 100%)" }}
      >
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-[1.6rem] bg-white"
          style={{ width: W, height: H }}
        >
          {/* lot révélé */}
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/icons/coin.svg" alt="" className="h-9 w-9" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-mist">
              {prizeLabel}
            </span>
            <span className="font-display text-5xl font-bold leading-none text-ink-900">{prize}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <BallIcon className="h-3.5 w-3.5" /> Un but = une carte
            </span>
          </div>

          {/* couche à gratter */}
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={revealed ? `${prizeLabel}: ${prize}` : hint}
            className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-500 active:cursor-grabbing ${
              revealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />

          {!revealed && (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="absolute bottom-3 right-3 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur hover:bg-black/40"
            >
              Révéler
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
