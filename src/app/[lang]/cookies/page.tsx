import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";
import { buildPageMetadata } from "@/lib/seo";
import { isLanguage } from "@/lib/i18n";

const copy = {
  fi: {
    title: "Evästekäytäntö",
    summary: "Käytämme välttämätöntä selaintallennusta sivuston toimintaan sekä valinnaisia analytiikkaevästeitä vain suostumuksella.",
    manageButton: "Avaa evästeasetukset",
    sections: [
      {
        heading: "Välttämättömät evästeet",
        text: "Nämä tallenteet mahdollistavat sivuston perustoiminnallisuudet. Käytämme niitä myös muistamaan evästevalintasi selaimessasi.",
      },
      {
        heading: "Analytiikkaevästeet",
        text: "Analytiikkaevästeitä käytetään vain suostumuksella Google Analyticsin avulla, jotta voimme ymmärtää sivuston käyttöä ja kehittää palvelua. Google Analytics latautuu vasta, kun olet hyväksynyt analytiikkaevästeet.",
      },
      {
        heading: "Suostumuksen hallinta",
        text: "Voit hyväksyä tai hylätä analytiikkaevästeet evästebannerissa. Voit myös avata evästeasetukset uudelleen milloin tahansa alatunnisteen linkistä ja perua tai muuttaa valintasi.",
      },
      {
        heading: "Kolmannen osapuolen karttapalvelu",
        text: "Yhteystietosivulla emme lataa Google Mapsia automaattisesti. Jos päätät avata karttalinkin, siirryt Googlen palveluun, jossa Google käsittelee tietoja omien ehtojensa ja tietosuojakäytäntönsä mukaisesti.",
      },
    ],
  },
  sv: {
    title: "Cookiepolicy",
    summary: "Vi använder nödvändig webblagring för webbplatsens funktion samt valfria analyscookies endast med samtycke.",
    manageButton: "Öppna cookieinställningar",
    sections: [
      {
        heading: "Nödvändiga cookies",
        text: "Dessa lagringar behövs för grundläggande funktioner på webbplatsen. Vi använder dem också för att komma ihåg ditt cookieval i webbläsaren.",
      },
      {
        heading: "Analyscookies",
        text: "Analyscookies används endast med samtycke via Google Analytics för att förstå användningen och förbättra tjänsten. Google Analytics laddas först när du har godkänt analyscookies.",
      },
      {
        heading: "Hantera samtycke",
        text: "Du kan godkänna eller avvisa analyscookies i cookie-bannern. Du kan också öppna cookieinställningarna igen när som helst från länken i sidfoten och återkalla eller ändra ditt val.",
      },
      {
        heading: "Karttjänst från tredje part",
        text: "På kontaktsidan laddar vi inte Google Maps automatiskt. Om du väljer att öppna kartlänken går du vidare till Googles tjänst, där Google behandlar uppgifter enligt sina egna villkor och sin integritetspolicy.",
      },
    ],
  },
  en: {
    title: "Cookie Policy",
    summary: "We use essential browser storage for website functionality and optional analytics cookies only with consent.",
    manageButton: "Open cookie settings",
    sections: [
      {
        heading: "Essential cookies",
        text: "These storage items are required for core website functionality. We also use them to remember your cookie choice in your browser.",
      },
      {
        heading: "Analytics cookies",
        text: "Analytics cookies are used only with consent through Google Analytics to understand website usage and improve the service. Google Analytics loads only after you accept analytics cookies.",
      },
      {
        heading: "Consent management",
        text: "You can accept or reject analytics cookies from the cookie banner. You can also reopen cookie settings at any time from the footer link and withdraw or change your choice.",
      },
      {
        heading: "Third-party map service",
        text: "On the contact page we do not load Google Maps automatically. If you choose to open the map link, you move to Google's service, where Google processes data according to its own terms and privacy policy.",
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
    slug: "cookies",
    title: `${copy[lang].title} | M.A.T-Fish`,
    description: copy[lang].summary,
    index: false,
  });
}

export default async function CookiesPage({ params }: { params: Promise<{ lang: string }> }) {
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
        <CookieSettingsButton label={content.manageButton} className="cta-link w-fit" />

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
