import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import ContactHeroSection from "@/components/sections/contact/ContactHeroSection";
import ContactTeamSection from "@/components/sections/contact/ContactTeamSection";
import LocationSection from "@/components/sections/contact/LocationSection";
import { getDictionary, isLanguage } from "@/lib/i18n";
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
    slug: "contact",
    title: dictionary.seo.contact.title,
    description: dictionary.seo.contact.description,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <ContactHeroSection dictionary={dictionary} />
      <ContactTeamSection lang={lang} dictionary={dictionary} />
      <LocationSection dictionary={dictionary} />
      <ContactFormSection lang={lang} dictionary={dictionary} />
    </>
  );
}
