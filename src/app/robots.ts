import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Google-Extended",
    "Bingbot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
