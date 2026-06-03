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
      {/* Hero B2B — bandeau bleu */}
      <Section tone="blue">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">{t("subtitle")}</p>
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
              <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-mist">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparatif */}
      <Section tone="cloud">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t("compare.title")}</h2>
        </Reveal>
        <div className="mt-8 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-paper">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-blue-50">
                {head.map((h, i) => (
                  <th
                    key={i}
                    className={`p-4 font-semibold ${i === head.length - 1 ? "text-orange-600" : "text-ink-700"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line">
                  {r.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-4 ${j === r.length - 1 ? "font-semibold text-ink-900" : "text-mist"}`}
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
              <li className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-display font-bold text-ink-900">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm text-mist">{s}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Formulaire */}
      <Section id="contact" tone="cloud">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-line bg-paper p-8 shadow-sm">
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
