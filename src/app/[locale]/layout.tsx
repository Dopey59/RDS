import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { clashDisplay, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    metadataBase: new URL("https://renard-des-surfaces.com"),
    title: {
      default: "Renard des Surfaces — " + (fr ? "Le jeu de grattage football" : "The football scratch game"),
      template: "%s · Renard des Surfaces",
    },
    description: fr
      ? "Choisis 3 matchs, gratte à chaque but, gagne des points et des lots. 100% gratuit. Ni pari, ni pronostic, ni jeu d'argent."
      : "Pick 3 matches, scratch on every goal, win points and prizes. 100% free. Not betting, not predictions, not gambling.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${clashDisplay.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-ink-900 text-paper">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
