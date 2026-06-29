import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/alternates";
import { ClubsCarousel } from "@/components/clubs/ClubsCarousel";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr ? "Clubs amateurs — Ton club joue, tout le monde gagne" : "Amateur clubs — Your club plays, everyone wins",
    description: fr
      ? "Rejoins le groupe RDS de ton club. 50 nouveaux membres = équipement pour toute l'équipe avant la saison prochaine. 100% gratuit."
      : "Join your club's RDS group. 50 new members = equipment for the whole team before next season. 100% free.",
    alternates: buildAlternates(locale, "/clubs"),
  };
}

export default async function ClubsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale === "en" ? "en" : "fr";
  return <ClubsCarousel locale={safeLocale} />;
}
