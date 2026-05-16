import en from "@/src/locales/en/translation.json";
import fi from "@/src/locales/fi/translation.json";
import sv from "@/src/locales/sv/translation.json";
import { site } from "@/lib/site";

export const languages = ["fi", "sv", "en"] as const;
export const routeSlugs = [
  "",
  "products",
  "about",
  "contact",
  "faq",
  "privacy",
  "terms",
  "cookies",
  "code-of-conduct",
  "blog",
] as const;

export type Language = (typeof languages)[number];
export type Dictionary = typeof fi;

export const defaultLanguage: Language = "fi";

export const languageDetails = {
  fi: {
    code: "fi",
    label: "Suomi",
    shortLabel: "FI",
  },
  sv: {
    code: "sv",
    label: "Svenska",
    shortLabel: "SV",
  },
  en: {
    code: "en",
    label: "English",
    shortLabel: "EN",
  },
} as const;

const dictionaries: Record<Language, Dictionary> = {
  fi,
  sv,
  en,
};

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language);
}

export function getDictionary(lang: string | undefined): Dictionary {
  return dictionaries[isLanguage(lang) ? lang : defaultLanguage];
}

export function getLocalizedPath(lang: Language, slug = "") {
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function getCanonicalUrl(lang: Language, slug = "") {
  return new URL(getLocalizedPath(lang, slug), site.url).toString();
}

export function getAlternateLinks(slug = "") {
  return languages.map((lang) => ({
    lang,
    href: getCanonicalUrl(lang, slug),
  }));
}

export function isCurrentPath(currentPath: string, lang: Language, slug = "") {
  const target = getLocalizedPath(lang, slug);
  return currentPath === target || currentPath === `${target}/`;
}

export function detectPreferredLanguage(acceptLanguageHeader?: string | null): Language {
  if (!acceptLanguageHeader) {
    return defaultLanguage;
  }

  const parsed = acceptLanguageHeader
    .split(",")
    .map((part) => {
      const [rawCode, ...params] = part.trim().toLowerCase().split(";");
      const qualityPart = params.find((item) => item.trim().startsWith("q="));
      const qualityValue = qualityPart ? Number.parseFloat(qualityPart.split("=")[1] ?? "1") : 1;

      return {
        code: rawCode,
        quality: Number.isNaN(qualityValue) ? 1 : qualityValue,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const candidate of parsed) {
    const baseCode = candidate.code.split("-")[0];
    if (isLanguage(baseCode)) {
      return baseCode;
    }
  }

  return defaultLanguage;
}
