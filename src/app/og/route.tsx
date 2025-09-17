import { ImageResponse } from "next/og";


export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const base = `${url.protocol}//${url.host}`;

  // Тексты
  const title = (url.searchParams.get("t") ?? "Brand Shop").slice(0, 80);
  const s1 = url.searchParams.get("s1") ?? ">1000 довольных покупателей уже убедились - с нами экономить легко";
  const s2 = url.searchParams.get("s2") ?? "Низкие цены на твои любимые оригиналы";
  const s3 = url.searchParams.get("s3") ?? "Доставка по РФ и странам";

  // Картинка справа (абсолютный URL обязателен)
  const rawImg = url.searchParams.get("img") ?? "/og/sneaker.png";
  const img = rawImg.startsWith("http") ? rawImg : new URL(rawImg, base).toString();

  // Цвета
  const bg1 = url.searchParams.get("bg1") ?? "#ffffff";
  const bg2 = url.searchParams.get("bg2") ?? "#2dd4bf";
  const accent = url.searchParams.get("accent") ?? "#0ea5a4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          padding: 48,
          background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
        }}
      >
        {/* мягкие пятна для глубины */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 60% at 20% 20%, rgba(14,165,164,.10), transparent 60%)," +
              "radial-gradient(55% 55% at 85% 85%, rgba(45,212,191,.12), transparent 60%)",
          }}
        />

        {/* левая колонка */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, width: 720 }}>
          {/* заголовок Cherry Cream Soda */}
          <div
            style={{
              fontWeight: 800,
              fontSize: 120,
              lineHeight: 0.95,
              letterSpacing: -2,
              color: "#0f172a",
              textShadow: "0 1px 0 rgba(255,255,255,.6), 0 14px 30px rgba(0,0,0,.06)",
            }}
          >
            {title}
          </div>

          {/* подчеркивание */}
          <div style={{ width: 380, height: 6, borderRadius: 999, background: accent }} />

          {/* три «пилюли» со слоганами (Noto Sans если положен, иначе системный) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[s1, s2, s3].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontWeight: 600,
                  fontSize: 34,
                  lineHeight: 1.25,
                  color: "#0f172a",
                  padding: "12px 16px",
                  borderRadius: 16,
                  border: "1px solid rgba(15,23,42,.08)",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: 9999, background: accent }} />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* кроссовок справа */}
        <div style={{ position: "absolute", right: 40, top: 40, bottom: 40, width: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: 9999,
              background: "radial-gradient(circle at 50% 50%, rgba(20,184,166,.28), transparent 60%)",
              filter: "blur(2px)",
            }}
          />
          <img
            src={img}
            width={540}
            height={540}
            style={{ objectFit: "contain", transform: "rotate(-10deg)", filter: "drop-shadow(0 25px 50px rgba(0,0,0,.25))" }}
          />
        </div>

        {/* внутренняя рамка */}
        <div style={{ position: "absolute", inset: 24, borderRadius: 24, border: "2px solid rgba(15,23,42,.06)" }} />
      </div>
    ),
    { ...size }
  );
}