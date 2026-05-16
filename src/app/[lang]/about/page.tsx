import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import TimelineSection from "@/components/sections/about/TimelineSection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CtaSection from "@/components/sections/common/CtaSection";
import { getDictionary, getLocalizedPath, isLanguage } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    slug: "about",
    title: dictionary.seo.about.title,
    description: dictionary.seo.about.description,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <AboutHeroSection dictionary={dictionary} />
      <ValuesSection dictionary={dictionary} />
      <TimelineSection dictionary={dictionary} />
      <CtaSection
        title={dictionary.about.contact.title}
        description={dictionary.about.contact.description}
        buttonLabel={dictionary.about.contact.button}
        buttonHref={getLocalizedPath(lang, "contact")}
      />
    </>
  );
}
