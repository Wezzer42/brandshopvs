"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Truck, CreditCard, ShieldCheck } from "lucide-react";
import type { Variants } from "framer-motion";
import { track } from "@vercel/analytics";

const TG_USERNAME = "brendshopVS"; // t.me/<имя>
const TG_DEEP_LINK = (slug?: string) => `https://t.me/${TG_USERNAME}?start=${encodeURIComponent(slug || "hello")}`;
type Bezier = [number, number, number, number];
const easeBezier: Bezier = [0.22, 0.8, 0.35, 1];
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeBezier, // ← тут больше не number[]
    },
  },
};

function Header() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      {/* Прогресс‑бар скролла с градиентом */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400"
      />

      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#home" className="font-semibold tracking-tight">Brand Shop</a>
          <nav className="hidden gap-6 md:flex text-sm">
            <a href="#how" className="hover:text-fuchsia-700">Как заказать</a>
            <a href="#shipping" className="hover:text-fuchsia-700">Доставка</a>
            <a href="#faq" className="hover:text-fuchsia-700">FAQ</a>
            <a href="#reviews" className="hover:text-fuchsia-700">Отзывы</a>
          </nav>
          {/* Кнопка с неон‑свечением */}
          <a
            href={`https://t.me/${TG_USERNAME}`}
            onClick={() => track("tg_click", { placement: "hero" })}
            target="_blank"
            className="relative inline-flex items-center justify-center rounded-full px-4 py-2 text-white transition focus:outline-none"
          >
            <span className="absolute -inset-px rounded-full opacity-80 blur-sm bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400" />
            <span className="relative rounded-full bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 px-4 py-2 drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]">Telegram</span>
          </a>
        </div>
      </header>
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden grid-bg"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        ref.current?.style.setProperty("--x", `${x}%`);
        ref.current?.style.setProperty("--y", `${y}%`);
      }}
    >
      {/* Градиентные "пятна" + плавная анимация */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      {/* Световой спот за курсором */}
      <div className="spotlight relative z-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 bg-clip-text text-transparent">Брендовая одежда</span> из Китая с доставкой в Россию
            </h1>
            <p className="mb-6 text-lg text-neutral-700">Оригинальные позиции и топ‑качество. Проверка перед отправкой, честные цены, заказ в один клик в Telegram.</p>
            <ul className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-600">
              <li>✔ Проверка качества</li>
              <li>✔ Фото/видео перед оплатой</li>
            </ul>

            {/* CTA кнопки */}
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={TG_DEEP_LINK("catalog")}
                onClick={() => track("tg_click", { placement: "header" })}
                target="_blank"
                className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-white"
              >
                <span className="absolute -inset-px rounded-full opacity-80 blur-sm bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400" />
                <span className="relative rounded-full bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 px-6 py-3">Открыть каталог</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#how"
                className="rounded-full border px-6 py-3 transition hover:bg-neutral-50"
              >
                Как заказать
              </motion.a>
            </div>
          </motion.div>

          {/* Превью с мягким параллакс‑свечением */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeBezier }}
            className="relative"
          >
           <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
  <Image
    src="/hero.jpg"
    alt="Коллаж одежды"
    fill
    className="object-cover"
    // перья по краям (толщина управляется --feather)
    style={{
      // толщина размытия от края (подбери: 24–60px)
      ['--feather' as any]: '36px',

      // две маски: сверху/снизу и слева/справа
      WebkitMaskImage:
        `linear-gradient(to bottom, transparent 0, black var(--feather), black calc(100% - var(--feather)), transparent 100%),
         linear-gradient(to right,  transparent 0, black var(--feather), black calc(100% - var(--feather)), transparent 100%)`,
      maskImage:
        `linear-gradient(to bottom, transparent 0, black var(--feather), black calc(100% - var(--feather)), transparent 100%),
         linear-gradient(to right,  transparent 0, black var(--feather), black calc(100% - var(--feather)), transparent 100%)`,

      // пересечение масок (для WebKit и стандарта)
      WebkitMaskComposite: 'source-in',
      maskComposite: 'intersect',
    }}
    priority
  />

  {/* если хочется лёгкую виньетку — это уже поверх, не вместо маски */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.06)_100%)]"/>
