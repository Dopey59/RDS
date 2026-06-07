"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { localeKey } from "@/content/home";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Phase = {
  id: string;
  num: string;
  name: string;
  stat: string;
  detail: string;
  /**
   * Une image par classement/groupe.
   * Remplacer chaque entrée par la vraie capture quand disponible.
   * Ex: ["/v2/poule-a.png", "/v2/poule-b.png", ...]
   */
  mockups: string[];
  bg: string;
  bgFilter?: string;
};

// Placeholder utilisé pour toutes les captures en attente
const PH = "/v2/phone-mock.png";

const PHASES: Record<"fr" | "en", Phase[]> = {
  fr: [
    {
      id: "poules", num: "01", name: "Phase de Poules",  stat: "72 matchs",  detail: "6 classements · 12 matchs chacun",
      // 6 captures — une par groupe (A→F). Remplacer par /v2/poule-a.png … /v2/poule-f.png
      mockups: [
        "/v2/phone-mock.png",   // Groupe A — remplacer par /v2/poule-a.png
        "/v2/phone-mock.png",   // Groupe B — remplacer par /v2/poule-b.png
        "/v2/phone-mock.png",   // Groupe C
        "/v2/phone-mock.png",   // Groupe D
        "/v2/phone-mock.png",   // Groupe E
        "/v2/phone-mock.png",   // Groupe F
      ],
      bg: "/photos/pitch-aerial.jpg",
    },
    {
      id: "r16",    num: "02", name: "16ᵉ de Finales",   stat: "16 matchs",  detail: "2 classements",
      // 2 captures — une par classement. Remplacer par /v2/r16-1.png, /v2/r16-2.png
      mockups: [
        "/v2/phone-mock.png",   // Classement 1 — remplacer par /v2/r16-1.png
        "/v2/phone-mock.png",   // Classement 2 — remplacer par /v2/r16-2.png
      ],
      bg: "/photos/stadium.jpg",
    },
    {
      id: "r8",     num: "03", name: "8ᵉ de Finale",     stat: "8 matchs",   detail: "1 classement · 8 matchs",
      mockups: [PH],
      bg: "/photos/stadium-lights.jpg",
    },
    {
      id: "quarts", num: "04", name: "Quarts de Finale", stat: "4 matchs",   detail: "1 classement",
      mockups: [PH],
      bg: "/photos/boots.jpg",
    },
    {
      id: "demis",  num: "05", name: "Demi-Finales",     stat: "2 matchs",   detail: "1 classement",
      mockups: [PH],
      bg: "/photos/stadium-lights.jpg", bgFilter: "hue-rotate(200deg) saturate(1.3)",
    },
    {
      id: "finale", num: "06", name: "Finale",           stat: "Le match",   detail: "1 classement · pour tous",
      mockups: [PH],
      bg: "/photos/stadium.jpg", bgFilter: "saturate(1.6) brightness(1.05)",
    },
  ],
  en: [
    {
      id: "poules", num: "01", name: "Group Stage",    stat: "72 matches", detail: "6 brackets · 12 matches each",
      mockups: [
        "/v2/phone-mock.png",
        "/v2/phone-mock.png",
        "/v2/phone-mock.png",
        "/v2/phone-mock.png",
        "/v2/phone-mock.png",
        "/v2/phone-mock.png",
      ],
      bg: "/photos/pitch-aerial.jpg",
    },
    {
      id: "r16",    num: "02", name: "Round of 16",    stat: "16 matches", detail: "2 brackets",
      mockups: [
        "/v2/phone-mock.png",
        "/v2/phone-mock.png",
      ],
      bg: "/photos/stadium.jpg",
    },
    {
      id: "r8",     num: "03", name: "Round of 8",     stat: "8 matches",  detail: "1 bracket · 8 matches",
      mockups: [PH],
      bg: "/photos/stadium-lights.jpg",
    },
    {
      id: "quarts", num: "04", name: "Quarter-Final",  stat: "4 matches",  detail: "1 bracket",
      mockups: [PH],
      bg: "/photos/boots.jpg",
    },
    {
      id: "demis",  num: "05", name: "Semi-Final",     stat: "2 matches",  detail: "1 bracket",
      mockups: [PH],
      bg: "/photos/stadium-lights.jpg", bgFilter: "hue-rotate(200deg) saturate(1.3)",
    },
    {
      id: "finale", num: "06", name: "Final",          stat: "The match",  detail: "1 bracket · for all",
      mockups: [PH],
      bg: "/photos/stadium.jpg", bgFilter: "saturate(1.6) brightness(1.05)",
    },
  ],
};

// ─── Phone fan positions ───────────────────────────────────────────────────────

type Pos = { rotate: number; x: number; y: number; scale: number; z: number };

