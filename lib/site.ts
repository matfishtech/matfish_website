import type { Language } from "@/lib/i18n";

export const site = {
  name: "M.A.T-Fish Ab Oy",
  shortName: "M.A.T-FISH",
  url: "https://matfish.fi",
  themeColor: "#1e40af",
  googleSiteVerification: "GEIOtRN4nbQPFufmzO4ys2FYsJeotW8UfmKv9VBZgZA",
  googleAnalyticsMeasurementId: "G-BVE7D47XXV",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=M.A.T-Fish%20Ab%20Oy%2C%20Flis%C3%B6v%C3%A4gen%20240%2C%2022710%20F%C3%B6gl%C3%B6",
  email: "info@matfish.fi",
  phoneDisplay: "018-511 01",
  phoneHref: "+3581851101",
  updatedAt: "2026-04-18T00:00:00.000Z",
} as const;

export const companyAddress = {
  street: "Flisövägen 240",
  postalCode: "22710",
  locality: "Föglö",
  region: "Åland",
  country: "Finland",
} as const;

export const companyDisplayAddress = {
  street: "Flisövägen 240",
  postalCode: "22710 Föglö",
  region: "Åland, Finland",
} as const;

export const companyBusinessId = "2835881-3";

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/matfish",
  instagram: "https://www.instagram.com/matfishcompany/",
} as const;

const ogLocales: Record<Language, string> = {
  fi: "fi_FI",
  sv: "sv_FI",
  en: "en_GB",
};

export function getOgLocale(lang: Language) {
  return ogLocales[lang];
}
