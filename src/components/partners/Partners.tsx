import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "./LeadForm";

type Card = { title: string; text: string };

export function Partners() {
  const t = useTranslations("partners");
  const cards = t.raw("model.cards") as Card[];
  const head = t.raw("compare.head") as string[];
  const rows = t.raw("compare.rows") as string[][];
  const steps = t.raw("funnel.steps") as string[];

  return (
    <>
      {/* Hero B2B */}
      <Section className="bg-radiant noise relative overflow-hidden">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-orange-400">{t("eyebrow")}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-mist">{t("subtitle")}</p>
          <a
            href="#contact"
            className="mt-8 inline-flex min-h-[44px] items-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-ink-900 hover:bg-orange-600"
          >
            {t("cta")}
          </a>
        </Reveal>
      </Section>

      {/* Modèle */}
      <Section>
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t("model.title")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-card)] bg-ink-800 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-mist">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparatif */}
      <Section className="bg-ink-800/30">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t("compare.title")}</h2>
        </Reveal>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr>
                {head.map((h, i) => (
                  <th
                    key={i}
                    className={`p-3 font-semibold ${i === head.length - 1 ? "text-orange-400" : "text-mist"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-white/10">
                  {r.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-3 ${j === r.length - 1 ? "font-medium text-paper" : "text-mist"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Funnel */}
      <Section>
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold md:text-4xl">
            {t("funnel.title")}
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <li className="h-full rounded-[var(--radius-card)] bg-ink-800 p-6 ring-1 ring-white/10">
                <span className="font-display text-2xl font-bold text-orange-500">{i + 1}</span>
                <p className="mt-3 text-sm text-mist">{s}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Formulaire */}
      <Section id="contact">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-ink-800 p-8 ring-1 ring-white/10">
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
