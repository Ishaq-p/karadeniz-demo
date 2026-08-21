"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Fish, Flame, Droplets, ChefHat, UtensilsCrossed, Package2, MapPin, Clock,
  Phone, Star, ChevronRight, Plus, Minus, Check, Lock, ArrowLeft, User,
  Loader2, ClipboardList, CircleCheck, Waves, Anchor, Menu as MenuIcon, Network,
  TrendingUp
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FISH_MENU = [
  { id: "levrek", name: "Levrek", desc: "Marmara açıklarından, günlük av", price: 850, tag: "Günün Balığı" },
  { id: "cupra", name: "Çipura", desc: "Izgara ve fırın için ideal", price: 800, tag: "Günün Balığı" },
  { id: "kalkan", name: "Kalkan", desc: "Mevsimlik, sınırlı stok", price: 2200, tag: "Sınırlı" },
  { id: "barbun", name: "Barbunya", desc: "Kızartma ve tava için birebir", price: 1600, tag: null },
  { id: "lufer", name: "Lüfer", desc: "Sonbahar–kış mevsimi", price: 1400, tag: "Mevsimlik" },
  { id: "istavrit", name: "İstavrit", desc: "Halk balığı, ızgara / tava", price: 450, tag: null },
  { id: "palamut", name: "Palamut", desc: "Ekim–Kasım mevsimi", price: 500, tag: "Mevsimlik" },
  { id: "karides", name: "Jumbo Karides", desc: "Güveç ve ızgaraya uygun", price: 1900, tag: null },
];

const COOKING_METHODS = [
  { id: "izgara", name: "Izgara", icon: Flame, note: "Odun ateşinde" },
  { id: "bugulama", name: "Buğulama", icon: Droplets, note: "Sebzeli, hafif" },
  { id: "firin", name: "Fırında", icon: ChefHat, note: "Tuz kabuğunda opsiyonel" },
  { id: "tava", name: "Tava", icon: UtensilsCrossed, note: "Mısır unlu, çıtır" },
  { id: "kagit", name: "Kağıtta", icon: Package2, note: "Kendi buharında" },
];

const EXTRAS = [
  { id: "salata", name: "Mevsim Salatası", price: 120 },
  { id: "roka", name: "Roka & Parmesan", price: 140 },
  { id: "meze", name: "Meze Tabağı (4 çeşit)", price: 350 },
  { id: "ekmek", name: "Ekstra Ekmek Sepeti", price: 40 },
];

const STATUS_FLOW = ["Yeni Sipariş", "Hazırlanıyor", "Pişiyor", "Hazır (Gel-Al)", "Teslim Edildi"];
const STATUS_COLOR = {
  "Yeni Sipariş": "#B4472B",
  "Hazırlanıyor": "#B4842B",
  "Pişiyor": "#246674",
  "Hazır (Gel-Al)": "#2E7D5B",
  "Teslim Edildi": "#7A7568",
  "İptal Edildi": "#9B2226",
};

const STORAGE_KEY = "kaya-balik-orders-v1";
const ADMIN_PASS = "kaya2026";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function money(n) {
  return "₺" + n.toLocaleString("tr-TR");
}

function genOrderNo() {
  return "KB-" + Math.floor(1000 + Math.random() * 9000);
}

function timeSlots() {
  const slots = [];
  for (let h = 12; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 22) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

/* ------------------------------------------------------------------ */
/* Shared visual bits                                                  */
/* ------------------------------------------------------------------ */

function RockDivider({ flip, bg = "var(--paper)" }) {
  return (
    <div style={{ transform: flip ? "scaleY(-1)" : "none", lineHeight: 0 }}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: "100%", height: "44px", display: "block" }}>
        <polygon
          points="0,60 0,22 60,38 140,10 220,32 300,4 380,28 470,8 560,34 650,6 740,30 820,2 900,26 990,10 1080,32 1160,6 1200,20 1200,60"
          fill={bg}
        />
      </svg>
    </div>
  );
}

