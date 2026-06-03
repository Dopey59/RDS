import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/alternates";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyItWorks } from "@/components/sections/WhyItWorks";
import { SummerEvent } from "@/components/sections/SummerEvent";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd, softwareApplicationLd, webSiteLd } from "@/lib/jsonld";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: buildAlternates(locale, "/") };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faq");
  const faqItems = t.raw("items") as { q: string; a: string }[];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };

  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={softwareApplicationLd(locale)} />
      <JsonLd data={webSiteLd()} />
      <JsonLd data={faqLd} />
      <Hero />
      <HowItWorks />
      <WhyItWorks />
      <SummerEvent />
      <Faq />
      <FinalCta />
    </>
  );
}
