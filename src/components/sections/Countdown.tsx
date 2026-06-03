"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { diff } from "@/lib/countdown";

const TARGET = process.env.NEXT_PUBLIC_EVENT_DATE;

export function Countdown() {
  const t = useTranslations("countdown");
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
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mist">{t("title")}</p>
      <div className="flex gap-3">
        {cells.map((c, i) => (
          <div
            key={i}
            className="min-w-[3.5rem] rounded-xl bg-cloud px-3 py-2 text-center ring-1 ring-line"
          >
            <div className="tnum font-display text-2xl font-bold text-ink-900">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase text-mist">{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
