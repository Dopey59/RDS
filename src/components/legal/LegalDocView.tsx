import { Section } from "@/components/ui/Section";
import type { LegalDoc } from "@/content/legal";

export function LegalDocView({ doc }: { doc: LegalDoc }) {
  return (
    <Section>
      <h1 className="font-display text-4xl font-bold">{doc.title}</h1>
      {doc.updated && <p className="mt-2 text-sm text-mist">{doc.updated}</p>}
      {doc.intro && <p className="mt-6 max-w-2xl text-mist">{doc.intro}</p>}

      <div className="mt-8 max-w-2xl space-y-8">
        {doc.blocks.map((b, i) => (
          <section key={i}>
            {b.h && <h2 className="font-display text-xl font-semibold">{b.h}</h2>}
            {b.paras?.map((p, j) => (
              <p key={j} className="mt-3 text-mist">
                {p}
              </p>
            ))}
            {b.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-mist">
                {b.bullets.map((li, k) => (
                  <li key={k}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Section>
  );
}
