"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  getLocalizedPath,
  isCurrentPath,
  isLanguage,
  languageDetails,
  type Dictionary,
  type Language,
} from "@/lib/i18n";

interface HeaderProps {
  lang: Language;
  dictionary: Dictionary;
}

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentPath = normalizePath(pathname ?? "/");
  const activePath = pendingPath ?? currentPath;

  const navItems = useMemo(
    () => [
      { slug: "", label: dictionary.nav.home },
      { slug: "products", label: dictionary.nav.products },
      { slug: "about", label: dictionary.nav.about },
      { slug: "contact", label: dictionary.nav.contact },
    ],
    [dictionary],
  );

  const languageItems = Object.values(languageDetails);
  const currentSlug = currentPath.replace(/^\/(fi|sv|en)\/?/, "");
  const accessibilityCopy = dictionary.common.accessibility;
  const contactButtonLabel = dictionary.common.buttons.contact;

  useEffect(() => {
    setPendingPath(null);
    setIsOpen(false);
  }, [currentPath]);

  useEffect(() => {
    function updateScrolledState() {
      setIsScrolled(window.scrollY > 12);
    }

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  function handleLanguageChange(nextLanguageCode: string) {
    if (!isLanguage(nextLanguageCode)) {
      return;
    }

    const nextPath = getLocalizedPath(nextLanguageCode, currentSlug);
    setPendingPath(normalizePath(nextPath));
    setIsOpen(false);
    router.push(nextPath);
  }

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200",
        isScrolled
          ? "border-b border-brand-200/80 bg-white/72 backdrop-blur-xl shadow-[0_10px_30px_rgba(16,40,63,0.08)]"
          : "border-b border-transparent bg-white/92 backdrop-blur-none",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 w-full items-center justify-between gap-6">
          <Link
            href={getLocalizedPath(lang)}
            className="flex items-center gap-3 text-brand-900"
          >
            <Image
              src="/logo.webp"
              alt="M.A.T-FISH logo"
              width={56}
              height={56}
              priority
              unoptimized
              sizes="56px"
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(18%) sepia(25%) saturate(1518%) hue-rotate(176deg) brightness(95%) contrast(92%)",
              }}
            />
            <div>
              <span className="font-display block text-[1.08rem] font-semibold tracking-[0.03em] sm:text-[1.15rem]">M.A.T-FISH</span>
              <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
                {dictionary.common.company.slogan}
              </span>
            </div>
          </Link>

          <div className="hidden lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:items-center">
            <nav aria-label={accessibilityCopy.primaryNavigation} className="flex items-center gap-1">
              {navItems.map((item) => {
                const href = getLocalizedPath(lang, item.slug);
                const active = isCurrentPath(activePath, lang, item.slug);

                return (
                  <Link
                    key={item.slug || "home"}
                    href={href}
                    className="nav-link"
                    data-active={String(active)}
                    onPointerDown={() => setPendingPath(normalizePath(href))}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-4 lg:ml-auto lg:flex">
            <div>
              <DropdownMenu.Root modal={false}>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-brand-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-700 hover:text-brand-900"
                    aria-label={accessibilityCopy.selectLanguage}
                  >
                    {languageDetails[lang].shortLabel}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    sideOffset={10}
                    align="end"
                    className="z-50 min-w-[9rem] rounded-2xl border border-brand-200 bg-white p-1.5 shadow-[0_20px_40px_rgba(16,40,63,0.12)]"
                  >
                    {languageItems.map((languageOption) => (
                      <DropdownMenu.Item
                        key={`desktop-${languageOption.code}`}
                        onSelect={() => handleLanguageChange(languageOption.code)}
                        className={[
                          "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                          languageOption.code === lang
                            ? "bg-brand-50 text-brand-900"
                            : "text-slate-700 hover:bg-brand-50 hover:text-brand-900",
                        ].join(" ")}
                      >
                        <span>{languageOption.label}</span>
                        {languageOption.code === lang ? <CheckIcon className="h-4 w-4" /> : null}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <Link
              href={getLocalizedPath(lang, "contact")}
              className="inline-flex h-10 items-center rounded-full border border-brand-900 px-5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
            >
              {contactButtonLabel}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-slate-700 lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={accessibilityCopy.toggleMenu}
            onClick={() => setIsOpen((state) => !state)}
          >
            <span className="sr-only">{accessibilityCopy.toggleMenu}</span>
            <svg
              className={isOpen ? "hidden h-6 w-6" : "h-6 w-6"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={isOpen ? "h-6 w-6" : "hidden h-6 w-6"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={[
            "absolute left-0 right-0 top-full z-40 border border-brand-200 border-t-0 bg-white px-5 py-5 shadow-[0_20px_40px_rgba(16,40,63,0.12)] lg:hidden sm:px-6",
            isOpen ? "block" : "hidden",
          ].join(" ")}
        >
          <nav aria-label={accessibilityCopy.mobileNavigation} className="space-y-1">
            {navItems.map((item) => {
              const href = getLocalizedPath(lang, item.slug);
              const active = isCurrentPath(activePath, lang, item.slug);
              return (
                <Link
                  key={item.slug || "mobile-home"}
                  href={href}
                  className={[
                    "block rounded-full px-4 py-3 text-base font-medium transition-colors",
                    active ? "bg-brand-50 text-brand-900" : "text-slate-600 hover:bg-brand-50 hover:text-brand-900",
                  ].join(" ")}
                  onPointerDown={() => setPendingPath(normalizePath(href))}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 border-t border-brand-200 pt-4">
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-between rounded-full border border-brand-200 bg-white px-4 text-sm font-medium text-slate-700"
                  aria-label={accessibilityCopy.selectLanguage}
                >
                  <span>{languageDetails[lang].label}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={8}
                  align="end"
                  className="z-50 min-w-[12rem] rounded-2xl border border-brand-200 bg-white p-1.5 shadow-[0_20px_40px_rgba(16,40,63,0.12)]"
                >
                  {languageItems.map((languageOption) => (
                    <DropdownMenu.Item
                      key={`mobile-${languageOption.code}`}
                      onSelect={() => handleLanguageChange(languageOption.code)}
                      className={[
                        "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                        languageOption.code === lang
                          ? "bg-brand-50 text-brand-900"
                          : "text-slate-700 hover:bg-brand-50 hover:text-brand-900",
                      ].join(" ")}
                    >
                      <span>{languageOption.label}</span>
                      {languageOption.code === lang ? <CheckIcon className="h-4 w-4" /> : null}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <Link
              href={getLocalizedPath(lang, "contact")}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-brand-900 px-5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
              onClick={() => setIsOpen(false)}
            >
              {contactButtonLabel}
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M5 7.5 10 12.5l5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="m5.5 10 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
