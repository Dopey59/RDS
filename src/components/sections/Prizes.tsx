import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { prizes, localeKey, type IconKind } from "@/content/home";

const ICON: Record<IconKind, string> = {
  ball: "/brand/icons/ball.svg",
  coin: "/brand/icons/coin.svg",
  card: "/brand/icons/scratch-card.svg",
  ranked: "/brand/icons/ranked.svg",
};

export function Prizes() {
  const t = useTranslations("prizes");
  const rows = prizes[localeKey(useLocale())];

  return (
    <Section id="lots">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 max-w-xl text-mist">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-md shadow-blue-600/20">
                <Image src={ICON[p.icon]} alt="" width={26} height={26} />
              </div>
              <div className="mt-4 font-semibold text-ink-900">{p.name}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
