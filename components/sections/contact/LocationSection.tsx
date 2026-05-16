import { type Dictionary } from "@/lib/i18n";
import { companyDisplayAddress } from "@/lib/site";

interface LocationSectionProps {
  dictionary: Dictionary;
}

const mapEmbedSrc =
  "https://www.google.com/maps?q=M.A.T-Fish+F%C3%B6gl%C3%B6&z=15&output=embed";

export default function LocationSection({ dictionary }: LocationSectionProps) {
  return (
    <section className="border-b border-brand-200/80 bg-white">
      <div className="mx-auto grid max-w-[1360px] gap-0 lg:grid-cols-12">
        <div className="flex flex-col justify-center gap-8 px-6 py-16 sm:px-8 lg:col-span-5 lg:px-10 lg:py-24">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {dictionary.contactpage.location.title}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            {dictionary.contactpage.location.subtitle}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="border-l-2 border-brand-700 bg-brand-50/60 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {dictionary.contactpage.location.visiting}
              </p>
              <address className="mt-3 not-italic text-lg leading-relaxed text-slate-900 md:text-xl">
                <p>{companyDisplayAddress.street}</p>
                <p>{companyDisplayAddress.postalCode}</p>
                <p>{companyDisplayAddress.region}</p>
              </address>
            </div>

            <div className="border-l-2 border-brand-700 bg-brand-50/60 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                {dictionary.contactpage.location.postal}
              </p>
              <address className="mt-3 not-italic text-lg leading-relaxed text-slate-900 md:text-xl">
                <p>{companyDisplayAddress.street}</p>
                <p>{companyDisplayAddress.postalCode}</p>
                <p>{companyDisplayAddress.region}</p>
              </address>
            </div>
          </div>
        </div>

        <div className="min-h-[24rem] lg:col-span-7 lg:min-h-full">
          <iframe
            src={mapEmbedSrc}
            title={dictionary.contactpage.location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full min-h-[24rem] w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
