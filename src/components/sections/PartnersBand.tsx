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
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl bg-white px-6 shadow-sm ring-1 ring-white/10"
            >
              <ImgFallback
                src={p.logo}
                alt={p.name}
                className="max-h-12 w-auto object-contain transition hover:scale-105"
                fallback={p.name}
                fallbackClassName="font-display text-lg font-bold text-[#222222]"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
