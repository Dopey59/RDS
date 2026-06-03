import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { news, localeKey } from "@/content/home";

export function FootballNews() {
  const t = useTranslations("news");
  const rows = news[localeKey(useLocale())];

  return (
    <Section id="actus">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 max-w-xl text-mist">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((n, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <article className="h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-sm transition-shadow hover:shadow-md">
              <div className="band-blue aspect-[16/10]" aria-hidden />
              <div className="p-5">
                <span className="inline-flex rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
                  {n.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold leading-snug text-ink-900">{n.title}</h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
