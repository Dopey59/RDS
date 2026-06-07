"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroV2() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 45%, #1f1d75 0%, #181666 35%, #11104f 65%, #0a0930 100%)",
        cursor: "url('/v2/football-cursor-32.png') 24 24, auto",
      }}
    >
      {/* Serpentins / streamers décoratifs (coins) */}
      <Streamers reduce={!!reduce} />

      {/* lueurs */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(99,98,255,.30), transparent)" }}
        aria-hidden
      />

      <div className="relative  mx-auto flex flex-col sm:grid w-full max-w-6xl items-center gap-0 px-4 py-0 sm:gap-4 sm:px-6 sm:py-8 md:grid-cols-2 md:gap-10 md:py-20 lg:gap-50 ">
        {/* Colonne gauche — wordmark + subtitle + badges (badges visibles sur mobile et desktop) */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 order-2 mt-[185px] sm:mt-0 md:order-1">
          <motion.div variants={item} className="relative mx-auto w-full max-w-[460px] sm:max-w-[360px] md:mx-0 md:max-w-[460px] lg:max-w-[520px]">
            <Image
              src="/v2/wordmark-logo.svg"
              alt="Renard des Surfaces — Coupe du Monde 2026"
              width={1000}
              height={1000}
              priority
              className="h-auto sm:w-full w-auto"
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto max-w-[380px] text-center font-body text-xs leading-relaxed text-white/85 sm:max-w-[440px] sm:text-sm md:mx-0 md:max-w-[520px] md:text-left md:text-base lg:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 text-center text-[1.5rem] sm:text-[2rem] font-bold uppercase tracking-widest text-white sm:mt-10 md:text-left"
          >
            {t("cardTitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
          >
            <a href={PLAY_STORE_URL} aria-label="Google Play" className="transition hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/googleplay.svg" alt="Disponible sur Google Play" className="h-8 w-auto sm:h-10 md:h-12" />
            </a>
            <a href={APP_STORE_URL} aria-label="App Store" className="transition hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/appstore.svg" alt="Télécharger sur l'App Store" className="h-8 w-auto sm:h-10 md:h-12" />
            </a>
          </motion.div>
        </motion.div>

        {/* Colonne droite — composition téléphone (mobile-first : phone à droite, cartes + notif à gauche) */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 z-10 w-full max-w-[260px] sm:relative sm:top-auto sm:left-auto sm:translate-x-0 sm:max-w-[380px] md:order-2 md:ml-auto md:mr-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-[600px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >

          <div className={reduce ? "relative top-[10%] w-full min-h-[310px] sm:min-h-[370px] md:min-h-0" : "relative w-full min-h-[310px] sm:min-h-[370px] md:min-h-0 animate-[var(--animate-float)]"}>
            {/* Téléphone — capture réelle de l'app, droite-aligné, ~55% de la largeur de la composition */}
            <div className="relative ml-auto w-[65%] absolute" style={{ aspectRatio: "488 / 961" }}>
              <Image
                src="/v2/phone-mock.png"
                alt="L'application Renard des Surfaces : sélection des matchs de la Coupe du Monde"
                fill
                priority
                sizes="(max-width: 640px) 55vw, (max-width: 1024px) 280px, 340px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] rotate-10"
                />
            </div>

            {/* Carte 50 points — coin haut-gauche, chevauche le bord du phone */}
            <motion.div
              className="pointer-events-none absolute sm:left-[7%] left-[-15%] sm:top-[7%] top-[15%] bottom-[40%] z-10 w-[46%] origin-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -30, rotate: -22}}
              animate={{ opacity: 1, x: 0, rotate: -22, y: 0}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
              >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/card-50pts.png" alt="" className="h-auto w-full" />
            </motion.div>

            {/* Carte Lot immédiat — sous la première, plus grande, plus à gauche */}
            <motion.div
              className="pointer-events-none absolute sm:-left-[2%] -left-[20%] sm:top-[32%] bottom-[10%] z-10 w-[60%] origin-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -40, rotate: -26 }}
              animate={{ opacity: 1, x: 0, rotate: 14 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.6 }}
              >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/card-lot.png" alt="" className="h-auto w-full " />
            </motion.div>

            {/* Notification BUUUUUT ! — bas, devant tout (z-20) */}
            <motion.div
              className="pointer-events-none absolute sm:left-[-20%] bottom-[0%] sm:top-[0%] z-20 w-[60%] origin-center drop-shadow-[0_16px_36px_rgba(0,0,0,0.55)] sm:rotate-0 -rotate-10"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
              >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/notif-but.png" alt="Notification : Buuuut ! Gratte ta carte" className="h-auto w-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Serpentins décoratifs (rouge / magenta / jaune / cyan) — purement décoratifs */
function Streamers({ reduce }: { reduce: boolean }) {
  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1, ease: EASE, delay },
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block">
      {/* Top-right magenta */}
      <motion.svg
        {...enter(0.2)}
        className="absolute -right-6 top-2 h-16 w-40 sm:h-24 sm:w-56 md:h-28 md:w-72 lg:h-32 lg:w-80"
        viewBox="0 0 320 130"
      >
        <polygon points="320,0 60,55 320,40" fill="#ee2a6e" />
        <polygon points="320,60 110,90 320,80" fill="#e93b78" opacity=".8" />
      </motion.svg>

      {/* Left — rouge */}
      <motion.svg
        {...enter(0.35)}
        className="absolute -left-4 top-[28%] h-14 w-32 sm:h-20 sm:w-44 md:h-24 md:w-56 lg:h-28 lg:w-60"
        viewBox="0 0 240 110"
      >
        <polygon points="0,40 200,55 0,70" fill="#e2364a" />
      </motion.svg>

      {/* Left bottom — cyan */}
      <motion.svg
        {...enter(0.5)}
        className="absolute -left-6 bottom-[18%] h-12 w-32 sm:h-16 sm:w-40 md:h-16 md:w-48 lg:h-20 lg:w-56"
        viewBox="0 0 224 84"
      >
        <polygon points="0,30 200,40 0,50" fill="#2aa7d6" />
        <polygon points="0,52 180,62 0,70" fill="#33b6e2" opacity=".75" />
      </motion.svg>

      {/* Right — jaune */}
      <motion.svg
        {...enter(0.45)}
        className="absolute -right-4 top-[44%] h-16 w-40 md:h-24 md:w-56"
        viewBox="0 0 224 96"
      >
        <polygon points="224,30 30,50 224,60" fill="#f5cf2e" />
      </motion.svg>

      {/* Right bottom — cyan accent */}
      <motion.svg
        {...enter(0.6)}
        className="absolute -right-6 bottom-[14%] h-12 w-36 md:h-16 md:w-48"
        viewBox="0 0 192 64"
      >
        <polygon points="192,18 30,32 192,40" fill="#2aa7d6" />
      </motion.svg>
    </div>
  );
}
