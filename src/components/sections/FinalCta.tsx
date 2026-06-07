import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

// Arête diagonale du bandeau bleu + barre orange transversale (cf. MatchSchedule)
const BAND_CLIP = "polygon(0 0, 100% 2.5rem, 100% 100%, 0 100%)";
const BAR_CLIP = "polygon(0 0, 100% 2.5rem, 100% calc(2.5rem + 7px), 0 7px)";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="relative isolate overflow-hidden bg-cloud text-white">
      <div className="band-blue absolute inset-0 -z-10" style={{ clipPath: BAND_CLIP }} aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-16 bg-orange-500"
        style={{ clipPath: BAR_CLIP }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:pb-24 md:pt-28">
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">{t("subtitle")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={PLAY_STORE_URL} aria-label="Google Play" className="transition hover:opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/v2/googleplay.svg" alt="Disponible sur Google Play" className="h-10 w-auto md:h-12" />
              </a>
              <a href={APP_STORE_URL} aria-label="App Store" className="transition hover:opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/v2/appstore.svg" alt="Télécharger sur l'App Store" className="h-10 w-auto md:h-12" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
