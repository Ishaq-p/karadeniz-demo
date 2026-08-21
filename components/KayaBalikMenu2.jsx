"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Fish, Flame, Droplets, ChefHat, UtensilsCrossed, Package2, MapPin, Clock,
    Phone, Star, ChevronRight, Plus, Minus, Check, Lock, ArrowLeft, User,
    Loader2, ClipboardList, CircleCheck, Waves, Anchor, Menu as MenuIcon,
    TrendingUp, ArrowUpRight
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FISH_MENU = [
    { id: "levrek", name: "Levrek", desc: "Marmara açıklarından, günlük av", price: 850, tag: "Günün Balığı", weight: 5 },
    { id: "cupra", name: "Çipura", desc: "Izgara ve fırın için ideal", price: 800, tag: "Günün Balığı", weight: 4 },
    { id: "kalkan", name: "Kalkan", desc: "Mevsimlik, sınırlı stok", price: 2200, tag: "Sınırlı", weight: 8 },
    { id: "barbun", name: "Barbunya", desc: "Kızartma ve tava için birebir", price: 1600, tag: null, weight: 3 },
    { id: "lufer", name: "Lüfer", desc: "Sonbahar–kış mevsimi", price: 1400, tag: "Mevsimlik", weight: 5 },
    { id: "istavrit", name: "İstavrit", desc: "Halk balığı, ızgara / tava", price: 450, tag: null, weight: 2 },
    { id: "palamut", name: "Palamut", desc: "Ekim–Kasım mevsimi", price: 500, tag: "Mevsimlik", weight: 3 },
    { id: "karides", name: "Jumbo Karides", desc: "Güveç ve ızgaraya uygun", price: 1900, tag: null, weight: 4 },
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

const STORAGE_KEY = "kaya-balik-orders-v2";
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

// Torn/ragged paper edge — used to break the rectangle of a section
function TornEdge({ flip, fill = "var(--paper)" }) {
    const seed = "0,64 24,40 52,58 78,30 104,52 132,22 160,48 188,18 216,46 244,20 272,50 300,24 328,54 356,26 384,50 412,20 440,46 468,18 496,48 524,22 552,52 580,28 608,56 636,24 664,50 692,18 720,44 748,20 776,50 804,26 832,54 860,22 888,48 916,20 944,46 972,24 1000,52 1028,22 1056,48 1084,20 1112,50 1140,24 1168,52 1200,30";
    return (
        <div aria-hidden style={{ transform: flip ? "scaleY(-1)" : "none", lineHeight: 0, position: "relative", zIndex: 5 }}>
            <svg viewBox="0 0 1200 64" preserveAspectRatio="none" style={{ width: "100%", height: "36px", display: "block" }}>
                <polygon points={`0,64 ${seed} 1200,64`} fill={fill} />
            </svg>
        </div>
    );
}

// Twine / rope stitch divider — small recurring motif
function TwineStitch({ color = "var(--rope)" }) {
    return (
        <svg width="100%" height="14" viewBox="0 0 400 14" preserveAspectRatio="none" aria-hidden style={{ display: "block" }}>
            <line x1="0" y1="7" x2="400" y2="7" stroke={color} strokeWidth="1.5" strokeDasharray="1 11" strokeLinecap="round" />
        </svg>
    );
}

function ScaleTexture() {
    return (
        <svg width="0" height="0">
            <defs>
                <pattern id="net" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <path d="M0 0H34M0 17H34M0 34H34M0 0V34M17 0V34M34 0V34" stroke="rgba(42,138,158,0.07)" strokeWidth="1" fill="none" />
                </pattern>
            </defs>
        </svg>
    );
}

// Chalk-stamp style tag, used across menu/receipt for category flags
function StampTag({ children, tone = "sea" }) {
    const tones = {
        sea: { bg: "rgba(42,138,158,0.12)", fg: "var(--sea-deep)", bd: "rgba(42,138,158,0.4)" },
        rust: { bg: "rgba(180,71,43,0.1)", fg: "#8A3620", bd: "rgba(180,71,43,0.35)" },
    };
    const t = tones[tone];
    return (
        <span
            className="inline-flex items-center"
            style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: t.fg,
                background: t.bg,
                border: `1.5px dashed ${t.bd}`,
                padding: "1px 12px 3px",
                borderRadius: "3px",
                transform: "rotate(-2deg)",
                lineHeight: 1.3,
            }}
        >
            {children}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Site: Header                                                        */
/* ------------------------------------------------------------------ */

function Header({ onNav, onOrderClick }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const links = [["Anasayfa", "hero"], ["Hakkımızda", "about"], ["Tezgah", "menu"], ["İletişim", "contact"]];

    useEffect(() => {
        const f = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", f);
        return () => window.removeEventListener("scroll", f);
    }, []);

    return (
        <header
            className="sticky top-0 z-40"
            style={{
                background: scrolled ? "rgba(250,247,240,0.96)" : "transparent",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                borderBottom: scrolled ? "1px solid var(--sand-dark)" : "1px solid transparent",
                transition: "all 0.3s ease",
            }}
        >
            <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-20">
                <button onClick={() => onNav("hero")} className="flex items-center gap-2.5">
                    <div className="relative">
                        <Fish size={28} color="var(--sea-deep)" strokeWidth={2} style={{ transform: "scaleX(-1) rotate(-8deg)" }} />
                    </div>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }} className="text-2xl leading-none">
                        <span style={{ color: "var(--navy)" }}>KAYA</span>
                        <span style={{ color: "var(--sea)", fontFamily: "'Caveat', cursive", fontWeight: 700, marginLeft: "5px" }}>Balık</span>
                    </span>
                </button>
                <nav className="hidden md:flex items-center gap-8">
                    {links.map(([label, id], i) => (
                        <button
                            key={id}
                            onClick={() => onNav(id)}
                            className="relative text-sm tracking-wide uppercase group"
                            style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.06em" }}
                        >
                            {label}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300" style={{ background: "var(--rust)" }} />
                        </button>
                    ))}
                    <button
                        onClick={onOrderClick}
                        className="relative px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
                        style={{
                            color: "var(--navy)", fontFamily: "'Work Sans', sans-serif",
                            border: "1.5px solid var(--navy)", borderRadius: "2px",
                        }}
                    >
                        Tezgaha Yaz
                    </button>
                </nav>
                <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menü">
                    <MenuIcon color="var(--navy)" />
                </button>
            </div>
            {open && (
                <div className="md:hidden px-5 pb-5 flex flex-col gap-4" style={{ background: "var(--paper)", borderTop: "1px solid var(--sand-dark)" }}>
                    {links.map(([label, id]) => (
                        <button key={id} onClick={() => { onNav(id); setOpen(false); }} className="text-left text-sm uppercase" style={{ color: "var(--stone)" }}>
                            {label}
                        </button>
                    ))}
                    <button onClick={() => { onOrderClick(); setOpen(false); }} className="px-4 py-3 text-sm font-semibold uppercase" style={{ background: "var(--navy)", color: "#FFF", borderRadius: "2px" }}>
                        Tezgaha Yaz
                    </button>
                </div>
            )}
        </header>
    );
}

