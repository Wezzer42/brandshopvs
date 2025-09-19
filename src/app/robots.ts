import type { MetadataRoute } from "next";

const RAW = process.env.NEXT_PUBLIC_SITE_URL || "https://brandshop.online";
const BASE = RAW.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}