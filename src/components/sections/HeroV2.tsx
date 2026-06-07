"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";
const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroV2() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      className="grain relative isolate overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 38%, #25237a 0%, #1b1b6b 32%, #141259 56%, #0c0b3a 100%)",
      }}
    >
      {/* lueurs */}
      <div
        className="absolute left-1/2 top-[36%] -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(99,98,255,.35), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute -right-32 top-10 -z-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,77,10,.28), transparent)" }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-20 md:grid-cols-2 md:pb-24 md:pt-28">
        {/* Colonne texte */}
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
            className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
          >
            {t("title")} <span className="text-orange-500">{t("titleAccent")}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg text-white/70">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href={APP_STORE_URL} aria-label="App Store" className="transition hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/appstore.svg" alt="Télécharger sur l'App Store" className="h-12 w-auto" />
            </a>
            <a href={PLAY_STORE_URL} aria-label="Google Play" className="transition hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/googleplay.svg" alt="Disponible sur Google Play" className="h-12 w-auto" />
            </a>
          </motion.div>
        </motion.div>

        {/* Colonne téléphone */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <div className={reduce ? "relative w-[270px] md:w-[300px]" : "relative w-[270px] animate-[var(--animate-float)] md:w-[300px]"}>
            <div className="relative" style={{ aspectRatio: "1280 / 1920" }}>
              {/* écran (wallpaper) derrière le cadre transparent */}
              <div className="absolute overflow-hidden rounded-[2.2rem]" style={{ inset: "2.6% 5.2%" }}>
                <Image src="/v2/app-wallpaper.png" alt="" fill priority sizes="300px" className="object-cover" />

                {/* notification but */}
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 1 }}
                  className="absolute inset-x-3 top-6 flex items-center gap-2.5 rounded-2xl bg-white/85 p-2.5 shadow-lg backdrop-blur"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/app-icon.svg" alt="" className="h-8 w-8 rounded-lg" />
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-bold leading-tight text-ink-900">⚽ BUUUT ! 48&apos;</p>
                    <p className="truncate text-[10px] leading-tight text-ink-700">
                      Gratte ta carte 🦊
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* cadre */}
              <Image
                src="/v2/iphone.png"
                alt="Application Renard des Surfaces"
                fill
                priority
                sizes="300px"
                className="pointer-events-none relative z-10 object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
