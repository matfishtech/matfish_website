import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { isLanguage } from "@/lib/i18n";

const copy = {
  fi: {
    title: "Tietosuojaseloste",
    summary:
      "Käsittelemme henkilötietoja asiakasyhteydenpitoon, pyyntöihin vastaamiseen ja sivuston kehittämiseen lainmukaisesti ja läpinäkyvästi.",
    sections: [
      {
        heading: "Rekisterinpitäjä",
        text: "M.A.T-Fish Ab Oy, Flisövägen 240, 22710 Föglö, Åland, Finland. Sähköposti: info@matfish.fi.",
      },
      {
        heading: "Mitä tietoja käsittelemme",
        text: "Käsittelemme yhteydenoton yhteydessä esimerkiksi nimeä, sähköpostiosoitetta, puhelinnumeroa, yritystä, viestin sisältöä ja muita itse toimittamiasi tietoja. Suostumuksella käsittelemme lisäksi sivuston käyttöä koskevia analytiikkatietoja Google Analyticsin avulla. Jos avaat karttalinkin Google Mapsiin, Google käsittelee yhteyden ja käytön yhteydessä syntyviä tietoja omana rekisterinpitäjänään.",
      },
      {
        heading: "Käsittelyn tarkoitus ja peruste",
        text: "Tietoja käytetään asiakaspalveluun, yhteydenottoihin vastaamiseen, tarjouspyyntöjen käsittelyyn, sopimusta edeltäviin toimenpiteisiin, lakisääteisten velvoitteiden täyttämiseen ja sivuston kehittämiseen. Perusteena on tilanteesta riippuen sopimus, oikeutettu etu, lakisääteinen velvoite tai suostumus.",
      },
      {
        heading: "Säilytysaika",
        text: "Säilytämme tietoja vain niin kauan kuin se on tarpeellista yhteydenoton käsittelyyn tai lakisääteisten velvoitteiden täyttämiseen.",
      },
      {
        heading: "Luovutukset ja palveluntarjoajat",
        text: "Tietoja voidaan käsitellä luotettujen palveluntarjoajien, kuten verkkosivuston ylläpidon, sähköpostin toimituspalvelun ja analytiikkapalveluiden kautta. Yhteydenottolomakkeen viestit toimitetaan sähköpostitse palveluntarjoajan kautta. Emme myy henkilötietoja kolmansille osapuolille.",
      },
      {
        heading: "Oikeutesi",
        text: "Sinulla on oikeus tarkastaa itseäsi koskevat tiedot, pyytää virheellisten tietojen oikaisua, pyytää tietojen poistamista tai käsittelyn rajoittamista sekä vastustaa käsittelyä sovellettavan lain mukaisesti. Voit myös peruuttaa tai muuttaa analytiikkasuostumuksesi milloin tahansa sivuston evästeasetuksista.",
      },
    ],
  },
  sv: {
    title: "Integritetspolicy",
    summary:
      "Vi behandlar personuppgifter för kundkommunikation, för att besvara förfrågningar och för att utveckla webbplatsen på ett lagligt och transparent sätt.",
    sections: [
      {
        heading: "Personuppgiftsansvarig",
        text: "M.A.T-Fish Ab Oy, Flisövägen 240, 22710 Föglö, Åland, Finland. E-post: info@matfish.fi.",
      },
      {
        heading: "Vilka uppgifter vi behandlar",
        text: "Vi behandlar exempelvis namn, e-postadress, telefonnummer, företag, meddelandeinnehåll och andra uppgifter som du själv lämnar vid kontakt. Med samtycke behandlar vi också analysuppgifter om användningen av webbplatsen via Google Analytics. Om du öppnar kartlänken till Google Maps behandlar Google uppgifter som uppstår i samband med anslutningen och användningen som självständig personuppgiftsansvarig.",
      },
      {
        heading: "Syfte och rättslig grund",
        text: "Uppgifterna används för kundservice, besvarande av förfrågningar, hantering av offertförfrågningar, åtgärder före avtal, lagstadgade skyldigheter och utveckling av webbplatsen. Den rättsliga grunden är beroende på situation avtal, berättigat intresse, lagstadgad skyldighet eller samtycke.",
      },
      {
        heading: "Lagringstid",
        text: "Vi sparar uppgifterna endast så länge det behövs för att hantera kontakten eller uppfylla lagstadgade skyldigheter.",
      },
      {
        heading: "Mottagare och tjänsteleverantörer",
        text: "Uppgifter kan behandlas via betrodda tjänsteleverantörer, såsom webbhotell, e-postleverans och analystjänster. Meddelanden från kontaktformuläret levereras via en tjänsteleverantör för e-post. Vi säljer inte personuppgifter till tredje part.",
      },
      {
        heading: "Dina rättigheter",
        text: "Du har rätt att få tillgång till dina uppgifter, begära rättelse av felaktiga uppgifter, begära radering eller begränsning av behandling och invända mot behandling enligt tillämplig lag. Du kan också återkalla eller ändra ditt samtycke till analyscookies när som helst via webbplatsens cookieinställningar.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    summary:
      "We process personal data for customer communication, responding to requests, and improving the website lawfully and transparently.",
    sections: [
      {
        heading: "Controller",
        text: "M.A.T-Fish Ab Oy, Flisövägen 240, 22710 Föglö, Åland, Finland. Email: info@matfish.fi.",
      },
      {
        heading: "Data we process",
        text: "We process information such as name, email address, phone number, company, message content, and any other information you provide when contacting us. With consent, we also process website analytics data through Google Analytics. If you open the Google Maps link, Google processes connection and usage data generated in that context as an independent controller.",
      },
      {
        heading: "Purpose and legal basis",
        text: "Data is used for customer service, responding to enquiries, handling quote requests, pre-contractual measures, legal obligations, and improving the website. Depending on the situation, the legal basis is contract, legitimate interest, legal obligation, or consent.",
      },
      {
        heading: "Retention period",
        text: "Data is retained only as long as necessary for handling the request or to comply with legal obligations.",
      },
      {
        heading: "Recipients and service providers",
        text: "Data may be processed through trusted service providers, such as website hosting, email delivery services, and analytics providers. Contact form messages are delivered through an email service provider. We do not sell personal data to third parties.",
      },
      {
        heading: "Your rights",
        text: "You have the right to access your data, request correction of inaccurate data, request deletion or restriction of processing, and object to processing under applicable law. You may also withdraw or change analytics consent at any time through the website's cookie settings.",
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
    slug: "privacy",
    title: `${copy[lang].title} | M.A.T-Fish`,
    description: copy[lang].summary,
    index: false,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
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
