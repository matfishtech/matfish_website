import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { isLanguage } from "@/lib/i18n";

const copy = {
  fi: {
    title: "Toimintaperiaatteet",
    summary: "Nämä periaatteet ohjaavat asiallista ja turvallista yhteydenpitoa M.A.T-Fishin kanssa.",
    sections: [
      {
        heading: "Kunnioittava yhteydenpito",
        text: "Odotamme kaikilta sivuston käyttäjiltä ja yhteydenottajilta asiallista, kunnioittavaa ja lainmukaista viestintää.",
      },
      {
        heading: "Kielletty toiminta",
        text: "Häirintä, uhkailu, syrjintä, roskaposti, haitallinen sisältö, väärien tietojen antaminen ja tietoturvaa vaarantava toiminta ovat kiellettyjä.",
      },
      {
        heading: "Yritystiedot ja luottamuksellisuus",
        text: "Älä lähetä luottamuksellisia tai arkaluonteisia tietoja verkkolomakkeilla, ellei se ole välttämätöntä yhteydenoton käsittelemiseksi.",
      },
      {
        heading: "Toimenpiteet",
        text: "Voimme jättää asiattomat yhteydenotot käsittelemättä, estää väärinkäyttöä tai ryhtyä muihin tarpeellisiin toimiin palvelun ja henkilöstön suojaamiseksi.",
      },
      {
        heading: "Ilmoittaminen",
        text: "Jos huomaat väärinkäyttöä tai turvallisuuteen liittyvän huolen, ota yhteyttä osoitteeseen info@matfish.fi.",
      },
    ],
  },
  sv: {
    title: "Uppförandekod",
    summary: "Dessa principer styr saklig och trygg kommunikation med M.A.T-Fish.",
    sections: [
      {
        heading: "Respektfull kommunikation",
        text: "Vi förväntar oss att alla användare och kontakter kommunicerar sakligt, respektfullt och lagenligt.",
      },
      {
        heading: "Förbjudet beteende",
        text: "Trakasserier, hot, diskriminering, skräppost, skadligt innehåll, falska uppgifter och säkerhetshotande aktivitet är förbjudna.",
      },
      {
        heading: "Företagsuppgifter och konfidentialitet",
        text: "Skicka inte konfidentiella eller känsliga uppgifter via webbformulär om det inte är nödvändigt för att hantera kontakten.",
      },
      {
        heading: "Åtgärder",
        text: "Vi kan lämna olämpliga kontakter obesvarade, förhindra missbruk eller vidta andra nödvändiga åtgärder för att skydda tjänsten och personalen.",
      },
      {
        heading: "Rapportering",
        text: "Om du upptäcker missbruk eller en säkerhetsrelaterad oro, kontakta info@matfish.fi.",
      },
    ],
  },
  en: {
    title: "Code of Conduct",
    summary: "These principles guide respectful and safe communication with M.A.T-Fish.",
    sections: [
      {
        heading: "Respectful communication",
        text: "We expect all website users and contacts to communicate in a respectful, appropriate, and lawful manner.",
      },
      {
        heading: "Prohibited conduct",
        text: "Harassment, threats, discrimination, spam, harmful content, false information, and activity that compromises security are prohibited.",
      },
      {
        heading: "Business information and confidentiality",
        text: "Do not send confidential or sensitive information through website forms unless it is necessary for handling your request.",
      },
      {
        heading: "Actions",
        text: "We may leave inappropriate contacts unanswered, prevent misuse, or take other necessary measures to protect the service and personnel.",
      },
      {
        heading: "Reporting",
        text: "If you notice misuse or a security concern, contact info@matfish.fi.",
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    return {};
  }

  return buildPageMetadata({
    lang,
    slug: "code-of-conduct",
    title: `${copy[lang].title} | M.A.T-Fish`,
    description: copy[lang].summary,
    index: false,
  });
}

export default async function CodeOfConductPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const content = copy[lang];

  return (
    <section className="bg-white py-16">
      <div className="site-container max-w-4xl space-y-8">
        <h1 className="text-3xl font-semibold text-slate-900 md:text-5xl">{content.title}</h1>
        <p className="text-lg leading-relaxed text-slate-600">{content.summary}</p>

        <div className="space-y-6">
          {content.sections.map((section) => (
            <article key={section.heading} className="border-t border-brand-200 pt-5">
              <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{section.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
