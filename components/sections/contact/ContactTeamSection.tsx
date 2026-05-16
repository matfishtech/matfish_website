import { type Dictionary, type Language } from "@/lib/i18n";

interface ContactTeamSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

const copy = {
  fi: { title: "Henkilökohtaista palvelua." },
  sv: { title: "Personlig service." },
  en: { title: "Personal service." },
} as const;

export default function ContactTeamSection({ lang, dictionary }: ContactTeamSectionProps) {
  const contactPeople = [
    {
      name: "Anu Lauttia",
      title: dictionary.contactpage.roles.ceo,
      contacts: [
        {
          label: dictionary.contact.phone,
          value: "040 8644 982",
          href: "tel:0408644982",
        },
        {
          label: dictionary.contact.email,
          value: "anu.lauttia@matfish.fi",
          href: "mailto:anu.lauttia@matfish.fi",
        },
      ],
    },
    {
      name: "Kerli Vokksepp",
      title: dictionary.contactpage.roles.sales,
      contacts: [
        {
          label: dictionary.contact.phone,
          value: "040 1454 014",
          href: "tel:0401454014",
        },
        {
          label: dictionary.contact.email,
          value: "kerli@matfish.fi",
          href: "mailto:kerli@matfish.fi",
        },
        {
          label: dictionary.contact.phone,
          value: "018-511 01",
          href: "tel:01851101",
        },
        {
          label: dictionary.contact.email,
          value: "info@matfish.fi",
          href: "mailto:info@matfish.fi",
        },
      ],
    },
  ];

  return (
    <section className="border-b border-brand-200/80 bg-white py-20 md:py-24 lg:py-28">
      <div className="site-container">
        <div className="mb-14">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {copy[lang].title}
          </h2>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {contactPeople.map((person) => (
            <article
              key={person.name}
              className="border border-brand-200/80 bg-white px-7 py-8 md:px-8 md:py-10"
            >
              <div className="grid gap-6">
                <div className="min-w-0">
                  <h2 className="text-2xl leading-tight font-semibold text-slate-900 md:text-[1.8rem]">
                    {person.name}
                  </h2>
                  <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {person.title}
                  </p>
                </div>

                {person.contacts.length > 0 && (
                  <address className="grid gap-5 border-t border-brand-200 pt-6 not-italic text-base text-slate-700 sm:grid-cols-2 sm:gap-6">
                    {person.contacts.map((contact) => (
                      <p key={`${person.name}-${contact.href}`}>
                        <span className="mb-1 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
                          {contact.label}
                        </span>
                        <a
                          href={contact.href}
                          className={contact.href.startsWith("tel:") ? "whitespace-nowrap" : "block max-w-full text-[0.95rem] break-words"}
                        >
                          {contact.value}
                        </a>
                      </p>
                    ))}
                  </address>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
