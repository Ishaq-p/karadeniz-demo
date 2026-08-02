"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Fish, Salad, Waves, Wine, Cake, Sparkles, Bell, Search, X, Check,
  ChevronRight, Info, Star, Leaf, Flame, ShoppingBag, ShieldCheck,
  RefreshCw, Plus, Minus, MapPin, Hash, Sunset, ChefHat, Feather,
  Milk, Wheat, ExternalLink, Navigation, Share2, Languages, ArrowLeft,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets (embedded so the demo always renders identically)    */
/* ---------------------------------------------------------------- */

const LOGO_FULL = "data:image/jpeg;base64,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";
const LOGO_ICON = "data:image/jpeg;base64,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";

const TABLE_NUMBER = "05";
const MENU_UPDATED = "01.08.2026";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Pamuk+Karde%C5%9Fler";
const INSTAGRAM_LINK = "https://www.instagram.com/";
const WHATSAPP_LINK =
  "https://wa.me/?text=" +
  encodeURIComponent("Pamuk Kardeşler — Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
  tr: {
    demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
    subtitle: "Taze Balık & Deniz Ürünleri",
    table: "Masa",
    greeting: "Hoş geldiniz",
    greetingSub: "Pamuk Kardeşler'de afiyetli bir sofra sizi bekliyor",
    aiEyebrow: "Yapay Zeka Önerisi",
    aiIdleTitle: "Size özel bir öneri ister misiniz?",
    aiIdleSub: "2 kısa soruyla o anki iştahınıza en uygun lezzeti buluyoruz.",
    aiStart: "Öneri Al",
    aiQ1: "Bu akşam canınız ne çekiyor?",
    aiQ1Options: [
      { key: "fish", label: "Balık" },
      { key: "seafood", label: "Deniz Mahsulleri" },
      { key: "starters", label: "Meze" },
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
    locationName: "Pamuk Kardeşler",
    locationSub: "Adresinizi ve çalışma saatlerinizi buraya ekleyin",
    openMap: "Haritada Aç",
    shareWA: "Konumu Paylaş",
    followUs: "Bizi Takip Edin",
  },
  en: {
    demoTopBanner: "LIVE PREVIEW — built with sample data",
    subtitle: "Fresh Fish & Seafood",
    table: "Table",
    greeting: "Welcome",
    greetingSub: "A hearty table at Pamuk Kardeşler awaits you",
    aiEyebrow: "AI Recommendation",
    aiIdleTitle: "Want a pick made just for you?",
    aiIdleSub: "Two quick questions and we'll match a dish to your appetite.",
    aiStart: "Get a recommendation",
    aiQ1: "What are you in the mood for tonight?",
    aiQ1Options: [
      { key: "fish", label: "Fish" },
      { key: "seafood", label: "Seafood" },
      { key: "starters", label: "Meze" },
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
    locationName: "Pamuk Kardeşler",
    locationSub: "Add your address and opening hours here",
    openMap: "Open in maps",
    shareWA: "Share location",
    followUs: "Follow us",
  },
};

const CATEGORIES = [
  { key: "starters", icon: Salad, label: { tr: "Mezeler", en: "Meze" } },
  { key: "fish", icon: Fish, label: { tr: "Balıklar", en: "Fish" } },
  { key: "seafood", icon: Waves, label: { tr: "Deniz Mahsulleri", en: "Seafood" } },
  { key: "drinks", icon: Wine, label: { tr: "İçecekler", en: "Drinks" } },
  { key: "desserts", icon: Cake, label: { tr: "Tatlılar & Meyve", en: "Desserts & Fruit" } },
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
    id: "humus", category: "starters", price: 90, kcal: 210, tags: ["veg", "light"], img: img(1618898),
    allergens: [],
    ingredients: [{ n: "Nohut", a: "150 g" }, { n: "Tahin", a: "30 g" }, { n: "Zeytinyağı", a: "15 ml" }, { n: "Limon", a: "1/2 adet" }],
    name: { tr: "Humus", en: "Hummus" },
    desc: { tr: "Zeytinyağı ve tahinle hazırlanan ev yapımı nohut ezmesi.", en: "Homemade chickpea dip with olive oil and tahini." }
  },
  {
    id: "tursu", category: "starters", price: 110, kcal: 150, tags: ["veg", "spicy"], img: img(8599636),
    allergens: [],
    ingredients: [{ n: "Karışık turşu", a: "180 g" }, { n: "Tereyağı", a: "20 g" }, { n: "Pul biber", a: "2 g" }],
    name: { tr: "Turşu Kavurması", en: "Sautéed Pickles" },
    desc: { tr: "Tereyağında kavrulmuş, pul biberli ev usulü turşu.", en: "House-style pickles sautéed in butter with chili flakes." }
  },
  {
    id: "borulce", category: "starters", price: 150, kcal: 120, tags: ["veg", "light"], img: img(1640777),
    allergens: [],
    ingredients: [{ n: "Deniz börülcesi", a: "150 g" }, { n: "Zeytinyağı", a: "20 ml" }, { n: "Limon", a: "1/2 adet" }, { n: "Sarımsak", a: "1 diş" }],
    name: { tr: "Deniz Börülcesi Salatası", en: "Sea Beans Salad" },
    desc: { tr: "Zeytinyağlı deniz börülcesi, taze limon ve sarımsakla.", en: "Sea beans tossed in olive oil with fresh lemon and garlic." }
  },
  {
    id: "kalamar", category: "starters", price: 240, kcal: 340, tags: ["popular", "chef"], img: img(15801015),
    allergens: ["shellfish", "gluten"],
    ingredients: [{ n: "Kalamar halkası", a: "220 g" }, { n: "Mısır unu", a: "40 g" }, { n: "Tartar sos", a: "30 g" }],
    name: { tr: "Kalamar Tava", en: "Fried Calamari" },
    desc: { tr: "Çıtır kalamar halkaları, özel tartar sos eşliğinde.", en: "Crispy calamari rings served with house tartar sauce." }
  },

  {
    id: "hamsi", category: "fish", price: 300, kcal: 390, tags: ["popular", "chef"], img: img(22742007),
    allergens: ["fish", "gluten"],
    ingredients: [{ n: "Taze hamsi", a: "250 g" }, { n: "Mısır unu", a: "35 g" }, { n: "Ayçiçek yağı", a: "15 ml" }],
    name: { tr: "Hamsi Tava", en: "Fried Anchovy" },
    desc: { tr: "Karadeniz’in meşhur hamsisi, mısır unuyla çıtır çıtır kızartılır.", en: "The Black Sea’s famous anchovy, crisply fried in cornmeal." }
  },
  {
    id: "levrek", category: "fish", price: 430, kcal: 410, tags: ["light", "chef"], img: img(8639151),
    allergens: ["fish"],
    ingredients: [{ n: "Levrek fileto", a: "280 g" }, { n: "Zeytinyağı", a: "15 ml" }, { n: "Mevsim yeşillik", a: "50 g" }],
    name: { tr: "Levrek Izgara", en: "Grilled Sea Bass" },
    desc: { tr: "Odun ateşinde ızgara taze levrek, mevsim yeşillikleriyle.", en: "Fresh sea bass grilled over wood fire, with seasonal greens." }
  },
  {
    id: "barbun", category: "fish", price: 380, kcal: 360, tags: ["popular"], img: img(8956671),
    allergens: ["fish"],
    ingredients: [{ n: "Barbun", a: "250 g" }, { n: "Un", a: "30 g" }, { n: "Ayçiçek yağı", a: "15 ml" }],
    name: { tr: "Barbun Tava", en: "Fried Red Mullet" },
    desc: { tr: "Karadeniz'in narin balığı, hafif unlanıp kızartılır.", en: "A delicate Black Sea catch, lightly floured and pan-fried." }
  },
  {
    id: "kalkan", category: "fish", price: 620, kcal: 430, tags: ["popular", "chef"], img: img(35509727),
    allergens: ["fish", "dairy"],
    ingredients: [{ n: "Kalkan fileto", a: "300 g" }, { n: "Tereyağı", a: "20 g" }, { n: "Limon", a: "1/2 adet" }],
    name: { tr: "Kalkan Izgara", en: "Grilled Turbot" },
    desc: { tr: "Karadeniz’in en özel balığı, ızgarada kendi suyunda pişer.", en: "The Black Sea’s most prized catch, grilled to perfection." }
  },

  {
    id: "midye", category: "seafood", price: 150, kcal: 260, tags: ["popular"], img: img(4445243),
    allergens: ["shellfish"],
    ingredients: [{ n: "Midye (kabuklu)", a: "6 adet" }, { n: "Baharatlı pilav iç harcı", a: "90 g" }],
    name: { tr: "Midye Dolma (6 adet)", en: "Stuffed Mussels (6 pcs)" },
    desc: { tr: "Baharatlı pilavla doldurulmuş taze midye.", en: "Fresh mussels stuffed with spiced rice." }
  },
  {
    id: "karides", category: "seafood", price: 360, kcal: 420, tags: ["spicy"], img: img(5041485),
    allergens: ["shellfish", "dairy"],
    ingredients: [{ n: "Karides", a: "220 g" }, { n: "Domates sos", a: "120 g" }, { n: "Kaşar peyniri", a: "40 g" }, { n: "Acı biber", a: "15 g" }],
    name: { tr: "Karides Güveç", en: "Shrimp Casserole" },
    desc: { tr: "Domates sos, kaşar peyniri ve acı biberle güveçte karides.", en: "Shrimp casserole with tomato sauce, cheese and chili." }
  },
  {
    id: "koftesi", category: "seafood", price: 220, kcal: 300, tags: ["popular"], img: img(18001765),
    allergens: ["fish", "gluten"],
    ingredients: [{ n: "Balık eti", a: "200 g" }, { n: "Galeta unu", a: "30 g" }, { n: "Maydanoz", a: "10 g" }],
    name: { tr: "Balık Köftesi", en: "Fish Croquettes" },
    desc: { tr: "El yapımı balık köftesi, çıtır dışı yumuşak içi.", en: "Handmade fish croquettes, crisp outside and tender inside." }
  },

  {
    id: "raki", category: "drinks", price: 800, kcal: 0, tags: [], img: img(8375042),
    allergens: [],
    ingredients: [{ n: "Rakı", a: "35 cl" }, { n: "Su & buz", a: "servis ile" }],
    name: { tr: "Rakı (35cl)", en: "Rakı (35cl)" },
    desc: { tr: "Yerli üretim, buz ve su ile servis edilir.", en: "Local production, served with ice and water." }
  },
  {
    id: "ayran", category: "drinks", price: 60, kcal: 90, tags: ["veg", "light"], img: img(27757405),
    allergens: ["dairy"],
    ingredients: [{ n: "Yoğurt", a: "200 ml" }, { n: "Su", a: "80 ml" }, { n: "Tuz", a: "1 g" }],
    name: { tr: "Ayran", en: "Ayran (Yogurt Drink)" },
    desc: { tr: "Ev yapımı, soğuk servis.", en: "Homemade, served chilled." }
  },
  {
    id: "maden", category: "drinks", price: 50, kcal: 0, tags: ["veg", "light"], img: img(113734),
    allergens: [],
    ingredients: [{ n: "Maden suyu", a: "1 şişe" }],
    name: { tr: "Maden Suyu", en: "Sparkling Water" },
    desc: { tr: "Soğuk servis edilir.", en: "Served chilled." }
  },

  {
    id: "sutlac", category: "desserts", price: 140, kcal: 280, tags: ["veg", "popular"], img: img(37825038),
    allergens: ["dairy"],
    ingredients: [{ n: "Süt", a: "250 ml" }, { n: "Pirinç", a: "40 g" }, { n: "Şeker", a: "30 g" }],
    name: { tr: "Fırın Sütlaç", en: "Baked Rice Pudding" },
    desc: { tr: "Fırında kızartılmış, geleneksel tarif.", en: "Oven-baked with a traditional recipe." }
  },
  {
    id: "meyve", category: "desserts", price: 130, kcal: 90, tags: ["veg", "light", "popular"], img: img(1398655),
    allergens: [],
    ingredients: [{ n: "Karpuz", a: "200 g" }, { n: "Kavun", a: "100 g" }],
    name: { tr: "Mevsim Meyve Tabağı", en: "Seasonal Fruit Plate" },
    desc: { tr: "Karpuz ve kavundan oluşan taze meyve tabağı.", en: "Fresh watermelon and melon plate." }
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

export default function PamukKardeslerMenu() {
  const [lang, setLang] = useState("tr");
  const [activeCategory, setActiveCategory] = useState("fish");
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
          --petrol-900:#170D38; --petrol-800:#1F1248; --petrol-700:#2B1B5E;
          --gold-100:#FFD3EC; --gold-400:#FF6FB8; --gold-600:#D62E88;
          --teal-400:#FF2E92; --cream:#F7F0FA; --ink:#12082C; --line:rgba(255,255,255,0.08);
          font-family:'Inter',sans-serif;
          min-height:100vh; width:100%; position:relative;
          display:flex; flex-direction:column; align-items:center;
          padding:28px 16px 44px;
          background:
            radial-gradient(ellipse 900px 480px at 50% -10%, rgba(255,46,146,0.18), transparent 60%),
            linear-gradient(180deg,#0F0828 0%, #170D38 45%, #1F1248 100%);
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
          background:rgba(255,46,146,0.1); border:1px solid rgba(255,46,146,0.32);
          padding:5px 9px; border-radius:999px; font-size:9px; font-weight:700;
          color:var(--teal-400); letter-spacing:0.02em; cursor:pointer; white-space:nowrap;
        }
        .qrm-legaltip{
          position:absolute; top:50px; right:14px; width:206px; z-index:40;
          background:#22123F; border:1px solid rgba(212,175,106,0.3); border-radius:12px;
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
          background:linear-gradient(135deg,#2B1B5E,#1A0E42);
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
          font-size:11.5px; font-weight:700; color:#3A0B26; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-gold:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--teal-400); background:transparent;
          border:1px solid rgba(255,46,146,0.35); padding:8px 11px; border-radius:10px;
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
        .qrm-chip.active{ background:var(--teal-400); border-color:var(--teal-400); color:#3A0B26; }

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
          background:linear-gradient(150deg,#2B1B5E,#170D38); border:1px solid rgba(212,175,106,0.18); }
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
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#3A0B26;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; }
        .qrm-addbtn.done{ background:var(--teal-400); color:#3A0B26; }

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
          background:linear-gradient(135deg,var(--gold-100),var(--gold-600)); color:#3A0B26; font-size:11.5px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 14px 26px rgba(0,0,0,0.4); font-family:'Inter',sans-serif; }

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:#22123F; border:1px solid rgba(255,46,146,0.4); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:rgba(23,13,56,0.92); padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(247,242,228,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--gold-100); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--teal-400); color:#3A0B26; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

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
          background:linear-gradient(150deg,#2B1B5E,#170D38); border:1px solid rgba(212,175,106,0.2); }
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
        .qrm-confirmbtn{ width:100%; background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#3A0B26; border:none; font-weight:800; font-size:12.5px; padding:13px; border-radius:13px; cursor:pointer; font-family:'Inter',sans-serif; }
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
        <path d="M0,200 L0,140 L40,140 L40,110 L80,110 L80,150 L130,150 L130,90 L150,90 L150,150 L210,150 L210,120 L260,120 L260,160 L320,160 L320,100 L360,100 L360,160 L430,160 L430,80 L460,80 L460,160 L520,160 L520,130 L580,130 L580,170 L640,170 L640,95 L680,95 L680,170 L740,170 L740,115 L800,115 L800,165 L860,165 L860,85 L900,85 L900,165 L970,165 L970,125 L1030,125 L1030,170 L1090,170 L1090,105 L1130,105 L1130,170 L1200,170 L1200,200 Z" fill="#170D38" opacity="0.9" />
      </svg>

      <div className="qrm-topcap">{t.demoTopBanner}</div>
      <div className="qrm-brandrow">
        <img src={LOGO_FULL} alt="Pamuk Kardeşler" className="qrm-brandimg" />
      </div>

      <div className="qrm-phone">
        <div className="qrm-screen">
          <div className="qrm-notch" />
          <div className="qrm-status">
            <span>9:41</span>
            <span>Wi-Fi</span>
          </div>
          <div className="qrm-table"><Hash size={11} /> {t.table} {TABLE_NUMBER}</div>

          <div className="qrm-scroll">
            <div className="qrm-header">
              <img src={LOGO_FULL} alt="Pamuk Kardeşler" className="qrm-headlogo" />
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
                <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V40 H0 Z" fill="#1F1248" opacity="0.6" />
                <path d="M0,28 Q50,10 100,28 T200,28 T300,28 T400,28 V40 H0 Z" fill="#1F1248" />
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
                  <div className="qrm-locbtn" style={{ background: "linear-gradient(135deg,var(--gold-100),var(--gold-400))", color: "#3A0B26" }}>
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