const FAN: Record<number, Pos[]> = {
  1: [{ rotate: 3, x: 0,    y: 0,  scale: 0.88, z: 0 }],
  2: [
    { rotate: -11, x: -72, y: 18, scale: 0.74, z: 0 },
    { rotate:   9, x:  58, y:  4, scale: 0.78, z: 1 },
  ],
  6: [
    { rotate: -26, x: -162, y: 62, scale: 0.52, z: 0 },
    { rotate: -15, x:  -97, y: 26, scale: 0.55, z: 1 },
    { rotate:  -5, x:  -32, y:  6, scale: 0.57, z: 2 },
    { rotate:   5, x:   32, y:  6, scale: 0.57, z: 3 },
    { rotate:  15, x:   97, y: 26, scale: 0.55, z: 4 },
    { rotate:  26, x:  162, y: 62, scale: 0.52, z: 5 },
  ],
};

// ─── Phone fan ────────────────────────────────────────────────────────────────
// key={phase.id} sur le wrapper force un remount complet à chaque phase →
// les animations initial→animate se rejouent naturellement sans AnimatePresence.

function PhoneFan({ phase, reduce }: { phase: Phase; reduce: boolean }) {
  const positions = FAN[phase.mockups.length] ?? FAN[1];
  return (
    <div
      className="relative"
      style={{ width: 380, height: 500 }}
    >
      {phase.mockups.map((src, i) => {
        const pos = positions[i] ?? positions[0];
        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: pos.z }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: pos.scale, x: pos.x, y: pos.y, rotate: pos.rotate }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Image
              src={src}
              alt=""
              width={220}
              height={433}
              className="drop-shadow-[0_28px_56px_rgba(0,0,0,0.7)]"
              priority={i === 0}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Scene (scroll-driven) ────────────────────────────────────────────────────

const N = PHASES.fr.length;
const EASE = [0.22, 1, 0.36, 1] as const;

function TournamentScene() {
  const t = useTranslations("matchSchedule");
  const phases = PHASES[localeKey(useLocale())];
  const reduce = !!useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.floor(v * N)));
  });

  const phase = phases[active];

  return (
    <div ref={wrapRef} className="relative h-[580vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Fond : image de phase avec crossfade ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={phase.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <Image
              src={phase.bg}
              alt=""
              fill
              className="object-cover object-center"
              style={{ filter: phase.bgFilter }}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay sombre navy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, rgba(31,29,117,0.88) 0%, rgba(24,22,102,0.90) 35%, rgba(17,16,79,0.93) 65%, rgba(10,9,48,0.97) 100%)",
          }}
        />

        {/* Ghost phase number */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 select-none font-display leading-none text-white"
          aria-hidden
          style={{ fontSize: "clamp(9rem, 30vw, 24rem)", fontWeight: 900, opacity: 0.05, lineHeight: 0.85 }}
        >
          {phase.num}
        </div>

        {/* Barre de progression */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-white/[0.07]">
          <motion.div className="w-full bg-orange-500 origin-top" style={{ scaleY: scrollYProgress }} />
        </div>

        {/* ── Contenu ── */}
        <div className="relative z-10 mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-4 px-6 md:grid-cols-[1fr_1.5fr] md:gap-12">

          {/* Colonne gauche */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 text-[0.6rem] font-bold uppercase tracking-widest text-orange-500"
            >
              {t("eyebrow")}
            </motion.div>

            {phases.map((p, i) => {
              const isActive = i === active;
              return (
                <div
                  key={p.id}
                  className="border-b border-white/[0.08] py-2.5 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.28 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 flex-none rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? "#FF4D0A" : "transparent",
                        boxShadow: isActive ? "0 0 6px #FF4D0A" : "none",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                    <span className="text-[0.6rem] font-bold tabular-nums text-orange-500/70">{p.num}</span>
                    <span className="font-display text-base font-bold leading-tight text-white md:text-lg">{p.name}</span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key={`detail-${p.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 pl-[1.6rem]">
                          <span className="font-display text-2xl font-black text-orange-400">{p.stat}</span>
                          <span className="text-[0.72rem] text-white/40">{p.detail}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Colonne droite — phones */}
          <div className="flex items-center justify-center order-1 md:order-2">
            <AnimatePresence mode="wait">
              <PhoneFan key={phase.id} phase={phase} reduce={reduce} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Fallback (reduced-motion) ────────────────────────────────────────────────

function FallbackPhases() {
  const t = useTranslations("matchSchedule");
  const phases = PHASES[localeKey(useLocale())];
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0">
        <Image src="/photos/stadium.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(10,9,48,0.88)" }} />
      </div>
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-2 text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">{t("eyebrow")}</div>
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t("title")}</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((p) => (
            <div key={p.id} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <span className="text-[0.6rem] font-bold text-orange-500">{p.num}</span>
              <div className="font-display text-lg font-bold text-white">{p.name}</div>
              <div className="mt-1 text-sm font-bold text-orange-400">{p.stat}</div>
              <div className="text-xs text-white/40">{p.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function MatchSchedule() {
  const reduce = useReducedMotion();
  if (reduce) return <FallbackPhases />;
  return <TournamentScene />;
}
