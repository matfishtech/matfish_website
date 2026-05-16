import { type Dictionary } from "@/lib/i18n";

interface TimelineSectionProps {
  dictionary: Dictionary;
}

export default function TimelineSection({ dictionary }: TimelineSectionProps) {
  const timeline = [
    {
      year: "2010",
      title: dictionary.about.milestones.founding.title,
      description: dictionary.about.milestones.founding.description,
    },
    {
      year: "2012",
      title: dictionary.about.milestones.expansion.title,
      description: dictionary.about.milestones.expansion.description,
    },
    {
      year: "2022",
      title: dictionary.about.milestones.modernization.title,
      description: dictionary.about.milestones.modernization.description,
    },
    {
      year: "2023",
      title: dictionary.about.milestones.sustainability.title,
      description: dictionary.about.milestones.sustainability.description,
    },
  ];

  return (
    <section className="bg-brand-50 py-20 md:py-24 lg:py-32">
      <div className="site-container">
        <div className="mb-14 max-w-5xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {dictionary.about.milestones.title}
          </h2>
        </div>

        <div className="space-y-10 md:space-y-12">
          {timeline.map((item, index) => (
            <article
              key={item.year}
              className="relative pl-8 md:pl-14"
            >
              <span
                className="absolute left-0 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-white bg-brand-700"
                aria-hidden="true"
              />

              {index < timeline.length - 1 ? (
                <span
                  className="absolute left-0 top-[0.875rem] bottom-[-3.375rem] z-0 w-px -translate-x-1/2 bg-brand-200 md:bottom-[-3.875rem]"
                  aria-hidden="true"
                />
              ) : null}

              <p className="mb-3 flex h-4 items-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {item.year}
              </p>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900 md:text-4xl">{item.title}</h3>
              <p className="max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
