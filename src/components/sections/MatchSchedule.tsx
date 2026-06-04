import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { matches, localeKey } from "@/content/home";

export function MatchSchedule() {
  const t = useTranslations("matchSchedule");
  const rows = matches[localeKey(useLocale())];

  return (
    <Section tone="blue">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t("title")}</h2>
        <p className="mt-2 max-w-md text-white/80">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((m, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="rounded-[var(--radius-card)] bg-[#222222] p-5 ring-1 ring-white/10 shadow-lg">
              <div className="text-2xl" aria-hidden>
                {m.flag}
              </div>
              <div className="mt-3 font-display text-lg text-ink-900">{m.league}</div>
              <div className="tnum mt-1 text-sm text-blue-300">{m.when}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
