"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { winners } from "@/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Winners() {
  const t = useTranslations("winners");
  const reduce = useReducedMotion();

  return (
    <Section id="winners" tone="cloud">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 max-w-xl text-mist">{t("subtitle")}</p>
      </Reveal>

      <div className="mx-auto mt-8 max-w-2xl divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-sm">
        {winners.map((w, i) => (
          <motion.div
            key={w.rank}
            className="flex items-center gap-4 px-5 py-4"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold ${
                w.rank <= 3 ? "bg-orange-500 text-ink-900" : "bg-cloud text-ink-700"
              }`}
            >
              {w.rank}
            </span>
            <span className="flex-1 font-semibold text-ink-900">{w.pseudo}</span>
            <span className="font-display font-bold text-blue-300">
              <NumberTicker value={w.points} className="tnum" />{" "}
              <span className="text-xs font-medium text-mist">{t("points")}</span>
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE, delay: winners.length * 0.07 }}
      >
        <Button href="/">{t("cta")}</Button>
      </motion.div>
    </Section>
  );
}
