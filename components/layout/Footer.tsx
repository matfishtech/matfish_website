"use client";

import Link from "next/link";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";
import { getLocalizedPath, type Dictionary, type Language } from "@/lib/i18n";
import { companyBusinessId, companyDisplayAddress, site, socialLinks } from "@/lib/site";

interface FooterProps {
  lang: Language;
  dictionary: Dictionary;
}

export default function Footer({ lang, dictionary }: FooterProps) {
  const menuItems = [
    { slug: "", label: dictionary.nav.home },
    { slug: "products", label: dictionary.nav.products },
    { slug: "about", label: dictionary.nav.about },
    { slug: "contact", label: dictionary.nav.contact },
    { slug: "faq", label: dictionary.nav.faq },
  ];

  const legalItems = [
    { slug: "code-of-conduct", label: dictionary.footer.codeOfConduct },
    { slug: "privacy", label: dictionary.footer.privacy },
    { slug: "terms", label: dictionary.footer.terms },
    { slug: "cookies", label: dictionary.footer.cookies },
  ];

  const socialItems = [
    { href: socialLinks.linkedin, label: "LinkedIn", icon: LinkedInIcon },
    { href: socialLinks.instagram, label: "Instagram", icon: InstagramIcon },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 py-10 text-white md:py-12">
      <div className="site-container">
        <div className="grid gap-10 border-t border-white/15 pt-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <section aria-labelledby="footer-company">
            <h2 id="footer-company" className="text-3xl font-semibold tracking-tight text-white">
              {site.name}
            </h2>
            <address className="mt-5 space-y-5 not-italic text-[1.05rem] leading-relaxed text-slate-200">
              <div>
                <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-blue-100">
                  {dictionary.contactpage.location.visiting}
                </p>
                <p>{companyDisplayAddress.street}</p>
                <p>{companyDisplayAddress.postalCode}</p>
                <p>{companyDisplayAddress.region}</p>
              </div>
              <div>
                <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-blue-100">
                  {dictionary.contactpage.location.postal}
                </p>
                <p>{companyDisplayAddress.street}</p>
                <p>{companyDisplayAddress.postalCode}</p>
                <p>{companyDisplayAddress.region}</p>
              </div>
              <p>
                {dictionary.common.company.businessId}: {companyBusinessId}
              </p>
            </address>
          </section>

          <nav aria-labelledby="footer-menu">
            <h2 id="footer-menu" className="text-3xl font-semibold tracking-tight text-white">
              {dictionary.footer.menu}
            </h2>
            <div className="mt-5 space-y-2 text-[1.05rem] text-slate-200">
              {menuItems.map((item) => (
                <Link
                  key={item.slug || "footer-home"}
                  href={getLocalizedPath(lang, item.slug)}
                  className="block transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="text-3xl font-semibold tracking-tight text-white">
              {dictionary.footer.legal}
            </h2>
            <div className="mt-5 space-y-2 text-[1.05rem] text-slate-200">
              {legalItems.map((item) => (
                <Link
                  key={item.slug}
                  href={getLocalizedPath(lang, item.slug)}
                  className="block transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <CookieSettingsButton
                label={dictionary.footer.cookieSettings}
                className="block text-left transition-colors hover:text-white"
              />
            </div>
          </nav>

          <section aria-labelledby="footer-contact" className="lg:text-right">
            <h2 id="footer-contact" className="text-3xl font-semibold tracking-tight text-white">
              {dictionary.footer.contact}
            </h2>
            <address className="mt-5 space-y-2 not-italic text-[1.05rem] leading-relaxed text-slate-200">
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-white">
                  {site.phoneDisplay}
                </a>
              </p>
            </address>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-200">
            &copy; {year} {site.name}. {dictionary.footer.rights}
          </p>

          <div className="flex items-center gap-5 md:justify-end">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-blue-100"
                  aria-label={item.label}
                >
                  <Icon />
                </a>
              );
            })}

            <div className="ml-2 flex items-center gap-4 text-sm font-medium tracking-[0.06em]">
              <Link href="/fi" className={lang === "fi" ? "text-blue-200" : "text-white transition-colors hover:text-blue-100"}>
                FI
              </Link>
              <Link href="/sv" className={lang === "sv" ? "text-blue-200" : "text-white transition-colors hover:text-blue-100"}>
                SV
              </Link>
              <Link href="/en" className={lang === "en" ? "text-blue-200" : "text-white transition-colors hover:text-blue-100"}>
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-current">
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9h4v12H3Zm7 0h3.83v1.64h.06c.53-1 1.84-2.06 3.8-2.06C21 8.58 21 11.37 21 15v6h-4v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-current">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95Zm8.95 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.14 5.14 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" />
    </svg>
  );
}
