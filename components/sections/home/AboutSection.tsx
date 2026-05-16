import Image from "next/image";
import Link from "next/link";
import aboutFarmImage from "@/src/images/oceanic/about/about-farm.webp";
import { getLocalizedPath, type Dictionary, type Language } from "@/lib/i18n";

interface AboutSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

export default function AboutSection({ lang, dictionary }: AboutSectionProps) {
  return (
    <section className="border-b border-brand-200/80 bg-white">
      <div className="mx-auto grid max-w-[1360px] gap-0 lg:grid-cols-12">
        <div className="relative my-4 aspect-[4/5] overflow-hidden rounded-md bg-brand-50 lg:col-span-6 lg:aspect-auto lg:my-6">
          <Image
            src={aboutFarmImage}
            alt="Fish farming in the archipelago"
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-8 px-6 py-16 sm:px-8 lg:col-span-6 lg:px-16 lg:py-24">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            {dictionary.home.about.title}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            {dictionary.home.about.description}
          </p>
          <div>
            <Link href={getLocalizedPath(lang, "about")} className="inline-flex border-b border-slate-900 pb-1 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
              {dictionary.home.about.link}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
