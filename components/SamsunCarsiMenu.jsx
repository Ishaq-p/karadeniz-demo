"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
    Coffee, Salad, Flame, Utensils, Cake, Sparkles, Bell, Search, X, Check,
    ChevronRight, Info, Star, Leaf, ShoppingBag, ShieldCheck,
    RefreshCw, Plus, Minus, MapPin, Hash, Sunrise, ChefHat, Wheat,
    Milk, Egg, ExternalLink, Navigation, Share2, Languages, ArrowLeft,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Config & Data                                                    */
/* ---------------------------------------------------------------- */

const TABLE_NUMBER = "5";
const MENU_UPDATED = "02.08.2026";
const MAP_LINK = "https://maps.app.goo.gl/placeholder";
const INSTAGRAM_LINK = "https://www.instagram.com/samsuncarsirestoran";
const WHATSAPP_LINK =
    "https://wa.me/?text=" +
    encodeURIComponent("Samsun Çarşı Restoran & Kafe. Konum: " + MAP_LINK);

const UI = {
    tr: {
        demoTopBanner: "SAMSUN ÇARŞI RESTORAN & KAFE — DİJİTAL MENÜ",
        subtitle: "Şehrin Kalbindeki Lezzet Durağı",
        table: "Masa",
        greeting: "Samsun'un Kalbinde",
        greetingSub: "Geleneksel lezzetler ve sıcak ortama hoş geldiniz",
        aiEyebrow: "Şefin Önerisi",
        aiIdleTitle: "Bugün canınız ne çekiyor?",
        aiIdleSub: "İki kısa soruyla iştahınıza en uygun lezzeti bulalım.",
        aiStart: "Tavsiye Al",
        aiQ1: "Günün hangi lezzetini arıyorsunuz?",
        aiQ1Options: [
            { key: "breakfast", label: "Doyurucu bir kahvaltı" },
            { key: "hot_starters", label: "Sıcacık bir başlangıç" },
            { key: "salads", label: "Hafif bir salata" },
        ],
        aiQ2: "Yöresel mi, klasik mi?",
        aiQ2Options: [
            { key: "local", label: "Yöresel Karadeniz lezzetleri (Kuymak vb.)" },
            { key: "classic", label: "Geleneksel ve klasik tatlar" },
        ],
        aiResultEyebrow: "Tercihinize göre önerimiz",
        aiCta: "Sepete Ekle",
        aiRetry: "Yeniden Sor",
        back: "Geri",
        searchPlaceholder: "Ne yemek istersiniz?",
        filters: { popular: "Popüler", veg: "Vejetaryen", local: "Yöresel", chef: "Şefin Seçimi" },
        addToCart: "Ekle",
        added: "Eklendi",
        cartTitle: "Siparişleriniz",
        cartEmpty: "Sepetiniz henüz boş",
        cartEmptySub: "Geleneksel lezzetlerimizden seçmeye başlayın",
        subtotal: "Ara Toplam",
        confirmOrder: "Siparişi Onayla",
        demoNotice: "Garsonumuz siparişinizi onaylamak için masanıza gelecektir.",
        callWaiter: "Garson Çağır",
        waiterCalled: "Garson çağırıldı, hemen geliyor",
        legalBadge: "Güvenli Menü",
        legalTooltip: "Tüm fiyatlarımız günceldir ve yasal mevzuata uygundur.",
        lastUpdated: "Son güncelleme",
        navMenu: "Menü",
        navCart: "Sepet",
        navWaiter: "Garson",
        navLang: "Dil",
        kcal: "kcal",
        noResults: "Aramanızla eşleşen ürün bulunamadı",
        close: "Kapat",
        ingredients: "İçindekiler",
        allergens: "Alerjenler",
        noAllergens: "Bilinen majör alerjen içermez",
        detailsCta: "Sepete ekle",
        location: "Konum",
        locationName: "Samsun Çarşı Restoran & Kafe",
        locationSub: "Şehrin kalbinde, sıcak bir ortam",
        openMap: "Haritada Aç",
        shareWA: "Konumu Paylaş",
        followUs: "Bizi Takip Edin",
    },
    en: {
        demoTopBanner: "SAMSUN ÇARSI RESTAURANT & CAFE — DIGITAL MENU",
        subtitle: "The Flavor Stop in the Heart of the City",
        table: "Table",
        greeting: "In the Heart of Samsun",
        greetingSub: "Welcome to traditional flavors and a warm atmosphere",
        aiEyebrow: "Chef's Suggestion",
        aiIdleTitle: "What are you craving today?",
        aiIdleSub: "Answer two quick questions to find the perfect dish.",
        aiStart: "Get a Suggestion",
        aiQ1: "What kind of meal are you looking for?",
        aiQ1Options: [
            { key: "breakfast", label: "A hearty breakfast" },
            { key: "hot_starters", label: "A warm starter" },
            { key: "salads", label: "A light salad" },
        ],
        aiQ2: "Local or classic?",
        aiQ2Options: [
            { key: "local", label: "Local Black Sea flavors (Kuymak etc.)" },
            { key: "classic", label: "Traditional classic tastes" },
        ],
        aiResultEyebrow: "Based on your choices",
        aiCta: "Add to Cart",
        aiRetry: "Ask Again",
        back: "Back",
        searchPlaceholder: "What would you like to eat?",
        filters: { popular: "Popular", veg: "Vegetarian", local: "Local", chef: "Chef's Pick" },
        addToCart: "Add",
        added: "Added",
        cartTitle: "Your Orders",
        cartEmpty: "Your cart is empty",
        cartEmptySub: "Start picking from our traditional flavors",
        subtotal: "Subtotal",
        confirmOrder: "Confirm Order",
        demoNotice: "Our waiter will come to your table to confirm.",
        callWaiter: "Call Waiter",
        waiterCalled: "Waiter called, arriving shortly",
        legalBadge: "Secure Menu",
        legalTooltip: "All prices are up-to-date and compliant with regulations.",
        lastUpdated: "Last updated",
        navMenu: "Menu",
        navCart: "Cart",
        navWaiter: "Waiter",
        navLang: "Lang",
        kcal: "kcal",
        noResults: "No products matched your search",
        close: "Close",
        ingredients: "Ingredients",
        allergens: "Allergens",
        noAllergens: "No major allergens",
        detailsCta: "Add to cart",
        location: "Location",
        locationName: "Samsun Çarşı Restoran & Kafe",
        locationSub: "In the heart of the city, a warm environment",
        openMap: "Open in Map",
        shareWA: "Share Location",
        followUs: "Follow Us",
    },
};

