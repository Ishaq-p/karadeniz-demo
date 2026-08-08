"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Fish, Salad, Waves, Wine, Cake, Sparkles, Bell, Search, X, Check,
  ChevronRight, Info, Star, Leaf, Flame, ShoppingBag, ShieldCheck,
  RefreshCw, Plus, Minus, MapPin, Hash, Sunset, ChefHat, Feather,
  Milk, Wheat, ExternalLink, Navigation, Share2, Languages, ArrowLeft,
  Table,
  LucideTable,
  LampDesk,
  Utensils,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets & Settings                                          */
/* ---------------------------------------------------------------- */

const TABLE_NUMBER = "12";
const MENU_UPDATED = "01.08.2026";
const MAP_LINK = "https://share.google/4JtmTNX61kfIRupDM";
const INSTAGRAM_LINK = "https://www.ExternalLink.com/ziyafat/";
const WHATSAPP_LINK =
  "https://wa.me/?text=" +
  encodeURIComponent("Ziyafat — Shahr-e-Naw. Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
  tr: {
    demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
    subtitle: "Shahr-e-Naw · Kabul",
    table: "Masa",
    greeting: "Her Masa Bir Hikaye Anlatır",
    greetingSub: "Bu akşam sofranıza hoş geldiniz",
    aiEyebrow: "Şefin Önerisi",
    aiIdleTitle: "Size özel bir öneri ister misiniz?",
    aiIdleSub: "2 kısa soruyla o anki iştahınıza en uygun lezzeti buluyoruz.",
    aiStart: "Öneri Al",
    aiQ1: "Bu akşam canınız ne çekiyor?",
    aiQ1Options: [
      { key: "fish", label: "Balık" },
      { key: "seafood", label: "Deniz Mahsulleri" },
      { key: "starters", label: "Hafif Başlangıç" },
    ],
    aiQ2: "Baharatlı olsun mu?",
    aiQ2Options: [
      { key: "yes", label: "Evet, baharatlı olsun" },
      { key: "no", label: "Hayır, klasik kalsın" },
    ],
    aiResultEyebrow: "Tercihlerinize göre önerimiz",
    aiCta: "Sepete Ekle",
    aiRetry: "Yeniden Sor",
    back: "Geri",
    searchPlaceholder: "Menüde ara…",
    filters: { popular: "Popüler", veg: "Vejetaryen", spicy: "Acılı", light: "Hafif", chef: "Şefin Seçimi" },
    addToCart: "Ekle",
    added: "Eklendi",
    cartTitle: "Sepetiniz",
    cartEmpty: "Sepetiniz henüz boş",
    cartEmptySub: "Menüden lezzet seçmeye başlayın",
    subtotal: "Ara Toplam",
    confirmOrder: "Siparişi Onayla",
    demoNotice: "Bu bir demo sürümüdür — gerçek sipariş alınmaz.",
    callWaiter: "Garson Çağır",
    waiterCalled: "Garson çağırıldı, hemen geliyor",
    legalBadge: "Yasal Uyum",
    legalTooltip:
      "11 Ekim 2025 yönetmeliğine uygun dijital fiyat sunumu — QR menünüz mevzuata tam uyumludur.",
    lastUpdated: "Menü son güncelleme",
    navMenu: "Menü",
    navCart: "Sepet",
    navWaiter: "Garson",
    navLang: "Dil",
    kcal: "kcal",
    noResults: "Aramanızla eşleşen ürün bulunamadı",
    close: "Kapat",
    ingredients: "Malzemeler",
    allergens: "Alerjenler",
    noAllergens: "Bilinen majör alerjen içermez",
    detailsCta: "Sepete ekle",
    location: "Konum",
    locationName: "Ziyafat Restaurant",
    locationSub: "Shahr-e-Naw, Kabul — Beş yıldızlı akşam yemeği ritüeli",
    openMap: "Haritada Aç",
    shareWA: "Konumu Paylaş",
    followUs: "Bizi Takip Edin",
  },
  en: {
    demoTopBanner: "LIVE PREVIEW — built with sample data",
    subtitle: "Shahr-e-Naw · Kabul",
    table: "Table",
    greeting: "Every Table Tells a Story",
    greetingSub: "Welcome to your table tonight",
    aiEyebrow: "Chef's Recommendation",
    aiIdleTitle: "Want a pick made just for you?",
    aiIdleSub: "Two quick questions and we'll match a dish to your appetite.",
    aiStart: "Get a recommendation",
    aiQ1: "What are you in the mood for tonight?",
    aiQ1Options: [
      { key: "fish", label: "Fish" },
      { key: "seafood", label: "Seafood" },
      { key: "starters", label: "Something light" },
    ],
    aiQ2: "Do you like it spicy?",
    aiQ2Options: [
      { key: "yes", label: "Yes, bring the heat" },
      { key: "no", label: "No, keep it classic" },
    ],
    aiResultEyebrow: "Based on your answers",
    aiCta: "Add to cart",
    aiRetry: "Ask again",
    back: "Back",
    searchPlaceholder: "Search the menu…",
    filters: { popular: "Popular", veg: "Vegetarian", spicy: "Spicy", light: "Light", chef: "Chef's Pick" },
    addToCart: "Add",
    added: "Added",
    cartTitle: "Your cart",
    cartEmpty: "Your cart is empty",
    cartEmptySub: "Start picking flavors from the menu",
    subtotal: "Subtotal",
    confirmOrder: "Confirm order",
    demoNotice: "This is a demo build — no real order is placed.",
    callWaiter: "Call waiter",
    waiterCalled: "Waiter notified, on the way",
    legalBadge: "Compliant",
    legalTooltip:
      "Meets Turkey's Oct 11, 2025 digital pricing regulation — your QR menu is fully compliant.",
    lastUpdated: "Menu last updated",
    navMenu: "Menu",
    navCart: "Cart",
    navWaiter: "Waiter",
    navLang: "Lang",
    kcal: "kcal",
    noResults: "No dishes match your search",
    close: "Close",
    ingredients: "Ingredients",
    allergens: "Allergens",
    noAllergens: "No major allergens",
    detailsCta: "Add to cart",
    location: "Location",
    locationName: "Ziyafat Restaurant",
    locationSub: "Shahr-e-Naw, Kabul — A five-star dining ritual",
    openMap: "Open in maps",
    shareWA: "Share location",
    followUs: "Follow us",
  },
};

