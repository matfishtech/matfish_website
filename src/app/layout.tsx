import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/ui/CookieConsent";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import ToastHost from "@/components/ui/ToastHost";
import { defaultLanguage, isLanguage } from "@/lib/i18n";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  authors: [{ name: site.name }],
  other: {
    "geo.region": "FI-01",
    "geo.position": "60.0223;20.3745",
    ICBM: "60.0223, 20.3745",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: site.googleSiteVerification,
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? site.googleAnalyticsMeasurementId;
  const { lang } = await params;
  const htmlLang = isLanguage(lang) ? lang : defaultLanguage;

  return (
    <html lang={htmlLang} data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${newsreader.variable} min-h-screen bg-white text-slate-800 antialiased`}>
        {gaMeasurementId ? <GoogleAnalytics measurementId={gaMeasurementId} /> : null}
        <ToastHost />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
