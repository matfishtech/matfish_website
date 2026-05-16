"use client";

import { openCookieConsentSettings } from "@/lib/cookie-consent";

interface CookieSettingsButtonProps {
  label: string;
  className: string;
}

export default function CookieSettingsButton({ label, className }: CookieSettingsButtonProps) {
  return (
    <button type="button" onClick={openCookieConsentSettings} className={className}>
      {label}
    </button>
  );
}
