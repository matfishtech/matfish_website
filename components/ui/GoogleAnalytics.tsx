"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_UPDATED_EVENT, readCookieConsent, type ConsentState } from "@/lib/cookie-consent";

interface GoogleAnalyticsProps {
  measurementId: string;
}

function clearCookie(name: string, domain?: string) {
  const domainPart = domain ? ` domain=${domain};` : "";
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;${domainPart} SameSite=Lax`;
}

function clearAnalyticsCookies(measurementId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const measurementSuffix = measurementId.replace(/^G-/, "");
  const cookieNames = ["_ga", `_ga_${measurementSuffix}`, "_gid", "_gat"];
  const hostname = window.location.hostname;
  const hostnameParts = hostname.split(".");
  const domains = new Set<string | undefined>([undefined, hostname]);

  if (hostnameParts.length >= 2 && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    domains.add(`.${hostnameParts.slice(-2).join(".")}`);
  }

  for (const name of cookieNames) {
    for (const domain of domains) {
      clearCookie(name, domain);
    }
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasReadConsent, setHasReadConsent] = useState(false);
  const [hasLoadedScripts, setHasLoadedScripts] = useState(false);
  const encodedMeasurementId = encodeURIComponent(measurementId);
  const safeMeasurementId = JSON.stringify(measurementId);

  useEffect(() => {
    function updateConsentState() {
      setConsent(readCookieConsent());
      setHasReadConsent(true);
    }

    updateConsentState();
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateConsentState);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateConsentState);
    };
  }, []);

  useEffect(() => {
    if (consent === "accepted" && measurementId) {
      setHasLoadedScripts(true);
    }
  }, [consent, measurementId]);

  useEffect(() => {
    if (!hasReadConsent || !measurementId || typeof window === "undefined") {
      return;
    }

    const analyticsWindow = window as unknown as Window & Record<string, unknown> & {
      gtag?: (...args: unknown[]) => void;
    };

    analyticsWindow[`ga-disable-${measurementId}`] = consent !== "accepted";

    if (consent === "accepted") {
      analyticsWindow.gtag?.("consent", "update", { analytics_storage: "granted" });
      analyticsWindow.gtag?.("config", measurementId, { anonymize_ip: true });
      return;
    }

    analyticsWindow.gtag?.("consent", "update", { analytics_storage: "denied" });
    clearAnalyticsCookies(measurementId);
  }, [consent, hasReadConsent, measurementId]);

  if (!hasLoadedScripts || !measurementId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${safeMeasurementId}, { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
