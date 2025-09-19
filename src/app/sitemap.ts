import type { MetadataRoute } from "next";


const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brandshopvs.online";


export default function sitemap(): MetadataRoute.Sitemap {
const routes = ["/", "/#how", "/#shipping", "/#faq", "/#reviews"].map(
(path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 })
);
return routes;
}