</div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const [copied, setCopied] = useState(false);
  const user = `@${TG_USERNAME}`;
  return (
    <section id="how" className="relative">
      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Как заказать</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Напиши нам, мы подберем товар под твой запрос.", "Получишь фото/видео и финальную цену с доставкой.", "Оплати. Мы отправим и пришлём трек‑номер."].map((text, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="relative rounded-2xl p-[1px]"
            >
              <div className="absolute inset-0 rounded-2xl opacity-80 blur-sm bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400" />
              <div className="relative rounded-2xl border bg-white p-5 shadow-sm">{text}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <motion.a whileHover={{ y: -1 }} href={`https://t.me/${TG_USERNAME}`} onClick={() => track("tg_click", { placement: "how" })} target="_blank" className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-white">
            <span className="absolute -inset-px rounded-full opacity-80 blur-sm bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400" />
            <span className="relative rounded-full bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 px-6 py-3">Написать в Telegram</span>
          </motion.a>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(user);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
              track("tg_copy", { placement: "how" });
            }}
            className="rounded-full border px-6 py-3 transition hover:bg-neutral-50"
          >
            Скопировать {user} {copied && "✓"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Shipping() {
  const cards = [
    { icon: Truck, title: "Доставка", text: "По России 12–21 день. Международная — по запросу." },
    { icon: CreditCard, title: "Оплата", text: "Перевод, карты. Инвойс по запросу." },
    { icon: ShieldCheck, title: "Гарантии", text: "Фото/видео перед отправкой." },
  ];
  return (
    <section id="shipping" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Доставка</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="rounded-2xl border p-6 shadow-sm transition hover:shadow-md bg-white"
          >
            <Icon className="mb-2 h-6 w-6 text-fuchsia-700" />
            <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
            <p className="text-neutral-600">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Это оригинал?", a: "Мы работаем с проверенными поставщиками. По запросу присылаем фото/видео, чеки и маркировку." },
    { q: "Сколько идёт заказ?", a: "Обычно 12–21 дней. Уточняем сроки под позицию." },
    { q: "Можно примерить?", a: "Делаем замеры и фото на рост/вес." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">FAQ</h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full cursor-pointer select-none px-5 py-4 text-left text-lg font-medium">
                {it.q}
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 text-neutral-700"
              >
                <div className="pt-1">{it.a}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-rose-50 to-white p-8 text-center shadow-sm"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.28),transparent_60%)] blur-2xl" />
        <h2 className="mb-3 text-3xl font-bold tracking-tight">Готов подобрать идеальный образ?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-neutral-700">Напиши нам в Telegram — ответим быстро, уточним наличие и сделаем персональный сет.</p>
        <motion.a whileHover={{ y: -1 }} href={`https://t.me/${TG_USERNAME}`} onClick={() => track("tg_click", { placement: "CTA" })} target="_blank" className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-white">
          <span className="absolute -inset-px rounded-full opacity-80 blur-sm bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400" />
          <span className="relative rounded-full bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 px-6 py-3">Написать в Telegram</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

function Reviews() {
  const shots = [
    { src: "/reviews/1.jpg"},
    { src: "/reviews/2.jpg"},
    { src: "/reviews/3.jpg"},
    { src: "/reviews/4.jpg"},
    { src: "/reviews/5.jpg"},
    { src: "/reviews/6.jpg"},
    { src: "/reviews/7.jpg"},

  ];

  return (
    <section id="reviews" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Отзывы клиентов</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* 1) Polaroid */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const }}
            className="select-none"
          >
            <div className="relative aspect-[4/5] rounded-md bg-white p-3 shadow-lg ring-1 ring-black/5 rotate-[-1.5deg]">
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image src={shots[0].src} alt="" fill className="object-cover" />
              </div>
            </div>
          </motion.figure>

          {/* 2) Градиентная рамка */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const, delay: 0.05 }}
            className="select-none"
          >
            <div className="relative rounded-2xl p-[2px]">
              <div className="absolute -inset-px rounded-2xl opacity-80 blur-sm bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400" />
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[4/5]">
                  <Image src={shots[1].src} alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
          </motion.figure>

          {/* 3) «Стекло» с ленточками‑скотчем */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const, delay: 0.1 }}
            className="relative select-none"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 backdrop-blur">
              <div className="relative aspect-[4/5]">
                <Image src={shots[2].src} alt="" fill className="object-cover" />
              </div>
            </div>
            {/* Скотч */}
            <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-16 rotate-[-12deg] bg-amber-200/80" />
            <div className="pointer-events-none absolute -right-2 -bottom-2 h-8 w-16 rotate-[12deg] bg-rose-200/80" />
          </motion.figure>

          {/* 4) Смещённая тень (offset) */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const, delay: 0.15 }}
            className="select-none"
          >
            <div className="relative">
              <div className="absolute left-2 top-2 h-full w-full rounded-xl bg-rose-100" />
              <div className="relative overflow-hidden rounded-xl border-2 border-neutral-200 bg-white">
                <div className="relative aspect-[4/5]">
                  <Image src={shots[3].src} alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
          </motion.figure>

          {/* 2) Градиентная рамка */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const, delay: 0.05 }}
            className="select-none"
          >
            <div className="relative rounded-2xl p-[2px]">
              <div className="absolute -inset-px rounded-2xl opacity-80 blur-sm bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400" />
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[4/5]">
                  <Image src={shots[4].src} alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
          </motion.figure>

          {/* 3) «Стекло» с ленточками‑скотчем */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const, delay: 0.1 }}
            className="relative select-none"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 backdrop-blur">
              <div className="relative aspect-[4/5]">
                <Image src={shots[5].src} alt="" fill className="object-cover" />
              </div>
            </div>
            {/* Скотч */}
            <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-16 rotate-[-12deg] bg-amber-200/80" />
            <div className="pointer-events-none absolute -right-2 -bottom-2 h-8 w-16 rotate-[12deg] bg-rose-200/80" />
          </motion.figure>

          {/* 4) Смещённая тень (offset) */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.35, 1] as const, delay: 0.15 }}
            className="select-none"
          >
            <div className="relative">
              <div className="absolute left-2 top-2 h-full w-full rounded-xl bg-rose-100" />
              <div className="relative overflow-hidden rounded-xl border-2 border-neutral-200 bg-white">
                <div className="relative aspect-[4/5]">
                  <Image src={shots[6].src} alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Brand Shop.</p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#shipping" className="hover:underline">Условия доставки</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href={`https://t.me/${TG_USERNAME}`} onClick={() => track("tg_click", { placement: "footer" })} target="_blank" className="hover:underline">Telegram</a>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <HowToOrder />
      <Shipping />
      <FAQ />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
}