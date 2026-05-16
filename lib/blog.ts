import { languages, type Language } from "@/lib/i18n";

type LocalizedString = Record<Language, string>;

export interface BlogPost {
  slug: string;
  publishedAt: string;
  readingTimeMinutes: number;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  intro: LocalizedString;
  body: Record<Language, string[]>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-fresh-fish",
    publishedAt: "2026-02-14",
    readingTimeMinutes: 5,
    category: {
      fi: "Laatu",
      sv: "Kvalitet",
      en: "Quality",
    },
    title: {
      fi: "Näin tunnistat tuoreen kalan: 5 käytännön merkkiä",
      sv: "Så känner du igen färsk fisk: 5 praktiska tecken",
      en: "How to identify fresh fish: 5 practical signs",
    },
    excerpt: {
      fi: "Tuoreuden arviointi onnistuu nopeasti, kun tarkistat ulkonäön, tuoksun ja rakenteen oikeassa järjestyksessä.",
      sv: "Det går snabbt att bedöma färskhet om du kontrollerar utseende, doft och struktur i rätt ordning.",
      en: "Freshness can be assessed quickly when appearance, smell, and texture are checked in the right order.",
    },
    intro: {
      fi: "Tuore kala on helpointa valita, kun tarkistat muutaman perusasian johdonmukaisesti. Näin vältyt hutiostoksilta niin arjessa kuin ammattikeittiössä.",
      sv: "Färsk fisk är enklast att välja när du systematiskt kontrollerar några grundläggande saker. Det minskar risken för felköp både i vardagen och i professionella kök.",
      en: "Fresh fish is easiest to select when a few basics are checked consistently. This helps avoid poor purchases in both home and professional kitchens.",
    },
    body: {
      fi: [
        "Silmien tulisi olla kirkkaat ja pinnan kiiltävä. Jos pinta näyttää kuivalta tai samealta, tuoreus voi olla heikentynyt.",
        "Tuoksun tulisi olla mieto ja puhdas. Voimakas tai pistävä haju kertoo usein siitä, että kala ei ole enää parhaimmillaan.",
        "Lihan rakenteen tulee tuntua napakalta. Kevyt painallus ei saisi jättää pysyvää kuoppaa pintaan.",
        "Kun nämä merkit tarkistetaan yhdessä, ostopäätös on huomattavasti varmempi.",
        "Myös myyntipisteen käsittelytapa kertoo paljon tuotteesta. Kylmäsäilytyksen ja esillepanon tulee olla tasaisia koko myyntiajan.",
        "Jos et ole varma valinnasta, kysy suoraan tuotteen toimituspäivästä ja käsittelystä. Selkeä vastaus kertoo usein hyvästä toimintatavasta.",
      ],
      sv: [
        "Ögonen ska vara klara och ytan blank. Om ytan ser torr eller matt ut kan färskheten vara sämre.",
        "Doften ska vara mild och ren. En stark eller stickande lukt är ofta en varningssignal.",
        "Köttets struktur ska vara fast. En lätt tryckning ska inte lämna en bestående grop.",
        "När dessa tecken bedöms tillsammans blir köpbeslutet mer tillförlitligt.",
        "Även hanteringen i försäljningspunkten säger mycket om produkten. Kylförvaring och exponering ska vara stabil under hela försäljningstiden.",
        "Om du är osäker, fråga efter leveransdag och hantering. Ett tydligt svar är ofta ett tecken på goda rutiner.",
      ],
      en: [
        "Eyes should look clear and the surface should appear glossy. A dry or dull surface can indicate reduced freshness.",
        "The smell should be mild and clean. A strong or sharp odor is usually a warning sign.",
        "Texture should feel firm. A light press should not leave a lasting indentation.",
        "Evaluating these signs together makes buying decisions much more reliable.",
        "Handling quality at the point of sale also matters. Cold storage and display conditions should remain stable throughout the day.",
        "If you are unsure, ask for the delivery date and handling details. Clear answers usually indicate a well-managed supply chain.",
      ],
    },
  },
  {
    slug: "best-practices-for-cold-chain",
    publishedAt: "2025-11-03",
    readingTimeMinutes: 5,
    category: {
      fi: "Logistiikka",
      sv: "Logistik",
      en: "Logistics",
    },
    title: {
      fi: "Kylmäketju käytännössä: mitä kannattaa seurata toimituksissa",
      sv: "Kylkedjan i praktiken: vad som bör följas i leveranser",
      en: "Cold chain in practice: what to monitor in deliveries",
    },
    excerpt: {
      fi: "Lämpötila, pakkaus ja toimitusaika muodostavat kokonaisuuden, joka ratkaisee tuotteen laadun vastaanotossa.",
      sv: "Temperatur, förpackning och leveranstid bildar en helhet som avgör produktkvaliteten vid mottagning.",
      en: "Temperature, packaging, and transit time form a whole that determines product quality at receiving.",
    },
    intro: {
      fi: "Kylmäketjun hallinta on yksi tärkeimmistä tekijöistä kala-alalla. Pienetkin poikkeamat voivat vaikuttaa laatuun nopeasti.",
      sv: "Hantering av kylkedjan är en av de viktigaste faktorerna inom fiskbranschen. Även små avvikelser kan snabbt påverka kvaliteten.",
      en: "Cold chain management is one of the most important factors in fish supply. Even small deviations can affect quality quickly.",
    },
    body: {
      fi: [
        "Lähtölämpötila kannattaa dokumentoida jokaiselle erälle. Näin mahdolliset poikkeamat voidaan havaita jo kuljetuksen alussa.",
        "Pakkausmateriaalin ja jäädytyksen tason tulee vastata kuljetusmatkan pituutta. Lyhyt ja pitkä toimitus vaativat eri ratkaisuja.",
        "Vastaanotossa lämpötila tulisi tarkistaa heti, ei vasta varastoinnin jälkeen.",
        "Selkeä kirjausketju auttaa jäljitettävyyttä ja tekee laadunhallinnasta ennakoitavaa.",
        "Toimituksen aikataulu kannattaa suunnitella niin, että kuorma siirtyy vastaanotosta kylmään mahdollisimman nopeasti.",
        "Poikkeamien käsittelyyn on hyvä sopia valmiit toimintatavat etukäteen. Se nopeuttaa reagointia ja vähentää laatuhävikkiä.",
      ],
      sv: [
        "Starttemperaturen bör dokumenteras för varje parti. Då kan avvikelser upptäckas tidigt.",
        "Förpackningsmaterial och kylning ska anpassas till transportsträckan. Korta och långa leveranser kräver olika upplägg.",
        "Vid mottagning bör temperaturen kontrolleras direkt, inte först efter lagring.",
        "En tydlig dokumentationskedja förbättrar spårbarheten och gör kvalitetsstyrningen mer förutsägbar.",
        "Leveransschemat bör planeras så att lasten flyttas till kylförvaring så snabbt som möjligt efter mottagning.",
        "Det är bra att komma överens om färdiga åtgärder för avvikelser i förväg. Det snabbar upp responsen och minskar kvalitetsförluster.",
      ],
      en: [
        "Departure temperature should be documented for every batch so deviations can be detected early.",
        "Packaging material and cooling level should match transit duration. Short and long routes need different setups.",
        "At receiving, temperature checks should happen immediately, not after storage.",
        "A clear documentation chain improves traceability and makes quality control more predictable.",
        "Delivery timing should be planned so that products move into chilled storage as quickly as possible after arrival.",
        "It is useful to agree on predefined actions for deviations in advance. This improves response speed and reduces quality loss.",
      ],
    },
  },
  {
    slug: "product-forms-whole-gutted-fillet",
    publishedAt: "2025-07-19",
    readingTimeMinutes: 6,
    category: {
      fi: "Tuotteet",
      sv: "Produkter",
      en: "Products",
    },
    title: {
      fi: "Kokonainen, perattu vai filee? Tuotemuodon valinta käyttötarpeen mukaan",
      sv: "Hel, rensad eller filé? Så väljer du produktform efter användning",
      en: "Whole, gutted, or fillet? Choosing product form by use case",
    },
    excerpt: {
      fi: "Oikea tuotemuoto säästää aikaa ja vähentää hävikkiä. Vertailussa kolme yleisintä vaihtoehtoa.",
      sv: "Rätt produktform sparar tid och minskar svinn. Här jämförs tre vanliga alternativ.",
      en: "The right product form saves time and reduces waste. Here is a comparison of three common options.",
    },
    intro: {
      fi: "Tuotemuodon valinta vaikuttaa sekä käsittelyyn että kustannuksiin. Paras vaihtoehto riippuu siitä, missä vaiheessa jalostus tehdään.",
      sv: "Val av produktform påverkar både hantering och kostnad. Bästa alternativet beror på var i kedjan förädlingen sker.",
      en: "Product form affects both handling and cost. The best option depends on where processing happens in the chain.",
    },
    body: {
      fi: [
        "Kokonainen kala on usein toimiva vaihtoehto silloin, kun asiakkaalla on oma vahva jatkokäsittelyprosessi ja selkeä osaaminen raaka-aineen hyödyntämisestä alusta loppuun. Tällaisessa mallissa tuotteen käsittely voidaan sovittaa täsmälleen oman tuotannon rytmiin, mikä antaa joustavuutta esimerkiksi fileointi-, annostelu- ja reseptikohtaisiin tarpeisiin. Kokonainen kala voi myös tukea parempaa raaka-aineen kokonaishyödyntämistä, jos keittiössä tai tuotannossa on valmiit käytännöt sivuvirtojen hallintaan.",
        "Perattu kala puolestaan sopii ympäristöihin, joissa halutaan vähentää valmisteluun kuluvaa aikaa mutta säilyttää silti mahdollisuus tehdä viimeinen käsittely omien vaatimusten mukaan. Kun osa työvaiheista on tehty valmiiksi, vastaanoton ja valmistuksen välinen läpimeno nopeutuu käytännössä selvästi, mikä helpottaa etenkin ruuhkahuippuja. Samalla työn ennustettavuus paranee, koska henkilöstön työaikaa ei kulu yhtä paljon vaihteleviin esikäsittelytehtäviin.",
        "Filee on monessa tapauksessa tehokkain ratkaisu silloin, kun tuotetta käytetään suoraan annosvalmistukseen, palvelulinjastoon tai kuluttajapakkausten kaltaisiin prosesseihin, joissa tasalaatuisuus ja nopeus korostuvat. Fileemuoto vähentää vaiheita, joissa laatu voi vaihdella käsittelijän mukaan, ja tukee näin tasaisempaa lopputulosta. Kun käyttö on suoraa ja volyymit toistuvia, filee voi parantaa myös suunnittelun tarkkuutta koko viikon tuotanto-ohjelmassa.",
        "Käytännössä oikea tuotemuoto ei synny pelkästään tuotteen ominaisuuksien perusteella, vaan valinta kannattaa tehdä suhteessa keittiön tai tuotannon kapasiteettiin, henkilöstöresursseihin, varastointimahdollisuuksiin ja toimitusrytmiin. Jos vastaanotto tapahtuu tiheästi ja pienissä erissä, painotukset ovat erilaiset kuin harvemmilla mutta suuremmilla toimituksilla. Siksi sama ratkaisu ei toimi kaikille, vaikka raaka-aine olisi sama.",
        "Hävikin hallinta on yksi tärkeimmistä näkökulmista tuotemuodon valinnassa. Kun käsittelyvaiheita on liikaa suhteessa käytettävissä olevaan aikaan, riskinä on helposti laadun heikkeneminen, ylipitkät säilytysajat tai epätasainen käyttö eri erien välillä. Oikein valittu tuotemuoto auttaa pitämään materiaalivirran hallittuna, jolloin myös kustannusten seuranta ja ennustaminen muuttuvat arjessa huomattavasti helpommiksi.",
        "Myös henkilöstön osaamisprofiili kannattaa ottaa aidosti mukaan päätökseen. Jos tiimissä on vahvaa käsityöosaamista kalan jatkokäsittelyyn, kokonainen tai osittain käsitelty tuote voi olla järkevä vaihtoehto. Jos taas tavoitteena on minimoida vaihtelu työvuorojen välillä ja varmistaa mahdollisimman tasainen suoritus kiireessä, pitkälle esikäsitelty tuotemuoto voi tukea toimintaa paremmin.",
        "Varastotilan määrä, kylmäkapasiteetti ja sisäinen logistiikka vaikuttavat siihen, mikä malli on pitkällä aikavälillä käytännöllinen. Päätös, joka näyttää paperilla kustannustehokkaalta, voi arjessa lisätä pullonkauloja, jos vastaanoton, varastoinnin ja valmistuksen välinen ketju ei toimi saumattomasti. Siksi tuotemuotoa kannattaa tarkastella osana koko toimintamallia, ei yksittäisenä hankintapäätöksenä.",
        "Paras lopputulos saavutetaan yleensä yhteistyöllä, jossa toimittaja ja asiakas käyvät avoimesti läpi käytännön tarpeet, kausivaihtelut ja realistiset laatutavoitteet. Kun valinta tehdään yhdessä ja sitä arvioidaan säännöllisesti kokemusten perusteella, tuotemuoto voidaan sovittaa paremmin todelliseen käyttöön. Tämä vähentää turhia kompromisseja ja rakentaa mallin, joka tukee sekä laatua että kustannustehokkuutta myös pidemmällä aikavälillä.",
      ],
      sv: [
        "Hel fisk passar ofta när vidareförädling sker i kundens egen process.",
        "Rensad fisk minskar förberedelsetid och kan jämna ut arbetsflödet under intensiva perioder.",
        "Filé är ett effektivt val när produkten ska användas direkt i portionshantering eller konsumentförpackning.",
        "Valet bör göras utifrån kökets eller produktionens kapacitet, svinnmål och leveransrytm.",
        "Vid val av produktform är det bra att även beakta lagringsutrymme och personalens kompetens. Rätt val kan förenkla det dagliga arbetet avsevärt.",
        "Gemensam planering med leverantören hjälper ofta att hitta en modell som stödjer både kvalitet och kostnadseffektivitet.",
      ],
      en: [
        "Whole fish is often suitable when downstream processing is handled by the customer.",
        "Gutted fish reduces preparation time and can smooth workflows during busy periods.",
        "Fillets are efficient when product is needed directly for portioning or consumer packaging.",
        "The best choice should align with kitchen or production capacity, waste targets, and delivery rhythm.",
        "When selecting product form, storage space and staff capabilities should also be considered. The right choice can simplify daily operations significantly.",
        "Joint planning with the supplier helps identify a model that supports both quality and cost efficiency.",
      ],
    },
  },
  {
    slug: "fish-storage-checklist-for-professional-kitchens",
    publishedAt: "2025-04-28",
    readingTimeMinutes: 7,
    category: {
      fi: "Keittiö",
      sv: "Kök",
      en: "Kitchen",
    },
    title: {
      fi: "Kalan säilytyksen muistilista ammattikeittiöille",
      sv: "Checklista för fiskförvaring i professionella kök",
      en: "Fish storage checklist for professional kitchens",
    },
    excerpt: {
      fi: "Selkeä säilytysmalli auttaa pitämään laadun tasaisena ja vähentämään hävikkiä kiireessäkin.",
      sv: "En tydlig förvaringsmodell hjälper till att hålla jämn kvalitet och minska svinn även under hög belastning.",
      en: "A clear storage model helps maintain consistent quality and reduce waste even during peak hours.",
    },
    intro: {
      fi: "Säilytys on yksi helpoimmista tavoista vaikuttaa kalan laatuun. Jo pienet toimintatapamuutokset voivat parantaa käyttöastetta merkittävästi.",
      sv: "Förvaring är ett av de enklaste sätten att påverka fiskens kvalitet. Små förändringar i arbetssätt kan ge stor effekt.",
      en: "Storage is one of the easiest ways to influence fish quality. Small operational changes can make a significant difference.",
    },
    body: {
      fi: [
        "Pidä vastaanottoalueen lämpötilaseuranta yksinkertaisena ja toistettavana, jotta poikkeamat huomataan heti.",
        "Käytä FIFO-periaatetta (first in, first out), jotta vanhemmat erät eivät jää uusien alle.",
        "Merkitse avatuille pakkauksille selkeä avaamisaika ja suunniteltu käyttöaika.",
        "Yhtenäinen säilytysmalli tekee arjesta ennakoitavaa ja vähentää turhaa hävikkiä.",
        "Säilytystilojen päivittäinen tarkistusrutiini helpottaa laatupoikkeamien ennaltaehkäisyä.",
        "Kun vastuut on nimetty selkeästi, käytännöt pysyvät yhtenäisinä myös kiireisinä päivinä.",
      ],
      sv: [
        "Håll temperaturuppföljningen i mottagningen enkel och konsekvent så att avvikelser upptäcks direkt.",
        "Använd FIFO-principen (first in, first out) så att äldre partier inte blir liggande.",
        "Märk öppnade förpackningar med tydlig öppningstid och planerad användningstid.",
        "En enhetlig förvaringsmodell gör vardagen mer förutsägbar och minskar onödigt svinn.",
        "En daglig kontrollrutin för lagringsutrymmen hjälper till att förebygga kvalitetsavvikelser.",
        "När ansvar är tydligt fördelat hålls rutinerna enhetliga även under intensiva dagar.",
      ],
      en: [
        "Keep receiving temperature checks simple and repeatable so deviations are detected immediately.",
        "Apply FIFO (first in, first out) so older batches are not left behind.",
        "Label opened packages clearly with opening time and planned use window.",
        "A consistent storage model improves predictability and reduces unnecessary waste.",
        "A daily checklist for storage areas helps prevent quality deviations before they occur.",
        "When responsibilities are clearly assigned, routines stay consistent even on high-pressure days.",
      ],
    },
  },
] as const;

export const blogPostSlugs = blogPosts.map((post) => post.slug);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getLocalizedBlogPost(post: BlogPost, lang: Language) {
  return {
    ...post,
    category: post.category[lang],
    title: post.title[lang],
    excerpt: post.excerpt[lang],
    intro: post.intro[lang],
    body: post.body[lang],
  };
}

export function getBlogStaticParams() {
  return blogPostSlugs.flatMap((slug) => languages.map((lang) => ({ lang, slug })));
}

export function formatBlogDate(lang: Language, dateIso: string) {
  const localeByLang: Record<Language, string> = {
    fi: "fi-FI",
    sv: "sv-FI",
    en: "en-GB",
  };

  return new Intl.DateTimeFormat(localeByLang[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateIso));
}
