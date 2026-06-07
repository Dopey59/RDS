import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { VideoText } from "@/components/ui/VideoText";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/renard.d.surfaces/" },
  { label: "TikTok", href: "https://www.tiktok.com/@renard.d.surfaces" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61565258327456" },
];

export function Footer() {
  const t = useTranslations("footer");
  const year = 2026;

  return (
    <footer className=""
    style={{
        background:
          "radial-gradient(120% 90% at 50% 45%, #1f1d75 0%, #181666 35%, #11104f 65%, #0a0930 100%)",
      }}>
      {/* RDS — vidéo foot visible à travers les lettres */}
      <div className="relative w-full" style={{ aspectRatio: "1000 / 280" }} aria-hidden>
        <VideoText
          src="/videos/football.mp4"
          fontFamily="Barlow Condensed, sans-serif"
          color="rgba(255,255,255,0.1)"
          className="absolute inset-0 h-full"
        >
          RDS
        </VideoText>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center">
          <Image
            src="/brand/icons/Logo + nom.png"
            alt="Renard des Surfaces"
            width={180}
            height={40}
            className="h-9 w-auto"
          />
        </div>
        <p className="mt-4 max-w-md text-white">{t("tagline")}</p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Légal">
          <Link href="/mentions-legales" className="text-white hover:text-blue-600">
            {t("legal.mentions")}
          </Link>
          <Link href="/politique-de-confidentialite" className="text-white hover:text-blue-600">
            {t("legal.privacy")}
          </Link>
          <Link href="/conditions-generales" className="text-white hover:text-blue-600">
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
              className="text-white hover:text-blue-600"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-white">{t("disclaimer")}</p>
        <p className="mt-6 text-xs text-white">
          © {year} SAS Grand Jeu — Renard des Surfaces. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
