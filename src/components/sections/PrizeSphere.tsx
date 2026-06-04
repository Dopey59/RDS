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
import { ArrowDownIcon } from "@/components/ui/icons";
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
  // depth : 0 = tout au fond, 1 = au premier plan
  const depth = useTransform(rot, (r) => Math.cos(base + r) * 0.5 + 0.5);
  // Le lot de devant domine (≈1.24), les autres sont nettement réduits (≈0.42)
  const scale = useTransform(depth, (d) => 0.42 + 0.82 * d);
  const opacity = useTransform(depth, (d) => 0.12 + 0.88 * d);
  // Flou de profondeur de champ plus marqué sur les lots reculés
  const filter = useTransform(depth, (d) => `blur(${(1 - d) * 4.5}px)`);
  // Le lot avant passe au-dessus des autres
  const zIndex = useTransform(depth, (d) => Math.round(d * 100));

  return (
    <motion.div
      style={{ x, z, scale, opacity, filter, zIndex }}
      /* Boîte responsive : ~54vw sur mobile (lot de devant ≈ 67vw), fixe sur desktop */
      className="absolute left-1/2 top-1/2 h-[54vw] w-[54vw] -ml-[27vw] -mt-[27vw] md:h-56 md:w-56 md:-ml-28 md:-mt-28"
    >
      <Image
        src={prize.image}
        alt={prize.name}
        width={600}
        height={600}
        sizes="(max-width: 768px) 90vw, 320px"
        className="h-full w-full object-contain drop-shadow-2xl"
      />
    </motion.div>
  );
}

/** Scène 3D — montée uniquement côté client (le ref de useScroll est donc attaché). */
function SphereScene() {
  const t = useTranslations("prizes");
  const prizes = showcasePrizes[localeKey(useLocale())];
  const n = prizes.length;
  const step = TWO_PI / n;

  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, TWO_PI]);

  const [active, setActive] = useState(0);
  const [radius, setRadius] = useState(240);

  useEffect(() => {
    // Rayon resserré sur mobile : les autres lots se rangent derrière le principal.
    const set = () => setRadius(window.innerWidth < 768 ? 95 : 240);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useMotionValueEvent(rot, "change", (r) => {
    setActive(((Math.round(-r / step) % n) + n) % n);
  });

  const current = prizes[active];

  return (
    <section id="lots" className="relative bg-cloud">
      <div ref={wrapRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden px-4 pb-10 pt-20 md:pb-14 md:pt-28">
          {/* Zone haute : titre */}
          <div className="shrink-0 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-mist">{t("pick")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
          </div>

          {/* Zone centrale : sphère (occupe l'espace dispo, image centrée) */}
          <div
            className="relative flex w-full flex-1 items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <div className="relative h-full w-full max-w-3xl" style={{ transformStyle: "preserve-3d" }}>
              {prizes.map((p, i) => (
                <Orbiting key={p.id} prize={p} base={i * step} rot={rot} radius={radius} />
              ))}
            </div>
          </div>

          {/* Zone basse : nom + CTA + note */}
          <div className="shrink-0 flex flex-col items-center text-center">
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
            <p className="mt-4 inline-flex animate-bounce items-center gap-1 text-xs text-mist" aria-hidden>
              <ArrowDownIcon className="h-3.5 w-3.5" /> scroll
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Grille statique — rendu SSR / premier paint / reduced-motion. */
function FallbackGrid() {
  const t = useTranslations("prizes");
  const prizes = showcasePrizes[localeKey(useLocale())];
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

export function PrizeSphere() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (reduce || !mounted) return <FallbackGrid />;
  return <SphereScene />;
}
