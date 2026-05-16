import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { getLocalizedPath, languages, routeSlugs } from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const siteUpdatedAt = new Date(site.updatedAt);
  const indexableRouteSlugs = routeSlugs.filter(
    (slug) => !["privacy", "terms", "cookies", "code-of-conduct"].includes(slug),
  );
  const latestBlogUpdate = blogPosts.reduce(
    (latest, post) => (post.publishedAt > latest ? post.publishedAt : latest),
    site.updatedAt.slice(0, 10),
  );

  for (const lang of languages) {
    for (const slug of indexableRouteSlugs) {
      const path = getLocalizedPath(lang, slug);
      const url = new URL(path, site.url).toString();
      const lastModified = slug === "blog" ? new Date(latestBlogUpdate) : siteUpdatedAt;

      entries.push({
        url,
        lastModified,
      });
    }

    for (const blogPost of blogPosts) {
      const path = getLocalizedPath(lang, `blog/${blogPost.slug}`);
      const url = new URL(path, site.url).toString();
      entries.push({
        url,
        lastModified: new Date(blogPost.publishedAt),
      });
    }
  }
  return entries;
}