/* ------------------------------------------------------------------ */
/* Site: Hero — asymmetric, crate photo bleeds off-canvas               */
/* ------------------------------------------------------------------ */

function Hero({ onOrderClick, onNav }) {
    return (
        <section id="hero" className="relative overflow-hidden" style={{ background: "var(--paper)" }}>
            <ScaleTexture />
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "url(#net)" }} />

            <div className="max-w-6xl mx-auto px-5 pt-8 md:pt-14 relative">
                <div className="grid md:grid-cols-12 gap-6 items-stretch">
                    {/* Left: text column, narrower, left-aligned to edge */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center pb-14 md:pb-24 pt-6 relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(4)].map((_, i) => <Star key={i} size={13} color="var(--rust)" fill="var(--rust)" />)}
                                <Star size={13} color="var(--rust)" fill="none" />
                            </div>
                            <span className="text-xs" style={{ color: "var(--stone)", fontFamily: "'IBM Plex Mono', monospace" }}>4.4 — 376 yorum</span>
                        </div>

                        <h1
                            className="leading-[0.88] mb-2 kaya-hero-headline"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)", letterSpacing: "0.005em" }}
                        >
                            KAYADAN<br />SOFRAYA
                        </h1>
                        <div className="flex items-center gap-3 mb-7 pl-1">
                            <span style={{ width: "34px", height: "2px", background: "var(--rust)", display: "inline-block" }} />
                            <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: "1.9rem", color: "var(--sea-deep)" }}>günlük avlar, aynı gün sofrada</span>
                        </div>

                        <p className="max-w-sm mb-9 text-[0.95rem]" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.75 }}>
                            Karadeniz'in sert denizlerinden ilham alan, günlük avı sade ve ustalıklı sofraya taşıyan balık mutfağı.
                            Tezgahtan seç, biz hazırlayalım — gel-al veya masada.
                        </p>

                        <div className="flex flex-wrap gap-3 items-center">
                            <button onClick={onOrderClick} className="flex items-center gap-2 px-6 py-3.5 font-semibold" style={{ background: "var(--navy)", color: "#FFF", fontFamily: "'Work Sans', sans-serif", borderRadius: "2px" }}>
                                Tezgaha Yaz <ArrowUpRight size={16} />
                            </button>
                            <button onClick={() => onNav("menu")} className="flex items-center gap-1 px-2 py-3.5 font-semibold underline underline-offset-4" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>
                                Bugünün tezgahı
                            </button>
                        </div>
                    </div>

                    {/* Right: crate photo, full-bleed to right edge of viewport, overlapping into left column */}
                    <div className="md:col-span-6 lg:col-span-7 relative -mx-5 md:mx-0">
                        <div className="relative h-[380px] md:h-[560px]" style={{ background: "var(--navy)" }}>
                            <img
                                src="/kayabalik_hero.jpg"
                                alt="Taze balık tezgahı"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)" }}
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(100deg, var(--paper) 0%, transparent 10%), linear-gradient(0deg, rgba(15,53,64,0.55) 0%, transparent 38%)" }}
                            />

                            {/* Floating chalk tag: est. */}
                            <div
                                className="absolute left-2 md:-left-6 top-8 z-20 px-5 py-3.5"
                                style={{ background: "var(--navy)", transform: "rotate(-3deg)", boxShadow: "5px 5px 0 rgba(0,0,0,0.12)" }}
                            >
                                <div className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Work Sans', sans-serif" }}>Kuruluş</div>
                                <div className="text-2xl leading-none mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FFF" }}>1998</div>
                            </div>

                            {/* Bottom label baked onto photo */}
                            <div className="absolute left-8 md:left-16 bottom-6 right-6 z-10">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Waves size={13} color="#CFE9EE" />
                                    <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "#CFE9EE", fontFamily: "'Work Sans', sans-serif" }}>Bugünün Tezgahı</span>
                                </div>
                                <div className="text-2xl md:text-3xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FFF", letterSpacing: "0.01em" }}>
                                    LEVREK · ÇİPURA · KALKAN
                                </div>
                            </div>
                        </div>

                        {/* Anchor badge, pinned at seam between columns */}
                        <div
                            className="hidden md:flex absolute z-20 items-center gap-2 px-4 py-3"
                            style={{ left: "-1.5rem", bottom: "-1.25rem", background: "var(--paper)", border: "1px solid var(--sand-dark)", boxShadow: "3px 3px 0 rgba(15,53,64,0.08)" }}
                        >
                            <Anchor size={17} color="var(--sea-deep)" />
                            <div>
                                <div className="text-[9px] uppercase tracking-widest" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Günlük</div>
                                <div className="text-sm font-semibold leading-tight" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>Taze Av</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TornEdge fill="var(--sand)" />
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Site: About — ledger-style, not card-grid                           */
/* ------------------------------------------------------------------ */

