import type { Metadata } from "next";
import heroImage from "@/src/images/hero/hero-background.webp";
import { defaultLanguage, getCanonicalUrl, languages, type Language } from "@/lib/i18n";
import { getOgLocale, site } from "@/lib/site";

interface MetadataInput {
  lang: Language;
  slug?: string;
  title: string;
  description: string;
  imageUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  index?: boolean;
}

export function buildPageMetadata({
  lang,
  slug = "",
  title,
  description,
  imageUrl = heroImage.src,
  type = "website",
  publishedTime,
  index = true,
}: MetadataInput): Metadata {
  const canonical = getCanonicalUrl(lang, slug);
  const languagesAlternates = Object.fromEntries(
    languages.map((item) => [item, getCanonicalUrl(item, slug)]),
  );

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    robots: {
      index,
      follow: true,
    },
    alternates: {
      canonical,
      languages: {
        ...languagesAlternates,
        "x-default": getCanonicalUrl(defaultLanguage, slug),
      },
    },
    openGraph: {
      type,
      siteName: site.name,
      url: canonical,
      title,
      description,
      locale: getOgLocale(lang),
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: imageUrl,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
