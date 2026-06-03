import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";

export function PartnersBand() {
  const t = useTranslations("partnersBand");
  const slots = Array.from({ length: 6 });

  return (
    <Section>
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-mist">
        {t("title")}
      </p>
      <div className="mt-8">
        <Marquee>
          {slots.map((_, i) => (
            <div
              key={i}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-dashed border-line bg-cloud text-xs font-medium text-mist"
            >
              {t("soon")}
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
