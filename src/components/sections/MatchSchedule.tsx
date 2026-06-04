import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { matches, localeKey } from "@/content/home";

// Arête diagonale du bandeau bleu (descend vers la droite)
const BAND_CLIP = "polygon(0 0, 100% 2.5rem, 100% 100%, 0 100%)";
// Barre orange transversale qui suit la même diagonale
const BAR_CLIP = "polygon(0 0, 100% 2.5rem, 100% calc(2.5rem + 7px), 0 7px)";

export function MatchSchedule() {
  const t = useTranslations("matchSchedule");
  const rows = matches[localeKey(useLocale())];

  return (
    <section className="relative isolate overflow-hidden bg-paper text-white">
      {/* Bandeau bleu incliné */}
      <div className="band-blue absolute inset-0 -z-10" style={{ clipPath: BAND_CLIP }} aria-hidden />
      {/* Barre orange transversale sur l'arête */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-orange-500"
        style={{ clipPath: BAR_CLIP }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:pb-24 md:pt-28">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t("title")}</h2>
          <p className="mt-2 max-w-md text-white/80">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((m, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-[var(--radius-card)] bg-[#222222] p-5 shadow-lg ring-1 ring-white/10">
                <div className="text-2xl" aria-hidden>
                  {m.flag}
                </div>
                <div className="mt-3 font-display text-lg text-ink-900">{m.league}</div>
                <div className="tnum mt-1 text-sm text-blue-300">{m.when}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
