"use client";

import Image from "next/image";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";
import { matches, localeKey } from "@/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const rows = matches[localeKey(useLocale())];
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  // Parallax souris (lissé)
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });
  const onMouseMove = (e: ReactMouseEvent) => {
    if (reduce) return;
    mxRaw.set((e.clientX / window.innerWidth - 0.5) * 22);
    myRaw.set((e.clientY / window.innerHeight - 0.5) * 14);
  };

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper text-white"
    >
      {/* Photo de fond — parallax scroll (extérieur) + souris (intérieur) */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20">
        <motion.div style={{ x: mx, y: my }} className="absolute inset-[-30px]">
          <Image src="/photos/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      {/* Vignette sombre */}
      <div className="vignette absolute inset-0 -z-10" aria-hidden />

      {/* Corps */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-10 px-4 pb-10 pt-28 md:flex-row md:items-end md:justify-between md:pb-14"
      >
        {/* Texte */}
        <div className="max-w-xl">
          <motion.div
            variants={item}
            className="mb-5 inline-flex items-center gap-2 text-[0.62rem] font-medium tracking-wide text-white/55"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t("badge")}
          </motion.div>

          <h1 className="font-display leading-[0.88]">
            <motion.span
              variants={item}
              className="block text-[clamp(3.2rem,9vw,6rem)] text-ink-900"
            >
              {t("title")}
            </motion.span>
            <motion.span
              variants={item}
              className="block text-[clamp(3.2rem,9vw,6rem)] text-orange-500"
            >
              {t("titleAccent")}
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Carte CTA — glassmorphism */}
        <motion.div
          variants={item}
          className="glass w-full shrink-0 overflow-hidden rounded-[var(--radius-card)] shadow-2xl md:w-[290px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-[0.62rem] font-bold uppercase tracking-widest text-white/45">
              {t("cardTitle")}
            </span>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide text-orange-400">
              {t("free")}
            </span>
          </div>
          <div className="flex gap-2 p-3">
            <a
              href={APP_STORE_URL}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-[0.7rem] font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <AppleIcon />
              <span className="leading-tight">
                <span className="block text-[0.5rem] font-light opacity-50">{t("downloadOn")}</span>
                App Store
              </span>
            </a>
            <a
              href={PLAY_STORE_URL}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-[0.7rem] font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <PlayIcon />
              <span className="leading-tight">
                <span className="block text-[0.5rem] font-light opacity-50">{t("availableOn")}</span>
                Google Play
              </span>
            </a>
          </div>
          <p className="px-4 pb-3 text-center text-[0.54rem] text-mist">{t("legal")}</p>
        </motion.div>
      </motion.div>

      {/* Ticker matchs */}
      <div className="glass relative z-10 border-t border-white/10 py-3">
        <Marquee fade="none">
          {rows.map((m, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 px-6 text-sm text-white/35">
              <span className="text-[0.45rem] text-orange-500" aria-hidden>
                ●
              </span>
              <span aria-hidden>{m.flag}</span>
              <span className="font-medium text-white/65">{m.league}</span>
              <span className="tnum text-blue-300">{m.when}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
