"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { diff } from "@/lib/countdown";

const TARGET = process.env.NEXT_PUBLIC_EVENT_DATE;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Countdown() {
  const t = useTranslations("countdown");
  const reduce = useReducedMotion();
  const [parts, setParts] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    if (!TARGET) return;
    const target = new Date(TARGET).getTime();
    if (Number.isNaN(target)) return;
    const tick = () => setParts(diff(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!parts) return null;

  const cells = [
    { v: parts.days, l: t("days") },
    { v: parts.hours, l: t("hours") },
    { v: parts.minutes, l: t("minutes") },
    { v: parts.seconds, l: t("seconds") },
  ];

  return (
    <div>
      <motion.p
        className="mb-2 text-xs font-semibold uppercase tracking-widest text-mist"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {t("title")}
      </motion.p>

      <div className="flex gap-3">
        {cells.map((c, i) => (
          <motion.div
            key={i}
            className="min-w-[3.5rem] rounded-xl bg-cloud px-3 py-2 text-center ring-1 ring-line"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
          >
            <div className="tnum font-display text-2xl font-bold text-ink-900">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase text-mist">{c.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
