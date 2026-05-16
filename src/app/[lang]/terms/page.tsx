import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { isLanguage } from "@/lib/i18n";

const copy = {
  fi: {
    title: "Käyttöehdot",
    summary: "Näitä ehtoja sovelletaan verkkosivuston käyttöön ja yhteydenottopalveluihin.",
    sections: [
      {
        heading: "Palveluntarjoaja",
        text: "Sivuston tarjoaa M.A.T-Fish Ab Oy, Flisövägen 240, 22710 Föglö, Åland, Finland.",
      },
      {
        heading: "Palvelun käyttö",
        text: "Sivustoa saa käyttää vain lainmukaisiin tarkoituksiin. Käyttäjä vastaa antamiensa tietojen oikeellisuudesta.",
      },
      {
        heading: "Kielletty käyttö",
        text: "Sivustoa ei saa käyttää haitallisen sisällön lähettämiseen, tietoturvan vaarantamiseen, häirintään, väärien tietojen antamiseen tai muuhun toimintaan, joka rikkoo lakia tai muiden oikeuksia.",
      },
      {
        heading: "Sisältö ja immateriaalioikeudet",
        text: "Sivuston sisältö kuuluu M.A.T-Fish Ab Oy:lle tai sen lisenssinantajille. Sisällön kopiointi ilman lupaa on kielletty.",
      },
      {
        heading: "Kolmannen osapuolen palvelut",
        text: "Sivustolla voidaan käyttää kolmannen osapuolen palveluja, kuten kartta- ja analytiikkapalveluja. Näihin palveluihin voi soveltua niiden omia ehtoja ja tietosuojakäytäntöjä.",
      },
      {
        heading: "Vastuunrajoitus",
        text: "Sivusto tarjotaan sellaisenaan. Emme vastaa välillisistä vahingoista tai keskeytyksistä palvelun saatavuudessa.",
      },
      {
        heading: "Sovellettava laki",
        text: "Näihin ehtoihin sovelletaan Suomen lakia, jollei pakottavasta lainsäädännöstä muuta johdu.",
      },
    ],
  },
  sv: {
    title: "Användarvillkor",
    summary: "Dessa villkor gäller användningen av webbplatsen och kontaktfunktionerna.",
    sections: [
      {
        heading: "Tjänsteleverantör",
        text: "Webbplatsen tillhandahålls av M.A.T-Fish Ab Oy, Flisövägen 240, 22710 Föglö, Åland, Finland.",
      },
      {
        heading: "Användning av tjänsten",
        text: "Webbplatsen får endast användas för lagliga ändamål. Användaren ansvarar för att uppgifterna är korrekta.",
      },
      {
        heading: "Förbjuden användning",
        text: "Webbplatsen får inte användas för att skicka skadligt innehåll, äventyra säkerheten, trakassera, lämna falska uppgifter eller agera i strid med lag eller andras rättigheter.",
      },
      {
        heading: "Innehåll och immateriella rättigheter",
        text: "Webbplatsens innehåll tillhör M.A.T-Fish Ab Oy eller dess licensgivare. Kopiering utan tillstånd är förbjuden.",
      },
      {
        heading: "Tredjepartstjänster",
        text: "Webbplatsen kan använda tredjepartstjänster, såsom kart- och analystjänster. Dessa tjänster kan omfattas av egna villkor och integritetspolicyer.",
      },
      {
        heading: "Ansvarsbegränsning",
        text: "Webbplatsen tillhandahålls i befintligt skick. Vi ansvarar inte för indirekta skador eller avbrott i tillgängligheten.",
      },
      {
        heading: "Tillämplig lag",
        text: "Dessa villkor regleras av finsk lag, om inte tvingande lagstiftning anger annat.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    summary: "These terms apply to use of the website and contact services.",
    sections: [
      {
        heading: "Service provider",
        text: "The website is provided by M.A.T-Fish Ab Oy, Flisövägen 240, 22710 Föglö, Åland, Finland.",
      },
      {
        heading: "Use of service",
        text: "The website may only be used for lawful purposes. Users are responsible for the accuracy of submitted information.",
      },
      {
        heading: "Prohibited use",
        text: "The website may not be used to send harmful content, compromise security, harass others, submit false information, or otherwise violate law or third-party rights.",
      },
      {
        heading: "Content and intellectual property",
        text: "Website content belongs to M.A.T-Fish Ab Oy or its licensors. Copying content without permission is prohibited.",
      },
      {
        heading: "Third-party services",
        text: "The website may use third-party services, such as map and analytics services. Those services may be subject to their own terms and privacy policies.",
      },
      {
        heading: "Limitation of liability",
        text: "The website is provided as is. We are not liable for indirect damages or interruptions in service availability.",
      },
      {
        heading: "Governing law",
        text: "These terms are governed by Finnish law, unless mandatory legislation provides otherwise.",
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
    slug: "terms",
    title: `${copy[lang].title} | M.A.T-Fish`,
    description: copy[lang].summary,
    index: false,
  });
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
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
