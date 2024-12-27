import React, { useEffect, useRef, useState } from "react";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: "fi", name: "Finnish", native: "Suomi", flag: "🇫🇮" },
    { code: "en", name: "English", native: "English", flag: "🇬🇧" },
    { code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split("/");

    if (
      pathSegments[1] &&
      i18n.options.supportedLngs.includes(pathSegments[1])
    ) {
      pathSegments.splice(1, 1);
    }

    pathSegments.splice(1, 0, langCode);
    const newPath = pathSegments.join("/");

    i18n.changeLanguage(langCode);
    navigate(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 
                   dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find((lang) => lang.code === i18n.language)?.native}
        </span>
        <span className="sm:hidden">
          {languages
            .find((lang) => lang.code === i18n.language)
            ?.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 
                     ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-900 
                     rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          role="listbox"
          aria-label="Select language"
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
              role="option"
              aria-selected={i18n.language === language.code}
            >
              <span className="text-lg" aria-hidden="true">
                {language.flag}
              </span>
              <span className="flex-1">{language.native}</span>
              {i18n.language === language.code && (
                <Check className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
