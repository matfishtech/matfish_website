export type ConsentState = "accepted" | "rejected";

export const COOKIE_CONSENT_STORAGE_KEY = "matfish-cookie-consent-v1";
export const COOKIE_CONSENT_UPDATED_EVENT = "cookie-consent-updated";
export const COOKIE_CONSENT_OPEN_EVENT = "open-cookie-consent";

export function readCookieConsent(): ConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return storedValue === "accepted" || storedValue === "rejected" ? storedValue : null;
}

export function writeCookieConsent(value: ConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_UPDATED_EVENT));
}

export function openCookieConsentSettings() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}