function ScaleTexture({ color = "rgba(42,138,158,0.06)" }) {
  return (
    <svg width="0" height="0">
      <defs>
        <pattern id="net" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H34M0 17H34M0 34H34M0 0V34M17 0V34M34 0V34"
            stroke={color} strokeWidth="1" fill="none" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Site: Hero görseli                                                  */
/* ------------------------------------------------------------------ */

/**
 * Hero bölümündeki sağ taraftaki görsel kartı.
 * Taze balık fotoğrafı ve yüzen bilgi rozetleri gösterir.
 */
function HeroVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="absolute -top-8 -right-6 w-36 h-36 rounded-full blur-2xl"
        style={{ background: "rgba(42,138,158,0.18)" }}
      />
      <div
        className="absolute -bottom-6 -left-8 w-28 h-28 rounded-full blur-xl"
        style={{ background: "rgba(245,193,120,0.25)" }}
      />

      <div
        className="absolute -left-3 top-10 z-20 px-4 py-3 rounded-xl shadow-lg"
        style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)" }}
      >
        <div className="text-[10px] uppercase tracking-widest" style={{ color: "var(--sea)", fontFamily: "'Work Sans', sans-serif" }}>Kuruluş</div>
        <div className="text-lg leading-none mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)" }}>1998</div>
      </div>

      <div
        className="absolute -right-2 bottom-20 z-20 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2"
        style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)" }}
      >
        <Anchor size={18} color="var(--sea)" />
        <div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Günlük</div>
          <div className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Taze Av</div>
        </div>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: "6px solid var(--paper)" }}
      >
        <img
          src="/kayabalik_hero.jpg"
          alt="Taze balık tezgahı"
          className="w-full aspect-[4/5] object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 p-5"
          style={{ background: "linear-gradient(transparent, rgba(26,74,86,0.82))" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Waves size={14} color="#B8E4EC" />
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#B8E4EC", fontFamily: "'Work Sans', sans-serif" }}>Bugünün Tezgahı</span>
          </div>
          <div className="text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FFFFFF" }}>LEVREK · ÇİPURA · KALKAN</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Site: Header                                                        */
/* ------------------------------------------------------------------ */

function Header({ onNav, onOrderClick, cartCount }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Anasayfa", "hero"],
    ["Hakkımızda", "about"],
    ["Menü", "menu"],
    ["İletişim", "contact"],
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid var(--sand-dark)", boxShadow: "0 1px 12px rgba(26,74,86,0.06)" }}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <button onClick={() => onNav("hero")} className="flex items-center gap-2">
          <Fish size={26} color="var(--sea)" strokeWidth={2.2} style={{ transform: "scaleX(-1)" }} />
          <span style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, letterSpacing: "0.02em" }} className="text-2xl" >
            <span style={{ color: "var(--navy)" }}>KAYA </span><span style={{ color: "var(--sea)", fontFamily: "'Caveat', cursive", fontWeight: 700 }}>Balık</span>
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => onNav(id)} className="text-sm tracking-wide uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.08em" }}>
              {label}
            </button>
          ))}
          <button
            onClick={onOrderClick}
            className="px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide"
            style={{ background: "var(--sea)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}
          >
            Tezgaha Ekle
          </button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <MenuIcon color="var(--navy)" />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3" style={{ background: "var(--paper)", borderTop: "1px solid var(--sand-dark)" }}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => { onNav(id); setOpen(false); }} className="text-left text-sm uppercase" style={{ color: "var(--stone)" }}>
              {label}
            </button>
          ))}
          <button onClick={() => { onOrderClick(); setOpen(false); }} className="px-4 py-2 rounded-lg text-sm font-semibold uppercase" style={{ background: "var(--sea)", color: "#FFFFFF" }}>
            Tezgaha Ekle
          </button>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Site: Hero                                                          */
/* ------------------------------------------------------------------ */

