"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/comment-ca-marche", label: t("howItWorks") },
    { href: "/partenaires", label: t("partners") },
    { href: "/faq", label: t("faq") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Renard des Surfaces
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principale">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-mist hover:text-paper">
              {l.label}
            </Link>
          ))}
          <Button href="/" className="px-5">
            {t("play")}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
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
          className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2 py-3 text-mist hover:bg-white/5 hover:text-paper"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button href="/" className="mt-2">
            {t("play")}
          </Button>
        </nav>
      )}
    </header>
  );
}
