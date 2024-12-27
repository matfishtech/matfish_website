import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import translation files directly
import enTranslation from "./locales/en/translation.json";
import fiTranslation from "./locales/fi/translation.json";
import svTranslation from "./locales/sv/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fi: {
        translation: fiTranslation,
      },
      sv: {
        translation: svTranslation,
      },
    },
    fallbackLng: "fi", // Default language
    supportedLngs: ["fi", "sv", "en"],
    detection: {
      order: ["localStorage", "navigator"], // Removed 'path' as we don't want URL detection
      caches: ["localStorage"], // Store language preference in localStorage
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
