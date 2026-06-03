import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/renard.d.surfaces/" },
  { label: "TikTok", href: "https://www.tiktok.com/@renard.d.surfaces" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61565258327456" },
];

export function Footer() {
  const t = useTranslations("footer");
  const year = 2026;

  return (
    <footer className="border-t border-line bg-cloud">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center gap-2.5">
          <Image src="/brand/app-icon.svg" alt="" width={32} height={32} />
          <span className="font-display text-lg font-bold text-ink-900">Renard des Surfaces</span>
        </div>
        <p className="mt-4 max-w-md text-mist">{t("tagline")}</p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Légal">
          <Link href="/mentions-legales" className="text-ink-700 hover:text-blue-600">
            {t("legal.mentions")}
          </Link>
          <Link href="/politique-de-confidentialite" className="text-ink-700 hover:text-blue-600">
            {t("legal.privacy")}
          </Link>
          <Link href="/conditions-generales" className="text-ink-700 hover:text-blue-600">
            {t("legal.terms")}
          </Link>
        </nav>

        <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Réseaux sociaux">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-700 hover:text-blue-600"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-mist">{t("disclaimer")}</p>
        <p className="mt-6 text-xs text-mist">
          © {year} SAS Grand Jeu — Renard des Surfaces. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
