/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(req: Request) {
  const { origin } = new URL(req.url);
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, ""); // "" или "/base"

  // безопасный фетч из /public, не валим рендер на 404
  async function ab(path: string) {
    const u = `${origin}${basePath}${path}`;
    const r = await fetch(u);
    return r.ok ? r.arrayBuffer() : undefined;
  }

  // ШРИФТЫ (TTF/WOFF — НЕ woff2)
  const [cherry, noto] = await Promise.all([
    ab("/og/fonts/CherryCreamSoda-Regular.ttf"),
    ab("/og/fonts/NotoSans-SemiBold.ttf"), // опционально
  ]);

  const fonts =
    [
      cherry && { name: "Cherry", data: cherry, weight: 400 as const, style: "normal" as const },
      noto   && { name: "Noto",   data: noto,   weight: 600 as const, style: "normal" as const },
    ].filter(Boolean) as NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];

  // Тексты
  const url = new URL(req.url);
  const title = (url.searchParams.get("t") ?? "Brand Shop").slice(0, 80);
  const s1 = url.searchParams.get("s1") ?? ">1000 довольных покупателей уже убедились — с нами экономить легко";
  const s2 = url.searchParams.get("s2") ?? "Низкие цены на твои любимые оригиналы";
  const s3 = url.searchParams.get("s3") ?? "Доставка по РФ и странам СНГ";
  const tg = url.searchParams.get("tg") ?? "t.me/brendshopVS";
  const badge = url.searchParams.get("badge") ?? "🔥ВАУ";

  // Ассеты из /public c учётом basePath
  const rawImg  = url.searchParams.get("img")  ?? "/og/sneaker.png";
  const rawLogo = url.searchParams.get("logo") ?? "/og/logo.png";
  const img  = rawImg.startsWith("http")  ? rawImg  : `${origin}${basePath}${rawImg}`;
  const logo = rawLogo.startsWith("http") ? rawLogo : `${origin}${basePath}${rawLogo}`;

  // Цвета
  const bg1 = url.searchParams.get("bg1") ?? "#ffffff";
  const bg2 = url.searchParams.get("bg2") ?? "#34d399";
  const accent = url.searchParams.get("accent") ?? "#0ea5a4";

  // Фолбэки для fontFamily, если шрифт не загрузился
  const cherryFF = cherry ? "Cherry" : "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
  const notoFF   = noto   ? "Noto"   : "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", padding: 56, background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)` }}>
        {/* глоу-пятна */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 18% 20%, rgba(16,185,129,.12), transparent 60%),radial-gradient(55% 55% at 88% 82%, rgba(45,212,191,.14), transparent 60%)" }} />
        {/* лёгкий grain */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, mixBlendMode: "multiply",
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.6) 0 1px, transparent 1px 2px),repeating-linear-gradient(90deg, rgba(0,0,0,.4) 0 1px, transparent 1px 2px)" }} />
        {/* сетка */}
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 320, height: 320, opacity: 0.12, display: "flex" }}>
          <div style={{ width: "100%", height: "100%", display: "flex",
            backgroundImage: "linear-gradient(rgba(15,23,42,.18) 1px, transparent 1px),linear-gradient(90deg, rgba(15,23,42,.18) 1px, transparent 1px)",
            backgroundSize: "24px 24px" }} />
        </div>
        {/* логотип */}
        <div style={{ position: "absolute", left: 24, top: 24, width: 56, height: 56, borderRadius: 9999, background: "rgba(15,23,42,.08)",
          border: "1px solid rgba(15,23,42,.12)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
          <img src={logo} alt="" width={40} height={40} style={{ objectFit: "contain", display: "flex" }} />
        </div>

        {/* ДВЕ КОЛОНКИ */}
        <div style={{ display: "flex", gap: 32, width: "100%", height: "100%" }}>
          {/* ЛЕВАЯ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 640 }}>
            <div style={{ fontFamily: cherryFF, fontWeight: 400, fontSize: 96, lineHeight: 0.9, letterSpacing: -1, color: "#0f172a",
              textShadow: "0 1px 0 rgba(255,255,255,.6), 0 12px 24px rgba(0,0,0,.06)" }}>
              {title}
            </div>
            <div style={{ marginTop: 2, width: 360, height: 6, borderRadius: 999, background: accent }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[s1, s2, s3].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: notoFF, fontWeight: 600, fontSize: 30, lineHeight: 1.25,
                  color: "#0f172a", textShadow: "0 1px 0 rgba(255,255,255,.45)", maxWidth: 600, wordBreak: "break-word" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginTop: 6 }}>
                    <circle cx="12" cy="12" r="10" fill="none" stroke={accent} strokeWidth="2" />
                    <path d="M7 12l3 3 7-7" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ПРАВАЯ */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flex: 1, minWidth: 0 }}>
            {/* облако-бейдж */}
            <div style={{ position: "absolute", right: 18, top: 6, width: 180, height: 130, display: "flex", alignItems: "center", justifyContent: "center",
              filter: "drop-shadow(0 12px 28px rgba(244,63,94,.35))" }}>
              <svg width="180" height="130" viewBox="0 0 180 130" style={{ position: "absolute", inset: 0, display: "flex" }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="burst" cx="50%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="#ff7a90" />
                    <stop offset="60%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </radialGradient>
                </defs>
                <polygon
                  points="90,5 108,22 134,12 142,38 170,40 152,62 172,78 144,88 150,116 120,108 110,125 90,110 70,125 60,108 30,116 36,88 8,78 28,62 10,40 38,38 46,12 72,22"
                  fill="url(#burst)" stroke="rgba(0,0,0,.18)" strokeWidth="2"
                />
              </svg>
              <div style={{ fontFamily: notoFF, fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: 1, display: "flex",
                alignItems: "center", justifyContent: "center", paddingTop: 6 }}>
                {badge}
              </div>
            </div>

            {/* streaks */}
            <div style={{ position: "absolute", right: 260, top: 40, width: 180, height: 8, borderRadius: 999,
              background: "linear-gradient(90deg, rgba(14,165,164,0), rgba(14,165,164,.35))", transform: "rotate(-12deg)", display: "flex", opacity: 0.8 }} />
            <div style={{ position: "absolute", right: 220, top: 90, width: 220, height: 6, borderRadius: 999,
              background: "linear-gradient(90deg, rgba(20,184,166,0), rgba(20,184,166,.3))", transform: "rotate(-12deg)", display: "flex", opacity: 0.8 }} />

            {/* glow */}
            <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 9999,
              background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,.34), transparent 62%)", filter: "blur(2px)" }} />

            {/* кроссовок */}
            <img src={img} alt="" width={480} height={480}
              style={{ objectFit: "contain", transform: "rotate(-10deg)",
                filter: "brightness(1.12) saturate(1.25) contrast(1.1) drop-shadow(0 28px 56px rgba(0,0,0,.34))", display: "flex" }} />
          </div>
        </div>

        {/* нижняя полоса */}
        <div style={{ position: "absolute", left: 56, right: 56, bottom: 28, height: 48, borderRadius: 12,
          background: "rgba(255,255,255,.52)", border: "1px solid rgba(15,23,42,.08)", display: "flex",
          alignItems: "center", justifyContent: "flex-start", padding: "0 14px", backdropFilter: "blur(6px)" }}>
          <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#22c55e", marginRight: 8, display: "flex" }} />
          <span style={{ fontFamily: notoFF, fontWeight: 600, fontSize: 20, color: "#0f172a" }}>{tg}</span>
        </div>
      </div>
    ),
    { ...size, fonts, headers: { "Content-Type": contentType } }
  );
}
