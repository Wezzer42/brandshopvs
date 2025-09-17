import type { MetadataRoute } from "next";


const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://valenti.shop";


export default function sitemap(): MetadataRoute.Sitemap {
const routes = ["/", "/#catalog", "/#how", "/#shipping", "/#faq"].map(
(path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date() })
);
return routes;
}