function About() {
    const rows = [
        { icon: MapPin, label: "Konum", value: "Fatih, Cengiz Topel Cd., Büyükçekmece / İstanbul" },
        { icon: Clock, label: "Çalışma Saatleri", value: "Her gün 12:00 – 23:00" },
        { icon: TrendingUp, label: "Kişi Başı", value: "₺400 – ₺1.200 arası" },
    ];
    return (
        <section id="about" className="py-20 md:py-28" style={{ background: "var(--sand)" }}>
            <div className="max-w-6xl mx-auto px-5">
                <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                    <div className="md:col-span-5">
                        <span className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--rust)", fontFamily: "'IBM Plex Mono', monospace" }}>— Hakkımızda</span>
                        <h2 className="text-4xl md:text-5xl mt-4 mb-6 leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)" }}>
                            1998'DEN BERİ<br />KAYALIKLARIN<br />KENARINDA
                        </h2>
                        <p style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.85 }} className="max-w-sm">
                            Kaya Balık, adını sahildeki kayalıklardan alır. Marmara'nın günlük avını,
                            ustalarımızın elinde en sade haliyle sofranıza taşıyoruz. İster mekânda oturun,
                            ister gel-al sipariş verin — balık her zaman aynı gün denizden gelir.
                        </p>
                    </div>

                    {/* Right: a ledger sheet, hand-ruled rows */}
                    <div className="md:col-span-7 flex items-center">
                        <div className="w-full" style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)", boxShadow: "6px 6px 0 rgba(15,53,64,0.06)" }}>
                            {rows.map(({ icon: Icon, label, value }, i) => (
                                <div key={label} className="flex items-start gap-5 px-6 md:px-8 py-6" style={{ borderBottom: i < rows.length - 1 ? "1px dashed var(--sand-dark)" : "none" }}>
                                    <span className="text-xs mt-1 shrink-0" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--rust)" }}>{String(i + 1).padStart(2, "0")}</span>
                                    <Icon size={20} color="var(--sea-deep)" className="shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs uppercase tracking-wide font-semibold mb-1" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>{label}</div>
                                        <div className="text-[0.95rem]" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Site: Menu — chalkboard tally, not pricing cards                    */
/* ------------------------------------------------------------------ */

function MenuSection({ onPick }) {
    return (
        <section id="menu" className="py-20 md:py-28 relative" style={{ background: "var(--navy)" }}>
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px)",
                }}
            />
            <div className="max-w-5xl mx-auto px-5 relative">
                <div className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-4">
                    <div>
                        <span className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--sea-light)", fontFamily: "'IBM Plex Mono', monospace" }}>— Bugünün Tezgahı</span>
                        <h2 className="text-4xl md:text-5xl mt-3" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FFF" }}>
                            TEZGAHTAN SEÇTİKLERİMİZ
                        </h2>
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'IBM Plex Mono', monospace" }}>fiyatlar kg başınadır</span>
                </div>

                {/* Chalkboard list — each row is a tally line, not a boxed card */}
                <div>
                    {FISH_MENU.map((f, i) => (
                        <button
                            key={f.id}
                            onClick={() => onPick(f.id)}
                            className="w-full text-left group flex items-center gap-4 md:gap-6 py-4 md:py-5"
                            style={{ borderBottom: i < FISH_MENU.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none" }}
                        >
                            <span
                                className="hidden sm:block text-xs shrink-0"
                                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.35)" }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <span
                                className="text-xl md:text-2xl shrink-0 w-[120px] md:w-[180px]"
                                style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: "#FFF" }}
                            >
                                {f.name}
                            </span>

                            <span className="hidden md:block flex-1 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Work Sans', sans-serif" }}>
                                {f.desc}
                            </span>

                            {f.tag && (
                                <span
                                    className="hidden sm:inline-block text-[10px] uppercase tracking-wide px-2 py-1 shrink-0"
                                    style={{ color: "var(--sea-light)", border: "1px solid rgba(207,233,238,0.35)", fontFamily: "'Work Sans', sans-serif" }}
                                >
                                    {f.tag}
                                </span>
                            )}

                            {/* dotted leader */}
                            <span className="hidden lg:block flex-1 border-b border-dotted mx-2" style={{ borderColor: "rgba(255,255,255,0.2)" }} />

                            <span
                                className="text-lg md:text-xl shrink-0 w-[90px] text-right"
                                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#FFF" }}
                            >
                                {money(f.price)}
                            </span>

                            <ChevronRight size={18} color="rgba(255,255,255,0.4)" className="shrink-0 transition-transform group-hover:translate-x-1" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Site: Order form — styled as a paper order ticket                   */
