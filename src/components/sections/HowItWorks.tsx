import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Step = { title: string; text: string };

export function HowItWorks() {
  const t = useTranslations("how");
  const steps = t.raw("steps") as Step[];

  return (
    <Section id="comment" tone="cloud">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 max-w-xl text-mist">{t("subtitle")}</p>
      </Reveal>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <li className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-sm">
              <span className="font-display text-2xl font-bold text-orange-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-mist">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
