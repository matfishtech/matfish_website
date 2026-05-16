import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { getCanonicalUrl, isLanguage, type Language } from "@/lib/i18n";
import { site } from "@/lib/site";

type FaqItem = {
  question: string;
  answer: string;
};

const copy: Record<Language, { title: string; description: string; items: FaqItem[] }> = {
  fi: {
    title: "Usein kysytyt kysymykset",
    description:
      "Vastauksia M.A.T-Fishin tuotteista, sijainnista, kalankasvatuksesta ja yhteydenotosta.",
    items: [
      {
        question: "Mitä M.A.T-Fish tekee?",
        answer:
          "M.A.T-Fish Ab Oy on Ahvenanmaan Föglössä toimiva kalankasvatusyritys, joka tuottaa korkealaatuisia kalatuotteita yritysasiakkaille ja jatkojalostukseen.",
      },
      {
        question: "Missä M.A.T-Fish sijaitsee?",
        answer:
          "Yritys sijaitsee Flisössä, Föglön kunnassa Ahvenanmaalla. Käyntiosoite on Flisövägen 240, 22710 Föglö, Åland, Finland.",
      },
      {
        question: "Mitä kalatuotteita M.A.T-Fish tarjoaa?",
        answer:
          "Tuotevalikoimaan kuuluvat kirjolohi, siika ja sesongin kirjolohen mäti.",
      },
      {
        question: "Toimittaako M.A.T-Fish kalaa yritysasiakkaille?",
        answer:
          "Kyllä. M.A.T-Fish palvelee kaupallisia asiakkaita, elintarvikealan toimijoita ja jatkojalostusta. Tarkemmat saatavuus- ja toimitustiedot kannattaa varmistaa ottamalla yhteyttä.",
      },
      {
        question: "Miten M.A.T-Fishiin saa yhteyden?",
        answer:
          "Voit ottaa yhteyttä sivuston yhteydenottolomakkeella, sähköpostitse osoitteeseen info@matfish.fi tai puhelimitse numeroon 018-511 01.",
      },
      {
        question: "Mitä kieliä M.A.T-Fish palvelee?",
        answer:
          "Sivusto ja yhteydenotto ovat saatavilla suomeksi, ruotsiksi ja englanniksi.",
      },
    ],
  },
  sv: {
    title: "Vanliga frågor",
    description:
      "Svar om M.A.T-Fishs produkter, plats, fiskodling och kontaktmöjligheter.",
    items: [
      {
        question: "Vad gör M.A.T-Fish?",
        answer:
          "M.A.T-Fish Ab Oy är ett fiskodlingsföretag i Föglö på Åland som producerar högkvalitativa fiskprodukter för företagskunder och vidareförädling.",
      },
      {
        question: "Var ligger M.A.T-Fish?",
        answer:
          "Företaget ligger i Flisö i Föglö kommun på Åland. Besöksadressen är Flisövägen 240, 22710 Föglö, Åland, Finland.",
      },
      {
        question: "Vilka fiskprodukter erbjuder M.A.T-Fish?",
        answer:
          "Sortimentet omfattar regnbåge, sik och säsongsvis regnbågsrom.",
      },
      {
        question: "Levererar M.A.T-Fish till företagskunder?",
        answer:
          "Ja. M.A.T-Fish betjänar kommersiella kunder, livsmedelsaktörer och vidareförädling. Kontakta oss för aktuell tillgång och leveransinformation.",
      },
      {
        question: "Hur kontaktar jag M.A.T-Fish?",
        answer:
          "Du kan kontakta oss via kontaktformuläret, per e-post till info@matfish.fi eller per telefon på 018-511 01.",
      },
      {
        question: "På vilka språk betjänar M.A.T-Fish?",
        answer:
          "Webbplatsen och kontaktmöjligheterna finns på finska, svenska och engelska.",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    description:
      "Answers about M.A.T-Fish, a fish farming company and fresh fish supplier based in Foglo, Aland, Finland.",
    items: [
      {
        question: "What does M.A.T-Fish do?",
        answer:
          "M.A.T-Fish Ab Oy is a fish farming company based in Foglo, Aland, Finland. The company produces high-quality farmed fish products for commercial customers, food industry operators and further processing.",
      },
      {
        question: "Where is M.A.T-Fish located?",
        answer:
          "M.A.T-Fish is located in Fliso, in the municipality of Foglo in the Aland archipelago. The visiting address is Flisovagen 240, 22710 Foglo, Aland, Finland.",
      },
      {
        question: "What fish products does M.A.T-Fish offer?",
        answer:
          "M.A.T-Fish offers farmed rainbow trout, whitefish and seasonal rainbow trout roe.",
      },
      {
        question: "Is M.A.T-Fish a fresh fish supplier for businesses?",
        answer:
          "Yes. M.A.T-Fish serves business customers, food industry operators and commercial fish processing. For availability, volumes and delivery details, contact the team directly.",
      },
      {
        question: "Does M.A.T-Fish produce fish in the Aland archipelago?",
        answer:
          "Yes. M.A.T-Fish is rooted in the Aland archipelago and focuses on high-quality fish farming in local Nordic waters.",
      },
      {
        question: "How can I contact M.A.T-Fish?",
        answer:
          "You can contact M.A.T-Fish through the website contact form, by email at info@matfish.fi or by phone at 018-511 01.",
      },
      {
        question: "Which languages does M.A.T-Fish support?",
        answer:
          "The website and contact information are available in Finnish, Swedish and English.",
      },
    ],
  },
};

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
    slug: "faq",
    title: `${copy[lang].title} | M.A.T-Fish`,
    description: copy[lang].description,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const content = copy[lang];
  const canonicalUrl = getCanonicalUrl(lang, "faq");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        url: canonicalUrl,
        name: content.title,
        inLanguage: lang,
        publisher: {
          "@id": `${site.url}#organization`,
        },
        mainEntity: content.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.shortName,
            item: getCanonicalUrl(lang),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="site-container max-w-4xl">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            {content.description}
          </p>
        </header>

        <div className="divide-y divide-brand-200 border-y border-brand-200">
          {content.items.map((item) => (
            <article key={item.question} className="py-7">
              <h2 className="text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                {item.question}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
