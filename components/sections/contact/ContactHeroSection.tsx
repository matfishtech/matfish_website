import { type Dictionary } from "@/lib/i18n";

interface ContactHeroSectionProps {
  dictionary: Dictionary;
}

export default function ContactHeroSection({ dictionary }: ContactHeroSectionProps) {
  return (
    <section className="border-b border-brand-200/80 bg-white">
      <div className="site-container">
        <div className="flex min-h-[20rem] items-center py-16 md:min-h-[22rem] md:py-18 lg:min-h-[24rem] lg:py-20">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              {dictionary.contact.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {dictionary.contactpage.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
