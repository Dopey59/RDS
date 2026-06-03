import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocView } from "@/components/legal/LegalDocView";
import { terms } from "@/content/legal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: (terms[locale === "en" ? "en" : "fr"]).title };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocView doc={terms[locale === "en" ? "en" : "fr"]} />;
}