const CATEGORIES = [
    { key: "breakfast", icon: Sunrise, label: { tr: "Kahvaltılar", en: "Breakfast" } },
    { key: "hot_starters", icon: Flame, label: { tr: "Ara Sıcaklar", en: "Hot Starters" } },
    { key: "salads", icon: Salad, label: { tr: "Salatalar", en: "Salads" } },
    { key: "soups", icon: Coffee, label: { tr: "Çorbalar", en: "Soups" } },
];

const ALLERGEN_META = {
    dairy: { icon: Milk, label: { tr: "Süt Ürünü", en: "Dairy" } },
    gluten: { icon: Wheat, label: { tr: "Gluten", en: "Gluten" } },
    egg: { icon: Egg, label: { tr: "Yumurta", en: "Egg" } },
};

const FILTER_KEYS = ["popular", "veg", "local", "chef"];
const FILTER_ICON = { popular: Star, veg: Leaf, local: MapPin, chef: ChefHat };

const img = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

const ITEMS = [
    {
        id: "klasik_kahvalti", category: "breakfast", price: 600, kcal: 850, tags: ["popular", "veg"], img: img(374088),
        allergens: ["dairy", "gluten", "egg"],
        ingredients: [
            { n: "Peynir Çeşitleri", a: "Beyaz Peynir, Kaşar" },
            { n: "Zeytin", a: "Siyah, Yeşil" },
            { n: "Sebze", a: "Salatalık, Domates, Yeşillik" },
            { n: "Tatlı", a: "Tereyağ, Bal, Reçel" },
            { n: "Sıcak", a: "Sahanda Yumurta, Sigara Böreği, Patates" },
            { n: "İçecek", a: "2 Adet Çay" }
        ],
        name: { tr: "Klasik Kahvaltı", en: "Classic Breakfast" },
        desc: { tr: "Zengin peynir tabağı, sahanda yumurta, sigara böreği ve taze yeşilliklerle tam kararında bir başlangıç. (2 kişiden servis ücreti alınır)", en: "Rich cheese plate, fried eggs, pastry rolls, and fresh greens." }
    },
    {
        id: "carsi_kahvalti", category: "breakfast", price: 1800, kcal: 2100, tags: ["popular", "chef"], img: img(375998),
        allergens: ["dairy", "gluten", "egg"],
        ingredients: [
            { n: "Zengin Peynir", a: "Beyaz, Kaşar, Tulum" },
            { n: "Sıcaklar", a: "Menemen, Pişi, Su Böreği, Sosis, Sahanda Yumurta" },
            { n: "Tatlılar", a: "Özel Süt ve Çilek Reçeli, Bal, Tahin Pekmez, Pankek, Sarelle" },
            { n: "İçecek", a: "Çay Potu" }
        ],
        name: { tr: "Çarşı Kahvaltı (2 Kişilik)", en: "Çarşı Breakfast (For 2)" },
        desc: { tr: "Masayı donatan eksiksiz lezzet şöleni. Su böreğinden menemene, pankekten pişiye kadar her şey dahil. (3 kişiden servis ücreti alınır)", en: "A complete feast for the table including menemen, pastries, and tea pot." }
    },
    {
        id: "menemen", category: "breakfast", price: 240, kcal: 320, tags: ["veg", "local"], img: img(6287532),
        allergens: ["egg", "dairy"],
        ingredients: [{ n: "Sebze", a: "Domates, Yeşil Biber" }, { n: "Ana", a: "Yumurta" }, { n: "Ekstra", a: "Tereyağ, Kaşar" }],
        name: { tr: "Menemen", en: "Menemen" },
        desc: { tr: "Taze domates ve biberin tereyağında yumurta ve erimiş kaşarla buluşması.", en: "Fresh tomatoes and peppers mixed with eggs and melted cheese in butter." }
    },
    {
        id: "kuymak", category: "breakfast", price: 250, kcal: 540, tags: ["popular", "local", "veg"], img: img(5737254),
        allergens: ["dairy", "gluten"],
        ingredients: [{ n: "Peynir", a: "Kolot Peyniri" }, { n: "Ana", a: "Mısır Unu" }, { n: "Yağ", a: "Tereyağ" }],
        name: { tr: "Kuymak", en: "Kuymak" },
        desc: { tr: "Karadeniz'in meşhur lezzeti; hakiki Trabzon tereyağı ve kolot peyniri ile uzayıp giden lezzet.", en: "Famous Black Sea dish made with cornmeal, lots of butter, and melting cheese." }
    },
    {
        id: "patates", category: "hot_starters", price: 120, kcal: 310, tags: ["veg"], img: img(1583884),
        allergens: [],
        ingredients: [{ n: "Patates", a: "Parmak Dilim" }, { n: "Sos", a: "Ketçap / Mayonez" }],
        name: { tr: "Patates Kızartması", en: "French Fries" },
        desc: { tr: "Çıtır çıtır, altın sarısı patates kızartması.", en: "Crispy, golden french fries." }
    },
    {
        id: "tavuk_salata", category: "salads", price: 280, kcal: 340, tags: ["chef"], img: img(2059153),
        allergens: [],
        ingredients: [{ n: "Tavuk", a: "Izgara Göğüs" }, { n: "Yeşillik", a: "Mevsim Yeşillikleri" }, { n: "Sos", a: "Özel Şef Sosu" }],
        name: { tr: "Tavuklu Salata", en: "Chicken Salad" },
        desc: { tr: "Özel sosuyla harmanlanmış taze yeşillikler üzerinde ızgara tavuk dilimleri.", en: "Grilled chicken slices over fresh greens tossed with special sauce." }
    },
    {
        id: "mercimek", category: "soups", price: 110, kcal: 180, tags: ["veg", "popular"], img: img(5908235),
        allergens: ["gluten", "dairy"],
        ingredients: [{ n: "Mercimek", a: "Kırmızı Mercimek" }, { n: "Yağ", a: "Tereyağlı Sos" }],
        name: { tr: "Süzme Mercimek Çorbası", en: "Lentil Soup" },
        desc: { tr: "Üzerine tereyağlı toz biber sosuyla dumanı üstünde servis edilen klasik lezzet.", en: "Classic strained lentil soup served with butter and paprika sauce." }
    }
];

