import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Qa = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Qa[];

  return (
    <Section id="faq" className="bg-ink-800/30">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
      </Reveal>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10">
        {items.map((qa, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
              {qa.q}
              <span className="text-orange-500 transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 text-mist">{qa.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