/* ------------------------------------------------------------------ */

function TicketField({ label, children }) {
    return (
        <div className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-2.5" style={{ color: "var(--navy)", fontFamily: "'IBM Plex Mono', monospace" }}>
                {label}
            </div>
            {children}
        </div>
    );
}

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
            <section id="order" ref={sectionRef} className="py-20 md:py-28" style={{ background: "var(--sea-mist)" }}>
                <div className="max-w-sm mx-auto px-5">
                    <div style={{ background: "var(--paper)", boxShadow: "0 18px 40px rgba(15,53,64,0.14)", position: "relative" }}>
                        <div className="absolute -top-3 left-0 right-0 flex justify-center">
                            <span className="px-4 py-1 text-xs uppercase tracking-widest" style={{ background: "var(--sea)", color: "#FFF", fontFamily: "'Work Sans', sans-serif" }}>Onaylandı</span>
                        </div>
                        <div className="px-7 pt-10 pb-7 text-center">
                            <CircleCheck size={38} color="var(--sea)" className="mx-auto mb-3" />
                            <h3 className="text-2xl mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)" }}>SİPARİŞ FİŞİ</h3>
                            <p className="text-xs" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Mutfağa iletildi</p>
                        </div>
                        <div className="px-7 pb-7" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                            <TwineStitch color="var(--sand-dark)" />
                            <div className="py-4 space-y-2.5 text-sm">
                                <div className="flex justify-between"><span style={{ color: "var(--stone)" }}>Sipariş No</span><span className="font-bold" style={{ color: "var(--navy)" }}>{confirmed.orderNo}</span></div>
                                <div className="flex justify-between"><span style={{ color: "var(--stone)" }}>Ürün</span><span style={{ color: "var(--navy)" }}>{confirmed.fishName} · {confirmed.weight}kg</span></div>
                                <div className="flex justify-between"><span style={{ color: "var(--stone)" }}>Pişirme</span><span style={{ color: "var(--navy)" }}>{confirmed.methodName}</span></div>
                                <div className="flex justify-between"><span style={{ color: "var(--stone)" }}>Gel-Al</span><span style={{ color: "var(--navy)" }}>{confirmed.pickup}</span></div>
                            </div>
                            <TwineStitch color="var(--sand-dark)" />
                            <div className="flex justify-between pt-4 text-base">
                                <span style={{ color: "var(--navy)" }}>Toplam</span>
                                <span className="font-bold" style={{ color: "var(--navy)" }}>{money(confirmed.total)}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm mt-6 text-center" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>
                        {confirmed.pickup} saatine kadar durumunu takip edebilirsin.
                    </p>
                    <div className="text-center mt-3">
                        <button onClick={() => setConfirmed(null)} className="text-sm underline underline-offset-4" style={{ color: "var(--sea-deep)" }}>Yeni sipariş oluştur</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="order" ref={sectionRef} className="py-20 md:py-28" style={{ background: "var(--sea-mist)" }}>
            <div className="max-w-5xl mx-auto px-5">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--rust)", fontFamily: "'IBM Plex Mono', monospace" }}>— Gel-Al</span>
                    <h2 className="text-4xl md:text-5xl mt-3" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)" }}>SOFRANI HAZIRLA</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left: the ticket itself */}
                    <div style={{ background: "var(--paper)", boxShadow: "0 14px 34px rgba(15,53,64,0.08)", minWidth: 0 }} className="flex-1 w-full p-7 md:p-10">
                        <TicketField label="01 — Balık Seç">
                            <div className="grid sm:grid-cols-2 gap-2">
                                {FISH_MENU.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFishId(f.id)}
                                        className="flex items-center justify-between px-4 py-3 text-left transition-colors"
                                        style={{
                                            borderBottom: fishId === f.id ? "2px solid var(--rust)" : "1px solid var(--sand-dark)",
                                            background: fishId === f.id ? "rgba(180,71,43,0.06)" : "transparent",
                                            fontFamily: "'Work Sans', sans-serif",
                                        }}
                                    >
                                        <span className="text-sm font-medium" style={{ color: "var(--navy)" }}>{f.name}</span>
                                        <span className="text-xs" style={{ color: "var(--stone)", fontFamily: "'IBM Plex Mono', monospace" }}>{money(f.price)}/kg</span>
                                    </button>
                                ))}
                            </div>
                        </TicketField>

                        <TicketField label="02 — Ağırlık (kg)">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setWeight((w) => Math.max(0.5, +(w - 0.5).toFixed(1)))} className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid var(--sand-dark)" }}><Minus size={16} color="var(--navy)" /></button>
                                <span className="w-16 text-center text-xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{weight}</span>
                                <button onClick={() => setWeight((w) => +(w + 0.5).toFixed(1))} className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid var(--sand-dark)" }}><Plus size={16} color="var(--navy)" /></button>
                            </div>
                        </TicketField>

                        <TicketField label="03 — Pişirme Yöntemi">
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {COOKING_METHODS.map((m) => {
                                    const Icon = m.icon;
                                    const active = method === m.id;
                                    return (
                                        <button key={m.id} onClick={() => setMethod(m.id)} className="flex flex-col items-center gap-1.5 p-3" style={{ borderBottom: active ? "2px solid var(--rust)" : "1px solid var(--sand-dark)", background: active ? "rgba(180,71,43,0.06)" : "transparent" }}>
                                            <Icon size={18} color="var(--navy)" />
                                            <span className="text-[11px]" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>{m.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </TicketField>

                        <TicketField label="04 — Ekstralar">
                            <div className="grid sm:grid-cols-2 gap-2">
                                {EXTRAS.map((e) => {
                                    const active = extras.includes(e.id);
                                    return (
                                        <button key={e.id} onClick={() => toggleExtra(e.id)} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: active ? "2px solid var(--rust)" : "1px solid var(--sand-dark)", background: active ? "rgba(180,71,43,0.06)" : "transparent" }}>
                                            <span className="flex items-center gap-2 text-sm" style={{ color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>
                                                <span className="w-4 h-4 flex items-center justify-center" style={{ background: active ? "var(--rust)" : "transparent", border: "1px solid var(--stone)" }}>{active && <Check size={11} color="#fff" />}</span>
                                                {e.name}
                                            </span>
                                            <span className="text-xs" style={{ color: "var(--stone)", fontFamily: "'IBM Plex Mono', monospace" }}>{e.price ? "+" + money(e.price) : "ücretsiz"}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </TicketField>

                        <TicketField label="05 — Gel-Al Saati">
                            <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full px-4 py-3 text-sm" style={{ border: "1px solid var(--sand-dark)", background: "transparent", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }}>
                                {timeSlots().map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </TicketField>

                        <TicketField label="06 — İletişim">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız Soyadınız" className="w-full px-4 py-3 text-sm" style={{ border: "1px solid var(--sand-dark)", background: "transparent", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }} />
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05xx xxx xx xx" className="w-full px-4 py-3 text-sm" style={{ border: "1px solid var(--sand-dark)", background: "transparent", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }} />
                            </div>
                        </TicketField>

                        <TicketField label="Not (opsiyonel)">
                            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Örn: az pişsin, kılçık ayıklanmasın..." rows={2} className="w-full px-4 py-3 text-sm resize-none" style={{ border: "1px solid var(--sand-dark)", background: "transparent", color: "var(--navy)", fontFamily: "'Work Sans', sans-serif" }} />
                        </TicketField>
                    </div>

                    {/* Right: sticky running total — like a receipt stub */}
                    <div className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-24" style={{ background: "var(--navy)", minWidth: 0 }}>
                        <div className="p-7">
                            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace" }}>Fiş Özeti</div>
                            <div className="space-y-2.5 text-sm mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.6)" }}>{fish.name} × {weight}kg</span><span style={{ color: "#FFF" }}>{money(Math.round(fish.price * weight))}</span></div>
                                {extras.map((id) => {
                                    const e = EXTRAS.find((x) => x.id === id);
                                    return <div key={id} className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.6)" }}>{e.name}</span><span style={{ color: "#FFF" }}>+{money(e.price)}</span></div>;
                                })}
                            </div>
                            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.25)" }} className="pt-4 mb-6">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Work Sans', sans-serif" }}>Toplam</span>
                                    <span className="text-3xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#FFF" }}>{money(total)}</span>
                                </div>
                            </div>
                            <button
                                onClick={submit}
                                disabled={submitting || !name.trim() || !phone.trim()}
                                className="w-full flex items-center justify-center gap-2 py-4 font-semibold uppercase disabled:opacity-30 text-sm tracking-wide"
                                style={{ background: "var(--rust)", color: "#FFF", fontFamily: "'Work Sans', sans-serif" }}
                            >
                                {submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={16} />}
                                Siparişi Onayla
                            </button>
                            {(!name.trim() || !phone.trim()) && (
                                <p className="text-[11px] mt-3 text-center" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Work Sans', sans-serif" }}>Ad ve telefon gerekli</p>
                            )}
                        </div>
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
            <div className="max-w-6xl mx-auto px-5 grid sm:grid-cols-12 gap-8 mb-10">
                <div className="sm:col-span-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Fish size={20} color="var(--sea-deep)" style={{ transform: "scaleX(-1)" }} />
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)" }} className="text-lg">KAYA BALIK</span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.7 }}>Kayadan sofraya, günlük av. Büyükçekmece sahili, 1998'den beri.</p>
                </div>
                <div className="sm:col-span-4">
                    <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--rust)", fontFamily: "'IBM Plex Mono', monospace" }}>İletişim</div>
                    <div className="flex items-start gap-2 text-sm mb-2" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><MapPin size={16} className="mt-0.5 shrink-0" /> Fatih, Cengiz Topel Cd., 34500 Büyükçekmece/İstanbul</div>
                    <div className="flex items-center gap-2 text-sm mb-2" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><Phone size={16} /> (0212) 881 69 22</div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><Clock size={16} /> Her gün 12:00 – 23:00</div>
                </div>
                <div className="sm:col-span-4">
                    <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--rust)", fontFamily: "'IBM Plex Mono', monospace" }}>Değerlendirme</div>
                    <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} color="var(--rust)" fill={i < 4 ? "var(--rust)" : "none"} />)}
                        <span className="text-sm ml-1" style={{ color: "var(--stone)" }}>4.4</span>
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
        <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--navy)" }}>
            <div className="w-full max-w-sm">
                <button onClick={onBack} className="flex items-center gap-1 text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Work Sans', sans-serif" }}>
                    <ArrowLeft size={14} /> Siteye dön
                </button>
                <div className="text-center mb-6">
                    <Lock size={26} color="var(--sea-light)" className="mx-auto mb-3" />
                    <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FFF" }} className="text-3xl">YÖNETİM PANELİ</h1>
                    <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Work Sans', sans-serif" }}>Sipariş ve mutfak yönetimi</p>
                </div>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                    placeholder="Şifre"
                    className="w-full px-4 py-3 text-sm mb-3"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#FFF", border: error ? "1.5px solid #E24B4A" : "1px solid rgba(255,255,255,0.15)", fontFamily: "'Work Sans', sans-serif" }}
                />
                {error && <p className="text-xs mb-3" style={{ color: "#F0997B", fontFamily: "'Work Sans', sans-serif" }}>Şifre hatalı. (Demo şifresi: kaya2026)</p>}
                <button onClick={tryLogin} className="w-full py-3.5 font-semibold uppercase text-sm" style={{ background: "var(--rust)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
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
        <div className="p-4 mb-3" style={{ background: "var(--paper)", border: "1px dashed var(--sand-dark)", fontFamily: "'IBM Plex Mono', monospace" }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold" style={{ color: "var(--navy)" }}>{order.orderNo}</span>
                <span className="text-[10px] px-2 py-0.5" style={{ background: STATUS_COLOR[order.status] + "22", color: STATUS_COLOR[order.status] }}>{order.status}</span>
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
                        <button onClick={() => onCancel(order.id)} className="text-[10px] px-2 py-1" style={{ border: "1px solid #C0392B", color: "#C0392B" }}>İptal</button>
                    )}
                    {next && (
                        <button onClick={() => onAdvance(order.id, next)} className="text-[10px] px-2 py-1 font-semibold" style={{ background: "var(--sea)", color: "#FFFFFF" }}>
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
            <div className="sticky top-0 z-10" style={{ background: "var(--paper)", borderBottom: "1px solid var(--sand-dark)" }}>
                <div className="max-w-7xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="flex items-center gap-1 text-sm" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}><ArrowLeft size={14} /> Site</button>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--navy)" }} className="text-xl">MUTFAK & SİPARİŞ YÖNETİMİ</span>
                    </div>
                    <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Sipariş no / ad / telefon ara..."
                        className="px-3 py-2 text-sm w-64"
                        style={{ background: "var(--paper)", border: "1px solid var(--sand-dark)", fontFamily: "'Work Sans', sans-serif" }}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 py-6">
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-4" style={{ background: "var(--paper)" }}>
                        <div className="text-xs uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Bugünkü Sipariş</div>
                        <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{today.length}</div>
                    </div>
                    <div className="p-4" style={{ background: "var(--paper)" }}>
                        <div className="text-xs uppercase" style={{ color: "var(--stone)", fontFamily: "'Work Sans', sans-serif" }}>Bekleyen</div>
                        <div className="text-2xl" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--navy)" }}>{pending}</div>
                    </div>
                    <div className="p-4" style={{ background: "var(--paper)" }}>
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
    const [view, setView] = useState("site");
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
        --navy: #10333D;
        --sea: #2A8A9E;
        --sea-deep: #1E6B7A;
        --sea-light: #A9DCE4;
        --sea-mist: #EDF6F8;
        --sand: #F4EFE3;
        --sand-dark: #E2DAC7;
        --stone: #6B7280;
        --paper: #FAF7F0;
        --rust: #B4472B;
        --rope: #C9BFA0;
      }
      * { box-sizing: border-box; }
      ::selection { background: var(--rust); color: #FFF; }
      button { cursor: pointer; }
      button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
        outline: 2px solid var(--rust); outline-offset: 2px;
      }
      .kaya-hero-headline { font-size: 3.4rem; }
      @media (min-width: 768px) {
        .kaya-hero-headline { font-size: 4.2rem; }
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
            <MenuSection onPick={(id) => { setPresetFish(id); scrollTo("order"); }} />
            <TornEdge flip fill="var(--sea-mist)" />
            <OrderSection presetFish={presetFish} addOrder={addOrder} />
            <Footer onAdminClick={() => setView("login")} />
        </div>
    );
}