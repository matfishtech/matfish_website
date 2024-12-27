import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import fiTranslation from "./locales/fi/translation.json";
import svTranslation from "./locales/sv/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fi: { translation: fiTranslation },
      sv: { translation: svTranslation },
    },
    fallbackLng: {
      default: ["fi"], // Default fallback
      sv: ["en"], // Fallback to English if Swedish is not available
      en: ["fi"], // Fallback to Finnish if English is not available
    },
    supportedLngs: ["fi", "sv", "en"],
    detection: {
      order: ["path", "localStorage", "navigator"], // Check path first
      lookupFromPathIndex: 0, // First segment of the path
      caches: ["localStorage"], // Cache language preference
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: true, // Enable suspense for async loading
    },
    debug: process.env.NODE_ENV === "development", // Debug in development
  });

export default i18n;
