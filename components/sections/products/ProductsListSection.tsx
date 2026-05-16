import Image from "next/image";
import productMatiImage from "@/src/images/oceanic/products/product-mati.webp";
import productRainbowTroutImage from "@/src/images/oceanic/products/product-kirjolohi.webp";
import productWhitefishImage from "@/src/images/oceanic/products/product-siika.webp";
import { type Dictionary, type Language } from "@/lib/i18n";

interface ProductsListSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

const productTaglines = {
  fi: {
    rainbowTrout: "Suomen suosituin ruokakala.",
    whitefish: "Hienostunut pohjoismainen klassikko.",
    caviar: "Sesonkiherkku syksysta talveen.",
  },
  sv: {
    rainbowTrout: "Finlands mest omtyckta matfisk.",
    whitefish: "En elegant nordisk klassiker.",
    caviar: "En sasongsdelikatess fran host till vinter.",
  },
  en: {
    rainbowTrout: "Finland's most loved food fish.",
    whitefish: "An elegant Nordic classic.",
    caviar: "A seasonal delicacy from autumn to winter.",
  },
} as const;

export default function ProductsListSection({ lang, dictionary }: ProductsListSectionProps) {
  const taglines = productTaglines[lang];
  const products = [
    {
      id: "rainbow-trout",
      name: dictionary.products.rainbowTrout.name,
      tagline: taglines.rainbowTrout,
      details: dictionary.products.rainbowTrout.details,
      image: productRainbowTroutImage,
    },
    {
      id: "whitefish",
      name: dictionary.products.whitefish.name,
      tagline: taglines.whitefish,
      details: dictionary.products.whitefish.details,
      image: productWhitefishImage,
    },
    {
      id: "caviar",
      name: dictionary.products.caviar.name,
      tagline: taglines.caviar,
      details: dictionary.products.caviar.details,
      image: productMatiImage,
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24 lg:py-32">
      <div className="site-container">
        <div className="space-y-24 lg:space-y-32">
          {products.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              <div className={[
                "lg:col-span-8",
                index % 2 === 1 ? "lg:order-2" : "",
              ].join(" ")}>
                <div className="aspect-[5/4] overflow-hidden rounded-md bg-brand-50 lg:aspect-[16/10]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
              </div>

              <div className="lg:col-span-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  0{index + 1} / 0{products.length}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-[3.6rem]">
                  {product.name}
                </h2>
                <p className="mt-4 max-w-sm text-lg leading-snug text-slate-500 md:text-[1.4rem]">
                  {product.tagline}
                </p>
                <p className="mt-6 text-[0.98rem] leading-relaxed text-slate-700 md:text-base">
                  {product.details}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
