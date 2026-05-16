import { type Dictionary } from "@/lib/i18n";

interface ProductsHeroSectionProps {
  dictionary: Dictionary;
}

export default function ProductsHeroSection({ dictionary }: ProductsHeroSectionProps) {
  const stats = [
    { value: "5+", label: dictionary.products.stats.countries },
    { value: "40+", label: dictionary.products.stats.years },
    { value: "100%", label: dictionary.products.stats.sustainable },
    { value: "4M+", label: dictionary.products.stats.production },
  ];

  return (
    <section className="border-b border-brand-200/80 bg-white">
      <div className="site-container">
        <div className="grid min-h-[22rem] items-center gap-12 py-16 md:min-h-[24rem] md:py-18 lg:grid-cols-[1.22fr_0.78fr] lg:gap-16 lg:py-20">
          <div>
            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              {dictionary.products.title}
            </h1>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {dictionary.products.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 overflow-hidden border border-brand-200 bg-brand-50/40">
            {stats.map((stat, index) => (
              <article
                key={stat.label}
                className={[
                  "px-5 py-6 md:px-6 md:py-8",
                  index < 2 ? "border-b border-brand-200" : "",
                  index % 2 === 0 ? "border-r border-brand-200" : "",
                ].join(" ")}
              >
                <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {stat.label}
                </p>
                <p className="text-3xl font-semibold text-slate-900 md:text-4xl">{stat.value}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
