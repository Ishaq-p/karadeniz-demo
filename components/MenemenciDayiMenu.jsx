"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Sun, Salad, Beef, Fish, Waves, Coffee, Wine, Cake, Sparkles, Bell, Search, X, Check,
  ChevronRight, Info, Star, Leaf, ShoppingBag, ShieldCheck, RefreshCw, Plus, Minus,
  MapPin, Hash, Moon, ChefHat, Feather, Milk, Wheat, Egg, ExternalLink, Navigation, Share2, Languages, ArrowLeft, Flame
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets (embedded so the demo always renders identically)    */
/* ---------------------------------------------------------------- */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" fill="none">
  <ellipse cx="120" cy="90" rx="118" ry="88" fill="#fff" stroke="#F5A623" stroke-width="5"/>
  <text x="120" y="55" font-family="Arial Black,sans-serif" font-size="13" font-weight="900" fill="#1a1a1a" text-anchor="middle" letter-spacing="1">MEŞHUR</text>
  <text x="120" y="80" font-family="Arial Black,sans-serif" font-size="18" font-weight="900" fill="#F5A623" text-anchor="middle">MENEMENCİ</text>
  <text x="120" y="115" font-family="Arial Black,sans-serif" font-size="36" font-weight="900" fill="#1a1a1a" text-anchor="middle">DAYI</text>
  <text x="120" y="145" font-family="Arial,sans-serif" font-size="11" fill="#888" text-anchor="middle" font-style="italic">"yayladaki eviniz"</text>
</svg>`;

const LOGO_FULL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(LOGO_SVG)}`;

