import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

export function SummerEvent() {
  const t = useTranslations("summer");
  const stats = t.raw("stats") as Stat[];

  return (
    <Section>
      <div className="bg-radiant noise relative overflow-hidden rounded-[2rem] px-6 py-14 ring-1 ring-white/10 md:px-12">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-xl text-mist">{t("lead")}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-[var(--radius-card)] bg-white/5 p-6 ring-1 ring-white/10">
                <div className="tnum font-display text-4xl font-bold text-orange-400">{s.value}</div>
                <div className="mt-1 text-sm text-mist">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-mist">{t("after")}</p>
      </div>
    </Section>
  );
}
