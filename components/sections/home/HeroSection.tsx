import Image from "next/image";
import Link from "next/link";
import heroImage from "@/src/images/hero/hero-background.webp";
import { getLocalizedPath, type Dictionary, type Language } from "@/lib/i18n";

interface HeroSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

export default function HeroSection({ lang, dictionary }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-brand-900 py-20">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Finnish archipelago"
          className="h-full w-full object-cover"
          priority
          unoptimized
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,40,63,0.42),rgba(16,40,63,0.66))]" />
      </div>

      <div className="site-container relative z-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="font-display hero-text-shadow mb-6 text-5xl font-normal tracking-[0.03em] md:text-7xl lg:text-[5rem]">
            M.A.T-FISH
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-2xl">
            {dictionary.home.hero.subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={getLocalizedPath(lang, "contact")} className="cta-link-light">
              {dictionary.home.hero.contact}
            </Link>
            <Link
              href={getLocalizedPath(lang, "about")}
              className="inline-flex items-center rounded-full border border-white/70 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/18"
            >
              {dictionary.home.about.link}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
