import React, { useCallback, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const languages = [
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = useCallback(
    (langCode) => {
      if (langCode === i18n.language) {
        setIsOpen(false);
        return;
      }

      i18n.changeLanguage(langCode).then(() => {
        localStorage.setItem("preferredLanguage", langCode);

        const currentPath = location.pathname;
        const pathWithoutLang = currentPath.split("/").slice(2).join("/");
        const newPath = `/${langCode}/${pathWithoutLang}`;

        navigate(newPath);
        setIsOpen(false);
      });
    },
    [i18n, location.pathname, navigate]
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && languages.some((lang) => lang.code === savedLang)) {
      changeLanguage(savedLang);
    }
  }, [changeLanguage]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2"
        aria-label="Select language"
      >
        <span className="hidden sm:inline">
          {languages.find((lang) => lang.code === i18n.language)?.name}
        </span>
        <span className="sm:hidden">
          {languages
            .find((lang) => lang.code === i18n.language)
            ?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-900 
                       rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full px-4 py-2 text-left flex items-center gap-3 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                         ${
                           i18n.language === language.code
                             ? "text-blue-600 dark:text-blue-400"
                             : "text-gray-700 dark:text-gray-300"
                         }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-1">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