const CATEGORIES = [
  { key: "starters", icon: Salad, label: { tr: "Başlangıçlar", en: "Starters" } },
  { key: "fish", icon: Fish, label: { tr: "Balıklar", en: "Fish Mains" } },
  { key: "seafood", icon: Waves, label: { tr: "Deniz Mahsulleri", en: "Seafood" } },
  { key: "drinks", icon: Wine, label: { tr: "İçecekler", en: "Drinks" } },
  { key: "desserts", icon: Cake, label: { tr: "Tatlılar", en: "Desserts" } },
];

const ALLERGEN_META = {
  fish: { icon: Fish, label: { tr: "Balık", en: "Fish" } },
  shellfish: { icon: Waves, label: { tr: "Kabuklu Deniz Ürünü", en: "Shellfish" } },
  dairy: { icon: Milk, label: { tr: "Süt Ürünü", en: "Dairy" } },
  gluten: { icon: Wheat, label: { tr: "Gluten", en: "Gluten" } },
};

const FILTER_KEYS = ["popular", "veg", "spicy", "light", "chef"];
const FILTER_ICON = { popular: Star, veg: Leaf, spicy: Flame, light: Feather, chef: ChefHat };

const img = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

const ITEMS = [
  {
    id: "corba", category: "starters", price: 180, kcal: 210, tags: ["popular", "light"], img: img(23627792),
    allergens: ["shellfish", "fish"],
    ingredients: [{ n: "Karides", a: "60 g" }, { n: "Kalamar", a: "50 g" }, { n: "Midye", a: "40 g" }, { n: "Balık suyu", a: "250 ml" }],
    name: { tr: "Deniz Mahsulleri Çorbası", en: "Seafood Soup" },
    desc: { tr: "Karides, kalamar ve midye ile hazırlanan doyurucu ev yapımı çorba.", en: "Hearty homemade soup with shrimp, calamari and mussels." }
  },
  {
    id: "borulce", category: "starters", price: 160, kcal: 120, tags: ["veg", "light"], img: img(1640777),
    allergens: [],
    ingredients: [{ n: "Deniz börülcesi", a: "150 g" }, { n: "Zeytinyağı", a: "20 ml" }, { n: "Limon", a: "1/2 adet" }, { n: "Sarımsak", a: "1 diş" }],
    name: { tr: "Deniz Börülcesi Salatası", en: "Sea Beans Salad" },
    desc: { tr: "Zeytinyağlı deniz börülcesi, taze limon ve sarımsakla.", en: "Sea beans tossed in olive oil with fresh lemon and garlic." }
  },
  {
    id: "kalamar", category: "starters", price: 220, kcal: 340, tags: ["popular", "chef"], img: img(15801015),
    allergens: ["shellfish", "gluten"],
    ingredients: [{ n: "Kalamar halkası", a: "220 g" }, { n: "Mısır unu", a: "40 g" }, { n: "Tartar sos", a: "30 g" }],
    name: { tr: "Kalamar Tava", en: "Fried Calamari" },
    desc: { tr: "Çıtır kalamar halkaları, özel tartar sos eşliğinde.", en: "Crispy calamari rings served with house tartar sauce." }
  },
  {
    id: "hamsi", category: "fish", price: 320, kcal: 390, tags: ["popular", "chef"], img: img(22742007),
    allergens: ["fish", "gluten"],
    ingredients: [{ n: "Taze hamsi", a: "250 g" }, { n: "Mısır unu", a: "35 g" }, { n: "Ayçiçek yağı", a: "15 ml" }],
    name: { tr: "Hamsi Tava", en: "Fried Anchovy" },
    desc: { tr: "Karadeniz’in meşhur hamsisi, mısır unuyla çıtır çıtır kızartılır.", en: "The Black Sea’s famous anchovy, crisply fried in cornmeal." }
  },
  {
    id: "levrek", category: "fish", price: 450, kcal: 410, tags: ["light", "chef"], img: img(8639151),
    allergens: ["fish"],
    ingredients: [{ n: "Levrek fileto", a: "280 g" }, { n: "Zeytinyağı", a: "15 ml" }, { n: "Mevsim yeşillik", a: "50 g" }],
    name: { tr: "Levrek Izgara", en: "Grilled Sea Bass" },
    desc: { tr: "Odun ateşinde ızgara taze levrek, mevsim yeşillikleriyle.", en: "Fresh sea bass grilled over wood fire, with seasonal greens." }
  },
  {
    id: "cupra", category: "fish", price: 480, kcal: 380, tags: ["light"], img: img(11653557),
    allergens: ["fish"],
    ingredients: [{ n: "Çupra fileto", a: "280 g" }, { n: "Kereviz, havuç, soğan", a: "80 g" }, { n: "Beyaz şarap", a: "30 ml" }],
    name: { tr: "Çupra Buğulama", en: "Steamed Sea Bream" },
    desc: { tr: "Sebzelerle buğulanmış, hafif ve lezzetli çupra.", en: "Light, flavorful sea bream gently steamed with vegetables." }
  },
  {
    id: "kalkan", category: "fish", price: 650, kcal: 430, tags: ["popular", "chef"], img: img(35509727),
    allergens: ["fish", "dairy"],
    ingredients: [{ n: "Kalkan fileto", a: "300 g" }, { n: "Tereyağı", a: "20 g" }, { n: "Limon", a: "1/2 adet" }],
    name: { tr: "Kalkan Izgara", en: "Grilled Turbot" },
    desc: { tr: "Karadeniz’in en özel balığı, ızgarada kendi suyunda pişer.", en: "The Black Sea’s most prized catch, grilled to perfection." }
  },
  {
    id: "midye", category: "seafood", price: 140, kcal: 260, tags: ["popular"], img: img(4445243),
    allergens: ["shellfish"],
    ingredients: [{ n: "Midye (kabuklu)", a: "6 adet" }, { n: "Baharatlı pilav iç harcı", a: "90 g" }],
    name: { tr: "Midye Dolma (6 adet)", en: "Stuffed Mussels (6 pcs)" },
    desc: { tr: "Baharatlı pilavla doldurulmuş taze midye.", en: "Fresh mussels stuffed with spiced rice." }
  },
  {
    id: "karides", category: "seafood", price: 380, kcal: 420, tags: ["spicy"], img: img(5041485),
    allergens: ["shellfish", "dairy"],
    ingredients: [{ n: "Karides", a: "220 g" }, { n: "Domates sos", a: "120 g" }, { n: "Kaşar peyniri", a: "40 g" }, { n: "Acı biber", a: "15 g" }],
    name: { tr: "Karides Güveç", en: "Shrimp Casserole" },
    desc: { tr: "Domates sos, kaşar peyniri ve acı biberle güveçte karides.", en: "Shrimp casserole with tomato sauce, cheese and chili." }
  },
  {
    id: "ayran", category: "drinks", price: 60, kcal: 90, tags: ["veg", "light"], img: img(27757405),
    allergens: ["dairy"],
    ingredients: [{ n: "Yoğurt", a: "200 ml" }, { n: "Su", a: "80 ml" }, { n: "Tuz", a: "1 g" }],
    name: { tr: "Ayran", en: "Ayran (Yogurt Drink)" },
    desc: { tr: "Ev yapımı, soğuk servis.", en: "Homemade, served chilled." }
  },
  {
    id: "portakal", category: "drinks", price: 90, kcal: 110, tags: ["veg", "light"], img: img(5946803),
    allergens: [],
    ingredients: [{ n: "Taze portakal", a: "3 adet" }],
    name: { tr: "Taze Sıkma Portakal Suyu", en: "Fresh Orange Juice" },
    desc: { tr: "Günlük sıkılan taze portakal suyu.", en: "Freshly squeezed, every morning." }
  },
  {
    id: "raki", category: "drinks", price: 750, kcal: 0, tags: [], img: img(8375042),
    allergens: [],
    ingredients: [{ n: "Rakı", a: "35 cl" }, { n: "Su & buz", a: "servis ile" }],
    name: { tr: "Rakı (35cl)", en: "Rakı (35cl)" },
    desc: { tr: "Yerli üretim, buz ve su ile servis edilir.", en: "Local production, served with ice and water." }
  },
  {
    id: "sutlac", category: "desserts", price: 140, kcal: 280, tags: ["veg", "popular"], img: img(37825038),
    allergens: ["dairy"],
    ingredients: [{ n: "Süt", a: "250 ml" }, { n: "Pirinç", a: "40 g" }, { n: "Şeker", a: "30 g" }],
    name: { tr: "Fırın Sütlaç", en: "Baked Rice Pudding" },
    desc: { tr: "Fırında kızartılmış, geleneksel tarif.", en: "Oven-baked with a traditional recipe." }
  },
  {
    id: "kadayif", category: "desserts", price: 160, kcal: 340, tags: ["veg", "chef"], img: img(15794017),
    allergens: ["gluten", "dairy"],
    ingredients: [{ n: "Tel kadayıf", a: "150 g" }, { n: "Ceviz içi", a: "50 g" }, { n: "Şerbet", a: "80 ml" }],
    name: { tr: "Kadayıf Dolması", en: "Stuffed Kadayif" },
    desc: { tr: "Cevizli kadayıf, şerbetli ve sıcak servis edilir.", en: "Walnut-stuffed kadayif, served warm with syrup." }
  },
];

