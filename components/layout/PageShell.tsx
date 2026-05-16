import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { getCanonicalUrl, type Dictionary, type Language } from "@/lib/i18n";
import { companyAddress, site, socialLinks } from "@/lib/site";

interface PageShellProps {
  lang: Language;
  dictionary: Dictionary;
  children: ReactNode;
}

export default function PageShell({ lang, dictionary, children }: PageShellProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        logo: `${site.url}/android-chrome-512x512.png`,
        email: site.email,
        telephone: site.phoneHref,
        address: {
          "@type": "PostalAddress",
          streetAddress: companyAddress.street,
          addressLocality: companyAddress.locality,
          postalCode: companyAddress.postalCode,
          addressRegion: companyAddress.region,
          addressCountry: companyAddress.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "60.0223",
          longitude: "20.3745",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneHref,
          email: site.email,
          contactType: "customer service",
          availableLanguage: ["en", "fi", "sv"],
        },
        sameAs: [socialLinks.linkedin, socialLinks.instagram],
        areaServed: {
          "@type": "Country",
          name: "Finland",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: site.name,
        inLanguage: lang,
        publisher: {
          "@id": `${site.url}#organization`,
        },
        potentialAction: {
          "@type": "ContactAction",
          target: getCanonicalUrl(lang, "contact"),
          name: dictionary.nav.contact,
        },
      },
    ],
  };

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
      >
        {dictionary.common.accessibility.skipToContent}
      </a>
      <div className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Header lang={lang} dictionary={dictionary} />
        <PageTransition>
          <main id="content" className="flex-1">
            {children}
          </main>
        </PageTransition>
        <Footer lang={lang} dictionary={dictionary} />
      </div>
    </>
  );
}
