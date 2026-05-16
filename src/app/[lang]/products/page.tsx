import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/sections/common/CtaSection";
import ProductsHeroSection from "@/components/sections/products/ProductsHeroSection";
import ProductsListSection from "@/components/sections/products/ProductsListSection";
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
    slug: "products",
    title: dictionary.seo.products.title,
    description: dictionary.seo.products.description,
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <ProductsHeroSection dictionary={dictionary} />
      <ProductsListSection lang={lang} dictionary={dictionary} />
      <CtaSection
        title={dictionary.products.contact.title}
        description={dictionary.products.contact.description}
        buttonLabel={dictionary.products.contact.button}
        buttonHref={getLocalizedPath(lang, "contact")}
      />
    </>
  );
}