const fmtTL = (n) => n.toLocaleString("tr-TR") + " ₺";

function pickAiSuggestion(q1, q2) {
  let pool = ITEMS.filter((i) => i.category === q1);
  if (pool.length === 0) pool = ITEMS;
  const wantSpicy = q2 === "yes";
  let match = pool.find((i) => i.tags.includes("spicy") === wantSpicy && (!wantSpicy || i.tags.includes("spicy")));
  if (!match) match = pool.find((i) => (wantSpicy ? i.tags.includes("spicy") : !i.tags.includes("spicy")));
  if (!match) match = pool.find((i) => i.tags.includes("popular"));
  if (!match) match = pool[0];
  return match;
}

/* ---------------------------------------------------------------- */
/* Component                                                          */
/* ---------------------------------------------------------------- */

export default function QrMenuDemo() {
  const [lang, setLang] = useState("en");
  const [activeCategory, setActiveCategory] = useState("fish");
  const [activeFilters, setActiveFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [waiterToast, setWaiterToast] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPhase, setAiPhase] = useState("idle"); // idle | q1 | q2 | result
  const [aiAnswers, setAiAnswers] = useState({ q1: null, q2: null });
  const [aiAdded, setAiAdded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [legalTip, setLegalTip] = useState(false);
  const [flashId, setFlashId] = useState(null);
  const waiterTimer = useRef(null);
  const t = UI[lang];

  useEffect(() => () => clearTimeout(waiterTimer.current), []);

  const itemsByCategory = useMemo(() => {
    let list = search.trim()
      ? ITEMS.filter((i) => (i.name.tr + i.name.en).toLowerCase().includes(search.toLowerCase()))
      : ITEMS.filter((i) => i.category === activeCategory);
    if (activeFilters.length) {
      list = list.filter((i) => activeFilters.every((f) => i.tags.includes(f)));
    }
    return list;
  }, [activeCategory, activeFilters, search]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = ITEMS.find((i) => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  function addToCart(id, qty = 1) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
    setFlashId(id);
    setTimeout(() => setFlashId((f) => (f === id ? null : f)), 900);
  }
  function changeQty(id, delta) {
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }
  function callWaiter() {
    setWaiterToast(true);
    clearTimeout(waiterTimer.current);
    waiterTimer.current = setTimeout(() => setWaiterToast(false), 3200);
  }
  function toggleFilter(key) {
    setActiveFilters((f) => (f.includes(key) ? f.filter((k) => k !== key) : [...f, key]));
  }
  function openDetail(item) {
    setSelectedItem(item);
    setDetailQty(1);
  }
  function chooseQ1(key) {
    setAiAnswers((a) => ({ ...a, q1: key }));
    setAiPhase("q2");
  }
  function chooseQ2(key) {
    setAiAnswers((a) => ({ ...a, q2: key }));
    setAiPhase("result");
  }
  function resetAi() {
    setAiAnswers({ q1: null, q2: null });
    setAiPhase("idle");
  }
  function addAiSuggestion(item) {
    addToCart(item.id, 1);
    setAiAdded(true);
    setTimeout(() => {
      setAiAdded(false);
      setShowAiModal(false);
      setAiPhase("idle");
    }, 1200);
  }

  const aiResult = aiPhase === "result" ? pickAiSuggestion(aiAnswers.q1, aiAnswers.q2) : null;
  const isModalOpen = showAiModal || showCart || !!selectedItem;

  return (
    <div className="qrm-root" lang={lang === "tr" ? "tr-TR" : "en-US"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

        .qrm-root {
          --burgundy: #6e1a1f; --burgundy-deep: #4a1014;
          --walnut: #241209; --walnut-deep: #170a04;
          --navy: #1c2438; --ivory: #f3ead9; --ivory-deep: #e8dcc2;
          --turquoise: #2c8c86; --turquoise-bright: #3fb0a8;
          --gold: #c9973f; --gold-bright: #e3b158;
          font-family: 'Jost', sans-serif;
          min-height: 100vh; width: 100%; position: relative;
          display: flex; flex-direction: column; align-items: center;
          padding: 28px 16px 44px;
          background: var(--walnut-deep);
          color: var(--ivory);
          box-sizing: border-box;
        }
        .qrm-root * { box-sizing: border-box; }
        .qrm-serif { font-family: 'Fraunces', serif; }

        .qrm-skyline { display: none; }

        .qrm-topcap {
          font-size: 10.5px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--gold-bright);
          background: var(--burgundy-deep); border: 1px solid rgba(201,151,63,0.3);
          padding: 7px 16px; border-radius: 0; margin-bottom: 16px; text-align: center; position: relative; z-index: 2;
        }
        .qrm-brandrow { display: flex; flex-direction: column; align-items: center; margin-bottom: 18px; position: relative; z-index: 2; }
        
        .qrm-logo { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 500; color: var(--ivory); display: flex; align-items: baseline; gap: 4px; }
        .qrm-logo .dot { color: var(--turquoise-bright); }

        .qrm-phone {
          position: relative; z-index: 2;
          width: min(390px, 94vw);
          height: min(844px, calc(min(390px, 94vw) * 844 / 390));
          border-radius: 44px; padding: 12px;
          background: linear-gradient(160deg, #1c1c1e, #050505);
          box-shadow: 0 40px 90px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06) inset;
        }
        .qrm-screen {
          position: relative; width: 100%; height: 100%; border-radius: 33px; overflow: hidden;
          background: var(--walnut-deep); display: flex; flex-direction: column;
        }
        
        .qrm-grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: .05; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .qrm-notch { position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 104px; height: 20px; background: #000; border-radius: 14px; z-index: 30; }
        .qrm-status { display: flex; justify-content: space-between; padding: 13px 24px 0; font-size: 11.5px; font-weight: 700; color: rgba(243,234,217,0.7); flex-shrink: 0; position: relative; z-index: 2;}
        .qrm-table {
          display: flex; align-items: center; justify-content: center; gap: 5px; margin: 6px auto 0; width: fit-content;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--walnut-deep);
          background: var(--gold-bright); padding: 4px 12px; border-radius: 0; flex-shrink: 0; position: relative; z-index: 2;
        }

        .qrm-scroll { flex: 1; overflow-y: auto; padding-bottom: 10px; scrollbar-width: thin; scrollbar-color: var(--gold-bright) transparent; position: relative; z-index: 2; }
        .qrm-scroll::-webkit-scrollbar { width: 4px; }
        .qrm-scroll::-webkit-scrollbar-track { background: transparent; }
        .qrm-scroll::-webkit-scrollbar-thumb { background: var(--gold); }

        .qrm-header {
          padding: 9px 12px; display: flex; align-items: center; 
          gap: 10px; flex-shrink: 0; position: sticky; top: 0; 
          z-index: 40; background: var(--walnut-deep);
          border-bottom: 1px solid rgba(243,234,217,0.08);
        }
        
        .qrm-headlogo { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 500; color: var(--ivory); display: flex; align-items: baseline; gap: 2px; }
        .qrm-headlogo .dot { color: var(--turquoise-bright); }

        .qrm-hsub { font-size: 10px; color: var(--gold-bright); font-family: 'Cormorant Garamond', serif; font-style: italic; margin-top: 1px; }
        
        .qrm-legal {
          margin-left: auto; display: flex; align-items: center; gap: 5px;
          background: rgba(63,176,168,0.1); border: 1px solid rgba(63,176,168,0.32);
          padding: 5px 9px; font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: .05em;
          color: var(--turquoise-bright); cursor: pointer; white-space: nowrap; border-radius: 0;
        }
        .qrm-legaltip {
          position: absolute; top: 50px; right: 14px; width: 206px; z-index: 40;
          background: var(--walnut); border: 1px solid rgba(201,151,63,0.3);
          padding: 11px 12px; font-size: 10px; line-height: 1.5; color: var(--ivory);
          box-shadow: 0 12px 30px rgba(0,0,0,0.5);
        }
        .qrm-legaltip b { color: var(--gold-bright); display: block; margin-top: 6px; font-size: 9.5px; font-weight: 500; }

        .qrm-hero { position: relative; padding: 14px 18px 34px; overflow: hidden; flex-shrink: 0;
          background: radial-gradient(ellipse 80% 90% at 50% 0%, var(--burgundy-deep) 0%, transparent 80%); }
        .qrm-hero-wave { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
        .qrm-greet { display: flex; align-items: center; gap: 8px; font-size: 24px; font-family: 'Fraunces', serif; font-weight: 400; color: var(--ivory); position: relative; z-index: 2; line-height: 1.1;}
        .qrm-greetsub { font-size: 14px; color: var(--ivory-deep); font-family: 'Cormorant Garamond', serif; font-style: italic; margin-top: 6px; position: relative; z-index: 2;}

        /* AI Trigger Banner */
        .qrm-ai-trigger {
          margin: -16px 16px 16px; position: relative; z-index: 5;
          background: var(--burgundy-deep);
          border: 1px solid rgba(201,151,63,0.4);
          padding: 16px; display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; box-shadow: 0 14px 30px rgba(0,0,0,0.5); text-align: left;
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
          transition: background 0.2s;
        }
        .qrm-ai-trigger::before {
          content: ''; position: absolute; top: 0; left: 16px; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--turquoise-bright), var(--gold));
        }
        .qrm-ai-trigger:active { background: #3c0d10; }
        .qrm-ai-trigger-left { display: flex; flex-direction: column; gap: 4px; }
        .qrm-ai-trigger-sub { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-bright); display: flex; align-items: center; gap: 6px; }
        .qrm-ai-trigger-title { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 500; color: var(--ivory); }
        .qrm-ai-trigger-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: var(--gold-bright); background: rgba(227,177,88,0.1); border-radius: 50%; }

        .qrm-ai-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 400; color: var(--ivory); line-height: 1.3; }
        .qrm-ai-sub { font-size: 13px; color: rgba(243,234,217,0.7); margin-top: 4px; line-height: 1.4; }
        .qrm-ai-name { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500; color: var(--ivory); }
        .qrm-ai-reason { font-size: 13px; color: rgba(243,234,217,0.7); margin-top: 4px; line-height: 1.5; }
        .qrm-ai-row { display: flex; align-items: center; gap: 8px; margin-top: 24px; flex-wrap: wrap; }
        .qrm-ai-options { display: flex; flex-direction: column; gap: 8px; margin-top: 18px; }
        .qrm-ai-opt {
          text-align: left; font-size: 13px; font-weight: 500; color: var(--ivory); font-family: 'Jost', sans-serif;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(201,151,63,0.3); border-radius: 0;
          padding: 14px 16px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;
          transition: background 0.2s;
        }
        .qrm-ai-opt:active { background: rgba(201,151,63,0.15); border-color: var(--gold-bright); }
        .qrm-ai-back { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .05em; color: var(--turquoise-bright); background: none; border: none; cursor: pointer; margin-bottom: 16px; font-family: 'Jost', sans-serif;}

        .qrm-btn-gold {
          font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--walnut-deep); border: none; cursor: pointer;
          background: var(--gold-bright);
          padding: 14px 20px; display: flex; align-items: center; gap: 6px;
          font-family: 'Jost', sans-serif; transition: transform .15s ease;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        .qrm-btn-gold:active { transform: scale(0.96); }
        .qrm-btn-ghost {
          font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ivory); background: transparent;
          border: 1px solid rgba(243,234,217,0.3); padding: 12px 16px;
          cursor: pointer; display: flex; align-items: center; gap: 5px; font-family: 'Jost', sans-serif;
        }

        .qrm-searchwrap { padding: 16px 16px 4px; flex-shrink: 0; position: relative; z-index: 2;}
        .qrm-search { 
          display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(243,234,217,0.15); padding: 10px 14px; 
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }
        .qrm-search input { background: transparent; border: none; outline: none; color: var(--ivory); font-size: 12.5px; width: 100%; font-family: 'Jost', sans-serif; }
        .qrm-search input::placeholder { color: rgba(243,234,217,0.4); }

        .qrm-filters { display: flex; gap: 7px; padding: 10px 16px 2px; flex-shrink: 0; overflow-x: auto; scrollbar-width: none; position: relative; z-index: 2;}
        .qrm-filters::-webkit-scrollbar { display: none; }
        .qrm-chip {
          display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 500; text-transform: uppercase; letter-spacing: .05em;
          padding: 8px 16px; white-space: nowrap; cursor: pointer;
          border: 1px solid rgba(243,234,217,0.15); color: rgba(243,234,217,0.7); background: rgba(255,255,255,0.02);
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }
        .qrm-chip.active { background: var(--turquoise); border-color: var(--turquoise); color: var(--ivory); }

        .qrm-cats { display: flex; gap: 8px; padding: 14px 16px 4px; overflow-x: auto; flex-shrink: 0; scrollbar-width: none; position: relative; z-index: 2;}
        .qrm-cats::-webkit-scrollbar { display: none; }
        .qrm-cat { 
          display: flex; flex-direction: column; align-items: center; gap: 6px; justify-content: center;
          cursor: pointer; padding: 14px 12px; background: var(--burgundy);
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
          min-width: 80px; aspect-ratio: auto; 
        }
        .qrm-cat.active { background: var(--turquoise); }
        .qrm-cat span { font-size: 9px; font-weight: 500; text-transform: uppercase; color: rgba(243,234,217,0.8); text-align: center; white-space: pre-wrap; line-height: 1.2; }
        .qrm-cat.active span { color: var(--ivory); font-weight: 600; }

        .qrm-list { padding: 12px 16px 80px; display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 2;}
        .qrm-empty { text-align: center; padding: 40px 20px; color: rgba(243,234,217,0.5); font-size: 12px; }
        .qrm-card { 
          display: flex; gap: 14px; background: #1f0f06; border: 1px solid rgba(201,151,63,0.3); padding: 14px; cursor: pointer; position: relative; 
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
        }
        .qrm-card::before { content: ''; position: absolute; top: 0; left: 16px; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold), var(--turquoise-bright), var(--gold)); }
        .qrm-card:active { background: #261308; }
        .qrm-tile { width: 64px; height: 64px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;
          background: var(--walnut); border: 1px solid rgba(201,151,63,0.3); 
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }
        .qrm-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .qrm-cardbody { flex: 1; min-width: 0; }
        .qrm-cname { font-size: 16px; font-family: 'Fraunces', serif; font-weight: 500; color: var(--ivory); line-height: 1.15; }
        .qrm-cdesc { font-size: 11px; color: rgba(243,234,217,0.6); margin-top: 4px; line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .qrm-allergrow { display: flex; gap: 5px; margin-top: 8px; }
        .qrm-allericon { width: 18px; height: 18px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: rgba(243,234,217,0.5); }
        .qrm-cmeta { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .qrm-price { font-family: 'Fraunces', serif; font-size: 15px; font-style: italic; color: var(--gold-bright); white-space: nowrap; }
        .qrm-kcal { font-size: 10px; color: rgba(243,234,217,0.4); text-transform: uppercase; letter-spacing: .05em; }
        .qrm-addbtn { width: 30px; height: 30px; border: none; cursor: pointer;
          background: var(--gold-bright); color: var(--walnut-deep);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; align-self: flex-end; 
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px); }
        .qrm-addbtn.done { background: var(--turquoise-bright); color: var(--ivory); }

        .qrm-location { margin: 6px 16px 0; padding: 18px; background: rgba(255,255,255,0.02); border: 1px solid rgba(243,234,217,0.15); position: relative; z-index: 2;}
        .qrm-loctitle { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-bright); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .qrm-locname { font-size: 16px; font-family: 'Fraunces', serif; font-weight: 500; color: var(--ivory); }
        .qrm-locsub { font-size: 11px; color: rgba(243,234,217,0.55); margin-top: 4px; line-height: 1.4; }
        .qrm-locbtns { display: flex; gap: 10px; margin-top: 14px; }
        .qrm-locbtns a { text-decoration: none; flex: 1; }
        .qrm-locbtn { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; padding: 12px; }
        .qrm-follow { display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(243,234,217,0.15); }
        .qrm-follow a { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; color: var(--ivory); text-decoration: none; letter-spacing: .05em;}

        .qrm-fab { position: absolute; right: 16px; bottom: 84px; z-index: 20; display: flex; align-items: center; gap: 8px; padding: 14px 20px;
          background: var(--burgundy); color: var(--ivory); font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .1em; border: 1px solid var(--gold); cursor: pointer;
          box-shadow: 0 14px 26px rgba(0,0,0,0.5); font-family: 'Jost', sans-serif; 
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px); }

        .qrm-toast { position: absolute; left: 16px; right: 16px; bottom: 88px; z-index: 50; background: var(--burgundy); border: 1px solid var(--gold);
          padding: 12px 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 500; color: var(--ivory);
          box-shadow: 0 14px 30px rgba(0,0,0,0.5); animation: qrmUp .28s ease; }
        @keyframes qrmUp { from { opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }

        .qrm-nav { display: flex; flex-shrink: 0; border-top: 1px solid var(--gold); background: rgba(23,10,4,0.96); padding: 12px 6px 16px; position: relative; z-index: 20;}
        .qrm-navitem { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; position: relative; color: rgba(243,234,217,0.45); background: none; border: none; font-family: 'Jost', sans-serif; }
        .qrm-navitem.active { color: var(--gold-bright); }
        .qrm-navitem span { font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: .1em; }
        .qrm-navbadge { position: absolute; top: -4px; right: 22%; background: var(--turquoise-bright); color: var(--walnut-deep); font-size: 9px; font-weight: 600; min-width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; padding: 0 4px; }

        .qrm-sheet-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.65); z-index: 60; display: flex; align-items: flex-end; }
        .qrm-sheet { width: 100%; max-height: 85%; background: var(--walnut); overflow-y: auto; animation: qrmUp .25s ease; border-top: 2px solid var(--gold-bright);
          scrollbar-width: thin; scrollbar-color: var(--gold-bright) transparent; }
        .qrm-sheet::-webkit-scrollbar { width: 4px; }
        .qrm-sheet::-webkit-scrollbar-thumb { background: var(--gold-bright); }
        .qrm-sheet-handle { width: 40px; height: 3px; background: rgba(243,234,217,0.2); margin: 12px auto 6px; }
        .qrm-sheet-head { display: flex; justify-content: space-between; align-items: center; padding: 10px 20px 6px; }
        .qrm-sheet-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 400; color: var(--ivory); }
        .qrm-iconbtn { background: rgba(255,255,255,0.05); border: 1px solid rgba(243,234,217,0.2); color: var(--ivory); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .qrm-detail-tile { height: 160px; display: flex; align-items: center; justify-content: center; margin: 16px 20px 0; overflow: hidden;
          background: #1f0f06; border: 1px solid rgba(201,151,63,0.3); }
        .qrm-detail-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .qrm-detail-name { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 500; color: var(--ivory); padding: 20px 20px 0; line-height: 1.1; }
        .qrm-detail-desc { font-size: 13px; color: rgba(243,234,217,0.7); line-height: 1.6; padding: 10px 20px 0; }
        .qrm-detail-section { padding: 16px 20px 0; }
        .qrm-detail-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-bright); margin-bottom: 10px; }
        .qrm-ingrow { display: flex; justify-content: space-between; font-size: 12px; color: rgba(243,234,217,0.8); padding: 6px 0; border-bottom: 1px dashed rgba(243,234,217,0.2); }
        .qrm-ingrow span:last-child { color: rgba(243,234,217,0.5); }
        .qrm-tagpills { display: flex; gap: 8px; flex-wrap: wrap; }
        .qrm-tagpill { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; color: rgba(243,234,217,0.8); background: rgba(255,255,255,0.03); border: 1px solid rgba(243,234,217,0.2); padding: 8px 12px; }
        .qrm-detail-foot { display: flex; align-items: center; justify-content: space-between; padding: 24px 20px 32px; gap: 16px; }
        .qrm-stepper { display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(243,234,217,0.2); padding: 8px 12px; }
        .qrm-stepper button { width: 26px; height: 26px; border: none; background: rgba(255,255,255,0.05); color: var(--ivory); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .qrm-stepper span { font-weight: 500; font-size: 15px; min-width: 18px; text-align: center; }

        .qrm-cartrow { display: flex; gap: 14px; padding: 14px 20px; align-items: center; }
        .qrm-cartinfo { flex: 1; }
        .qrm-cartname { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 500; color: var(--ivory); line-height: 1.2; }
        .qrm-cartprice { font-family: 'Fraunces', serif; font-size: 12px; font-style: italic; color: var(--gold-bright); margin-top: 4px; }
        .qrm-cartfoot { padding: 16px 20px 32px; border-top: 1px solid rgba(243,234,217,0.15); margin-top: 10px; }
        .qrm-subtotalrow { display: flex; justify-content: space-between; margin-bottom: 16px; align-items: baseline; }
        .qrm-subtotalrow span:first-child { font-size: 13px; color: rgba(243,234,217,0.6); text-transform: uppercase; letter-spacing: .05em; }
        .qrm-subtotalrow span:last-child { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500; color: var(--gold-bright); }
        .qrm-confirmbtn { width: 100%; background: var(--gold-bright); color: var(--walnut-deep); border: none; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .1em; padding: 16px; cursor: pointer; font-family: 'Jost', sans-serif; 
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px); }
        .qrm-demonote { text-align: center; font-size: 10px; color: rgba(243,234,217,0.4); margin-top: 12px; }

        .qrm-footercap { margin-top: 20px; font-size: 11px; color: rgba(243,234,217,0.4); text-align: center; position: relative; z-index: 2; max-width: 340px; line-height: 1.5; }

        @media (max-width: 600px) {
          .qrm-root {
            padding: 0;
          }
          .qrm-topcap,
          .qrm-brandrow,
          .qrm-footercap,
          .qrm-skyline {
            display: none;
          }
          .qrm-phone {
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            border-radius: 0;
            padding: 0;
            background: none;
            box-shadow: none;
          }
          .qrm-screen {
            border-radius: 0;
          }
          .qrm-notch,
          .qrm-status {
            display: none;
          }
          .qrm-table {
            margin: 12px auto 6px;
          }
        }
      `}</style>

      <div className="qrm-topcap">{t.demoTopBanner}</div>
      <div className="qrm-brandrow">
        <div className="qrm-logo">ZIYAFAT<span className="dot">.</span></div>
      </div>

      <div className="qrm-phone">
        <div className="qrm-screen">
          <div className="qrm-grain" />
          
          <div className="qrm-notch" />
          <div className="qrm-status">
            <span>9:41</span>
            <span>Shahr-e-Naw · Wi-Fi</span>
          </div>



          <div className="qrm-notch" />

          <div className="qrm-scroll" style={{ overflowY: isModalOpen ? "hidden" : "auto" }}>
            <div className="qrm-header">    
              <div className="qrm-headlogo">ZIYAFAT<span className="dot">.</span></div>
              
              {/* Absolute position dead-center to ignore side elements */}
              <div className="qrm-table" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", margin: 0 }}>
                <Utensils size={12} strokeWidth={2.5} />
                <span>{TABLE_NUMBER}</span>
              </div>

              <div className="qrm-legal" onClick={() => setLegalTip((v) => !v)} style={{ marginLeft: "auto" }}>
                <ShieldCheck size={11} />
              </div>
              
              {legalTip && (
                <div className="qrm-legaltip" style={{ top: "60px" }}>
                  {t.legalTooltip}
                  <b>{t.lastUpdated}: {MENU_UPDATED}</b>
                </div>
              )}
            </div>

            <div className="qrm-hero">
              <div className="qrm-greet">{t.greeting}</div>
              <div className="qrm-greetsub">{t.greetingSub}</div>
              <div className="qrm-hero-wave"></div>
            </div>

            {/* AI Concierge Trigger Banner */}
            <div className="qrm-ai-trigger" onClick={() => setShowAiModal(true)}>
              <div className="qrm-ai-trigger-left">
                <div className="qrm-ai-trigger-sub"><Sparkles size={11} /> {t.aiEyebrow}</div>
                <div className="qrm-ai-trigger-title">{t.aiIdleTitle}</div>
              </div>
              <div className="qrm-ai-trigger-icon">
                <ChevronRight size={18} />
              </div>
            </div>

            <div className="qrm-searchwrap">
              <div className="qrm-search">
                <Search size={14} color="rgba(243,234,217,0.45)" />
                <input placeholder={t.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>

            <div className="qrm-filters">
              {FILTER_KEYS.map((k) => {
                const Icon = FILTER_ICON[k];
                const active = activeFilters.includes(k);
                return (
                  <div key={k} className={`qrm-chip ${active ? "active" : ""}`} onClick={() => toggleFilter(k)}>
                    <Icon size={11} /> {t.filters[k]}
                  </div>
                );
              })}
            </div>

            {!search.trim() && (
              <div className="qrm-cats">
                {CATEGORIES.map((c) => {
                  const Icon = c.icon;
                  const active = activeCategory === c.key;
                  return (
                    <div key={c.key} className={`qrm-cat ${active ? "active" : ""}`} onClick={() => setActiveCategory(c.key)}>
                      <Icon size={20} color={active ? "var(--ivory)" : "var(--gold-bright)"} style={{ opacity: 0.9 }} />
                      <span>{c.label[lang]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="qrm-list">
              {itemsByCategory.length === 0 && <div className="qrm-empty">{t.noResults}</div>}
              {itemsByCategory.map((item) => {
                const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Fish;
                const justAdded = flashId === item.id;
                return (
                  <div className="qrm-card" key={item.id} onClick={() => openDetail(item)}>
                    <div className="qrm-tile">{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={24} color="var(--gold-bright)" />}</div>
                    <div className="qrm-cardbody">
                      <div className="qrm-cname">{item.name[lang]}</div>
                      <div className="qrm-cdesc">{item.desc[lang]}</div>
                      {item.allergens.length > 0 && (
                        <div className="qrm-allergrow">
                          {item.allergens.map((a) => {
                            const AI = ALLERGEN_META[a].icon;
                            return <div key={a} className="qrm-allericon" title={ALLERGEN_META[a].label[lang]}><AI size={10} /></div>;
                          })}
                        </div>
                      )}
                      <div className="qrm-cmeta">
                        <div className="qrm-price">{fmtTL(item.price)}</div>
                        <div className="qrm-kcal">{item.kcal} {t.kcal}</div>
                      </div>
                    </div>
                    <button className={`qrm-addbtn ${justAdded ? "done" : ""}`} onClick={(e) => { e.stopPropagation(); addToCart(item.id, 1); }}>
                      {justAdded ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Location */}
            <div className="qrm-location">
              <div className="qrm-loctitle"><MapPin size={12} /> {t.location}</div>
              <div className="qrm-locname">{t.locationName}</div>
              <div className="qrm-locsub">{t.locationSub}</div>
              <div className="qrm-locbtns">
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer">
                  <div className="qrm-locbtn" style={{ background: "var(--gold-bright)", color: "var(--walnut-deep)" }}>
                    <Navigation size={12} /> {t.openMap}
                  </div>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <div className="qrm-locbtn" style={{ background: "transparent", color: "var(--ivory)", border: "1px solid rgba(243,234,217,0.3)" }}>
                    <Share2 size={12} /> {t.shareWA}
                  </div>
                </a>
              </div>
              <div className="qrm-follow">
                <span style={{ fontSize: 10.5, color: "rgba(243,234,217,0.5)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.followUs}</span>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} /> @ziyafat
                </a>
              </div>
            </div>
          </div>

          <button className="qrm-fab" onClick={callWaiter}>
            <Bell size={13} /> {t.callWaiter}
          </button>

          {waiterToast && (
            <div className="qrm-toast">
              <Bell size={14} color="var(--gold-bright)" /> {t.waiterCalled}
            </div>
          )}

          <div className="qrm-nav">
            <button className="qrm-navitem active">
              <Fish size={18} /> <span>{t.navMenu}</span>
            </button>
            <button className="qrm-navitem" onClick={() => setShowCart(true)}>
              <ShoppingBag size={18} />
              {cartCount > 0 && <div className="qrm-navbadge">{cartCount}</div>}
              <span>{t.navCart}</span>
            </button>
            <button className="qrm-navitem" onClick={callWaiter}>
              <Bell size={18} /> <span>{t.navWaiter}</span>
            </button>
            <button className="qrm-navitem" onClick={() => setLang((l) => (l === "tr" ? "en" : "tr"))}>
              <Languages size={18} /> <span>{lang.toUpperCase()}</span>
            </button>
          </div>

          {selectedItem && (
            <div className="qrm-sheet-backdrop" onClick={() => setSelectedItem(null)}>
              <div className="qrm-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="qrm-sheet-handle" />
                <div className="qrm-sheet-head">
                  <div />
                  <button className="qrm-iconbtn" onClick={() => setSelectedItem(null)}><X size={16} /></button>
                </div>
                <div className="qrm-detail-tile">
                  {selectedItem.img
                    ? <img src={selectedItem.img} alt={selectedItem.name[lang]} loading="lazy" />
                    : (() => { const Icon = CATEGORIES.find((c) => c.key === selectedItem.category)?.icon || Fish; return <Icon size={48} color="var(--gold-bright)" />; })()}
                </div>
                <div className="qrm-detail-name">{selectedItem.name[lang]}</div>
                <div className="qrm-detail-desc">{selectedItem.desc[lang]}</div>

                <div className="qrm-detail-section">
                  <div className="qrm-detail-label">{t.ingredients}</div>
                  {selectedItem.ingredients.map((ing, idx) => (
                    <div className="qrm-ingrow" key={idx}><span>{ing.n}</span><span>{ing.a}</span></div>
                  ))}
                </div>

                <div className="qrm-detail-section">
                  <div className="qrm-detail-label">{t.allergens}</div>
                  <div className="qrm-tagpills">
                    {selectedItem.allergens.length === 0 && <div className="qrm-tagpill">{t.noAllergens}</div>}
                    {selectedItem.allergens.map((a) => {
                      const AI = ALLERGEN_META[a].icon;
                      return <div className="qrm-tagpill" key={a}><AI size={12} /> {ALLERGEN_META[a].label[lang]}</div>;
                    })}
                  </div>
                </div>

                {selectedItem.tags.length > 0 && (
                  <div className="qrm-detail-section">
                    <div className="qrm-detail-label">{t.filters.popular === "Popüler" ? "Etiketler" : "Tags"}</div>
                    <div className="qrm-tagpills">
                      {selectedItem.tags.map((tag) => {
                        const Icon = FILTER_ICON[tag];
                        return <div className="qrm-tagpill" key={tag}><Icon size={12} /> {t.filters[tag]}</div>;
                      })}
                    </div>
                  </div>
                )}

                <div className="qrm-detail-foot">
                  <div className="qrm-stepper">
                    <button onClick={() => setDetailQty((q) => Math.max(1, q - 1))}><Minus size={13} /></button>
                    <span>{detailQty}</span>
                    <button onClick={() => setDetailQty((q) => q + 1)}><Plus size={13} /></button>
                  </div>
                  <button className="qrm-btn-gold" style={{ flex: 1, justifyContent: "center", padding: "14px" }}
                    onClick={() => { addToCart(selectedItem.id, detailQty); setSelectedItem(null); }}>
                    <ShoppingBag size={14} /> {t.detailsCta} · {fmtTL(selectedItem.price * detailQty)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Concierge Modal */}
          {showAiModal && (
            <div className="qrm-sheet-backdrop" onClick={() => setShowAiModal(false)}>
              <div className="qrm-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="qrm-sheet-handle" />
                <div className="qrm-sheet-head">
                  <div className="qrm-sheet-title" style={{ fontSize: '15px', color: 'var(--gold-bright)' }}>
                    <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}/> 
                    {t.aiEyebrow}
                  </div>
                  <button className="qrm-iconbtn" onClick={() => setShowAiModal(false)}><X size={16} /></button>
                </div>
                
                <div style={{ padding: '14px 20px 40px' }}>
                  {aiPhase === "idle" && (
                    <>
                      <div className="qrm-ai-title" style={{ fontSize: '22px', marginBottom: '8px' }}>{t.aiIdleTitle}</div>
                      <div className="qrm-ai-sub" style={{ fontSize: '13px', marginBottom: '24px' }}>{t.aiIdleSub}</div>
                      <button className="qrm-btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} onClick={() => setAiPhase("q1")}>
                        <Sparkles size={15} /> {t.aiStart}
                      </button>
                    </>
                  )}

                  {aiPhase === "q1" && (
                    <>
                      <div className="qrm-ai-title" style={{ fontSize: '20px', marginBottom: '16px' }}>{t.aiQ1}</div>
                      <div className="qrm-ai-options">
                        {t.aiQ1Options.map((o) => (
                          <button key={o.key} className="qrm-ai-opt" onClick={() => chooseQ1(o.key)}>
                            {o.label} <ChevronRight size={16} color="var(--gold-bright)" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {aiPhase === "q2" && (
                    <>
                      <button className="qrm-ai-back" onClick={() => setAiPhase("q1")}><ArrowLeft size={13} /> {t.back}</button>
                      <div className="qrm-ai-title" style={{ fontSize: '20px', marginBottom: '16px' }}>{t.aiQ2}</div>
                      <div className="qrm-ai-options">
                        {t.aiQ2Options.map((o) => (
                          <button key={o.key} className="qrm-ai-opt" onClick={() => chooseQ2(o.key)}>
                            {o.label} <ChevronRight size={16} color="var(--gold-bright)" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {aiPhase === "result" && aiResult && (
                    <>
                      <div className="qrm-ai-title" style={{ fontSize: '11px', opacity: 0.65, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.aiResultEyebrow}</div>
                      <div className="qrm-ai-name" style={{ fontSize: '24px' }}>{aiResult.name[lang]}</div>
                      <div className="qrm-ai-reason" style={{ fontSize: '14px', marginBottom: '24px' }}>{aiResult.desc[lang]}</div>
                      <div className="qrm-ai-row">
                        <button className="qrm-btn-gold" style={{ flex: 1, justifyContent: 'center', padding: '16px' }} onClick={() => addAiSuggestion(aiResult)}>
                          {aiAdded ? <Check size={15} /> : <ShoppingBag size={15} />}
                          {aiAdded ? t.added : t.aiCta}
                        </button>
                        <button className="qrm-btn-ghost" style={{ padding: '16px' }} onClick={resetAi}>
                          <RefreshCw size={15} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {showCart && (
            <div className="qrm-sheet-backdrop" onClick={() => setShowCart(false)}>
              <div className="qrm-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="qrm-sheet-handle" />
                <div className="qrm-sheet-head">
                  <div className="qrm-sheet-title">{t.cartTitle}</div>
                  <button className="qrm-iconbtn" onClick={() => setShowCart(false)}><X size={16} /></button>
                </div>

                {cartCount === 0 ? (
                  <div className="qrm-empty" style={{ padding: "50px 20px 60px" }}>
                    <ShoppingBag size={28} style={{ marginBottom: 12, opacity: 0.5 }} />
                    <div style={{ fontWeight: 500, fontFamily: "'Fraunces', serif", fontSize: "18px", color: "var(--ivory)", marginBottom: 6 }}>{t.cartEmpty}</div>
                    <div>{t.cartEmptySub}</div>
                  </div>
                ) : (
                  <>
                    <div style={{ paddingBottom: 6, paddingTop: 10 }}>
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = ITEMS.find((i) => i.id === id);
                        if (!item) return null;
                        const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Fish;
                        return (
                          <div className="qrm-cartrow" key={id}>
                            <div className="qrm-tile" style={{ width: 48, height: 48, borderRadius: 0 }}>{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={20} color="var(--gold-bright)" />}</div>
                            <div className="qrm-cartinfo">
                              <div className="qrm-cartname">{item.name[lang]}</div>
                              <div className="qrm-cartprice">{fmtTL(item.price)}</div>
                            </div>
                            <div className="qrm-stepper">
                              <button onClick={() => changeQty(id, -1)}><Minus size={13} /></button>
                              <span>{qty}</span>
                              <button onClick={() => changeQty(id, 1)}><Plus size={13} /></button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="qrm-cartfoot">
                      <div className="qrm-subtotalrow"><span>{t.subtotal}</span><span>{fmtTL(cartTotal)}</span></div>
                      <button className="qrm-confirmbtn" onClick={() => { setShowCart(false); callWaiter(); }}>{t.confirmOrder}</button>
                      <div className="qrm-demonote">{t.demoNotice}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="qrm-footercap">
        QR Akıllı Menü Sistemi — masaya özel QR, yapay zeka önerisi, alerjen/malzeme bilgisi, çoklu dil ve yasal uyum tek ekranda.
      </div>
    </div>
  );
}