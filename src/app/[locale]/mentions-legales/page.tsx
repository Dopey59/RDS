import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.mentions" });
  return { title: t("title") };
}

export default async function MentionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.mentions");

  return (
    <Section>
      <h1 className="font-display text-4xl font-bold">{t("title")}</h1>
      <div className="mt-8 max-w-2xl space-y-4 text-mist">
        <p>{t("editor")}</p>
        <p>{t("address")}</p>
        <p>{t("director")}</p>
        <p>{t("contact")}</p>
        <p>{t("host")}</p>
        <p className="border-l-2 border-orange-500 pl-4 text-sm">{t("disclaimer")}</p>
      </div>
    </Section>
  );
}
