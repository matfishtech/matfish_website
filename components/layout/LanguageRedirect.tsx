"use client";

import { useEffect } from "react";
import { defaultLanguage, getLocalizedPath, isLanguage } from "@/lib/i18n";

export default function LanguageRedirect() {
  useEffect(() => {
    const candidates = navigator.languages ?? [navigator.language];
    const picked = candidates
      .map((value) => value?.split("-")[0]?.toLowerCase() ?? "")
      .find((code) => isLanguage(code));
    const lang = isLanguage(picked) ? picked : defaultLanguage;
    window.location.replace(getLocalizedPath(lang));
  }, []);

  return null;
}
