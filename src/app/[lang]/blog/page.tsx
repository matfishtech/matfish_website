import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, formatBlogDate, getLocalizedBlogPost } from "@/lib/blog";
import { blogImages } from "@/lib/blog-images";
import { buildPageMetadata } from "@/lib/seo";
import { getLocalizedPath, isLanguage } from "@/lib/i18n";

const copy = {
  fi: {
    title: "Blogi",
    description: "Ajankohtaisia uutisia, tuotetietoa ja vastuullisuusteemoja M.A.T-Fishiltä.",
    readMore: "Lue artikkeli",
    minutes: "min lukuaika",
  },
  sv: {
    title: "Blogg",
    description: "Aktuella nyheter, produktinformation och hållbarhet från M.A.T-Fish.",
    readMore: "Läs artikel",
    minutes: "min lästid",
  },
  en: {
    title: "Blog",
    description: "News, product insights, and sustainability updates from M.A.T-Fish.",
    readMore: "Read article",
    minutes: "min read",
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
    slug: "blog",
    title: `${copy[lang].title} | M.A.T-Fish`,
    description: copy[lang].description,
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  return (
    <section className="bg-white py-20 md:py-24 lg:py-28">
      <div className="site-container space-y-12">
        <header className="max-w-4xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">{copy[lang].title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{copy[lang].description}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => {
            const localizedPost = getLocalizedBlogPost(post, lang);
            const publishedAt = formatBlogDate(lang, post.publishedAt);
            const image = blogImages[post.slug as keyof typeof blogImages];

            return (
              <article key={post.slug} className="flex h-full flex-col overflow-hidden border border-brand-200/80 bg-white">
                <div className="aspect-[16/10] overflow-hidden rounded-md bg-brand-50">
                  <Image src={image} alt={localizedPost.title} className="h-full w-full object-cover" sizes="(min-width: 768px) 44vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-700">
                    {localizedPost.category}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">{localizedPost.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{localizedPost.excerpt}</p>
                  <p className="mt-4 text-sm text-slate-500">
                    {publishedAt} · {post.readingTimeMinutes} {copy[lang].minutes}
                  </p>
                  <Link
                    href={getLocalizedPath(lang, `blog/${post.slug}`)}
                    className="mt-auto pt-6 inline-flex w-fit border-b border-slate-900 pb-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900"
                  >
                    {copy[lang].readMore}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
