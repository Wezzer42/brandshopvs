import type { MetadataRoute } from "next";

const RAW = process.env.NEXT_PUBLIC_SITE_URL || "https://brandshop.online";
// нормализуем без завершающего слеша
const BASE = RAW.replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,                 // только страницы, никаких #якорей
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    // добавишь отдельные реальные страницы вида /catalog, /shipping, /faq — добавь их тут
  ];
}
