import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Partners } from "@/components/partners/Partners";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function PartenairesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Partners />;
}
