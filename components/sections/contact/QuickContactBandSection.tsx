import { type Dictionary, type Language } from "@/lib/i18n";
import { site } from "@/lib/site";

interface QuickContactBandSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

export default function QuickContactBandSection({ lang: _lang, dictionary }: QuickContactBandSectionProps) {
  return (
    <section className="border-t border-brand-200/80 bg-white">
      <div className="site-container grid gap-px bg-brand-200 md:grid-cols-3">
        <a href={`mailto:${site.email}`} className="bg-white px-8 py-8 transition-colors hover:bg-brand-50">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {dictionary.contact.email}
          </p>
          <p className="mt-2 text-lg text-slate-900">{site.email}</p>
        </a>

        <div className="bg-white px-8 py-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {dictionary.contactpage.location.visiting}
          </p>
          <p className="mt-2 text-lg text-slate-900">Flisövägen 240, 22710 Föglö</p>
        </div>

        <div className="bg-white px-8 py-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {dictionary.common.company.businessId}
          </p>
          <p className="mt-2 text-lg text-slate-900">2835881-3</p>
        </div>
      </div>
    </section>
  );
}
