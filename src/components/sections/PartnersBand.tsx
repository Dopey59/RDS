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
              className="flex h-20 w-48 shrink-0 items-center justify-center rounded-xl bg-white px-5 shadow-sm ring-1 ring-black/5"
            >
              <ImgFallback
                src={p.logo}
                alt={p.name}
                /* même gabarit pour tous : bornage identique en hauteur ET largeur */
                className="max-h-9 max-w-full w-auto object-contain transition hover:scale-105"
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
