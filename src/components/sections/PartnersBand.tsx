"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { partnerShowcase, localeKey } from "@/content/home";

function ParallaxShowcase() {
  const t = useTranslations("partnersBand");
  const locale = useLocale();
  const ps = partnerShowcase[localeKey(locale)];
  const n = ps.length;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [localProg, setLocalProg] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Parallax Y : le logo glisse de +28 (bas) → 0 (centre) → -28 (haut) dans chaque section
  const logoY = useTransform(scrollYProgress, (v) => {
    const scaled = Math.min(v * n, n - 0.0001);
    const local = scaled - Math.floor(scaled);
    return (0.5 - local) * 56;
  });

  // Scale léger : 0.97 aux extrémités → 1 au centre de chaque section
  const logoScale = useTransform(scrollYProgress, (v) => {
    const scaled = Math.min(v * n, n - 0.0001);
    const local = scaled - Math.floor(scaled);
    return 1 - Math.abs(local - 0.5) * 0.06;
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const scaled = Math.min(v * n, n - 0.0001);
    const idx = Math.floor(scaled);
    setActive(idx);
    setLocalProg(scaled - idx);
  });

  // Courbe en cloche : 0 → 1 → 0 sur toute la durée d'un partenaire
  const glowIntensity = Math.sin(localProg * Math.PI);

  // Couleur de glow au pic de chaque partenaire (radial au centre)
  const GLOW: Record<string, string> = {
    boulanger: "rgba(20, 60, 210, 0.55)",
    cristaline: "rgba(0, 120, 220, 0.50)",
    decathlon: "rgba(0, 80, 200, 0.50)",
    forumjobs: "rgba(210, 65, 0, 0.50)",
  };

  return (
    <div ref={wrapRef} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Arrière-plans colorés — transition douce entre partenaires */}
        {ps.map((p, i) => (
          <div
            key={p.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ backgroundColor: p.bg, opacity: i === active ? 1 : 0 }}
          >
            {/* Pattern logos inclinés à 90° */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }).map((_, j) => {
                const col = j % 5;
                const row = Math.floor(j / 5);
                const stagger = row % 2 === 1 ? 10 : 0;
                return (
                  <div
                    key={j}
                    className="absolute"
                    style={{
                      left: `${col * 20 + stagger}%`,
                      top: `${row * 35 - 5}%`,
                      transform: "rotate(90deg)",
                      opacity: 0.09,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt="" style={{ width: 110, height: "auto" }} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Glow scroll-driven — courbe en cloche, pic au milieu de chaque section */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowIntensity,
            background: `radial-gradient(ellipse 90% 75% at 50% 60%, ${GLOW[ps[active].id] ?? "rgba(0,0,0,0.3)"}, transparent)`,
          }}
        />

        {/* Barre supérieure : titre de section + compteur */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">
            {t("title")}
          </span>
          <span className="tnum text-[0.6rem] font-bold text-ink-900/30">
            {String(active + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(n).padStart(2, "0")}
          </span>
        </div>

        {/* Layout principal */}
        <div className="relative z-10 flex h-full flex-col md:flex-row">

          {/* ── Colonne logo (gauche sur desktop, haut sur mobile) ── */}
          <div className="flex flex-[5] items-center justify-center pt-16 md:flex-1 md:pt-0">
            <motion.div
              style={{ y: logoY, scale: logoScale }}
              className="relative h-20 w-52 md:h-28 md:w-72"
            >
              {ps.map((p, i) => (
                <div
                  key={p.id}
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `scale(${i === active ? 1 : 0.92})`,
                  }}
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Séparateur vertical (desktop uniquement) */}
          <div
            className="hidden self-center md:block"
            style={{ width: "1px", height: "40%", background: "rgba(0,0,0,0.08)" }}
          />

          {/* ── Colonne texte (droite sur desktop, bas sur mobile) ── */}
          <div className="relative flex-[6] md:flex-1">
            {ps.map((p, i) => (
              <div
                key={p.id}
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 lg:px-20"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: `translateY(${i === active ? 0 : i < active ? -20 : 20}px)`,
                  transition: "opacity 0.55s ease, transform 0.55s ease",
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                {/* Eyebrow */}
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="h-0.5 w-5 bg-orange-500" />
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-orange-500">
                    {p.eyebrow}
                  </span>
                </div>

                {/* Nom + accroche */}
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-ink-900">
                  {p.name}
                </h2>
                <p className="mt-2 font-display text-[clamp(1rem,2.5vw,1.4rem)] font-light leading-tight text-ink-700">
                  {p.tagline}
                </p>

                {/* Corps */}
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist md:text-base">
                  {p.body}
                </p>

                {/* CTA */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-fit items-center gap-2 border-b border-orange-500 pb-0.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
                >
                  {p.urlLabel}
                  <svg
                    aria-hidden
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Points de progression */}
        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {ps.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === active ? "22px" : "6px",
                background: i === active ? "#ff4d0a" : "rgba(0,0,0,0.18)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fallback statique (reduced-motion / SSR) */
function PartnerGrid() {
  const t = useTranslations("partnersBand");
  const locale = useLocale();
  const ps = partnerShowcase[localeKey(locale)];

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-3 text-[0.6rem] font-bold uppercase tracking-widest text-orange-500"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {t("title")}
        </motion.div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ps.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex flex-col gap-4 rounded-[var(--radius-card)] p-6 transition hover:shadow-md"
              style={{ backgroundColor: p.bg }}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            >
              <div className="relative h-10 w-full">
                <Image src={p.logo} alt={p.name} fill className="object-contain object-left" />
              </div>
              <div>
                <div className="text-[0.55rem] font-bold uppercase tracking-widest text-orange-500">
                  {p.eyebrow}
                </div>
                <div className="mt-1 font-display text-lg text-ink-900">{p.name}</div>
                <p className="mt-2 text-xs leading-relaxed text-mist">{p.tagline}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersBand() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (reduce || !mounted) return <PartnerGrid />;
  return <ParallaxShowcase />;
}
