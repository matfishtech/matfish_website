import Image from "next/image";
import Link from "next/link";
import productMatiImage from "@/src/images/oceanic/products/product-mati.webp";
import productRainbowTroutImage from "@/src/images/oceanic/products/product-kirjolohi.webp";
import productWhitefishImage from "@/src/images/oceanic/products/product-siika.webp";
import { getLocalizedPath, type Dictionary, type Language } from "@/lib/i18n";

interface ProductsPreviewSectionProps {
  lang: Language;
  dictionary: Dictionary;
}

const copy = {
  fi: {
    title: "Saariston satoa.",
    link: "Kaikki tuotteet",
  },
  sv: {
    title: "Skörd från skärgården.",
    link: "Alla produkter",
  },
  en: {
    title: "Harvest of the archipelago.",
    link: "All products",
  },
} as const;

export default function ProductsPreviewSection({ lang, dictionary }: ProductsPreviewSectionProps) {
  const products = [
    { name: dictionary.products.rainbowTrout.name, image: productRainbowTroutImage },
    { name: dictionary.products.whitefish.name, image: productWhitefishImage },
    { name: dictionary.products.caviar.name, image: productMatiImage },
  ];

  return (
    <section className="border-b border-brand-200/80 bg-white py-20 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              {copy[lang].title}
            </h2>
          </div>

          <Link href={getLocalizedPath(lang, "products")} className="inline-flex w-fit border-b border-slate-900 pb-1 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
            {copy[lang].link}
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {products.map((product) => (
            <Link href={getLocalizedPath(lang, "products")} key={product.name} className="group block">
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-brand-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 100vw"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-[1.8rem] font-semibold text-slate-900">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
