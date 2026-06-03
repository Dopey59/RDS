import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyItWorks } from "@/components/sections/WhyItWorks";
import { SummerEvent } from "@/components/sections/SummerEvent";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyItWorks />
      <SummerEvent />
      <Faq />
      <FinalCta />
    </>
  );
}
