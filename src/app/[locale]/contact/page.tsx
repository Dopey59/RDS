import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/alternates";
import { Section } from "@/components/ui/Section";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), alternates: buildAlternates(locale, "/contact") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section>
      <h1 className="font-display text-4xl font-bold">{t("title")}</h1>
      <p className="mt-6 max-w-xl text-mist">{t("body")}</p>
      <a
        href={`mailto:${t("email")}`}
        className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-ink-900 hover:bg-orange-600"
      >
        {t("email")}
      </a>
    </Section>
  );
}
