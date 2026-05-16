import { type Dictionary, type Language } from "@/lib/i18n";

interface FeaturesSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

const copy = {
  fi: {
    eyebrow: "Lupauksemme",
    title: "Neljä periaatetta, jotka ohjaavat jokaista työpäiväämme.",
  },
  sv: {
    eyebrow: "Vårt löfte",
    title: "Fyra principer som vägleder varje arbetsdag.",
  },
  en: {
    eyebrow: "Our promise",
    title: "Four principles that guide every working day.",
  },
} as const;

export default function FeaturesSection({ lang, dictionary }: FeaturesSectionProps) {
  const features = [
    {
      title: dictionary.home.features.quality.title,
      description: dictionary.home.features.quality.description,
    },
    {
      title: dictionary.home.features.fresh.title,
      description: dictionary.home.features.fresh.description,
    },
    {
      title: dictionary.home.features.sustainable.title,
      description: dictionary.home.features.sustainable.description,
    },
    {
      title: dictionary.home.features.local.title,
      description: dictionary.home.features.local.description,
    },
  ];

  return (
    <section className="border-b border-brand-200/80 bg-white py-20 md:py-24 lg:py-32">
      <div className="site-container">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start lg:gap-12">
          <p className="section-eyebrow mb-0">{copy[lang].eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {copy[lang].title}
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-brand-200 bg-brand-200 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article key={feature.title} className="flex flex-col gap-6 bg-white px-8 py-10 md:px-10 md:py-12">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-full border border-brand-200 bg-brand-50" />
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-[1.7rem] font-semibold text-slate-900 md:text-[1.85rem]">
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
