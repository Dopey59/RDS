"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";


type Step = { index: string; title: string; body: string };

const CS = 200; // taille du canvas carré (card-50pts est carrée)
const BRUSH = 18;

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
  const [entered, setEntered] = useState(false);

  // Initialise le foil de grattage (gradient bleu métallique) sur le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CS * dpr;
    canvas.height = CS * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Fond orange brand (#FF4D0A)
    const g = ctx.createLinearGradient(0, 0, CS, CS);
    g.addColorStop(0, "#ff7a3d");
    g.addColorStop(0.5, "#ff4d0a");
    g.addColorStop(1, "#c73d08");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CS, CS);

    // Texture grille subtile (lignes diagonales claires)
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    for (let i = -CS; i < CS * 2; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + CS, CS);
      ctx.stroke();
    }

    // Reflet central (shimmer)
    const sh = ctx.createRadialGradient(CS * 0.5, CS * 0.38, 0, CS * 0.5, CS * 0.38, CS * 0.55);
    sh.addColorStop(0, "rgba(255,255,255,.22)");
    sh.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sh;
    ctx.fillRect(0, 0, CS, CS);

    // Cadre intérieur arrondi
    const r = 12;
    const m = 10;
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(m, m, CS - m * 2, CS - m * 2, r);
    ctx.stroke();

    // Icône pièce / étoile au centre
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.arc(CS / 2, CS / 2 - 14, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.arc(CS / 2, CS / 2 - 14, 14, 0, Math.PI * 2);
    ctx.fill();

    // Texte "GRATTE"
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "900 17px Inter, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("GRATTE", CS / 2, CS / 2 + 18);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "400 8px Inter, sans-serif";
    ctx.letterSpacing = "1px";
    ctx.fillText(t("scratchHint"), CS / 2, CS / 2 + 32);

    // Trajectoire de grattage sinusoïdale
    const path: { x: number; y: number }[] = [];
    const rows = 6;
    for (let row = 0; row < rows; row++) {
      const y = (CS / (rows + 1)) * (row + 1);
      const dir = row % 2 ? -1 : 1;
      for (let s = 0; s <= 24; s++) {
        const p = s / 24;
        const x = dir > 0 ? CS * 0.1 + p * CS * 0.8 : CS * 0.9 - p * CS * 0.8;
        path.push({ x, y: y + Math.sin(p * Math.PI * 2) * 5 });
      }
    }
    scratchPathRef.current = path;
    scratchIdxRef.current = 0;
  }, [t]);

  // Grattage automatique piloté par le scroll (étape 3)
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
      const local = stepProg - 1;
      setCount(Math.max(1, 3 - Math.floor(local * 3)));
    }
    if (idx === 2) {
      const local = stepProg - 2;
      autoScratch(Math.min(0.95, local * 1.4));
    }
  });

  const notifShown = entered;
  const countdownShown = active === 1;
  const cardShown = active >= 2;
  const resultsShown = active === 3;
  // La carte disparaît dès que les résultats s'affichent (pas de superposition)
  const cardVisible = cardShown && !resultsShown;

  return (
    <section id="comment" ref={wrapRef} className="relative h-[450vh] bg-paper">
      <div className="sticky top-0 grid h-screen grid-cols-1 items-center overflow-hidden md:grid-cols-2 ">
        {/* GAUCHE — textes étapes */}
        <motion.div
          className="relative order-2 px-6 md:order-1 md:px-12 lg:px-20"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>

        {/* DROITE — téléphone */}
        <div className="relative order-1 flex items-center justify-center pb-6 md:order-2 md:pb-0">
          {/* Timeline orange — identique au companion (bord gauche de la colonne, 80% de haut) */}
          <div className="pointer-events-none absolute bottom-[10%] left-0 top-[10%] hidden w-0.5 overflow-hidden bg-white/[0.07] md:block">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top bg-orange-500"
            />
          </div>
          <motion.div
            initial={{ rotate: 0, x: 0 }}
            whileInView={{
              rotate: [0, -2.5, 2.5, -2, 2, -1.2, 1.2, 0],
              x: [0, -2, 2, -1.5, 1.5, -0.8, 0.8, 0],
            }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeInOut" }}
            onViewportEnter={() => setTimeout(() => setEntered(true), 400)}
            className="relative z-10 h-[480px] w-[240px] overflow-hidden rounded-[2.5rem] border-2 border-white/12 bg-black shadow-[0_40px_80px_rgba(0,0,0,.6)]"
          >
            {/* encoche */}
            <div className="absolute left-1/2 top-3.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[#222]" />
            {/* fond écran */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/photos/phonebg.jpg)", filter: "grayscale(.4) brightness(.4)" }}
            />

            {/* Notification — même image que la hero pour cohérence visuelle */}
            <div
              className="absolute inset-x-2.5 top-7 z-[5] transition-all duration-[550ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)]"
              style={{
                transform: notifShown ? "translateY(0) scale(1)" : "translateY(22px) scale(0.96)",
                opacity: notifShown ? 1 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/notif-but.png" alt="" className="h-auto w-full" />
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

            {/* Carte à gratter — image hero + foil canvas au scroll */}
            <div
              className="absolute inset-x-0 bottom-[58px] z-[6] flex justify-center transition-all duration-500"
              style={{ opacity: cardVisible ? 1 : 0, transform: `scale(${cardVisible ? 1 : 0.85})` }}
            >
              <div className="relative w-[62%]" style={{ filter: "drop-shadow(0 12px 28px rgba(255,77,10,0.45))" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/v2/card-50pts.png" alt="" className="h-auto w-full rounded-[var(--radius-card)]" />
                {/* Foil de grattage — s'efface au scroll (destination-out) */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full rounded-[var(--radius-card)]"
                />
              </div>
            </div>

            {/* Résultats — carte 50pts révélée sur fond noir */}
            <div
              className="absolute inset-0 z-[7] flex items-center justify-center bg-black transition-opacity duration-500"
              style={{ opacity: resultsShown ? 1 : 0, pointerEvents: "none" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/v2/card-50pts.png"
                alt=""
                className="w-[72%] h-auto rounded-[var(--radius-card)]"
                style={{ filter: "drop-shadow(0 16px 36px rgba(255,77,10,0.5))" }}
              />
            </div>
          </motion.div>
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
        <motion.div
          className="mb-3 text-[0.6rem] font-bold uppercase tracking-widest text-orange-500"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("eyebrow")}
        </motion.div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={i}
              className="glass h-full rounded-[var(--radius-card)] p-6"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            >
              <span className="font-display text-2xl text-orange-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 whitespace-pre-line font-display text-lg leading-tight text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm text-mist">{s.body}</p>
            </motion.li>
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
