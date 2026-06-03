"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#comment", label: t("howItWorks") },
    { href: "/#lots", label: t("prizes") },
    { href: "/partenaires", label: t("partners") },
    { href: "/#faq", label: t("faq") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Renard des Surfaces — accueil">
          <Image src="/brand/app-icon.svg" alt="" width={34} height={34} priority />
          <span className="font-display text-lg font-bold tracking-tight text-ink-900">
            Renard des Surfaces
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principale">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink-700 hover:text-blue-600">
              {l.label}
            </Link>
          ))}
          <Button href="/" className="px-5">
            {t("play")}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-900 md:hidden"
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
              className="rounded-lg px-2 py-3 font-medium text-ink-700 hover:bg-cloud"
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
