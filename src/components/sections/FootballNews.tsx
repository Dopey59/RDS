import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { news, localeKey } from "@/content/home";

// Une image distincte par carte — aucune ne doit être réutilisée ailleurs sur la page.
const PHOTOS = [
  "/photos/stadium.jpg",
  "/photos/pitch-aerial.jpg",
  "/photos/stadium-lights.jpg",
  "/photos/news4.jpg",
];

export function FootballNews() {
  const t = useTranslations("news");
  const rows = news[localeKey(useLocale())];

  return (
    <Section id="actus">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 max-w-xl text-mist">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((n, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={PHOTOS[i % PHOTOS.length]}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover brightness-[0.85] saturate-125 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-semibold text-ink-900">
                  {n.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold leading-snug text-ink-900">{n.title}</h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
