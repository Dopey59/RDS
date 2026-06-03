"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { showcasePrizes, localeKey } from "@/content/home";

/** Image produit avec fallback propre si le visuel n'est pas encore déposé. */
function PrizeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-cloud text-sm text-mist ${className ?? ""}`}>
        {alt}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setOk(false)} />;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function PrizesShowcase() {
  const t = useTranslations("prizes");
  const prizes = showcasePrizes[localeKey(useLocale())];
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % prizes.length), 3800);
    return () => clearInterval(id);
  }, [paused, reduce, prizes.length]);

  const current = prizes[active];

  return (
    <Section id="lots" tone="cloud">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-mist">{t("subtitle")}</p>
      </div>

      <div
        className="mt-10 grid items-center gap-8 lg:grid-cols-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Vedette */}
        <div className="relative order-1 flex justify-center">
          <div
            className="absolute h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(255,107,0,.28), transparent)" }}
            aria-hidden
          />
          <div className="relative flex h-[340px] w-full max-w-md items-center justify-center rounded-[2rem] border border-line bg-paper p-6 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex h-full w-full flex-col items-center justify-center gap-4"
              >
                <PrizeImg
                  src={current.image}
                  alt={current.name}
                  className="h-48 w-auto object-contain"
                />
                <span className="font-display text-xl font-bold text-ink-900">{current.name}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sélection + CTA */}
        <div className="order-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-mist">{t("pick")}</p>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3">
            {prizes.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={p.name}
                className={`flex aspect-square items-center justify-center rounded-2xl border bg-paper p-2 transition ${
                  i === active
                    ? "border-orange-500 ring-2 ring-orange-500/30"
                    : "border-line hover:border-blue-300"
                }`}
              >
                <PrizeImg src={p.image} alt={p.name} className="h-full w-full object-contain" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/" className="px-7 text-base">
              {t("ctaWin", { prize: current.cta })}
            </Button>
            <p className="mt-3 text-sm text-mist">{t("note")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