function Hero({ onOrderClick, onNav }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(165deg, var(--paper) 0%, var(--sea-mist) 45%, var(--sand) 100%)" }}
    >
      <ScaleTexture />
      <div className="absolute inset-0" style={{ backgroundImage: "url(#net)" }} />
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center relative">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "rgba(42,138,158,0.1)", border: "1px solid rgba(42,138,158,0.25)" }}>
              <Star size={14} color="var(--sea)" fill="var(--sea)" />
              <span className="text-xs" style={{ color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>4,4 · 376 yorum</span>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ color: "var(--stone)", background: "var(--paper)", border: "1px solid var(--sand-dark)", fontFamily: "'Work Sans', sans-serif" }}>Büyükçekmece, İstanbul</span>
          </div>
          <h1
            className="text-5xl md:text-6xl leading-[0.95] mb-5"
            style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)", letterSpacing: "0.01em" }}
          >
            KAYADAN<br />SOFRAYA,<br /><span style={{ color: "var(--sea)" }}>GÜNLÜK AVLAR.</span>
          </h1>
          <p className="max-w-md mb-8 text-base" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.7 }}>
            Karadeniz'in sert denizlerinden ilham alan, günlük avı sade ve ustalıklı sofraya taşıyan balık mutfağı.
            Sipariş ver, biz kayadan sofraya taşıyalım — gel-al veya masada.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={onOrderClick} className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md" style={{ background: "var(--sea)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
              Tezgaha Ekle <ChevronRight size={16} />
            </button>
            <button onClick={() => onNav("menu")} className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold" style={{ border: "1px solid var(--sand-dark)", color: "var(--navy)", background: "var(--paper)", fontFamily: "'Work Sans', sans-serif" }}>
              Menüyü Gör
            </button>
          </div>
        </div>
        <HeroVisual />
      </div>
      <RockDivider bg="var(--paper)" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Site: About                                                         */
/* ------------------------------------------------------------------ */

function About() {
  const cards = [
    { icon: MapPin, title: "Konum", body: "Fatih, Cengiz Topel Cd., Büyükçekmece / İstanbul" },
    { icon: Clock, title: "Çalışma Saatleri", body: "Her gün 12:00 – 23:00" },
    { icon: TrendingUp, title: "Kişi Başı", body: "₺400 – ₺1.200 arası" },
  ];
  return (
    <section id="about" className="py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>Hakkımızda</span>
            <h2 className="text-4xl mt-3 mb-5" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }}>
              1998'DEN BERİ BÜYÜKÇEKMECE SAHİLİNDE
            </h2>
            <p style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.8 }} className="mb-4">
              Kaya Balık, adını sahildeki kayalıklardan alır. Marmara'nın günlük avını,
              ustalarımızın elinde en sade haliyle sofranıza taşıyoruz. İster mekânda oturun,
              ister gel-al sipariş verin — balık her zaman aynı gün denizden gelir.
            </p>
          </div>
          <div className="grid gap-4">
            {cards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl shadow-sm" style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)" }}>
                <Icon size={22} color="var(--sea-deep)" />
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>{title}</div>
                  <div className="text-sm mt-1" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Site: Menu                                                          */
/* ------------------------------------------------------------------ */