const fmtTL = (n) => n.toLocaleString("tr-TR") + " ₺";

function pickAiSuggestion(q1, q2) {
    let pool = ITEMS.filter((i) => i.category === q1);
    if (pool.length === 0) pool = ITEMS;
    const wantLocal = q2 === "local";
    let match = pool.find((i) => i.tags.includes("local") === wantLocal && (!wantLocal || i.tags.includes("local")));
    if (!match) match = pool.find((i) => (wantLocal ? i.tags.includes("local") : !i.tags.includes("local")));
    if (!match) match = pool.find((i) => i.tags.includes("popular"));
    if (!match) match = pool[0];
    return match;
}

/* ---------------------------------------------------------------- */
/* Component                                                          */
/* ---------------------------------------------------------------- */

export default function SamsunCarsiMenu() {
    const [lang, setLang] = useState("tr");
    const [activeCategory, setActiveCategory] = useState("breakfast");
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
          /* Updated Palette for Samsun Çarşı */
          --bg-main: #121212;
          --bg-card: #1E1E1E;
          --bg-lighter: #2C2C2C;
          --brand-orange: #FF5722;
          --brand-orange-dark: #E64A19;
          --brand-blue: #0A3254;
          --brand-blue-light: #155A96;
          --cream: #F9FAFB;
          --text-muted: rgba(249, 250, 251, 0.6);
          --line: rgba(255, 255, 255, 0.08);

          font-family: 'Inter', sans-serif;
          min-height: 100vh; width: 100%; position: relative;
          display: flex; flex-direction: column; align-items: center;
          padding: 28px 16px 44px;
          background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
          color: var(--cream);
          box-sizing: border-box;
        }
        .qrm-root *{ box-sizing:border-box; }
        .qrm-serif{ font-family:'Playfair Display',serif; }

        .qrm-topcap{
          font-size:10.5px; letter-spacing:0.13em; text-transform:uppercase; color:var(--brand-orange); opacity:0.9;
          background:rgba(255,87,34,0.1); border:1px solid rgba(255,87,34,0.3);
          padding:7px 16px; border-radius:999px; margin-bottom:16px; text-align:center; position:relative; z-index:2;
        }

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
          background:var(--bg-main); display:flex; flex-direction:column;
        }
        .qrm-notch{ position:absolute; top:6px; left:50%; transform:translateX(-50%); width:104px; height:20px; background:#000; border-radius:14px; z-index:30; }
        .qrm-status{ display:flex; justify-content:space-between; padding:13px 24px 0; font-size:11.5px; font-weight:700; color:rgba(255,255,255,0.8); flex-shrink:0; }
        
        .qrm-table{
          display:flex; align-items:center; justify-content:center; gap:5px; margin:6px auto 0; width:fit-content;
          font-size:10.5px; font-weight:700; letter-spacing:0.05em; color:#fff;
          background:linear-gradient(135deg,var(--brand-orange),var(--brand-orange-dark)); padding:4px 12px; border-radius:999px; flex-shrink:0;
        }

        .qrm-scroll{ flex:1; overflow-y:auto; padding-bottom:10px; scrollbar-width:thin; scrollbar-color:var(--brand-orange) transparent; }
        .qrm-scroll::-webkit-scrollbar{ width:5px; }
        .qrm-scroll::-webkit-scrollbar-track{ background:transparent; }
        .qrm-scroll::-webkit-scrollbar-thumb{ background:var(--brand-orange); border-radius:10px; }

        .qrm-header{
          padding:16px 16px 14px; display:flex; align-items:center; gap:10px;
          background: var(--brand-orange);
          border-bottom:1px solid var(--line); flex-shrink:0; position:relative;
        }
        .qrm-headlogo{ height:36px; width:auto; border-radius:7px; flex-shrink:0; background:white; padding: 2px;}
        .qrm-hsub{ font-size:10px; color:rgba(255,255,255,0.9); margin-top:2px; font-weight: 500;}
        .qrm-htitle{ font-size:14px; color:#fff; font-weight:800; font-family:'Playfair Display',serif;}
        
        .qrm-hero{ position:relative; padding:18px 18px 24px; overflow:hidden; flex-shrink:0;
          background:radial-gradient(120% 100% at 20% 0%, var(--bg-lighter) 0%, var(--bg-card) 60%, var(--bg-main) 100%); }
        .qrm-greet{ display:flex; align-items:center; gap:8px; font-size:22px; font-weight:800; color:var(--cream); position:relative; z-index:2; font-family:'Playfair Display',serif;}
        .qrm-greetsub{ font-size:11px; color:var(--text-muted); margin-top:5px; position:relative; z-index:2;}

        .qrm-ai{
          margin:-12px 16px 0; position:relative; z-index:5;
          background:var(--brand-blue);
          border:1px solid rgba(255,255,255,0.1); border-left:3px solid var(--brand-orange);
          border-radius:16px; padding:14px; box-shadow:0 14px 30px rgba(0,0,0,0.35);
        }
        .qrm-ai-eyebrow{ display:flex; align-items:center; gap:6px; font-size:10px; font-weight:700;
          letter-spacing:0.06em; text-transform:uppercase; color:var(--brand-orange); margin-bottom:8px;}
        .qrm-ai-title{ font-size:14.5px; font-weight:700; color:var(--cream); line-height:1.3; }
        .qrm-ai-sub{ font-size:11px; color:rgba(255,255,255,0.7); margin-top:4px; line-height:1.4; }
        .qrm-ai-name{ font-size:16.5px; font-weight:700; color:var(--cream); }
        .qrm-ai-reason{ font-size:11px; color:rgba(255,255,255,0.7); margin-top:2px; line-height:1.4; }
        .qrm-ai-row{ display:flex; align-items:center; gap:8px; margin-top:11px; flex-wrap:wrap; }
        .qrm-ai-options{ display:flex; flex-direction:column; gap:7px; margin-top:11px; }
        .qrm-ai-opt{
          text-align:left; font-size:12px; font-weight:600; color:var(--cream);
          background:rgba(255,255,255,0.05); border:1px solid var(--line); border-radius:11px;
          padding:9px 12px; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
        }
        .qrm-ai-opt:active{ background:rgba(255,255,255,0.1); }
        .qrm-ai-back{ display:flex; align-items:center; gap:4px; font-size:10.5px; font-weight:600; color:var(--brand-orange); background:none; border:none; cursor:pointer; margin-bottom:2px; }

        .qrm-btn-orange{
          font-size:11.5px; font-weight:700; color:#fff; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--brand-orange),var(--brand-orange-dark));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-orange:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--cream); background:transparent;
          border:1px solid rgba(255,255,255,0.3); padding:8px 11px; border-radius:10px;
          cursor:pointer; display:flex; align-items:center; gap:5px; font-family:'Inter',sans-serif;
        }

        .qrm-searchwrap{ padding:16px 16px 4px; flex-shrink:0; }
        .qrm-search{ display:flex; align-items:center; gap:8px; background:var(--bg-card); border:1px solid var(--line); border-radius:12px; padding:9px 12px; }
        .qrm-search input{ background:transparent; border:none; outline:none; color:var(--cream); font-size:12.5px; width:100%; font-family:'Inter',sans-serif; }
        .qrm-search input::placeholder{ color:var(--text-muted); }

        .qrm-filters{ display:flex; gap:7px; padding:10px 16px 2px; flex-shrink:0; overflow-x:auto; scrollbar-width:none; }
        .qrm-filters::-webkit-scrollbar{ display:none; }
        .qrm-chip{
          display:flex; align-items:center; gap:5px; font-size:10.5px; font-weight:600;
          padding:6.5px 11px; border-radius:999px; white-space:nowrap; cursor:pointer;
          border:1px solid var(--line); color:var(--text-muted); background:var(--bg-card);
        }
        .qrm-chip.active{ background:var(--brand-orange); border-color:var(--brand-orange); color:#fff; }

        .qrm-cats{ display:flex; gap:8px; padding:14px 16px 4px; overflow-x:auto; flex-shrink:0; scrollbar-width:none; }
        .qrm-cats::-webkit-scrollbar{ display:none; }
        .qrm-cat{ display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; padding:9px 13px; border-radius:14px; border:1px solid var(--line); background:var(--bg-card); }
        .qrm-cat.active{ background:rgba(255,87,34,0.1); border-color:var(--brand-orange); }
        .qrm-cat span{ font-size:9px; font-weight:700; color:var(--text-muted); text-align:center; white-space:nowrap; }
        .qrm-cat.active span{ color:var(--brand-orange); }

        .qrm-list{ padding:12px 16px 26px; display:flex; flex-direction:column; gap:11px; }
        .qrm-empty{ text-align:center; padding:40px 20px; color:var(--text-muted); font-size:12px; }
        .qrm-card{ display:flex; gap:11px; background:var(--bg-card); border:1px solid var(--line); border-radius:16px; padding:10px; cursor:pointer; }
        .qrm-card:active{ background:var(--bg-lighter); }
        .qrm-tile{ width:64px; height:64px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden;
          background:var(--bg-lighter); border:1px solid rgba(255,255,255,0.05); }
        .qrm-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
        .qrm-cardbody{ flex:1; min-width:0; }
        .qrm-cname{ font-size:14.5px; font-weight:700; color:var(--cream); line-height:1.2; }
        .qrm-cdesc{ font-size:10.5px; color:var(--text-muted); margin-top:3px; line-height:1.4;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .qrm-allergrow{ display:flex; gap:5px; margin-top:6px; }
        .qrm-allericon{ width:16px; height:16px; border-radius:5px; background:rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:center; color:var(--text-muted); }
        .qrm-cmeta{ display:flex; align-items:center; gap:9px; margin-top:7px; }
        .qrm-price{ font-size:14px; font-weight:700; color:var(--brand-orange); white-space:nowrap; }
        .qrm-kcal{ font-size:9.5px; color:var(--text-muted); }
        .qrm-addbtn{ width:27px; height:27px; border-radius:9px; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--brand-orange),var(--brand-orange-dark)); color:#fff;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; }
        .qrm-addbtn.done{ background:var(--brand-blue); color:#fff; }

        .qrm-location{ margin:6px 16px 0; padding:14px; border-radius:16px; background:var(--bg-card); border:1px solid var(--line); }
        .qrm-loctitle{ font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--brand-orange); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
        .qrm-locname{ font-size:14.5px; font-weight:700; color:var(--cream); }
        .qrm-locsub{ font-size:10.5px; color:var(--text-muted); margin-top:3px; line-height:1.4; }
        .qrm-locbtns{ display:flex; gap:8px; margin-top:11px; }
        .qrm-locbtns a{ text-decoration:none; flex:1; }
        .qrm-locbtn{ display:flex; align-items:center; justify-content:center; gap:6px; font-size:10.5px; font-weight:700; padding:9px; border-radius:10px; }
        .qrm-follow{ display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:1px solid var(--line); }
        .qrm-follow a{ display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:var(--cream); text-decoration:none; }

        .qrm-fab{ position:absolute; right:14px; bottom:84px; z-index:20; display:flex; align-items:center; gap:7px; padding:11px 15px; border-radius:999px;
          background:linear-gradient(135deg,var(--brand-orange),var(--brand-orange-dark)); color:#fff; font-size:11.5px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 14px 26px rgba(0,0,0,0.4); font-family:'Inter',sans-serif; }

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:var(--brand-blue); border:1px solid rgba(255,255,255,0.2); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:#111; padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(255,255,255,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--brand-orange); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--brand-orange); color:#fff; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

        .qrm-sheet-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.65); z-index:60; display:flex; align-items:flex-end; }
        .qrm-sheet{ width:100%; max-height:85%; background:var(--bg-main); border-radius:24px 24px 0 0; overflow-y:auto; animation:qrmUp .25s ease; border-top:1px solid var(--line);
          scrollbar-width:thin; scrollbar-color:var(--brand-orange) transparent; }
        .qrm-sheet::-webkit-scrollbar{ width:5px; }
        .qrm-sheet::-webkit-scrollbar-thumb{ background:var(--brand-orange); border-radius:10px; }
        .qrm-sheet-handle{ width:36px; height:4px; background:rgba(255,255,255,0.2); border-radius:3px; margin:10px auto 4px; }
        .qrm-sheet-head{ display:flex; justify-content:space-between; align-items:center; padding:8px 18px 4px; }
        .qrm-sheet-title{ font-size:18px; font-weight:700; color:var(--cream); }
        .qrm-iconbtn{ background:rgba(255,255,255,0.08); border:none; color:var(--cream); width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }

        .qrm-detail-tile{ height:160px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:14px 18px 0; overflow:hidden;
          background:var(--bg-lighter); border:1px solid var(--line); }
        .qrm-detail-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
        .qrm-detail-name{ font-size:21px; font-weight:700; color:var(--cream); padding:16px 18px 0; }
        .qrm-detail-desc{ font-size:12px; color:var(--text-muted); line-height:1.55; padding:8px 18px 0; }
        .qrm-detail-section{ padding:14px 18px 0; }
        .qrm-detail-label{ font-size:10px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--brand-orange); margin-bottom:8px; }
        .qrm-ingrow{ display:flex; justify-content:space-between; font-size:11.5px; color:rgba(255,255,255,0.8); padding:5px 0; border-bottom:1px dashed var(--line); }
        .qrm-ingrow span:last-child{ color:var(--text-muted); }
        .qrm-tagpills{ display:flex; gap:8px; flex-wrap:wrap; }
        .qrm-tagpill{ display:flex; align-items:center; gap:5px; font-size:10.5px; font-weight:600; color:rgba(255,255,255,0.8); background:rgba(255,255,255,0.05); border:1px solid var(--line); padding:6px 10px; border-radius:999px; }
        .qrm-detail-foot{ display:flex; align-items:center; justify-content:space-between; padding:20px 18px 26px; gap:14px; }
        .qrm-stepper{ display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.06); border-radius:12px; padding:6px 10px; }
        .qrm-stepper button{ width:24px; height:24px; border-radius:7px; border:none; background:rgba(255,255,255,0.1); color:var(--cream); display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .qrm-stepper span{ font-weight:700; font-size:14px; min-width:16px; text-align:center; }

        .qrm-cartrow{ display:flex; gap:11px; padding:11px 18px; align-items:center; }
        .qrm-cartinfo{ flex:1; }
        .qrm-cartname{ font-size:13.5px; font-weight:700; color:var(--cream); }
        .qrm-cartprice{ font-size:10.5px; color:var(--text-muted); margin-top:2px; }
        .qrm-cartfoot{ padding:14px 18px 28px; border-top:1px solid var(--line); margin-top:6px; }
        .qrm-subtotalrow{ display:flex; justify-content:space-between; margin-bottom:12px; align-items:baseline; }
        .qrm-subtotalrow span:first-child{ font-size:12px; color:var(--text-muted); }
        .qrm-subtotalrow span:last-child{ font-size:19px; font-weight:700; color:var(--brand-orange); }
        .qrm-confirmbtn{ width:100%; background:linear-gradient(135deg,var(--brand-orange),var(--brand-orange-dark)); color:#fff; border:none; font-weight:800; font-size:12.5px; padding:13px; border-radius:13px; cursor:pointer; font-family:'Inter',sans-serif; }
        .qrm-demonote{ text-align:center; font-size:9.5px; color:var(--text-muted); margin-top:9px; }

        .qrm-footercap{ margin-top:20px; font-size:10.5px; color:var(--text-muted); text-align:center; position:relative; z-index:2; max-width:340px; line-height:1.5; }

        @media (max-width: 600px) {
          .qrm-root { padding: 0; }
          .qrm-topcap, .qrm-footercap { display: none; }
          .qrm-phone { width: 100vw; height: 100vh; max-width: 100vw; border-radius: 0; padding: 0; background: none; box-shadow: none; }
          .qrm-screen { border-radius: 0; }
          .qrm-notch, .qrm-status { display: none; }
          .qrm-table { margin: 12px auto 6px; }
        }
      `}</style>

            <div className="qrm-topcap">{t.demoTopBanner}</div>

            <div className="qrm-phone">
                <div className="qrm-screen">
                    <div className="qrm-notch" />
                    <div className="qrm-status">
                        <span>9:41</span>
                        <span>Çarşı Restoran · Wi-Fi</span>
                    </div>
                    <div className="qrm-table"><Hash size={11} /> {t.table} {TABLE_NUMBER}</div>

                    <div className="qrm-scroll">
                        <div className="qrm-header">
                            {/* Note: Placeholder icon substituting the logo file (1000035485.jpg) */}
                            <div className="qrm-headlogo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                                <Utensils size={28} color="#fff" />
                            </div>
                            <div>
                                <div className="qrm-htitle">Samsun Çarşı</div>
                                <div className="qrm-hsub">{t.subtitle}</div>
                            </div>
                        </div>

                        <div className="qrm-hero">
                            <div className="qrm-greet"><Sunrise size={22} color="var(--brand-orange)" /> {t.greeting}</div>
                            <div className="qrm-greetsub">{t.greetingSub}</div>
                        </div>

                        {/* AI concierge */}
                        <div className="qrm-ai">
                            <div className="qrm-ai-eyebrow"><ChefHat size={12} /> {t.aiEyebrow}</div>

                            {aiPhase === "idle" && (
                                <>
                                    <div className="qrm-ai-title">{t.aiIdleTitle}</div>
                                    <div className="qrm-ai-sub">{t.aiIdleSub}</div>
                                    <div className="qrm-ai-row">
                                        <button className="qrm-btn-orange" onClick={() => setAiPhase("q1")}>
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
                                        <button className="qrm-btn-orange" onClick={() => addAiSuggestion(aiResult)}>
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
                                <Search size={14} color="var(--text-muted)" />
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
                                            <Icon size={15} color={active ? "var(--brand-orange)" : "var(--text-muted)"} />
                                            <span>{c.label[lang]}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="qrm-list">
                            {itemsByCategory.length === 0 && <div className="qrm-empty">{t.noResults}</div>}
                            {itemsByCategory.map((item) => {
                                const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Utensils;
                                const justAdded = flashId === item.id;
                                return (
                                    <div className="qrm-card" key={item.id} onClick={() => openDetail(item)}>
                                        <div className="qrm-tile">{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={21} color="var(--brand-orange)" />}</div>
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
                                    <div className="qrm-locbtn" style={{ background: "linear-gradient(135deg,var(--brand-orange),var(--brand-orange-dark))", color: "#fff" }}>
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
                                <span style={{ fontSize: 10.5, color: "var(--text-muted)", fontWeight: 600 }}>{t.followUs}</span>
                                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink size={14} /> @samsuncarsirestoran
                                </a>
                            </div>
                        </div>
                    </div>

                    <button className="qrm-fab" onClick={callWaiter}>
                        <Bell size={13} /> {t.callWaiter}
                    </button>

                    {waiterToast && (
                        <div className="qrm-toast">
                            <Bell size={14} color="var(--brand-orange)" /> {t.waiterCalled}
                        </div>
                    )}

                    <div className="qrm-nav">
                        <button className="qrm-navitem active">
                            <Utensils size={16} /> <span>{t.navMenu}</span>
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
                                        : (() => { const Icon = CATEGORIES.find((c) => c.key === selectedItem.category)?.icon || Utensils; return <Icon size={44} color="var(--brand-orange)" />; })()}
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
                                    <button className="qrm-btn-orange" style={{ flex: 1, justifyContent: "center", padding: "12px" }}
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
                                                const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Utensils;
                                                return (
                                                    <div className="qrm-cartrow" key={id}>
                                                        <div className="qrm-tile" style={{ width: 42, height: 42 }}>{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={16} color="var(--brand-orange)" />}</div>
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