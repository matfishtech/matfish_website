import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutSection from "@/components/sections/home/AboutSection";
import HeroSection from "@/components/sections/home/HeroSection";
import ProductsPreviewSection from "@/components/sections/home/ProductsPreviewSection";
import CtaSection from "@/components/sections/common/CtaSection";
import { getLocalizedPath } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { getDictionary, isLanguage } from "@/lib/i18n";

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
    title: dictionary.seo.home.title,
    description: dictionary.seo.home.description,
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <HeroSection lang={lang} dictionary={dictionary} />
      <AboutSection lang={lang} dictionary={dictionary} />
      <ProductsPreviewSection lang={lang} dictionary={dictionary} />
      <CtaSection
        title={dictionary.home.contact.title}
        description={dictionary.home.contact.description}
        buttonLabel={dictionary.home.contact.button}
        buttonHref={getLocalizedPath(lang, "contact")}
      />
    </>
  );
}
