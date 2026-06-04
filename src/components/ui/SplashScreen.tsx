"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "rds_splash_seen";
const W = 150;
const H = 198;
const BRUSH = 16;

// true = le splash rejoue à chaque chargement (test). false = une fois par session (prod).
const REPLAY_EACH_LOAD = false;

/** Splash d'intro : le logo renard se révèle par grattage, fade in/out, une fois par session. */
export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [overlayOp, setOverlayOp] = useState(1); // fade out à la fin
  const [boxOp, setBoxOp] = useState(0); // fade in du logo
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef(false);

  useEffect(() => {
    if (!REPLAY_EACH_LOAD) {
      if (sessionStorage.getItem(KEY)) {
        setShow(false);
        return;
      }
      sessionStorage.setItem(KEY, "1");
    }
    document.body.style.overflow = "hidden";

    let raf = 0;
    let scratchTimer: ReturnType<typeof setTimeout>;
    let endTimer: ReturnType<typeof setTimeout>;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      setOverlayOp(0);
      endTimer = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, 450);
    };

    // Fade in du logo
    requestAnimationFrame(() => setBoxOp(1));

    if (reduce) {
      // Pas de grattage : on montre le logo puis on sort.
      endTimer = setTimeout(finish, 1000);
      return () => {
        clearTimeout(endTimer);
        document.body.style.overflow = "";
      };
    }

    scratchTimer = setTimeout(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        finish();
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      // Couche foil bleue (charte) qui recouvre le logo
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#0e6fd6");
      g.addColorStop(0.5, "#0057ff");
      g.addColorStop(1, "#01296b");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Trajectoire de grattage (balayage sinusoïdal, rapide)
      const path: { x: number; y: number }[] = [];
      const rows = 9;
      for (let r = 0; r < rows; r++) {
        const y = (H / (rows + 1)) * (r + 1);
        const dir = r % 2 ? -1 : 1;
        for (let s = 0; s <= 22; s++) {
          const p = s / 22;
          const x = dir > 0 ? W * 0.1 + p * W * 0.8 : W * 0.9 - p * W * 0.8;
          path.push({ x, y: y + Math.sin(p * Math.PI * 2) * 5 });
        }
      }

      let idx = 0;
      const dur = 1300;
      const t0 = performance.now();
      const tick = (now: number) => {
        const prog = skipRef.current ? 1 : Math.min(1, (now - t0) / dur);
        const target = Math.floor(prog * path.length);
        while (idx < target && idx < path.length) {
          const pt = path[idx];
          const prev = path[idx - 1] || pt;
          const dist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
          const sub = Math.max(1, Math.ceil(dist / (BRUSH * 0.5)));
          for (let i = 0; i <= sub; i++) {
            const tt = i / sub;
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(prev.x + (pt.x - prev.x) * tt, prev.y + (pt.y - prev.y) * tt, BRUSH, 0, Math.PI * 2);
            ctx.fill();
          }
          idx++;
        }
        if (prog < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          endTimer = setTimeout(finish, 250);
        }
      };
      raf = requestAnimationFrame(tick);
    }, 360); // après le fade in

    return () => {
      clearTimeout(scratchTimer);
      clearTimeout(endTimer);
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={() => (skipRef.current = true)}
      style={{ opacity: overlayOp }}
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#161616] transition-opacity duration-[450ms]"
      aria-hidden
    >
      <div
        style={{ opacity: boxOp, width: W, height: H }}
        className="relative transition-opacity duration-300"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/mark-white.svg" alt="" className="absolute inset-0 h-full w-full object-contain" />
        <canvas
          ref={canvasRef}
          style={{ width: W, height: H }}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
