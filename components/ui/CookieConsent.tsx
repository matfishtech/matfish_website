"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type ConsentState,
} from "@/lib/cookie-consent";

type UiLanguage = "fi" | "sv" | "en";

function getBrowserLanguage(): UiLanguage {
  if (typeof document !== "undefined") {
    const pageLanguage = document.documentElement.lang.toLowerCase();
    if (pageLanguage === "fi" || pageLanguage === "sv" || pageLanguage === "en") {
      return pageLanguage;
    }
  }

  if (typeof navigator === "undefined") {
    return "en";
  }

  const code = navigator.language.toLowerCase();
  if (code.startsWith("fi")) {
    return "fi";
  }
  if (code.startsWith("sv")) {
    return "sv";
  }
  return "en";
}

const labels = {
  fi: {
    title: "Evästeasetukset",
    description:
      "Käytämme analytiikkaevästeitä sivuston kehittämiseen. Voit hyväksyä tai hylätä analytiikkaevästeet.",
    learnMore: "Lue evästekäytäntö",
    accept: "Hyväksy",
    reject: "Hylkää",
    close: "Sulje",
    currentChoice: "Nykyinen valinta tallennetaan vain selaimeesi ja voit muuttaa sitä milloin tahansa.",
  },
  sv: {
    title: "Cookieinställningar",
    description:
      "Vi använder analyscookies för att förbättra webbplatsen. Du kan godkänna eller avvisa analyscookies.",
    learnMore: "Läs cookiepolicyn",
    accept: "Godkänn",
    reject: "Avvisa",
    close: "Stäng",
    currentChoice: "Ditt nuvarande val sparas endast i din webbläsare och kan ändras när som helst.",
  },
  en: {
    title: "Cookie settings",
    description:
      "We use analytics cookies to improve the website. You can accept or reject analytics cookies.",
    learnMore: "Read Cookie Policy",
    accept: "Accept",
    reject: "Reject",
    close: "Close",
    currentChoice: "Your current choice is stored only in your browser and can be changed at any time.",
  },
} as const;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<UiLanguage>("en");

  useEffect(() => {
    const storedValue = readCookieConsent();
    setConsent(storedValue);
    setIsOpen(storedValue === null);
    setLanguage(getBrowserLanguage());

    function openSettings() {
      setLanguage(getBrowserLanguage());
      setIsOpen(true);
    }

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openSettings);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openSettings);
    };
  }, []);

  function persistConsent(value: ConsentState) {
    writeCookieConsent(value);
    setConsent(value);
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  const copy = labels[language];
  const canClose = consent !== null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-6 sm:bottom-6">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-4 rounded-2xl border border-brand-200/70 bg-white/85 px-5 py-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-7 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-base font-semibold text-slate-900">{copy.title}</h2>
            {canClose ? (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 lg:hidden"
              >
                {copy.close}
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {copy.description}{" "}
            <a
              href={`/${language}/cookies`}
              className="font-semibold text-brand-800 underline-offset-4 hover:underline"
            >
              {copy.learnMore}
            </a>
          </p>
          {canClose ? (
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{copy.currentChoice}</p>
          ) : null}
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => persistConsent("rejected")}
            className="inline-flex h-10 items-center justify-center rounded-md border border-brand-200 px-4 text-sm font-semibold text-slate-700"
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={() => persistConsent("accepted")}
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand-900 px-4 text-sm font-semibold text-white"
          >
            {copy.accept}
          </button>
          {canClose ? (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="hidden text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 lg:inline"
            >
              {copy.close}
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
