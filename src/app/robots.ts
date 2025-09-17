import type { MetadataRoute } from "next";


const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brandshop.online"; // поменяй
const isProd = process.env.VERCEL_ENV === "production";


export default function robots(): MetadataRoute.Robots {
return isProd
? {
rules: {
userAgent: "*",
allow: "/",
},
sitemap: `${BASE_URL}/sitemap.xml`,
host: BASE_URL,
}
: {
// В превью и деве блокируем индекс
rules: {
userAgent: "*",
disallow: "/",
},
};
}