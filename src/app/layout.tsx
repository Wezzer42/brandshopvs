import type { Metadata } from "next";
import "./globals.css";


const SITE_NAME = "Brand Shop"; // поменяй
const SITE_URL = "https://brandshopvs.online"; // поменяй на свой домен
const TG_USERNAME = "brendshopVS"; // t.me/<имя>


export const metadata: Metadata = {
title: `${SITE_NAME} — Брендовая одежда из Китая, Кореи и США | Telegram магазин`,
description:
"Оригинальные бренды из Китая, Кореи и США под заказ. Быстрая доставка, проверка качества, удобный заказ через Telegram.",
metadataBase: new URL(SITE_URL),
openGraph: {
title: `${SITE_NAME} — Брендовая одежда из Китая, Кореи и США`,
description:
"Оригинальные бренды из Китая, Кореи, США под заказ. Быстрая доставка, проверка качества, удобный заказ через Telegram.",
url: SITE_URL,
siteName: SITE_NAME,
images: [
{ url: "/og", width: 1200, height: 630, alt: SITE_NAME },
],
locale: "ru_RU",
type: "website",
},
manifest: "/manifest.json",
icons: [
  { rel: "icon", url: "/icon.png" },
  { rel: "apple-touch-icon", url: "/apple-icon.png", sizes: "180x180" },
  { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#ec4899" }
],
};


export default function RootLayout({
children,
}: Readonly<{ children: React.ReactNode }>) {
const jsonLd = {
"@context": "https://schema.org",
"@type": "Store",
name: SITE_NAME,
url: SITE_URL,
sameAs: [`https://t.me/${TG_USERNAME}`],
image: `${SITE_URL}/og`,
address: {
"@type": "PostalAddress",
addressCountry: "RU",
},
openingHours: "24/7",
};


return (
<html lang="ru">
<body className="min-h-screen antialiased">
        {/* Фоновая картинка на весь сайт */}
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-[url('/bg/shop.avif')] bg-cover bg-center opacity-25"
        />
{/* Plausible/Umami можно вставить здесь при необходимости */}
<script
type="application/ld+json"
suppressHydrationWarning
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
{children}
</body>
</html>
);
}