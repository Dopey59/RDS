"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { DOWNLOAD_HREF, DOWNLOAD_HREF_ABS } from "@/lib/links";
import { smoothScrollTop } from "@/lib/scroll";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/#comment", label: t("howItWorks") },
    { href: "/#lots",    label: t("prizes") },
    { href: "/partenaires", label: t("partners") },
    { href: "/#faq",    label: t("faq") },
  ] as const;

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault();
    if (pathname === "/") {
      smoothScrollTop();
    } else {
      router.push("/");
    }
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 45%, #1f1d75 0%, #181666 35%, #11104f 65%, #0a0930 100%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Renard des Surfaces — accueil"
          onClick={handleLogoClick}
        >
          <Image
            src="/brand/icons/Logo + nom.png"
            alt="Renard des Surfaces"
            width={180}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principale">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/75 hover:text-orange-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher />
          <Button href={pathname === "/" ? DOWNLOAD_HREF : DOWNLOAD_HREF_ABS} className="px-5">
            {t("play")}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2 py-3 font-medium text-white/80 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 px-2">
            <LocaleSwitcher />
          </div>
          <Button href={pathname === "/" ? DOWNLOAD_HREF : DOWNLOAD_HREF_ABS} className="mt-2">
            {t("play")}
          </Button>
        </nav>
      )}
    </header>
  );
}
