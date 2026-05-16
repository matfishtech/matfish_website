import { type Dictionary } from "@/lib/i18n";

interface ValuesSectionProps {
  dictionary: Dictionary;
}

export default function ValuesSection({ dictionary }: ValuesSectionProps) {
  const values = [
    dictionary.about.values.quality,
    dictionary.about.values.sustainability,
    dictionary.about.values.responsibility,
    dictionary.about.values.community,
  ];

  return (
    <section className="border-b border-brand-200/80 bg-white py-20 md:py-24 lg:py-32">
      <div className="site-container">
        <div className="mb-14 max-w-5xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {dictionary.about.values.title}
          </h2>
        </div>

        <div className="grid gap-px border border-brand-200 bg-brand-200 md:grid-cols-2">
          {values.map((value, index) => (
            <article key={value.title} className="bg-white px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-16">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">0{index + 1}</p>
              <h3 className="mt-5 mb-4 text-2xl font-semibold text-slate-900 md:text-[2rem]">{value.title}</h3>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