function MenuSection({ onPick }) {
  return (
    <section id="menu" className="py-20" style={{ background: "var(--sand)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>Bugünün Tezgahı</span>
          <h2 className="text-4xl mt-3" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }}>
            TEZGAHTAN SEÇTİKLERİMİZ
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FISH_MENU.map((f) => (
            <div key={f.id} className="p-5 rounded-xl flex flex-col shadow-sm" style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)" }}>
              {f.tag && (
                <span className="self-start text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full mb-3" style={{ background: "rgba(42,138,158,0.12)", color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>
                  {f.tag}
                </span>
              )}
              <div className="text-xl mb-1" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 700, color: "var(--navy)" }}>{f.name}</div>
              <div className="text-sm flex-1 mb-4" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>{f.desc}</div>
              <div className="flex items-center justify-between">
                <span className="text-lg" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{money(f.price)}<span className="text-xs" style={{ color: "var(--stone)" }}>/kg</span></span>
                <button onClick={() => onPick(f.id)} className="text-xs font-semibold uppercase px-3 py-2 rounded-lg" style={{ background: "var(--sea)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
                  Tezgaha Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Site: Order form (Gel-Al)                                           */
/* ------------------------------------------------------------------ */

function OrderSection({ presetFish, addOrder }) {
  const [fishId, setFishId] = useState(presetFish || FISH_MENU[0].id);
  const [weight, setWeight] = useState(1);
  const [method, setMethod] = useState("izgara");
  const [extras, setExtras] = useState([]);
  const [pickup, setPickup] = useState(timeSlots()[2]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (presetFish) {
      setFishId(presetFish);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [presetFish]);

  const fish = FISH_MENU.find((f) => f.id === fishId);
  const extrasTotal = extras.reduce((s, id) => s + (EXTRAS.find((e) => e.id === id)?.price || 0), 0);
  const total = Math.round(fish.price * weight) + extrasTotal;

  function toggleExtra(id) {
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function submit() {
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    const order = {
      id: crypto.randomUUID(),
      orderNo: genOrderNo(),
      fishId, fishName: fish.name, weight, method,
      methodName: COOKING_METHODS.find((m) => m.id === method).name,
      extras, pickup, name, phone, note,
      total, status: "Yeni Sipariş", createdAt: Date.now(),
    };
    await addOrder(order);
    setSubmitting(false);
    setConfirmed(order);
  }

  if (confirmed) {
    return (
      <section id="order" ref={sectionRef} className="py-20" style={{ background: "var(--sea-mist)" }}>
        <div className="max-w-md mx-auto px-5 text-center">
          <CircleCheck size={44} color="var(--sea)" className="mx-auto mb-4" />
          <h3 className="text-2xl mb-2" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }}>SİPARİŞİN ALINDI</h3>
          <div className="mt-6 p-5 rounded-sm text-left" style={{ background: "var(--paper)", border: "1px dashed var(--stone)", fontFamily: "'IBM Plex Mono', monospace" }}>
            <div className="flex justify-between text-sm mb-2"><span>Sipariş No</span><span className="font-bold">{confirmed.orderNo}</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Ürün</span><span>{confirmed.fishName} · {confirmed.weight} kg</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Pişirme</span><span>{confirmed.methodName}</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Gel-Al Saati</span><span>{confirmed.pickup}</span></div>
            <div className="flex justify-between text-sm pt-2 mt-2" style={{ borderTop: "1px solid var(--sand-dark)" }}><span>Toplam</span><span className="font-bold">{money(confirmed.total)}</span></div>
          </div>
          <p className="text-sm mt-5" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>
            Siparişin mutfağa iletildi. Durumunu {confirmed.pickup} saatine kadar takip edebilirsin.
          </p>
          <button onClick={() => setConfirmed(null)} className="mt-6 text-sm underline" style={{ color: "var(--sea)" }}>Yeni sipariş oluştur</button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" ref={sectionRef} className="py-20" style={{ background: "var(--sand)" }}>
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>Gel-Al</span>
          <h2 className="text-4xl mt-3" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }}>SOFRANI HAZIRLA</h2>
        </div>

        <div className="p-6 md:p-8 rounded-xl shadow-sm" style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)" }}>
          {/* Fish */}
          <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Balık Seç</label>
          <div className="grid sm:grid-cols-2 gap-2 mt-2 mb-6">
            {FISH_MENU.map((f) => (
              <button
                key={f.id}
                onClick={() => setFishId(f.id)}
                className="flex items-center justify-between px-4 py-3 rounded-sm text-left"
                style={{
                  border: fishId === f.id ? "2px solid var(--sea-deep)" : "1px solid var(--sand-dark)",
                  background: fishId === f.id ? "rgba(36,102,116,0.08)" : "var(--sand)",
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--navy)" }}>{f.name}</span>
                <span className="text-xs" style={{ color: "var(--stone)", fontFamily: "'IBM Plex Mono', monospace" }}>{money(f.price)}/kg</span>
              </button>
            ))}
          </div>

          {/* Weight */}
          <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Ağırlık (kg)</label>
          <div className="flex items-center gap-3 mt-2 mb-6">
            <button onClick={() => setWeight((w) => Math.max(0.5, +(w - 0.5).toFixed(1)))} className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "var(--sand)", border: "1px solid var(--sand-dark)" }}><Minus size={16} /></button>
            <span className="w-16 text-center text-lg" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{weight}</span>
            <button onClick={() => setWeight((w) => +(w + 0.5).toFixed(1))} className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "var(--sand)", border: "1px solid var(--sand-dark)" }}><Plus size={16} /></button>
          </div>

          {/* Cooking method */}
          <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Pişirme Yöntemi</label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2 mb-6">
            {COOKING_METHODS.map((m) => {
              const Icon = m.icon;
              const active = method === m.id;
              return (
                <button key={m.id} onClick={() => setMethod(m.id)} className="flex flex-col items-center gap-1 p-3 rounded-sm" style={{ border: active ? "2px solid var(--sea-deep)" : "1px solid var(--sand-dark)", background: active ? "rgba(36,102,116,0.08)" : "var(--sand)" }}>
                  <Icon size={18} color="var(--navy)" />
                  <span className="text-[11px]" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Extras */}
          <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Ekstralar</label>
          <div className="grid sm:grid-cols-2 gap-2 mt-2 mb-6">
            {EXTRAS.map((e) => {
              const active = extras.includes(e.id);
              return (
                <button key={e.id} onClick={() => toggleExtra(e.id)} className="flex items-center justify-between px-4 py-2.5 rounded-sm" style={{ border: active ? "2px solid var(--sea-deep)" : "1px solid var(--sand-dark)", background: active ? "rgba(36,102,116,0.08)" : "var(--sand)" }}>
                  <span className="flex items-center gap-2 text-sm" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>
                    <span className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: active ? "var(--sea-deep)" : "transparent", border: "1px solid var(--stone)" }}>{active && <Check size={12} color="#fff" />}</span>
                    {e.name}
                  </span>
                  <span className="text-xs" style={{ color: "var(--stone)", fontFamily: "'IBM Plex Mono', monospace" }}>{e.price ? "+" + money(e.price) : "ücretsiz"}</span>
                </button>
              );
            })}
          </div>

          {/* Pickup time */}
          <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Gel-Al Saati</label>
          <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full mt-2 mb-6 px-4 py-3 rounded-sm text-sm" style={{ border: "1px solid var(--sand-dark)", background: "var(--sand)", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>
            {timeSlots().map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Contact */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Ad Soyad</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız Soyadınız" className="w-full mt-2 px-4 py-3 rounded-sm text-sm" style={{ border: "1px solid var(--sand-dark)", background: "var(--sand)", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Telefon</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05xx xxx xx xx" className="w-full mt-2 px-4 py-3 rounded-sm text-sm" style={{ border: "1px solid var(--sand-dark)", background: "var(--sand)", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }} />
            </div>
          </div>
          <label className="text-xs uppercase tracking-wide font-semibold" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Not (opsiyonel)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Örn: az pişsin, kılçık ayıklanmasın..." rows={2} className="w-full mt-2 mb-6 px-4 py-3 rounded-sm text-sm resize-none" style={{ border: "1px solid var(--sand-dark)", background: "var(--sand)", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }} />

          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--sand-dark)" }}>
            <div>
              <div className="text-xs uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Toplam</div>
              <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{money(total)}</div>
            </div>
            <button
              onClick={submit}
              disabled={submitting || !name.trim() || !phone.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold uppercase disabled:opacity-40 shadow-sm"
              style={{ background: "var(--sea)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
              Siparişi Onayla
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Site: Footer                                                        */
/* ------------------------------------------------------------------ */

function Footer({ onAdminClick }) {
  return (
    <footer id="contact" className="pt-16 pb-8" style={{ background: "var(--paper)", borderTop: "1px solid var(--sand-dark)" }}>
      <div className="max-w-6xl mx-auto px-5 grid sm:grid-cols-3 gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Fish size={20} color="var(--sea)" style={{ transform: "scaleX(-1)" }} />
            <span style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }} className="text-lg">KAYA BALIK</span>
          </div>
          <p className="text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.7 }}>Kayadan sofraya, günlük av. Büyükçekmece sahili, 1998'den beri.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide mb-3" style={{ color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>İletişim</div>
          <div className="flex items-start gap-2 text-sm mb-2" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><MapPin size={16} className="mt-0.5 shrink-0" /> Fatih, Cengiz Topel Cd., 34500 Büyükçekmece/İstanbul</div>
          <div className="flex items-center gap-2 text-sm mb-2" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><Phone size={16} /> (0212) 881 69 22</div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><Clock size={16} /> Her gün 12:00 – 23:00</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide mb-3" style={{ color: "var(--sea-deep)", fontFamily: "'Work Sans', sans-serif" }}>Değerlendirme</div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} color="var(--sea)" fill={i < 4 ? "var(--sea)" : "none"} />)}
            <span className="text-sm ml-1" style={{ color: "var(--stone)" }}>4,4</span>
          </div>
          <p className="text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>376 Google değerlendirmesi</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTop: "1px solid var(--sand-dark)" }}>
        <span className="text-xs" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>© 2026 Kaya Balık Restorant — demo site</span>
        <button onClick={onAdminClick} className="text-xs flex items-center gap-1" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>
          <Lock size={12} /> Personel Girişi
        </button>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Admin: Login                                                        */
/* ------------------------------------------------------------------ */

function AdminLogin({ onSuccess, onBack }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  function tryLogin() {
    if (pass === ADMIN_PASS) onSuccess();
    else { setError(true); setTimeout(() => setError(false), 1500); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--sea-mist)" }}>
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="flex items-center gap-1 text-sm mb-6" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>
          <ArrowLeft size={14} /> Siteye dön
        </button>
        <div className="text-center mb-6">
          <Lock size={28} color="var(--sea)" className="mx-auto mb-3" />
          <h1 style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }} className="text-2xl">YÖNETİM PANELİ</h1>
          <p className="text-sm mt-1" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Sipariş ve mutfak yönetimi</p>
        </div>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && tryLogin()}
          placeholder="Şifre"
          className="w-full px-4 py-3 rounded-lg text-sm mb-3"
          style={{ background: "var(--paper)", border: error ? "2px solid #C0392B" : "1px solid var(--sand-dark)", fontFamily: "'Work Sans', sans-serif" }}
        />
        {error && <p className="text-xs mb-3" style={{ color: "#C0392B", fontFamily: "'Work Sans', sans-serif" }}>Şifre hatalı. (Demo şifresi: kaya2026)</p>}
        <button onClick={tryLogin} className="w-full py-3 rounded-lg font-semibold uppercase text-sm" style={{ background: "var(--sea)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Admin: Dashboard                                                     */
/* ------------------------------------------------------------------ */

function OrderTicket({ order, onAdvance, onCancel }) {
  const idx = STATUS_FLOW.indexOf(order.status);
  const next = idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  return (
    <div className="p-4 rounded-sm mb-3" style={{ background: "var(--paper)", border: "1px dashed var(--sand-dark)", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold" style={{ color: "var(--navy)" }}>{order.orderNo}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-sm" style={{ background: STATUS_COLOR[order.status] + "22", color: STATUS_COLOR[order.status] }}>{order.status}</span>
      </div>
      <div className="text-sm mb-1" style={{ color: "var(--navy)" }}>{order.fishName} · {order.weight}kg · {order.methodName}</div>
      {order.extras?.length > 0 && (
        <div className="text-xs mb-1" style={{ color: "var(--stone)" }}>+ {order.extras.map((id) => EXTRAS.find((e) => e.id === id)?.name).join(", ")}</div>
      )}
      <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "var(--stone)" }}><User size={11} /> {order.name} · <Phone size={11} /> {order.phone}</div>
      <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "var(--stone)" }}><Clock size={11} /> Gel-Al: {order.pickup}</div>
      {order.note && <div className="text-xs italic mb-2" style={{ color: "var(--stone)" }}>"{order.note}"</div>}
      <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: "1px solid var(--sand-dark)" }}>
        <span className="text-sm font-bold" style={{ color: "var(--navy)" }}>{money(order.total)}</span>
        <div className="flex gap-2">
          {order.status !== "İptal Edildi" && order.status !== "Teslim Edildi" && (
            <button onClick={() => onCancel(order.id)} className="text-[10px] px-2 py-1 rounded-sm" style={{ border: "1px solid #C0392B", color: "#C0392B" }}>İptal</button>
          )}
          {next && (
            <button onClick={() => onAdvance(order.id, next)} className="text-[10px] px-2 py-1 rounded-sm font-semibold" style={{ background: "var(--sea)", color: "#FFFFFF" }}>
              {next} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ orders, updateOrder, onBack, loading }) {
  const [filter, setFilter] = useState("");

  const filtered = orders.filter(
    (o) => o.orderNo.toLowerCase().includes(filter.toLowerCase()) || o.phone.includes(filter) || o.name.toLowerCase().includes(filter.toLowerCase())
  );

  const today = filtered.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString());
  const revenue = today.filter((o) => o.status !== "İptal Edildi").reduce((s, o) => s + o.total, 0);
  const pending = today.filter((o) => !["Teslim Edildi", "İptal Edildi"].includes(o.status)).length;

  const columns = STATUS_FLOW;

  return (
    <div className="min-h-screen" style={{ background: "var(--sand)" }}>
      <div className="sticky top-0 z-10" style={{ background: "var(--paper)", borderBottom: "1px solid var(--sand-dark)", boxShadow: "0 1px 8px rgba(26,74,86,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex items-center gap-1 text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><ArrowLeft size={14} /> Site</button>
            <span style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", fontWeight: 800, color: "var(--navy)" }} className="text-xl">MUTFAK & SİPARİŞ YÖNETİMİ</span>
          </div>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Sipariş no / ad / telefon ara..."
            className="px-3 py-2 rounded-sm text-sm w-64"
            style={{ background: "var(--paper)", fontFamily: "'Work Sans', sans-serif" }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-sm" style={{ background: "var(--paper)" }}>
            <div className="text-xs uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Bugünkü Sipariş</div>
            <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{today.length}</div>
          </div>
          <div className="p-4 rounded-sm" style={{ background: "var(--paper)" }}>
            <div className="text-xs uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Bekleyen</div>
            <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{pending}</div>
          </div>
          <div className="p-4 rounded-sm" style={{ background: "var(--paper)" }}>
            <div className="text-xs uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Günlük Ciro (tahmini)</div>
            <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{money(revenue)}</div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><Loader2 className="animate-spin" size={16} /> Siparişler yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <ClipboardList size={32} color="var(--stone)" className="mb-3" />
            <p style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Henüz sipariş yok. Site tarafından bir sipariş verildiğinde burada görünecek.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-4">
            {columns.map((col) => (
              <div key={col}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[col] }} />
                  <span className="text-xs uppercase font-semibold tracking-wide" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>{col}</span>
                  <span className="text-xs" style={{ color: "var(--stone)" }}>({filtered.filter((o) => o.status === col).length})</span>
                </div>
                <div>
                  {filtered.filter((o) => o.status === col).sort((a, b) => a.createdAt - b.createdAt).map((o) => (
                    <OrderTicket
                      key={o.id}
                      order={o}
                      onAdvance={(id, status) => updateOrder(id, { status })}
                      onCancel={(id) => updateOrder(id, { status: "İptal Edildi" })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [view, setView] = useState("site"); // site | login | admin
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [presetFish, setPresetFish] = useState(null);

  useEffect(() => {
    try {
      const res = window.localStorage.getItem(STORAGE_KEY);
      if (res) setOrders(JSON.parse(res));
    } catch (e) {
      // key not present yet
    } finally {
      setLoading(false);
    }
  }, []);

  function persist(next) {
    setOrders(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  async function addOrder(order) {
    await persist([...orders, order]);
  }

  async function updateOrder(id, patch) {
    await persist(orders.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }

  function scrollTo(id) {
    if (view !== "site") { setView("site"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const fontStyle = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600&family=Caveat:wght@700&display=swap');
      :root {
        --navy: #1A4A56;
        --navy-deep: #0F3540;
        --cyan: #2A8A9E;
        --cyan-deep: #1E6B7A;
        --sea: #2A8A9E;
        --sea-deep: #1E6B7A;
        --sea-mist: #EDF6F8;
        --sand: #F5F1E8;
        --sand-dark: #E5DFD0;
        --stone: #6B7280;
        --paper: #FFFFFF;
      }
      * { box-sizing: border-box; }
      ::selection { background: var(--sea); color: var(--navy); }
      button { cursor: pointer; }
      button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
        outline: 2px solid var(--sea); outline-offset: 2px;
      }
    `}</style>
  );

  if (view === "login") {
    return <>{fontStyle}<AdminLogin onSuccess={() => setView("admin")} onBack={() => setView("site")} /></>;
  }

  if (view === "admin") {
    return <>{fontStyle}<AdminDashboard orders={orders} updateOrder={updateOrder} onBack={() => setView("site")} loading={loading} /></>;
  }

  return (
    <div style={{ background: "var(--paper)" }}>
      {fontStyle}
      <Header onNav={scrollTo} onOrderClick={() => scrollTo("order")} />
      <Hero onOrderClick={() => scrollTo("order")} onNav={scrollTo} />
      <About />
      <MenuSection onPick={(id) => { setPresetFish(id); setTimeout(() => setPresetFish(null), 100); scrollTo("order"); setPresetFish(id); }} />
      <RockDivider flip bg="var(--sand)" />
      <OrderSection presetFish={presetFish} addOrder={addOrder} />
      <Footer onAdminClick={() => setView("login")} />
    </div>
  );
}
