import { useTranslations } from "next-intl";
import { Button } from "./Button";

const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";

export function StoreBadges() {
  const t = useTranslations("hero");
  return (
    <div className="flex flex-wrap gap-3">
      <Button href={APP_STORE_URL} aria-label={t("ctaAppStore")}>
        {t("ctaAppStore")}
      </Button>
      <Button href={PLAY_STORE_URL} variant="ghost" aria-label={t("ctaPlayStore")}>
        {t("ctaPlayStore")}
      </Button>
    </div>
  );
}
