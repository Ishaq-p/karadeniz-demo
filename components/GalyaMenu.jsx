"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Fish, Salad, Waves, Wine, Cake, Sparkles, Bell, Search, X, Check,
  ChevronRight, Info, Star, Leaf, Flame, ShoppingBag, ShieldCheck,
  RefreshCw, Plus, Minus, MapPin, Hash, Sunset, ChefHat, Feather,
  Milk, Wheat, ExternalLink, Navigation, Share2, Languages, ArrowLeft,
  Coffee, Beef,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets (embedded so the demo always renders identically)    */
/* ---------------------------------------------------------------- */

const LOGO_FULL = "data:image/jpeg;base64,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";
const LOGO_ICON = "data:image/jpeg;base64,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";

const TABLE_NUMBER = "07";
const MENU_UPDATED = "01.08.2026";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Galya+Restaurant+%26+Bar+Atakum+Samsun";
const INSTAGRAM_LINK = "https://www.instagram.com/galyasamsun";
const WHATSAPP_LINK =
  "https://wa.me/?text=" +
  encodeURIComponent("Galya Restaurant & Bar — Atakum, Samsun. Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
  tr: {
    demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
    subtitle: "Atakum Sahili · Uzakdoğu & Türk Mutfağı",
    table: "Masa",
    greeting: "Hoş geldiniz",
    greetingSub: "Bu akşam Galya'da güzel bir sofra sizi bekliyor",
    aiEyebrow: "Yapay Zeka Önerisi",
    aiIdleTitle: "Size özel bir öneri ister misiniz?",
    aiIdleSub: "2 kısa soruyla o anki iştahınıza en uygun lezzeti buluyoruz.",
    aiStart: "Öneri Al",
    aiQ1: "Bu akşam canınız ne çekiyor?",
    aiQ1Options: [
      { key: "sushi", label: "Sushi & Uzakdoğu" },
      { key: "mains", label: "Ana Yemek" },
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
    locationName: "Galya Restaurant & Bar",
    locationSub: "Denizevleri, Adnan Menderes Blv. — Atakum, Samsun sahili",
    openMap: "Haritada Aç",
    shareWA: "Konumu Paylaş",
    followUs: "Bizi Takip Edin",
  },
  en: {
    demoTopBanner: "LIVE PREVIEW — built with sample data",
    subtitle: "Atakum Seafront · Far East & Turkish Cuisine",
    table: "Table",
    greeting: "Welcome",
    greetingSub: "A lovely table at Galya awaits you tonight",
    aiEyebrow: "AI Recommendation",
    aiIdleTitle: "Want a pick made just for you?",
    aiIdleSub: "Two quick questions and we'll match a dish to your appetite.",
    aiStart: "Get a recommendation",
    aiQ1: "What are you in the mood for tonight?",
    aiQ1Options: [
      { key: "sushi", label: "Sushi & Far East" },
      { key: "mains", label: "Mains" },
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
    locationName: "Galya Restaurant & Bar",
    locationSub: "Denizevleri, Adnan Menderes Blv. — Atakum seafront, Samsun",
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

export default function GalyaMenu() {
  const [lang, setLang] = useState("tr");
  const [activeCategory, setActiveCategory] = useState("sushi");
  const [activeFilters, setActiveFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [waiterToast, setWaiterToast] = useState(false);
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
    setTimeout(() => setAiAdded(false), 1400);
  }

  const aiResult = aiPhase === "result" ? pickAiSuggestion(aiAnswers.q1, aiAnswers.q2) : null;

  return (
    <div className="qrm-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

        .qrm-root {
          --petrol-900:#241811; --petrol-800:#2E2015; --petrol-700:#3A2A1C;
          --gold-100:#F0DDA0; --gold-400:#D3AC58; --gold-600:#A67C28;
          --teal-400:#C1815A; --cream:#F7EFE0; --ink:#201309; --line:rgba(255,255,255,0.08);
          font-family:'Inter',sans-serif;
          min-height:100vh; width:100%; position:relative;
          display:flex; flex-direction:column; align-items:center;
          padding:28px 16px 44px;
          background:
            radial-gradient(ellipse 900px 480px at 50% -10%, rgba(193,129,90,0.14), transparent 60%),
            linear-gradient(180deg,#1C120B 0%, #241811 45%, #2E2015 100%);
          color:var(--cream);
          box-sizing:border-box;
        }
        .qrm-root *{ box-sizing:border-box; }
        .qrm-serif{ font-family:'Playfair Display',serif; }

        .qrm-skyline{ position:absolute; left:0; right:0; bottom:0; height:170px; opacity:0.45; pointer-events:none; }

        .qrm-topcap{
          font-size:10.5px; letter-spacing:0.13em; text-transform:uppercase; color:var(--gold-100); opacity:0.85;
          background:rgba(212,175,106,0.08); border:1px solid rgba(212,175,106,0.3);
          padding:7px 16px; border-radius:999px; margin-bottom:16px; text-align:center; position:relative; z-index:2;
        }
        .qrm-brandrow{ display:flex; flex-direction:column; align-items:center; margin-bottom:18px; position:relative; z-index:2; }
        .qrm-brandimg{ height:76px; width:auto; border-radius:14px; box-shadow:0 10px 26px rgba(0,0,0,0.35); }

        .qrm-phone{
          position:relative; z-index:2;
          width:min(390px, 94vw);
          height:min(844px, calc(min(390px, 94vw) * 844 / 390));
          border-radius:44px; padding:12px;
          background:linear-gradient(160deg,#1c1c1e,#050505);
          box-shadow:0 40px 90px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06) inset;
        }
        .qrm-screen{
          position:relative; width:100%; height:100%; border-radius:33px; overflow:hidden;
          background:var(--petrol-900); display:flex; flex-direction:column;
        }
        .qrm-notch{ position:absolute; top:6px; left:50%; transform:translateX(-50%); width:104px; height:20px; background:#000; border-radius:14px; z-index:30; }
        .qrm-status{ display:flex; justify-content:space-between; padding:13px 24px 0; font-size:11.5px; font-weight:700; color:rgba(255,255,255,0.8); flex-shrink:0; }
        .qrm-table{
          display:flex; align-items:center; justify-content:center; gap:5px; margin:6px auto 0; width:fit-content;
          font-size:10.5px; font-weight:700; letter-spacing:0.05em; color:var(--petrol-900);
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); padding:4px 12px; border-radius:999px; flex-shrink:0;
        }

        .qrm-scroll{ flex:1; overflow-y:auto; padding-bottom:10px; scrollbar-width:thin; scrollbar-color:var(--gold-400) transparent; }
        .qrm-scroll::-webkit-scrollbar{ width:5px; }
        .qrm-scroll::-webkit-scrollbar-track{ background:transparent; }
        .qrm-scroll::-webkit-scrollbar-thumb{ background:linear-gradient(var(--gold-100),var(--gold-600)); border-radius:10px; }

        .qrm-header{
          padding:10px 16px 14px; display:flex; align-items:center; gap:10px;
          background:linear-gradient(160deg,var(--petrol-700),var(--petrol-900));
          border-bottom:1px solid var(--line); flex-shrink:0; position:relative;
        }
        .qrm-headlogo{ height:32px; width:auto; border-radius:7px; flex-shrink:0; }
        .qrm-hsub{ font-size:9.5px; color:rgba(247,242,228,0.5); margin-top:1px; }
        .qrm-legal{
          margin-left:auto; display:flex; align-items:center; gap:5px;
          background:rgba(193,129,90,0.1); border:1px solid rgba(193,129,90,0.32);
          padding:5px 9px; border-radius:999px; font-size:9px; font-weight:700;
          color:var(--teal-400); letter-spacing:0.02em; cursor:pointer; white-space:nowrap;
        }
        .qrm-legaltip{
          position:absolute; top:50px; right:14px; width:206px; z-index:40;
          background:#2A1B10; border:1px solid rgba(212,175,106,0.3); border-radius:12px;
          padding:11px 12px; font-size:10px; line-height:1.5; color:rgba(247,242,228,0.85);
          box-shadow:0 12px 30px rgba(0,0,0,0.4);
        }
        .qrm-legaltip b{ color:var(--gold-100); display:block; margin-top:6px; font-size:9.5px; }

        .qrm-hero{ position:relative; padding:14px 18px 24px; overflow:hidden; flex-shrink:0;
          background:radial-gradient(120% 100% at 20% 0%, #1a5a52 0%, #0c332f 60%, #0a2a28 100%); }
        .qrm-hero-wave{ position:absolute; left:0; right:0; bottom:-2px; height:32px; }
        .qrm-greet{ display:flex; align-items:center; gap:8px; font-size:20px; font-weight:700; color:var(--cream); position:relative; z-index:2;}
        .qrm-greetsub{ font-size:11px; color:rgba(247,242,228,0.6); margin-top:3px; position:relative; z-index:2;}

        .qrm-ai{
          margin:-12px 16px 0; position:relative; z-index:5;
          background:linear-gradient(135deg,#3A2A1C,#2A1B10);
          border:1px solid rgba(212,175,106,0.35); border-left:3px solid var(--gold-400);
          border-radius:16px; padding:14px; box-shadow:0 14px 30px rgba(0,0,0,0.35);
        }
        .qrm-ai-eyebrow{ display:flex; align-items:center; gap:6px; font-size:10px; font-weight:700;
          letter-spacing:0.06em; text-transform:uppercase; color:var(--gold-100); margin-bottom:8px;}
        .qrm-ai-title{ font-size:14.5px; font-weight:700; color:var(--cream); line-height:1.3; }
        .qrm-ai-sub{ font-size:11px; color:rgba(247,242,228,0.6); margin-top:4px; line-height:1.4; }
        .qrm-ai-name{ font-size:16.5px; font-weight:700; color:var(--cream); }
        .qrm-ai-reason{ font-size:11px; color:rgba(247,242,228,0.6); margin-top:2px; line-height:1.4; }
        .qrm-ai-row{ display:flex; align-items:center; gap:8px; margin-top:11px; flex-wrap:wrap; }
        .qrm-ai-options{ display:flex; flex-direction:column; gap:7px; margin-top:11px; }
        .qrm-ai-opt{
          text-align:left; font-size:12px; font-weight:600; color:var(--cream);
          background:rgba(255,255,255,0.05); border:1px solid var(--line); border-radius:11px;
          padding:9px 12px; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
        }
        .qrm-ai-opt:active{ background:rgba(212,175,106,0.15); border-color:rgba(212,175,106,0.4); }
        .qrm-ai-back{ display:flex; align-items:center; gap:4px; font-size:10.5px; font-weight:600; color:var(--teal-400); background:none; border:none; cursor:pointer; margin-bottom:2px; }

        .qrm-btn-gold{
          font-size:11.5px; font-weight:700; color:#2A1608; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-gold:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--teal-400); background:transparent;
          border:1px solid rgba(193,129,90,0.35); padding:8px 11px; border-radius:10px;
          cursor:pointer; display:flex; align-items:center; gap:5px; font-family:'Inter',sans-serif;
        }

        .qrm-searchwrap{ padding:16px 16px 4px; flex-shrink:0; }
        .qrm-search{ display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.05); border:1px solid var(--line); border-radius:12px; padding:9px 12px; }
        .qrm-search input{ background:transparent; border:none; outline:none; color:var(--cream); font-size:12.5px; width:100%; font-family:'Inter',sans-serif; }
        .qrm-search input::placeholder{ color:rgba(247,242,228,0.35); }

        .qrm-filters{ display:flex; gap:7px; padding:10px 16px 2px; flex-shrink:0; overflow-x:auto; scrollbar-width:none; }
        .qrm-filters::-webkit-scrollbar{ display:none; }
        .qrm-chip{
          display:flex; align-items:center; gap:5px; font-size:10.5px; font-weight:600;
          padding:6.5px 11px; border-radius:999px; white-space:nowrap; cursor:pointer;
          border:1px solid var(--line); color:rgba(247,242,228,0.7); background:rgba(255,255,255,0.03);
        }
        .qrm-chip.active{ background:var(--teal-400); border-color:var(--teal-400); color:#2A1608; }

        .qrm-cats{ display:flex; gap:8px; padding:14px 16px 4px; overflow-x:auto; flex-shrink:0; scrollbar-width:none; }
        .qrm-cats::-webkit-scrollbar{ display:none; }
        .qrm-cat{ display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; padding:9px 13px; border-radius:14px; border:1px solid var(--line); background:rgba(255,255,255,0.025); }
        .qrm-cat.active{ background:linear-gradient(135deg,rgba(212,175,106,0.16),rgba(212,175,106,0.05)); border-color:rgba(212,175,106,0.45); }
        .qrm-cat span{ font-size:9px; font-weight:700; color:rgba(247,242,228,0.65); text-align:center; white-space:nowrap; }
        .qrm-cat.active span{ color:var(--gold-100); }

        .qrm-list{ padding:12px 16px 26px; display:flex; flex-direction:column; gap:11px; }
        .qrm-empty{ text-align:center; padding:40px 20px; color:rgba(247,242,228,0.5); font-size:12px; }
        .qrm-card{ display:flex; gap:11px; background:rgba(255,255,255,0.03); border:1px solid var(--line); border-radius:16px; padding:10px; cursor:pointer; }
        .qrm-card:active{ background:rgba(255,255,255,0.06); }
        .qrm-tile{ width:56px; height:56px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden;
          background:linear-gradient(150deg,#3A2A1C,#241811); border:1px solid rgba(212,175,106,0.18); }
        .qrm-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
        .qrm-cardbody{ flex:1; min-width:0; }
        .qrm-cname{ font-size:14.5px; font-weight:700; color:var(--cream); line-height:1.2; }
        .qrm-cdesc{ font-size:10.5px; color:rgba(247,242,228,0.5); margin-top:3px; line-height:1.4;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .qrm-allergrow{ display:flex; gap:5px; margin-top:6px; }
        .qrm-allericon{ width:16px; height:16px; border-radius:5px; background:rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; color:rgba(247,242,228,0.55); }
        .qrm-cmeta{ display:flex; align-items:center; gap:9px; margin-top:7px; }
        .qrm-price{ font-size:14px; font-weight:700; color:var(--gold-100); white-space:nowrap; }
        .qrm-kcal{ font-size:9.5px; color:rgba(247,242,228,0.4); }
        .qrm-addbtn{ width:27px; height:27px; border-radius:9px; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#2A1608;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; }
        .qrm-addbtn.done{ background:var(--teal-400); color:#2A1608; }

        .qrm-location{ margin:6px 16px 0; padding:14px; border-radius:16px; background:rgba(255,255,255,0.03); border:1px solid var(--line); }
        .qrm-loctitle{ font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold-100); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
        .qrm-locname{ font-size:14.5px; font-weight:700; color:var(--cream); }
        .qrm-locsub{ font-size:10.5px; color:rgba(247,242,228,0.55); margin-top:3px; line-height:1.4; }
        .qrm-locbtns{ display:flex; gap:8px; margin-top:11px; }
        .qrm-locbtns a{ text-decoration:none; flex:1; }
        .qrm-locbtn{ display:flex; align-items:center; justify-content:center; gap:6px; font-size:10.5px; font-weight:700; padding:9px; border-radius:10px; }
        .qrm-follow{ display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:1px solid var(--line); }
        .qrm-follow a{ display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:var(--cream); text-decoration:none; }

        .qrm-fab{ position:absolute; right:14px; bottom:84px; z-index:20; display:flex; align-items:center; gap:7px; padding:11px 15px; border-radius:999px;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-600)); color:#2A1608; font-size:11.5px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 14px 26px rgba(0,0,0,0.4); font-family:'Inter',sans-serif; }

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:#2A1B10; border:1px solid rgba(193,129,90,0.4); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:rgba(36,24,17,0.92); padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(247,242,228,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--gold-100); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--teal-400); color:#2A1608; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

        .qrm-sheet-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:60; display:flex; align-items:flex-end; }
        .qrm-sheet{ width:100%; max-height:85%; background:var(--petrol-800); border-radius:24px 24px 0 0; overflow-y:auto; animation:qrmUp .25s ease; border-top:1px solid rgba(212,175,106,0.28);
          scrollbar-width:thin; scrollbar-color:var(--gold-400) transparent; }
        .qrm-sheet::-webkit-scrollbar{ width:5px; }
        .qrm-sheet::-webkit-scrollbar-thumb{ background:var(--gold-400); border-radius:10px; }
        .qrm-sheet-handle{ width:36px; height:4px; background:rgba(255,255,255,0.2); border-radius:3px; margin:10px auto 4px; }
        .qrm-sheet-head{ display:flex; justify-content:space-between; align-items:center; padding:8px 18px 4px; }
        .qrm-sheet-title{ font-size:18px; font-weight:700; color:var(--cream); }
        .qrm-iconbtn{ background:rgba(255,255,255,0.08); border:none; color:var(--cream); width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }

        .qrm-detail-tile{ height:140px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:14px 18px 0; overflow:hidden;
          background:linear-gradient(150deg,#3A2A1C,#241811); border:1px solid rgba(212,175,106,0.2); }
        .qrm-detail-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
        .qrm-detail-name{ font-size:21px; font-weight:700; color:var(--cream); padding:16px 18px 0; }
        .qrm-detail-desc{ font-size:12px; color:rgba(247,242,228,0.6); line-height:1.55; padding:8px 18px 0; }
        .qrm-detail-section{ padding:14px 18px 0; }
        .qrm-detail-label{ font-size:10px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--gold-100); margin-bottom:8px; }
        .qrm-ingrow{ display:flex; justify-content:space-between; font-size:11.5px; color:rgba(247,242,228,0.75); padding:5px 0; border-bottom:1px dashed var(--line); }
        .qrm-ingrow span:last-child{ color:rgba(247,242,228,0.5); }
        .qrm-tagpills{ display:flex; gap:8px; flex-wrap:wrap; }
        .qrm-tagpill{ display:flex; align-items:center; gap:5px; font-size:10.5px; font-weight:600; color:rgba(247,242,228,0.75); background:rgba(255,255,255,0.05); border:1px solid var(--line); padding:6px 10px; border-radius:999px; }
        .qrm-detail-foot{ display:flex; align-items:center; justify-content:space-between; padding:20px 18px 26px; gap:14px; }
        .qrm-stepper{ display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.06); border-radius:12px; padding:6px 10px; }
        .qrm-stepper button{ width:24px; height:24px; border-radius:7px; border:none; background:rgba(255,255,255,0.1); color:var(--cream); display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .qrm-stepper span{ font-weight:700; font-size:14px; min-width:16px; text-align:center; }

        .qrm-cartrow{ display:flex; gap:11px; padding:11px 18px; align-items:center; }
        .qrm-cartinfo{ flex:1; }
        .qrm-cartname{ font-size:13.5px; font-weight:700; color:var(--cream); }
        .qrm-cartprice{ font-size:10.5px; color:rgba(247,242,228,0.5); margin-top:2px; }
        .qrm-cartfoot{ padding:14px 18px 28px; border-top:1px solid var(--line); margin-top:6px; }
        .qrm-subtotalrow{ display:flex; justify-content:space-between; margin-bottom:12px; align-items:baseline; }
        .qrm-subtotalrow span:first-child{ font-size:12px; color:rgba(247,242,228,0.55); }
        .qrm-subtotalrow span:last-child{ font-size:19px; font-weight:700; color:var(--gold-100); }
        .qrm-confirmbtn{ width:100%; background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#2A1608; border:none; font-weight:800; font-size:12.5px; padding:13px; border-radius:13px; cursor:pointer; font-family:'Inter',sans-serif; }
        .qrm-demonote{ text-align:center; font-size:9.5px; color:rgba(247,242,228,0.4); margin-top:9px; }

        .qrm-footercap{ margin-top:20px; font-size:10.5px; color:rgba(247,242,228,0.4); text-align:center; position:relative; z-index:2; max-width:340px; line-height:1.5; }

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

      <svg className="qrm-skyline" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,200 L0,140 L40,140 L40,110 L80,110 L80,150 L130,150 L130,90 L150,90 L150,150 L210,150 L210,120 L260,120 L260,160 L320,160 L320,100 L360,100 L360,160 L430,160 L430,80 L460,80 L460,160 L520,160 L520,130 L580,130 L580,170 L640,170 L640,95 L680,95 L680,170 L740,170 L740,115 L800,115 L800,165 L860,165 L860,85 L900,85 L900,165 L970,165 L970,125 L1030,125 L1030,170 L1090,170 L1090,105 L1130,105 L1130,170 L1200,170 L1200,200 Z" fill="#1C120B" opacity="0.9" />
      </svg>

      <div className="qrm-topcap">{t.demoTopBanner}</div>
      <div className="qrm-brandrow">
        <img src={LOGO_FULL} alt="Galya Restaurant & Bar" className="qrm-brandimg" />
      </div>

      <div className="qrm-phone">
        <div className="qrm-screen">
          <div className="qrm-notch" />
          <div className="qrm-status">
            <span>9:41</span>
            <span>Atakum · Wi-Fi</span>
          </div>
          <div className="qrm-table"><Hash size={11} /> {t.table} {TABLE_NUMBER}</div>

          <div className="qrm-scroll">
            <div className="qrm-header">
              <img src={LOGO_FULL} alt="Galya Restaurant & Bar" className="qrm-headlogo" />
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
              <div className="qrm-greet"><Sunset size={19} color="var(--gold-100)" /> {t.greeting}</div>
              <div className="qrm-greetsub">{t.greetingSub}</div>
              <svg className="qrm-hero-wave" viewBox="0 0 400 40" preserveAspectRatio="none">
                <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V40 H0 Z" fill="#241811" opacity="0.6" />
                <path d="M0,28 Q50,10 100,28 T200,28 T300,28 T400,28 V40 H0 Z" fill="#241811" />
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
                <Search size={14} color="rgba(247,242,228,0.45)" />
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
                      <Icon size={15} color={active ? "#F0DDA0" : "rgba(247,242,228,0.55)"} />
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
                    <div className="qrm-tile">{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={21} color="#F0DDA0" />}</div>
                    <div className="qrm-cardbody">
                      <div className="qrm-cname">{item.name[lang]}</div>
                      <div className="qrm-cdesc">{item.desc[lang]}</div>
                      {item.allergens.length > 0 && (
                        <div className="qrm-allergrow">
                          {item.allergens.map((a) => {
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
                  <div className="qrm-locbtn" style={{ background: "linear-gradient(135deg,var(--gold-100),var(--gold-400))", color: "#2A1608" }}>
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
                <span style={{ fontSize: 10.5, color: "rgba(247,242,228,0.5)", fontWeight: 600 }}>{t.followUs}</span>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} /> @kdnzblk
                </a>
              </div>
            </div>
          </div>

          <button className="qrm-fab" onClick={callWaiter}>
            <Bell size={13} /> {t.callWaiter}
          </button>

          {waiterToast && (
            <div className="qrm-toast">
              <Bell size={14} color="#3FC1CB" /> {t.waiterCalled}
            </div>
          )}

          <div className="qrm-nav">
            <button className="qrm-navitem active">
              <Fish size={16} /> <span>{t.navMenu}</span>
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
                    : (() => { const Icon = CATEGORIES.find((c) => c.key === selectedItem.category)?.icon || Fish; return <Icon size={44} color="#F0DDA0" />; })()}
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
                      return <div className="qrm-tagpill" key={a}><AI size={11} /> {ALLERGEN_META[a].label[lang]}</div>;
                    })}
                  </div>
                </div>

                {selectedItem.tags.length > 0 && (
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
                        const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Fish;
                        return (
                          <div className="qrm-cartrow" key={id}>
                            <div className="qrm-tile" style={{ width: 42, height: 42 }}>{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={16} color="#F0DDA0" />}</div>
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
        QR Akıllı Menü Sistemi — masaya özel QR, yapay zeka önerisi, alerjen/malzeme bilgisi, çoklu dil ve yasal uyum tek ekranda.
      </div>
    </div>
  );
}

