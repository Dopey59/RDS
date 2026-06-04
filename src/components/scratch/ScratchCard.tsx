"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

type Props = {
  hint: string;
  prizeLabel: string;
  prize: string;
};

const W = 264;
const H = 348;
const BRUSH = 24;
const REVEAL_AT = 0.55;

export function ScratchCard({ hint, prizeLabel, prize }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const paintCover = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#0a63b8");
      g.addColorStop(1, "#012c57");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // halo lumineux
      const rg = ctx.createRadialGradient(W * 0.3, H * 0.28, 8, W * 0.3, H * 0.28, W);
      rg.addColorStop(0, "rgba(255,255,255,0.20)");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      // touche orange
      const og = ctx.createRadialGradient(W * 0.85, H * 0.9, 4, W * 0.85, H * 0.9, W * 0.7);
      og.addColorStop(0, "rgba(255,107,0,0.45)");
      og.addColorStop(1, "transparent");
      ctx.fillStyle = og;
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.font = "700 22px 'Clash Display', system-ui, sans-serif";
      ctx.fillText("✦ GRATTE ✦", W / 2, H / 2 - 6);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "500 13px Inter, system-ui, sans-serif";
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
    const erase = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
      ctx.fill();
      if (++moves % 6 === 0) check(ctx);
    };
    const check = (c: CanvasRenderingContext2D) => {
      const { data } = c.getImageData(0, 0, W * dpr, H * dpr);
      let clear = 0;
      for (let i = 3; i < data.length; i += 40) if (data[i] === 0) clear++;
      if (clear / (data.length / 40) > REVEAL_AT) setRevealed(true);
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

  useEffect(() => {
    if (!revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
      : { x: 0.5, y: 0.4 };
    confetti({ particleCount: 110, spread: 75, origin, scalar: 0.9, colors: ["#FF6B00", "#0055A4", "#4DA6FF", "#ffffff"] });
  }, [revealed]);

  return (
    <div className="relative">
      <div
        className="absolute -inset-8 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,107,0,.5), transparent)" }}
        aria-hidden
      />
      {/* anneau dégradé */}
      <div className="rounded-[1.6rem] bg-gradient-to-br from-orange-500 via-blue-500 to-blue-700 p-[2px] shadow-2xl shadow-blue-900/40">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-white"
          style={{ width: W, height: H }}
        >
          {/* lot révélé */}
          <div className="flex flex-col items-center gap-1 text-center">
            <Image src="/brand/icons/coin.svg" alt="" width={56} height={56} className="drop-shadow" />
            <span className="mt-1 font-display text-5xl font-bold text-orange-500">{prize}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-mist">
              {prizeLabel}
            </span>
          </div>

          <canvas
            ref={canvasRef}
            role="img"
            aria-label={revealed ? `${prizeLabel}: ${prize}` : hint}
            className={`absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-500 ${
              revealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />

          {/* glint qui balaye le cache */}
          {!revealed && (
            <div
              className="pointer-events-none absolute inset-0 animate-[var(--animate-shine)]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                backgroundSize: "220% 100%",
              }}
              aria-hidden
            />
          )}

          {!revealed && (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="absolute bottom-2 right-2 rounded-full bg-black/25 px-2 py-1 text-[11px] text-white/90 hover:bg-black/45"
            >
              Révéler
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
