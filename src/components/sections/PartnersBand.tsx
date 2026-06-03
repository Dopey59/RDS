import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { ImgFallback } from "@/components/ui/ImgFallback";
import { partners } from "@/content/home";

export function PartnersBand() {
  const t = useTranslations("partnersBand");
  // doublé pour une boucle dense et fluide
  const items = [...partners, ...partners];

  return (
    <Section>
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-mist">
        {t("title")}
      </p>
      <div className="mt-8">
        <Marquee>
          {items.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-line bg-paper px-6"
            >
              <ImgFallback
                src={p.logo}
                alt={p.name}
                className="max-h-10 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                fallback={p.name}
                fallbackClassName="font-display text-lg font-bold text-ink-700"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
