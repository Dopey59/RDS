"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { showcasePrizes, localeKey, type ShowcasePrize } from "@/content/home";

const TWO_PI = Math.PI * 2;

function Orbiting({
  prize,
  base,
  rot,
  radius,
}: {
  prize: ShowcasePrize;
  base: number;
  rot: MotionValue<number>;
  radius: number;
}) {
  const x = useTransform(rot, (r) => radius * Math.sin(base + r));
  const z = useTransform(rot, (r) => radius * Math.cos(base + r));
  const opacity = useTransform(rot, (r) => 0.35 + 0.65 * (Math.cos(base + r) * 0.5 + 0.5));

  return (
    <motion.div
      style={{ x, z, opacity }}
      className="absolute left-1/2 top-1/2 -ml-[5.5rem] -mt-[5.5rem] h-44 w-44 md:-ml-28 md:-mt-28 md:h-56 md:w-56"
    >
      <Image
        src={prize.image}
        alt={prize.name}
        width={260}
        height={260}
        className="h-full w-full object-contain drop-shadow-2xl"
      />
    </motion.div>
  );
}

export function PrizeSphere() {
  const t = useTranslations("prizes");
  const prizes = showcasePrizes[localeKey(useLocale())];
  const reduce = useReducedMotion();
  const n = prizes.length;
  const step = TWO_PI / n;

  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const rot = useTransform(scrollYProgress, [0, 1], [0, TWO_PI]);

  const [active, setActive] = useState(0);
  const [radius, setRadius] = useState(260);

  useEffect(() => {
    const set = () => setRadius(window.innerWidth < 640 ? 150 : 260);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useMotionValueEvent(rot, "change", (r) => {
    setActive(((Math.round(-r / step) % n) + n) % n);
  });

  const current = prizes[active];

  // Fallback statique (accessibilité / reduced-motion)
  if (reduce) {
    return (
      <Section id="lots" tone="cloud">
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 max-w-xl text-mist">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prizes.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center rounded-[var(--radius-card)] border border-line bg-paper p-6 text-center shadow-sm"
            >
              <Image src={p.image} alt={p.name} width={180} height={180} className="h-36 w-auto object-contain" />
              <span className="mt-4 font-display text-lg font-bold text-ink-900">{p.name}</span>
              <Button href="/" className="mt-4">
                {p.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <section id="lots" className="relative bg-cloud">
      <div ref={wrapRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-mist">{t("pick")}</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>

          {/* Scène 3D */}
          <div className="relative mt-6 w-full" style={{ perspective: "1200px" }}>
            <div
              className="relative mx-auto h-72 w-full max-w-3xl md:h-80"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* halo */}
              <div
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(255,107,0,.22), transparent)" }}
                aria-hidden
              />
              {prizes.map((p, i) => (
                <Orbiting key={p.id} prize={p} base={i * step} rot={rot} radius={radius} />
              ))}
            </div>
          </div>

          {/* Nom + CTA du lot de devant */}
          <div className="mt-6 flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <span className="font-display text-xl font-bold text-ink-900">{current.name}</span>
                <Button href="/" className="mt-3 px-7 text-base">
                  {current.ctaLabel}
                </Button>
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-sm text-mist">{t("note")}</p>
            <p className="mt-6 animate-bounce text-xs text-mist md:mt-8" aria-hidden>
              ↓ scroll
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