const TABLE_NUMBER = "08";
const MENU_UPDATED = "01.08.2026";
const MAP_LINK = "https://maps.app.goo.gl/P6hixc54c68dXLux7";
const INSTAGRAM_LINK = "https://www.instagram.com/meshur_menemenci_dayi/";
const WHATSAPP_LINK = "https://wa.me/?text=" + encodeURIComponent("Meşhur Menemenci Dayı — Samsun. Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
  tr: {
    demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
    subtitle: "Ankara Yolu · Samsun'un Kahvaltı Durağı",
    table: "Masa",
    greeting: "Hoş geldiniz",
    greetingSub: "Yayladaki eviniz gibi sıcak — Meşhur Menemenci Dayı'da",
    aiEyebrow: "Yapay Zeka Önerisi",
    aiIdleTitle: "Size özel bir öneri ister misiniz?",
    aiIdleSub: "2 kısa soruyla o anki keyfinize en uygun lezzeti buluyoruz.",
    aiStart: "Öneri Al",
    aiQ1: "Ne yemek istiyorsunuz?",
    aiQ1Options: [
      { key: "menemen", label: "Menemen" },
      { key: "kahvalti", label: "Kahvaltı Tabağı" },
      { key: "izgara", label: "Izgara" },
    ],
    aiQ2: "Soğanlı mı olsun?",
    aiQ2Options: [
      { key: "yes", label: "Evet, soğanlı" },
      { key: "no", label: "Hayır, soğansız" },
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
    locationName: "Meşhur Menemenci Dayı",
    locationSub: "Ankara Karayolu 26. km, Mahmutlu, Samsun · 7/24",
    openMap: "Haritada Aç",
    shareWA: "Konumu Paylaş",
    followUs: "Bizi Takip Edin",
  },
  en: {
    demoTopBanner: "LIVE PREVIEW — built with sample data",
    subtitle: "Ankara Road · Samsun's Breakfast Stop",
    table: "Table",
    greeting: "Welcome",
    greetingSub: "Warm as your mountain home — Meşhur Menemenci Dayı",
    aiEyebrow: "AI Recommendation",
    aiIdleTitle: "Want a pick made just for you?",
    aiIdleSub: "Two quick questions and we'll match a dish to your mood.",
    aiStart: "Get a recommendation",
    aiQ1: "What would you like to eat?",
    aiQ1Options: [
      { key: "menemen", label: "Menemen" },
      { key: "kahvalti", label: "Breakfast Plate" },
      { key: "izgara", label: "Grill" },
    ],
    aiQ2: "With onions?",
    aiQ2Options: [
      { key: "yes", label: "Yes, with onions" },
      { key: "no", label: "No, without onions" },
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
    cartEmptySub: "Start picking flavours from the menu",
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
    locationName: "Meşhur Menemenci Dayı",
    locationSub: "Ankara Rd. km 26, Mahmutlu, Samsun · Open 24/7",
    openMap: "Open in maps",
    shareWA: "Share location",
    followUs: "Follow us",
  },
};

const CATEGORIES = [
  { key: "breakfast", icon: Coffee, label: { tr: "Kahvaltı", en: "Breakfast" } },
  { key: "starters", icon: Salad, label: { tr: "Başlangıçlar", en: "Starters" } },
  { key: "sushi", icon: Waves, label: { tr: "Sushi & Uzakdoğu", en: "Sushi & Far East" } },
  { key: "mains", icon: Beef, label: { tr: "Ana Yemekler", en: "Mains" } },
  { key: "drinks", icon: Wine, label: { tr: "İçecekler", en: "Drinks" } },
  { key: "desserts", icon: Cake, label: { tr: "Tatlılar", en: "Desserts" } },
];

const ALLERGEN_META = {
  fish: { icon: Fish, label: { tr: "Balık", en: "Fish" } },
  shellfish: { icon: Waves, label: { tr: "Kabuklu Deniz Ürünü", en: "Shellfish" } },
  soy: { icon: Leaf, label: { tr: "Soya", en: "Soy" } },
  dairy: { icon: Milk, label: { tr: "Süt Ürünü", en: "Dairy" } },
  gluten: { icon: Wheat, label: { tr: "Gluten", en: "Gluten" } },
};

const FILTER_KEYS = ["popular", "veg", "spicy", "light", "chef"];
const FILTER_ICON = { popular: Star, veg: Leaf, spicy: Flame, light: Feather, chef: ChefHat };

const img = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

const ITEMS = [
  {
    id: "serpme", category: "breakfast", price: 450, kcal: 620, tags: ["popular", "chef"], img: img(9491137),
    allergens: ["dairy", "gluten"],
    ingredients: [{ n: "Peynir çeşitleri", a: "120 g" }, { n: "Zeytin", a: "60 g" }, { n: "Reçel & bal", a: "80 g" }, { n: "Sıcak ekmek sepeti", a: "1 adet" }],
    name: { tr: "Galya Serpme Kahvaltı (2 Kişilik)", en: "Galya Breakfast Spread (For 2)" },
    desc: { tr: "Peynir çeşitleri, zeytin, reçeller ve sıcak ekmekle zengin sahil kahvaltısı.", en: "A generous seafront breakfast with cheeses, olives, jams and warm bread." }
  },
  {
    id: "menemen", category: "breakfast", price: 220, kcal: 310, tags: ["veg", "spicy"], img: img(18535643),
    allergens: ["dairy"],
    ingredients: [{ n: "Yumurta", a: "3 adet" }, { n: "Domates", a: "120 g" }, { n: "Sivri biber", a: "40 g" }, { n: "Tereyağı", a: "15 g" }],
    name: { tr: "Menemen", en: "Menemen (Turkish Eggs)" },
    desc: { tr: "Domates ve sivri biberle tereyağında pişirilen klasik yumurta.", en: "Classic egg dish simmered with tomato, peppers and butter." }
  },
  {
    id: "waffle", category: "breakfast", price: 260, kcal: 480, tags: ["veg", "popular"], img: img(4109460),
    allergens: ["dairy", "gluten"],
    ingredients: [{ n: "Waffle", a: "1 adet" }, { n: "Mevsim meyve", a: "100 g" }, { n: "Krema", a: "40 g" }],
    name: { tr: "Meyveli Waffle", en: "Fruit Waffle" },
    desc: { tr: "Taze mevsim meyveleri ve kremayla servis edilen sıcak waffle.", en: "Warm waffle served with seasonal fruit and cream." }
  },

  {
    id: "edamame", category: "starters", price: 150, kcal: 160, tags: ["veg", "light"], img: img(3338529),
    allergens: ["soy"],
    ingredients: [{ n: "Edamame", a: "150 g" }, { n: "Deniz tuzu", a: "2 g" }],
    name: { tr: "Edamame", en: "Edamame" },
    desc: { tr: "Buharda pişmiş, deniz tuzuyla servis edilen soya fasulyesi.", en: "Steamed soybeans served with sea salt." }
  },
  {
    id: "kalamar", category: "starters", price: 260, kcal: 340, tags: ["popular", "chef"], img: img(15801015),
    allergens: ["shellfish", "gluten"],
    ingredients: [{ n: "Kalamar halkası", a: "220 g" }, { n: "Mısır unu", a: "40 g" }, { n: "Tartar sos", a: "30 g" }],
    name: { tr: "Kalamar Tava", en: "Fried Calamari" },
    desc: { tr: "Çıtır kalamar halkaları, özel tartar sos eşliğinde.", en: "Crispy calamari rings served with house tartar sauce." }
  },

  {
    id: "california", category: "sushi", price: 340, kcal: 380, tags: ["popular", "chef"], img: img(18408861),
    allergens: ["shellfish", "gluten", "soy"],
    ingredients: [{ n: "Yengeç eti", a: "80 g" }, { n: "Avokado", a: "50 g" }, { n: "Sushi pirinci", a: "150 g" }, { n: "Nori", a: "2 yaprak" }],
    name: { tr: "California Roll (8 parça)", en: "California Roll (8 pcs)" },
    desc: { tr: "Yengeç, avokado ve salatalıkla hazırlanan klasik roll.", en: "Classic roll with crab, avocado and cucumber." }
  },
  {
    id: "atom", category: "sushi", price: 370, kcal: 410, tags: ["spicy", "chef"], img: img(11176614),
    allergens: ["shellfish", "soy"],
    ingredients: [{ n: "Karides tempura", a: "90 g" }, { n: "Acılı mayonez", a: "30 g" }, { n: "Sushi pirinci", a: "150 g" }],
    name: { tr: "Atom Roll", en: "Atom Roll (Spicy)" },
    desc: { tr: "Karides tempura ve acılı sos ile hazırlanan Galya imzası roll.", en: "Galya's signature roll with tempura shrimp and spicy sauce." }
  },
  {
    id: "noodle", category: "sushi", price: 300, kcal: 520, tags: ["spicy", "veg"], img: img(3727197),
    allergens: ["gluten", "soy"],
    ingredients: [{ n: "Erişte", a: "220 g" }, { n: "Sebze julyen", a: "100 g" }, { n: "Soya sos", a: "20 ml" }],
    name: { tr: "Sebzeli Wok Noodle", en: "Vegetable Wok Noodles" },
    desc: { tr: "Wokta sotelenmiş sebze ve soya soslu Uzakdoğu erişte.", en: "Far East noodles wok-tossed with vegetables and soy sauce." }
  },

  {
    id: "entrecote", category: "mains", price: 680, kcal: 540, tags: ["popular", "chef"], img: img(769289),
    allergens: [],
    ingredients: [{ n: "Dana antrikot", a: "300 g" }, { n: "Izgara sebze", a: "100 g" }, { n: "Karabiber sos", a: "40 g" }],
    name: { tr: "Antrikot Izgara", en: "Grilled Entrecôte" },
    desc: { tr: "Odun ateşinde ızgara antrikot, mevsim sebzeleriyle.", en: "Wood-grilled entrecôte served with seasonal vegetables." }
  },
  {
    id: "somon", category: "mains", price: 490, kcal: 420, tags: ["light", "chef"], img: img(7627415),
    allergens: ["fish"],
    ingredients: [{ n: "Somon fileto", a: "260 g" }, { n: "Ispanak", a: "60 g" }, { n: "Limon sos", a: "20 ml" }],
    name: { tr: "Somon Izgara", en: "Grilled Salmon" },
    desc: { tr: "Taze ıspanak yatağında, limonlu sos ile servis edilen somon.", en: "Grilled salmon on a bed of spinach with a light lemon sauce." }
  },
  {
    id: "sinitzel", category: "mains", price: 350, kcal: 460, tags: ["popular"], img: img(6419731),
    allergens: ["gluten", "dairy"],
    ingredients: [{ n: "Tavuk göğsü", a: "220 g" }, { n: "Galeta unu", a: "50 g" }, { n: "Limon", a: "1/2 adet" }],
    name: { tr: "Tavuk Şnitzel", en: "Chicken Schnitzel" },
    desc: { tr: "Çıtır galeta unu ile kızartılmış tavuk göğsü, patates eşliğinde.", en: "Crispy breaded chicken breast served with potatoes." }
  },
  {
    id: "margherita", category: "mains", price: 300, kcal: 480, tags: ["veg", "popular"], img: img(14590497),
    allergens: ["gluten", "dairy"],
    ingredients: [{ n: "Pizza hamuru", a: "220 g" }, { n: "Mozzarella", a: "90 g" }, { n: "Domates sos", a: "60 g" }, { n: "Fesleğen", a: "5 g" }],
    name: { tr: "Margherita Pizza", en: "Margherita Pizza" },
    desc: { tr: "Taş fırında pişen, mozzarella ve taze fesleğenli klasik pizza.", en: "Stone-baked classic pizza with mozzarella and fresh basil." }
  },

  {
    id: "ayran", category: "drinks", price: 60, kcal: 90, tags: ["veg", "light"], img: img(27757405),
    allergens: ["dairy"],
    ingredients: [{ n: "Yoğurt", a: "200 ml" }, { n: "Su", a: "80 ml" }, { n: "Tuz", a: "1 g" }],
    name: { tr: "Ayran", en: "Ayran (Yogurt Drink)" },
    desc: { tr: "Ev yapımı, soğuk servis.", en: "Homemade, served chilled." }
  },
  {
    id: "portakal", category: "drinks", price: 100, kcal: 110, tags: ["veg", "light"], img: img(5946803),
    allergens: [],
    ingredients: [{ n: "Taze portakal", a: "3 adet" }],
    name: { tr: "Taze Sıkma Portakal Suyu", en: "Fresh Orange Juice" },
    desc: { tr: "Günlük sıkılan taze portakal suyu.", en: "Freshly squeezed, every morning." }
  },
  {
    id: "turkkahvesi", category: "drinks", price: 110, kcal: 5, tags: ["popular"], img: img(28867029),
    allergens: [],
    ingredients: [{ n: "Türk kahvesi", a: "1 fincan" }, { n: "Lokum", a: "1 adet" }],
    name: { tr: "Türk Kahvesi", en: "Turkish Coffee" },
    desc: { tr: "Geleneksel usulde pişirilmiş, lokum eşliğinde servis edilir.", en: "Traditionally brewed, served with a piece of Turkish delight." }
  },

  {
    id: "sutlac", category: "desserts", price: 160, kcal: 280, tags: ["veg", "popular"], img: img(37825038),
    allergens: ["dairy"],
    ingredients: [{ n: "Süt", a: "250 ml" }, { n: "Pirinç", a: "40 g" }, { n: "Şeker", a: "30 g" }],
    name: { tr: "Fırın Sütlaç", en: "Baked Rice Pudding" },
    desc: { tr: "Fırında kızartılmış, geleneksel tarif.", en: "Oven-baked with a traditional recipe." }
  },
  {
    id: "kadayif", category: "desserts", price: 180, kcal: 340, tags: ["veg", "chef"], img: img(15794017),
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

export default function MenemenciDayiMenu() {
  const [lang, setLang] = useState("tr");
  const [activeCategory, setActiveCategory] = useState("sushi");
  const [activeFilters, setActiveFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [waiterToast, setWaiterToast] = useState(false);
  const [aiPhase, setAiPhase] = useState("idle");
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
    setTimeout(() => setAiAdded(false), 1400);
  }

  const aiResult = aiPhase === "result" ? pickAiSuggestion(aiAnswers.q1, aiAnswers.q2) : null;

  return (
    <div className="qrm-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

        .qrm-root {
          /* Warm colors for Menemenci Dayı brand */
          --ink-900:#110e05; --ink-800:#1c1a14; --ink-700:#252218;
          --gold-100:#fbbf24; --gold-400:#f59e0b; --gold-600:#d97706;
          --violet-400:#F5A623; --cream:#fdfbf7; --ink:#110e05; --line:rgba(245,166,35,0.15);
          font-family:'Inter',sans-serif;
          min-height:100vh; width:100%; position:relative;
          display:flex; flex-direction:column; align-items:center;
          padding:28px 16px 44px;
          background:
            radial-gradient(ellipse 900px 480px at 50% -10%, rgba(245,166,35,0.08), transparent 60%),
            linear-gradient(180deg,#110e05 0%, #1c1a14 45%, #252218 100%);
          color:var(--cream);
          box-sizing:border-box;
        }
        .qrm-root *{ box-sizing:border-box; }
        .qrm-serif{ font-family:'Playfair Display',serif; }

        .qrm-skyline{ position:absolute; left:0; right:0; bottom:0; height:170px; opacity:0.3; pointer-events:none; }

        .qrm-topcap{
          font-size:10.5px; letter-spacing:0.13em; text-transform:uppercase; color:var(--gold-100); opacity:0.85;
          background:rgba(245,166,35,0.1); border:1px solid rgba(245,166,35,0.25);
          padding:7px 16px; border-radius:999px; margin-bottom:16px; text-align:center; position:relative; z-index:2;
        }
        .qrm-brandrow{ display:flex; flex-direction:column; align-items:center; margin-bottom:18px; position:relative; z-index:2; }
        .qrm-brandimg{ height:76px; width:auto; border-radius:14px; box-shadow:0 10px 26px rgba(0,0,0,0.35); }

        .qrm-phone{
          position:relative; z-index:2;
          width:min(390px, 94vw);
          height:min(844px, calc(min(390px, 94vw) * 844 / 390));
          border-radius:44px; padding:12px;
          background:linear-gradient(160deg,#252218,#110e05);
          box-shadow:0 40px 90px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06) inset;
        }
        .qrm-screen{
          position:relative; width:100%; height:100%; border-radius:33px; overflow:hidden;
          background:var(--ink-900); display:flex; flex-direction:column;
        }
        .qrm-notch{ position:absolute; top:6px; left:50%; transform:translateX(-50%); width:104px; height:20px; background:#000; border-radius:14px; z-index:30; }
        .qrm-status{ display:flex; justify-content:space-between; padding:13px 24px 0; font-size:11.5px; font-weight:700; color:rgba(255,255,255,0.8); flex-shrink:0; }
        .qrm-table{
          display:flex; align-items:center; justify-content:center; gap:5px; margin:6px auto 0; width:fit-content;
          font-size:10.5px; font-weight:700; letter-spacing:0.05em; color:#fff;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); padding:4px 12px; border-radius:999px; flex-shrink:0;
        }

        .qrm-scroll{ flex:1; overflow-y:auto; padding-bottom:10px; scrollbar-width:thin; scrollbar-color:var(--gold-400) transparent; }
        .qrm-scroll::-webkit-scrollbar{ width:5px; }
        .qrm-scroll::-webkit-scrollbar-track{ background:transparent; }
        .qrm-scroll::-webkit-scrollbar-thumb{ background:linear-gradient(var(--gold-100),var(--gold-600)); border-radius:10px; }

        .qrm-header{
          padding:10px 16px 14px; display:flex; align-items:center; gap:10px;
          background:linear-gradient(160deg,var(--ink-700),var(--ink-900));
          border-bottom:1px solid var(--line); flex-shrink:0; position:relative;
        }
        .qrm-headlogo{ height:32px; width:auto; border-radius:7px; flex-shrink:0; }
        .qrm-hsub{ font-size:9.5px; color:rgba(253,254,254,0.5); margin-top:1px; }
        .qrm-legal{
          margin-left:auto; display:flex; align-items:center; gap:5px;
          background:rgba(245,166,35,0.15); border:1px solid rgba(245,166,35,0.32);
          padding:5px 9px; border-radius:999px; font-size:9px; font-weight:700;
          color:var(--violet-400); letter-spacing:0.02em; cursor:pointer; white-space:nowrap;
        }
        .qrm-legaltip{
          position:absolute; top:50px; right:14px; width:206px; z-index:40;
          background:#1c1a14; border:1px solid rgba(245,166,35,0.3); border-radius:12px;
          padding:11px 12px; font-size:10px; line-height:1.5; color:rgba(253,254,254,0.85);
          box-shadow:0 12px 30px rgba(0,0,0,0.4);
        }
        .qrm-legaltip b{ color:var(--gold-100); display:block; margin-top:6px; font-size:9.5px; }

        .qrm-hero{ position:relative; padding:14px 18px 24px; overflow:hidden; flex-shrink:0;
          background:radial-gradient(120% 100% at 20% 0%, #252218 0%, #1c1a14 60%, #110e05 100%); }
        .qrm-hero-wave{ position:absolute; left:0; right:0; bottom:-2px; height:32px; }
        .qrm-greet{ display:flex; align-items:center; gap:8px; font-size:20px; font-weight:700; color:var(--cream); position:relative; z-index:2;}
        .qrm-greetsub{ font-size:11px; color:rgba(253,254,254,0.6); margin-top:3px; position:relative; z-index:2;}

        .qrm-ai{
          margin:-12px 16px 0; position:relative; z-index:5;
          background:linear-gradient(135deg,#1c1a14,#110e05);
          border:1px solid rgba(245,166,35,0.25); border-left:3px solid var(--gold-400);
          border-radius:16px; padding:14px; box-shadow:0 14px 30px rgba(0,0,0,0.35);
        }
        .qrm-ai-eyebrow{ display:flex; align-items:center; gap:6px; font-size:10px; font-weight:700;
          letter-spacing:0.06em; text-transform:uppercase; color:var(--gold-100); margin-bottom:8px;}
        .qrm-ai-title{ font-size:14.5px; font-weight:700; color:var(--cream); line-height:1.3; }
        .qrm-ai-sub{ font-size:11px; color:rgba(253,254,254,0.6); margin-top:4px; line-height:1.4; }
        .qrm-ai-name{ font-size:16.5px; font-weight:700; color:var(--cream); }
        .qrm-ai-reason{ font-size:11px; color:rgba(253,254,254,0.6); margin-top:2px; line-height:1.4; }
        .qrm-ai-row{ display:flex; align-items:center; gap:8px; margin-top:11px; flex-wrap:wrap; }
        .qrm-ai-options{ display:flex; flex-direction:column; gap:7px; margin-top:11px; }
        .qrm-ai-opt{
          text-align:left; font-size:12px; font-weight:600; color:var(--cream);
          background:rgba(255,255,255,0.05); border:1px solid var(--line); border-radius:11px;
          padding:9px 12px; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
        }
        .qrm-ai-opt:active{ background:rgba(245,166,35,0.2); border-color:rgba(245,166,35,0.4); }
        .qrm-ai-back{ display:flex; align-items:center; gap:4px; font-size:10.5px; font-weight:600; color:var(--violet-400); background:none; border:none; cursor:pointer; margin-bottom:2px; }

        .qrm-btn-gold{
          font-size:11.5px; font-weight:700; color:#fff; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-gold:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--violet-400); background:transparent;
          border:1px solid rgba(245,166,35,0.35); padding:8px 11px; border-radius:10px;
          cursor:pointer; display:flex; align-items:center; gap:5px; font-family:'Inter',sans-serif;
        }

        .qrm-searchwrap{ padding:16px 16px 4px; flex-shrink:0; }
        .qrm-search{ display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.05); border:1px solid var(--line); border-radius:12px; padding:9px 12px; }
        .qrm-search input{ background:transparent; border:none; outline:none; color:var(--cream); font-size:12.5px; width:100%; font-family:'Inter',sans-serif; }
        .qrm-search input::placeholder{ color:rgba(253,254,254,0.35); }

        .qrm-filters{ display:flex; gap:7px; padding:10px 16px 2px; flex-shrink:0; overflow-x:auto; scrollbar-width:none; }
        .qrm-filters::-webkit-scrollbar{ display:none; }
        .qrm-chip{
          display:flex; align-items:center; gap:5px; font-size:10.5px; font-weight:600;
          padding:6.5px 11px; border-radius:999px; white-space:nowrap; cursor:pointer;
          border:1px solid var(--line); color:rgba(253,254,254,0.7); background:rgba(255,255,255,0.03);
        }
        .qrm-chip.active{ background:var(--violet-400); border-color:var(--violet-400); color:#fff; }

        .qrm-cats{ display:flex; gap:8px; padding:14px 16px 4px; overflow-x:auto; flex-shrink:0; scrollbar-width:none; }
        .qrm-cats::-webkit-scrollbar{ display:none; }
        .qrm-cat{ display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; padding:9px 13px; border-radius:14px; border:1px solid var(--line); background:rgba(255,255,255,0.025); }
        .qrm-cat.active{ background:linear-gradient(135deg,rgba(245,166,35,0.16),rgba(245,166,35,0.05)); border-color:rgba(245,166,35,0.45); }
        .qrm-cat span{ font-size:9px; font-weight:700; color:rgba(253,254,254,0.65); text-align:center; white-space:nowrap; }
        .qrm-cat.active span{ color:var(--gold-100); }

        .qrm-list{ padding:12px 16px 26px; display:flex; flex-direction:column; gap:11px; }
        .qrm-empty{ text-align:center; padding:40px 20px; color:rgba(253,254,254,0.5); font-size:12px; }
        .qrm-card{ display:flex; gap:11px; background:rgba(255,255,255,0.03); border:1px solid var(--line); border-radius:16px; padding:10px; cursor:pointer; }
        .qrm-card:active{ background:rgba(255,255,255,0.06); }
        .qrm-tile{ width:56px; height:56px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden;
          background:linear-gradient(150deg,#1c1a14,#110e05); border:1px solid rgba(245,166,35,0.18); }
        .qrm-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
        .qrm-cardbody{ flex:1; min-width:0; }
        .qrm-cname{ font-size:14.5px; font-weight:700; color:var(--cream); line-height:1.2; }
        .qrm-cdesc{ font-size:10.5px; color:rgba(253,254,254,0.5); margin-top:3px; line-height:1.4;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .qrm-allergrow{ display:flex; gap:5px; margin-top:6px; }
        .qrm-allericon{ width:16px; height:16px; border-radius:5px; background:rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; color:rgba(253,254,254,0.55); }
        .qrm-cmeta{ display:flex; align-items:center; gap:9px; margin-top:7px; }
        .qrm-price{ font-size:14px; font-weight:700; color:var(--gold-100); white-space:nowrap; }
        .qrm-kcal{ font-size:9.5px; color:rgba(253,254,254,0.4); }
        .qrm-addbtn{ width:27px; height:27px; border-radius:9px; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#fff;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; }
        .qrm-addbtn.done{ background:var(--violet-400); color:#fff; }

        .qrm-location{ margin:6px 16px 0; padding:14px; border-radius:16px; background:rgba(255,255,255,0.03); border:1px solid var(--line); }
        .qrm-loctitle{ font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold-100); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
        .qrm-locname{ font-size:14.5px; font-weight:700; color:var(--cream); }
        .qrm-locsub{ font-size:10.5px; color:rgba(253,254,254,0.55); margin-top:3px; line-height:1.4; }
        .qrm-locbtns{ display:flex; gap:8px; margin-top:11px; }
        .qrm-locbtns a{ text-decoration:none; flex:1; }
        .qrm-locbtn{ display:flex; align-items:center; justify-content:center; gap:6px; font-size:10.5px; font-weight:700; padding:9px; border-radius:10px; }
        .qrm-follow{ display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:1px solid var(--line); }
        .qrm-follow a{ display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:var(--cream); text-decoration:none; }

        .qrm-fab{ position:absolute; right:14px; bottom:84px; z-index:20; display:flex; align-items:center; gap:7px; padding:11px 15px; border-radius:999px;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-600)); color:#fff; font-size:11.5px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 14px 26px rgba(0,0,0,0.4); font-family:'Inter',sans-serif; }

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:#1c1a14; border:1px solid rgba(245,166,35,0.4); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:rgba(17,14,5,0.92); padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(253,254,254,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--gold-100); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--violet-400); color:#fff; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

        .qrm-sheet-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:60; display:flex; align-items:flex-end; }
        .qrm-sheet{ width:100%; max-height:85%; background:var(--ink-800); border-radius:24px 24px 0 0; overflow-y:auto; animation:qrmUp .25s ease; border-top:1px solid rgba(245,166,35,0.28);
          scrollbar-width:thin; scrollbar-color:var(--gold-400) transparent; }
        .qrm-sheet::-webkit-scrollbar{ width:5px; }
        .qrm-sheet::-webkit-scrollbar-thumb{ background:var(--gold-400); border-radius:10px; }
        .qrm-sheet-handle{ width:36px; height:4px; background:rgba(255,255,255,0.2); border-radius:3px; margin:10px auto 4px; }
        .qrm-sheet-head{ display:flex; justify-content:space-between; align-items:center; padding:8px 18px 4px; }
        .qrm-sheet-title{ font-size:18px; font-weight:700; color:var(--cream); }
        .qrm-iconbtn{ background:rgba(255,255,255,0.08); border:none; color:var(--cream); width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }

        .qrm-detail-tile{ height:140px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:14px 18px 0; overflow:hidden;
          background:linear-gradient(150deg,#1c1a14,#110e05); border:1px solid rgba(245,166,35,0.2); }
        .qrm-detail-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
        .qrm-detail-name{ font-size:21px; font-weight:700; color:var(--cream); padding:16px 18px 0; }
        .qrm-detail-desc{ font-size:12px; color:rgba(253,254,254,0.6); line-height:1.55; padding:8px 18px 0; }
        .qrm-detail-section{ padding:14px 18px 0; }
        .qrm-detail-label{ font-size:10px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--gold-100); margin-bottom:8px; }
        .qrm-ingrow{ display:flex; justify-content:space-between; font-size:11.5px; color:rgba(253,254,254,0.75); padding:5px 0; border-bottom:1px dashed var(--line); }
        .qrm-ingrow span:last-child{ color:rgba(253,254,254,0.5); }
        .qrm-tagpills{ display:flex; gap:8px; flex-wrap:wrap; }
        .qrm-tagpill{ display:flex; align-items:center; gap:5px; font-size:10.5px; font-weight:600; color:rgba(253,254,254,0.75); background:rgba(255,255,255,0.05); border:1px solid var(--line); padding:6px 10px; border-radius:999px; }
        .qrm-detail-foot{ display:flex; align-items:center; justify-content:space-between; padding:20px 18px 26px; gap:14px; }
        .qrm-stepper{ display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.06); border-radius:12px; padding:6px 10px; }
        .qrm-stepper button{ width:24px; height:24px; border-radius:7px; border:none; background:rgba(255,255,255,0.1); color:var(--cream); display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .qrm-stepper span{ font-weight:700; font-size:14px; min-width:16px; text-align:center; }

        .qrm-cartrow{ display:flex; gap:11px; padding:11px 18px; align-items:center; }
        .qrm-cartinfo{ flex:1; }
        .qrm-cartname{ font-size:13.5px; font-weight:700; color:var(--cream); }
        .qrm-cartprice{ font-size:10.5px; color:rgba(253,254,254,0.5); margin-top:2px; }
        .qrm-cartfoot{ padding:14px 18px 28px; border-top:1px solid var(--line); margin-top:6px; }
        .qrm-subtotalrow{ display:flex; justify-content:space-between; margin-bottom:12px; align-items:baseline; }
        .qrm-subtotalrow span:first-child{ font-size:12px; color:rgba(253,254,254,0.55); }
        .qrm-subtotalrow span:last-child{ font-size:19px; font-weight:700; color:var(--gold-100); }
        .qrm-confirmbtn{ width:100%; background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#fff; border:none; font-weight:800; font-size:12.5px; padding:13px; border-radius:13px; cursor:pointer; font-family:'Inter',sans-serif; }
        .qrm-demonote{ text-align:center; font-size:9.5px; color:rgba(253,254,254,0.4); margin-top:9px; }

        .qrm-footercap{ margin-top:20px; font-size:10.5px; color:rgba(253,254,254,0.4); text-align:center; position:relative; z-index:2; max-width:340px; line-height:1.5; }

        @media (max-width: 600px) {
          .qrm-root { padding: 0; }
          .qrm-topcap, .qrm-brandrow, .qrm-footercap, .qrm-skyline { display: none; }
          .qrm-phone { width: 100vw; height: 100vh; max-width: 100vw; border-radius: 0; padding: 0; background: none; box-shadow: none; }
          .qrm-screen { border-radius: 0; }
          .qrm-notch, .qrm-status { display: none; }
          .qrm-table { margin: 12px auto 6px; }
        }
      `}</style>

      <svg className="qrm-skyline" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,200 L0,140 L40,140 L40,110 L80,110 L80,150 L130,150 L130,90 L150,90 L150,150 L210,150 L210,120 L260,120 L260,160 L320,160 L320,100 L360,100 L360,160 L430,160 L430,80 L460,80 L460,160 L520,160 L520,130 L580,130 L580,170 L640,170 L640,95 L680,95 L680,170 L740,170 L740,115 L800,115 L800,165 L860,165 L860,85 L900,85 L900,165 L970,165 L970,125 L1030,125 L1030,170 L1090,170 L1090,105 L1130,105 L1130,170 L1200,170 L1200,200 Z" fill="#110e05" opacity="0.9" />
      </svg>

      <div className="qrm-topcap">{t.demoTopBanner}</div>
      <div className="qrm-brandrow">
        <img src={LOGO_FULL} alt="Meşhur Menemenci Dayı" className="qrm-brandimg" />
      </div>

      <div className="qrm-phone">
        <div className="qrm-screen">
          <div className="qrm-notch" />
          <div className="qrm-status">
            <span>9:41</span>
            <span>Mahmutlu · Wi-Fi</span>
          </div>
          <div className="qrm-table"><Hash size={11} /> {t.table} {TABLE_NUMBER}</div>

          <div className="qrm-scroll">
            <div className="qrm-header">
              <img src={LOGO_FULL} alt="Menemenci Dayı" className="qrm-headlogo" />
              <div>
                <div className="qrm-hsub">{t.subtitle}</div>
              </div>
              <div className="qrm-legal" onClick={() => setLegalTip((v) => !v)}>
                <ShieldCheck size={11} /> {t.legalBadge}
              </div>
              {legalTip && (
                <div className="qrm-legaltip">
                  {t.legalTooltip}
                  <b>{t.lastUpdated}: {MENU_UPDATED}</b>
                </div>
              )}
            </div>

            <div className="qrm-hero">
              <div className="qrm-greet"><Sun size={19} color="var(--gold-100)" /> {t.greeting}</div>
              <div className="qrm-greetsub">{t.greetingSub}</div>
              <svg className="qrm-hero-wave" viewBox="0 0 400 40" preserveAspectRatio="none">
                <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V40 H0 Z" fill="#110e05" opacity="0.6" />
                <path d="M0,28 Q50,10 100,28 T200,28 T300,28 T400,28 V40 H0 Z" fill="#110e05" />
              </svg>
            </div>

            {/* AI concierge */}
            <div className="qrm-ai">
              <div className="qrm-ai-eyebrow"><Sparkles size={12} /> {t.aiEyebrow}</div>

              {aiPhase === "idle" && (
                <>
                  <div className="qrm-ai-title">{t.aiIdleTitle}</div>
                  <div className="qrm-ai-sub">{t.aiIdleSub}</div>
                  <div className="qrm-ai-row">
                    <button className="qrm-btn-gold" onClick={() => setAiPhase("q1")}>
                      <Sparkles size={13} /> {t.aiStart}
                    </button>
                  </div>
                </>
              )}

              {aiPhase === "q1" && (
                <>
                  <div className="qrm-ai-title">{t.aiQ1}</div>
                  <div className="qrm-ai-options">
                    {t.aiQ1Options.map((o) => (
                      <button key={o.key} className="qrm-ai-opt" onClick={() => chooseQ1(o.key)}>
                        {o.label} <ChevronRight size={13} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {aiPhase === "q2" && (
                <>
                  <button className="qrm-ai-back" onClick={() => setAiPhase("q1")}><ArrowLeft size={11} /> {t.back}</button>
                  <div className="qrm-ai-title">{t.aiQ2}</div>
                  <div className="qrm-ai-options">
                    {t.aiQ2Options.map((o) => (
                      <button key={o.key} className="qrm-ai-opt" onClick={() => chooseQ2(o.key)}>
                        {o.label} <ChevronRight size={13} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {aiPhase === "result" && aiResult && (
                <>
                  <div className="qrm-ai-title" style={{ fontSize: 11, opacity: 0.65, marginBottom: 4 }}>{t.aiResultEyebrow}</div>
                  <div className="qrm-ai-name">{aiResult.name[lang]}</div>
                  <div className="qrm-ai-reason">{aiResult.desc[lang]}</div>
                  <div className="qrm-ai-row">
                    <button className="qrm-btn-gold" onClick={() => addAiSuggestion(aiResult)}>
                      {aiAdded ? <Check size={13} /> : <ShoppingBag size={13} />}
                      {aiAdded ? t.added : t.aiCta}
                    </button>
                    <button className="qrm-btn-ghost" onClick={resetAi}>
                      <RefreshCw size={12} /> {t.aiRetry}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="qrm-searchwrap">
              <div className="qrm-search">
                <Search size={14} color="rgba(253,254,254,0.45)" />
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
                      <Icon size={15} color={active ? "#fbbf24" : "rgba(253,254,254,0.55)"} />
                      <span>{c.label[lang]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="qrm-list">
              {itemsByCategory.length === 0 && <div className="qrm-empty">{t.noResults}</div>}
              {itemsByCategory.map((item) => {
                const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Sparkles;
                const justAdded = flashId === item.id;
                return (
                  <div className="qrm-card" key={item.id} onClick={() => openDetail(item)}>
                    <div className="qrm-tile">{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={21} color="#fbbf24" />}</div>
                    <div className="qrm-cardbody">
                      <div className="qrm-cname">{item.name[lang]}</div>
                      <div className="qrm-cdesc">{item.desc[lang]}</div>
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="qrm-allergrow">
                          {item.allergens.map((a) => {
                            if (!ALLERGEN_META[a]) return null;
                            const AI = ALLERGEN_META[a].icon;
                            return <div key={a} className="qrm-allericon" title={ALLERGEN_META[a].label[lang]}><AI size={9.5} /></div>;
                          })}
                        </div>
                      )}
                      <div className="qrm-cmeta">
                        <div className="qrm-price">{fmtTL(item.price)}</div>
                        <div className="qrm-kcal">{item.kcal} {t.kcal}</div>
                      </div>
                    </div>
                    <button className={`qrm-addbtn ${justAdded ? "done" : ""}`} onClick={(e) => { e.stopPropagation(); addToCart(item.id, 1); }}>
                      {justAdded ? <Check size={13} /> : <Plus size={13} />}
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
                  <div className="qrm-locbtn" style={{ background: "linear-gradient(135deg,var(--gold-100),var(--gold-400))", color: "#fff" }}>
                    <Navigation size={12} /> {t.openMap}
                  </div>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <div className="qrm-locbtn" style={{ background: "rgba(255,255,255,0.06)", color: "var(--cream)", border: "1px solid var(--line)" }}>
                    <Share2 size={12} /> {t.shareWA}
                  </div>
                </a>
              </div>
              <div className="qrm-follow">
                <span style={{ fontSize: 10.5, color: "rgba(253,254,254,0.5)", fontWeight: 600 }}>{t.followUs}</span>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} /> @meshur_menemenci_dayi
                </a>
              </div>
            </div>
          </div>

          <button className="qrm-fab" onClick={callWaiter}>
            <Bell size={13} /> {t.callWaiter}
          </button>

          {waiterToast && (
            <div className="qrm-toast">
              <Bell size={14} color="#F5A623" /> {t.waiterCalled}
            </div>
          )}

          <div className="qrm-nav">
            <button className="qrm-navitem active">
              <Sun size={16} /> <span>{t.navMenu}</span>
            </button>
            <button className="qrm-navitem" onClick={() => setShowCart(true)} style={{ position: "relative" }}>
              <ShoppingBag size={16} />
              {cartCount > 0 && <div className="qrm-navbadge">{cartCount}</div>}
              <span>{t.navCart}</span>
            </button>
            <button className="qrm-navitem" onClick={callWaiter}>
              <Bell size={16} /> <span>{t.navWaiter}</span>
            </button>
            <button className="qrm-navitem" onClick={() => setLang((l) => (l === "tr" ? "en" : "tr"))}>
              <Languages size={16} /> <span>{lang.toUpperCase()}</span>
            </button>
          </div>

          {selectedItem && (
            <div className="qrm-sheet-backdrop" onClick={() => setSelectedItem(null)}>
              <div className="qrm-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="qrm-sheet-handle" />
                <div className="qrm-sheet-head">
                  <div />
                  <button className="qrm-iconbtn" onClick={() => setSelectedItem(null)}><X size={14} /></button>
                </div>
                <div className="qrm-detail-tile">
                  {selectedItem.img
                    ? <img src={selectedItem.img} alt={selectedItem.name[lang]} loading="lazy" />
                    : (() => { const Icon = CATEGORIES.find((c) => c.key === selectedItem.category)?.icon || Sparkles; return <Icon size={44} color="#fbbf24" />; })()}
                </div>
                <div className="qrm-detail-name">{selectedItem.name[lang]}</div>
                <div className="qrm-detail-desc">{selectedItem.desc[lang]}</div>

                <div className="qrm-detail-section">
                  <div className="qrm-detail-label">{t.ingredients}</div>
                  {selectedItem.ingredients && selectedItem.ingredients.map((ing, idx) => (
                    <div className="qrm-ingrow" key={idx}><span>{ing.n}</span><span>{ing.a}</span></div>
                  ))}
                </div>

                <div className="qrm-detail-section">
                  <div className="qrm-detail-label">{t.allergens}</div>
                  <div className="qrm-tagpills">
                    {(!selectedItem.allergens || selectedItem.allergens.length === 0) && <div className="qrm-tagpill">{t.noAllergens}</div>}
                    {selectedItem.allergens && selectedItem.allergens.map((a) => {
                      if (!ALLERGEN_META[a]) return null;
                      const AI = ALLERGEN_META[a].icon;
                      return <div className="qrm-tagpill" key={a}><AI size={11} /> {ALLERGEN_META[a].label[lang]}</div>;
                    })}
                  </div>
                </div>

                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="qrm-detail-section">
                    <div className="qrm-detail-label">{t.filters.popular === "Popüler" ? "Etiketler" : "Tags"}</div>
                    <div className="qrm-tagpills">
                      {selectedItem.tags.map((tag) => {
                        const Icon = FILTER_ICON[tag];
                        return <div className="qrm-tagpill" key={tag}><Icon size={11} /> {t.filters[tag]}</div>;
                      })}
                    </div>
                  </div>
                )}

                <div className="qrm-detail-foot">
                  <div className="qrm-stepper">
                    <button onClick={() => setDetailQty((q) => Math.max(1, q - 1))}><Minus size={11} /></button>
                    <span>{detailQty}</span>
                    <button onClick={() => setDetailQty((q) => q + 1)}><Plus size={11} /></button>
                  </div>
                  <button className="qrm-btn-gold" style={{ flex: 1, justifyContent: "center", padding: "12px" }}
                    onClick={() => { addToCart(selectedItem.id, detailQty); setSelectedItem(null); }}>
                    <ShoppingBag size={13} /> {t.detailsCta} · {fmtTL(selectedItem.price * detailQty)}
                  </button>
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
                  <button className="qrm-iconbtn" onClick={() => setShowCart(false)}><X size={14} /></button>
                </div>

                {cartCount === 0 ? (
                  <div className="qrm-empty" style={{ padding: "40px 20px 50px" }}>
                    <ShoppingBag size={24} style={{ marginBottom: 10, opacity: 0.5 }} />
                    <div style={{ fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>{t.cartEmpty}</div>
                    <div>{t.cartEmptySub}</div>
                  </div>
                ) : (
                  <>
                    <div style={{ paddingBottom: 6 }}>
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = ITEMS.find((i) => i.id === id);
                        if (!item) return null;
                        const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Sparkles;
                        return (
                          <div className="qrm-cartrow" key={id}>
                            <div className="qrm-tile" style={{ width: 42, height: 42 }}>{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={16} color="#fbbf24" />}</div>
                            <div className="qrm-cartinfo">
                              <div className="qrm-cartname">{item.name[lang]}</div>
                              <div className="qrm-cartprice">{fmtTL(item.price)}</div>
                            </div>
                            <div className="qrm-stepper">
                              <button onClick={() => changeQty(id, -1)}><Minus size={11} /></button>
                              <span>{qty}</span>
                              <button onClick={() => changeQty(id, 1)}><Plus size={11} /></button>
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
        Meşhur Menemenci Dayı için QR Akıllı Menü Sistemi — masaya özel QR, yapay zeka önerisi, alerjen/malzeme bilgisi, çoklu dil ve yasal uyum tek ekranda.
      </div>
    </div>
  );
}
