import Image from "next/image";
import aboutFarmImage from "@/src/images/oceanic/about/about-farm.webp";
import { type Dictionary } from "@/lib/i18n";

interface AboutHeroSectionProps {
  dictionary: Dictionary;
}

export default function AboutHeroSection({ dictionary }: AboutHeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-200/80 bg-brand-50 lg:min-h-[34rem]">
      <div className="absolute inset-0">
        <Image
          src={aboutFarmImage}
          alt="Fish farming in the Aland archipelago"
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.80)_36%,rgba(255,255,255,0.48)_62%,rgba(255,255,255,0.18)_100%),linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.66)_30%,rgba(255,255,255,0.40)_54%,rgba(16,40,63,0.26)_100%)]" />
      </div>

      <div className="site-container relative z-10">
        <div className="flex min-h-[24rem] items-center py-16 md:min-h-[26rem] md:py-18 lg:min-h-[34rem] lg:py-20">
          <div className="max-w-5xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              {dictionary.about.hero.title}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-700 md:text-xl">
              {dictionary.about.hero.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
