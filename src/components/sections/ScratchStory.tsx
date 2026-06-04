"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

type Step = { index: string; title: string; body: string };

const CW = 244;
const CH = 304;
const BRUSH = 22;

/** Sphère 3D — voir PrizeSphere : ici, scroll storytelling du grattage. */
function StoryScene() {
  const t = useTranslations("scratch");
  const steps = t.raw("steps") as Step[];

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchPathRef = useRef<{ x: number; y: number }[]>([]);
  const scratchIdxRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(3);

  // Peinture de la couche à gratter (foil métallique bleu)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CW * dpr;
    canvas.height = CH * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, CW, CH);
    g.addColorStop(0, "#1a7ce0");
    g.addColorStop(0.45, "#0057ff");
    g.addColorStop(1, "#01296b");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CW, CH);
    const sh = ctx.createLinearGradient(0, 0, CW, CH);
    sh.addColorStop(0, "rgba(255,255,255,0)");
    sh.addColorStop(0.5, "rgba(255,255,255,.32)");
    sh.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sh;
    ctx.fillRect(0, 0, CW, CH);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.font = "800 22px Inter, sans-serif";
    ctx.fillText("GRATTE", CW / 2, CH / 2 - 2);
    ctx.fillStyle = "rgba(255,255,255,.45)";
    ctx.font = "400 10px Inter, sans-serif";
    ctx.fillText(t("scratchHint"), CW / 2, CH / 2 + 16);

    // Génère la trajectoire de grattage (balayage sinusoïdal)
    const path: { x: number; y: number }[] = [];
    const rows = 7;
    for (let row = 0; row < rows; row++) {
      const y = (CH / (rows + 1)) * (row + 1);
      const dir = row % 2 ? -1 : 1;
      for (let s = 0; s <= 26; s++) {
        const p = s / 26;
        const x = dir > 0 ? CW * 0.12 + p * CW * 0.76 : CW * 0.88 - p * CW * 0.76;
        path.push({ x, y: y + Math.sin(p * Math.PI * 2) * 6 });
      }
    }
    scratchPathRef.current = path;
    scratchIdxRef.current = 0;
  }, [t]);

  // Auto-scratch piloté par le scroll (étape 3)
  const autoScratch = (target: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const path = scratchPathRef.current;
    if (!ctx || !path.length) return;
    const targetIdx = Math.floor(target * path.length);
    while (scratchIdxRef.current < targetIdx && scratchIdxRef.current < path.length) {
      const p = path[scratchIdxRef.current];
      const prev = path[scratchIdxRef.current - 1] || p;
      const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
      const sub = Math.max(1, Math.ceil(dist / (BRUSH * 0.5)));
      for (let i = 0; i <= sub; i++) {
        const tt = i / sub;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(prev.x + (p.x - prev.x) * tt, prev.y + (p.y - prev.y) * tt, BRUSH, 0, Math.PI * 2);
        ctx.fill();
      }
      scratchIdxRef.current++;
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const stepProg = v * 4;
    const idx = Math.min(3, Math.floor(stepProg));
    setActive(idx);

    if (idx === 1) {
      // chrono 3→1 selon la progression locale
      const local = stepProg - 1;
      setCount(Math.max(1, 3 - Math.floor(local * 3)));
    }
    if (idx === 2) {
      const local = stepProg - 2;
      autoScratch(Math.min(0.95, local * 1.4));
    }
  });

  const notifShown = active >= 0;
  const countdownShown = active === 1;
  const cardShown = active >= 2;
  const resultsShown = active === 3;
  // La carte disparaît dès que les résultats s'affichent (pas de superposition)
  const cardVisible = cardShown && !resultsShown;

  return (
    <section id="comment" ref={wrapRef} className="relative h-[450vh] bg-paper">
      <div className="sticky top-0 grid h-screen grid-cols-1 items-center overflow-hidden md:grid-cols-2">
        {/* GAUCHE — textes étapes */}
        <div className="relative order-2 px-6 md:order-1 md:px-12 lg:px-20">
          {steps.map((s, i) => (
            <div
              key={i}
              className="absolute inset-x-6 top-1/2 -translate-y-1/2 transition-all duration-500 md:inset-x-12 lg:inset-x-20"
              style={{
                opacity: i === active ? 1 : 0,
                transform: `translateY(${i === active ? "-50%" : i < active ? "calc(-50% - 24px)" : "calc(-50% + 24px)"})`,
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <div className="mb-4 flex items-center gap-2.5 text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">
                <span className="h-0.5 w-5 bg-orange-500" />
                {s.index}
              </div>
              <h2 className="whitespace-pre-line font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.9] text-ink-900">
                {s.title}
              </h2>
              <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-mist">{s.body}</p>
            </div>
          ))}
        </div>

        {/* DROITE — téléphone */}
        <div className="relative order-1 flex items-center justify-center pb-6 md:order-2 md:pb-0">
          {/* Timeline orange — identique au companion (bord gauche de la colonne, 80% de haut) */}
          <div className="pointer-events-none absolute bottom-[10%] left-0 top-[10%] hidden w-0.5 overflow-hidden bg-white/[0.07] md:block">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top bg-orange-500"
            />
          </div>
          <div className="relative h-[480px] w-[240px] overflow-hidden rounded-[2.5rem] border-2 border-white/12 bg-black shadow-[0_40px_80px_rgba(0,0,0,.6)]">
            {/* encoche */}
            <div className="absolute left-1/2 top-3.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[#222]" />
            {/* fond écran */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/photos/phonebg.jpg)", filter: "grayscale(.4) brightness(.4)" }}
            />

            {/* Notification */}
            <div
              className="absolute inset-x-2.5 top-7 z-[5] flex items-start gap-2.5 rounded-2xl border border-white/12 bg-[#28282a]/75 p-3 backdrop-blur-xl transition-all duration-500"
              style={{ transform: notifShown ? "translateY(0)" : "translateY(-90px)", opacity: notifShown ? 1 : 0 }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-lg">
                ⚽
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.56rem] font-bold tracking-wide text-white/55">{t("notif.app")}</span>
                  <span className="ml-auto text-[0.52rem] text-white/35">{t("notif.now")}</span>
                </div>
                <div className="mt-0.5 text-[0.74rem] font-bold leading-tight text-white">{t("notif.title")}</div>
                <div className="mt-0.5 text-[0.68rem] leading-tight text-white/60">{t("notif.body")}</div>
              </div>
            </div>

            {/* Compte à rebours */}
            <div
              className="absolute inset-0 z-[4] flex flex-col items-center justify-center gap-1 bg-black/70 transition-opacity duration-300"
              style={{ opacity: countdownShown ? 1 : 0, pointerEvents: "none" }}
            >
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/40">
                {t("countdownLabel")}
              </span>
              <span
                className="font-display text-[7rem] leading-none text-orange-500"
                style={{ color: count === 1 ? "#ef4444" : undefined }}
              >
                {count}
              </span>
              <span className="text-[0.62rem] text-white/35">{t("countdownSub")}</span>
            </div>

            {/* Carte à gratter */}
            <div
              className="absolute inset-x-0 bottom-[58px] z-[6] flex justify-center transition-all duration-500"
              style={{ opacity: cardVisible ? 1 : 0, transform: `scale(${cardVisible ? 1 : 0.85})` }}
            >
              <div className="rounded-[1.4rem] bg-gradient-to-br from-orange-400 via-orange-500 to-blue-600 p-[1.5px] shadow-xl">
                <div
                  className="relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[calc(1.4rem-1.5px)] bg-white p-4"
                  style={{ width: CW * 0.7, height: CH * 0.7 }}
                >
                  <span className="font-display text-4xl leading-none text-orange-500">50 pts</span>
                  <canvas ref={canvasRef} className="absolute inset-0 rounded-[calc(1.4rem-1.5px)]" />
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div
              className="absolute inset-0 z-[7] flex flex-col items-center justify-center gap-3 bg-black/95 backdrop-blur-sm transition-opacity duration-500"
              style={{ opacity: resultsShown ? 1 : 0, pointerEvents: "none" }}
            >
              <span className="font-display text-[3.2rem] leading-none text-orange-500">{t("results.pts")}</span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-white/35">
                {t("results.label")}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3.5 py-1.5 text-[0.7rem] font-semibold text-white">
                <span className="text-emerald-400">↑</span>
                {t("results.rank")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Fallback statique (SSR / reduced-motion) : les étapes en grille. */
function FallbackSteps() {
  const t = useTranslations("scratch");
  const steps = t.raw("steps") as Step[];
  return (
    <section id="comment" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-3 text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">{t("eyebrow")}</div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="glass h-full rounded-[var(--radius-card)] p-6">
              <span className="font-display text-2xl text-orange-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 whitespace-pre-line font-display text-lg leading-tight text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm text-mist">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ScratchStory() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (reduce || !mounted) return <FallbackSteps />;
  return <StoryScene />;
}
