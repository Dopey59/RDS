import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Item = { title: string; text: string };

export function WhyItWorks() {
  const t = useTranslations("why");
  const items = t.raw("items") as Item[];

  return (
    <Section className="bg-ink-800/30">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={(i % 3) * 0.06}>
            <div className="h-full rounded-[var(--radius-card)] border-l-2 border-orange-500 bg-ink-900/60 p-6 ring-1 ring-white/5">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-mist">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
