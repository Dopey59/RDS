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
import { StoreBadges } from "@/components/ui/StoreBadges";
import { matches, localeKey } from "@/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

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
          <StoreBadges className="p-3" />
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
