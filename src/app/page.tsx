import type { Metadata } from "next";
import LanguageRedirect from "@/components/layout/LanguageRedirect";
import { defaultLanguage, getLocalizedPath } from "@/lib/i18n";

const fallbackPath = getLocalizedPath(defaultLanguage);

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: fallbackPath },
  other: {
    refresh: `0; url=${fallbackPath}`,
  },
};

export default function RootRedirectPage() {
  return (
    <>
      <LanguageRedirect />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${fallbackPath}`} />
      </noscript>
    </>
  );
}
