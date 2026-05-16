import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getBlogStaticParams,
  getLocalizedBlogPost,
} from "@/lib/blog";
import { blogImages } from "@/lib/blog-images";
import { buildPageMetadata } from "@/lib/seo";
import { getCanonicalUrl, isLanguage } from "@/lib/i18n";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLanguage(lang)) {
    return {};
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const localizedPost = getLocalizedBlogPost(post, lang);
  const image = blogImages[slug as keyof typeof blogImages];

  return buildPageMetadata({
    lang,
    slug: `blog/${slug}`,
    title: `${localizedPost.title} | M.A.T-Fish`,
    description: localizedPost.intro,
    imageUrl: image.src,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const localizedPost = getLocalizedBlogPost(post, lang);
  const publishedAt = formatBlogDate(lang, post.publishedAt);
  const image = blogImages[slug as keyof typeof blogImages];
  const absoluteImageUrl = new URL(image.src, site.url).toString();
  const canonicalUrl = getCanonicalUrl(lang, `blog/${slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: localizedPost.title,
        description: localizedPost.excerpt,
        image: [absoluteImageUrl],
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        inLanguage: lang,
        mainEntityOfPage: canonicalUrl,
        author: {
          "@id": `${site.url}#organization`,
        },
        publisher: {
          "@id": `${site.url}#organization`,
        },
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
            name: lang === "fi" ? "Blogi" : lang === "sv" ? "Blogg" : "Blog",
            item: getCanonicalUrl(lang, "blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: localizedPost.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="bg-white pb-20 md:pb-24 lg:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="relative h-[38vh] min-h-[20rem] overflow-hidden bg-brand-900 md:h-[48vh]">
        <Image src={image} alt={localizedPost.title} fill priority unoptimized className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,40,63,0.46),rgba(16,40,63,0.18)_44%,rgba(16,40,63,0.58))]" />

        <div className="site-container relative flex h-full items-end pb-10 md:pb-14">
          <div className="max-w-4xl text-white">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-blue-100">
              {localizedPost.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {localizedPost.title}
            </h1>
            <p className="mt-4 text-sm text-blue-100">
              {publishedAt} · {post.readingTimeMinutes} min
            </p>
          </div>
        </div>
      </div>

      <div className="site-container max-w-3xl pt-10 md:pt-14">
        <p className="text-lg leading-relaxed text-slate-600 md:text-xl">{localizedPost.intro}</p>

        <div className="mt-8 space-y-5 border-t border-brand-200 pt-8">
          {localizedPost.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-slate-700 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
