import { useTranslations } from "next-intl";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ScratchCard } from "@/components/scratch/ScratchCard";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-radiant noise relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-mist ring-1 ring-white/15">
            {t("badge")}
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
            {t("title")}{" "}
            <span className="text-orange-500">{t("titleAccent")}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-mist">{t("subtitle")}</p>

          <div className="mt-8">
            <StoreBadges />
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <ScratchCard
            hint={t("card.hint")}
            prizeLabel={t("card.prizeLabel")}
            prize={t("card.points")}
          />
        </div>
      </div>
    </section>
  );
}
