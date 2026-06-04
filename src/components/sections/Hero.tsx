"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ScratchCard } from "@/components/scratch/ScratchCard";
import { Countdown } from "@/components/sections/Countdown";
import { ShinyText } from "@/components/ui/ShinyText";
import { Marquee } from "@/components/ui/Marquee";
import { matches, localeKey } from "@/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tm = useTranslations("matchSchedule");
  const rows = matches[localeKey(useLocale())];
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.11, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section className="grain relative isolate overflow-hidden bg-ink-900 text-white">
      {/* Image de fond stade (générique) */}
      <Image
        src="/photos/stadium.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-45 contrast-125 saturate-125"
      />
      {/* Voiles de contraste : fait ressortir texte + illustrations */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/70" />
      {/* Aurores animées */}
      <div
        className="absolute -right-32 -top-40 -z-10 h-[40rem] w-[40rem] animate-[var(--animate-float)] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,107,0,.45), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute -left-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(77,166,255,.35), transparent)" }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-10 pt-20 md:grid-cols-2 md:pb-16 md:pt-28">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/20 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            {t("badge")}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.75rem] font-bold leading-[1.04] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] md:text-6xl lg:text-7xl"
          >
            {t("title")}
            <br />
            <ShinyText tone="white">{t("titleAccent")}</ShinyText>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg text-white/70">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <StoreBadges />
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <Countdown />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center md:justify-end"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        >
          <div className={reduce ? "" : "animate-[var(--animate-float)]"}>
            <ScratchCard
              hint={t("card.hint")}
              prizeLabel={t("card.prizeLabel")}
              prize={t("card.points")}
            />
          </div>
        </motion.div>
      </div>

      {/* Bandeau matchs à venir */}
      <div className="relative border-t border-white/10 bg-white/[0.03] py-4 backdrop-blur">
        <Marquee fade="ink">
          {rows.map((m, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2 text-sm text-white/80"
            >
              <span aria-hidden>{m.flag}</span>
              <span className="font-semibold text-white">{m.league}</span>
              <span className="tnum text-white/50">{m.when}</span>
              <span className="ml-4 text-white/15">•</span>
            </span>
          ))}
        </Marquee>
        <span className="sr-only">{tm("title")}</span>
      </div>
    </section>
  );
}
