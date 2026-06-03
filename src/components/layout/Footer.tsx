import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const year = 2026;

  const legal = [
    { href: "/mentions-legales", label: t("legal.mentions") },
    { href: "/confidentialite", label: t("legal.privacy") },
    { href: "/cgu", label: t("legal.terms") },
  ] as const;

  return (
    <footer className="border-t border-white/10 bg-ink-800/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-md font-display text-lg">{t("tagline")}</p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Légal">
          {legal.map((l) => (
            <Link key={l.href} href={l.href} className="text-mist hover:text-paper">
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-mist">{t("disclaimer")}</p>

        <p className="mt-6 text-xs text-mist">
          © {year} Renard des Surfaces. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
