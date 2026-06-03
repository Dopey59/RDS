import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <Section tone="blue">
      <Reveal>
        <div className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">{t("subtitle")}</p>
          <div className="mt-8 flex justify-center">
            <StoreBadges />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
