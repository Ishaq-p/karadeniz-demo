"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
    Fish, Salad, Waves, Wine, Cake, Sparkles, Bell, Search, X, Check,
    ChevronRight, Info, Star, Leaf, Flame, ShoppingBag, ShieldCheck,
    RefreshCw, Plus, Minus, MapPin, Hash, Sunset, ChefHat, Feather,
    Milk, Wheat, ExternalLink, Navigation, Share2, Languages, ArrowLeft,
    Coffee, Beef, UtensilsCrossed,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets (embedded so the demo always renders identically)    */
/* ---------------------------------------------------------------- */

const LOGO_FULL = "data:image/jpeg;base64,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";
const LOGO_ICON = "data:image/jpeg;base64,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";

const TABLE_NUMBER = "14";
const MENU_UPDATED = "01.08.2026";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Samsun+%C3%87ar%C5%9F%C4%B1+Restoran+%26+Kafe+Samsun";
const INSTAGRAM_LINK = "https://www.instagram.com/samsuncarsirestoran";
const WHATSAPP_LINK =
    "https://wa.me/903624354970?text=" +
    encodeURIComponent("Samsun Çarşı Restoran & Kafe. Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
    tr: {
        demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
        subtitle: "Samsun'un Kalbinde · Geleneksel Lezzetler",
        table: "Masa",
        greeting: "Hoş geldiniz",
        greetingSub: "Samsun Çarşı'da sıcak bir sofra sizi bekliyor",
        aiEyebrow: "Yapay Zeka Önerisi",
        aiIdleTitle: "Size özel bir öneri ister misiniz?",
        aiIdleSub: "2 kısa soruyla o anki iştahınıza en uygun lezzeti buluyoruz.",
        aiStart: "Öneri Al",
        aiQ1: "Bugün canınız ne çekiyor?",
        aiQ1Options: [
            { key: "izgaralar", label: "Izgara" },
            { key: "pideler", label: "Pide" },
            { key: "corbalar", label: "Çorba" },
        ],
        aiQ2: "Hafif mi, yoksa doyurucu mu olsun?",
        aiQ2Options: [
            { key: "yes", label: "Hafif olsun" },
            { key: "no", label: "Doyurucu olsun" },
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
        locationName: "Samsun Çarşı Restoran & Kafe",
        locationSub: "Şehrin kalbindeki lezzet durağı — Samsun",
        openMap: "Haritada Aç",
        shareWA: "Konumu Paylaş",
        followUs: "Bizi Takip Edin",
    },
    en: {
        demoTopBanner: "LIVE PREVIEW — built with sample data",
        subtitle: "In the Heart of Samsun · Traditional Flavors",
        table: "Table",
        greeting: "Welcome",
        greetingSub: "A warm table at Samsun Çarşı awaits you",
        aiEyebrow: "AI Recommendation",
        aiIdleTitle: "Want a pick made just for you?",
        aiIdleSub: "Two quick questions and we'll match a dish to your appetite.",
        aiStart: "Get a recommendation",
        aiQ1: "What are you in the mood for today?",
        aiQ1Options: [
            { key: "izgaralar", label: "Grill" },
            { key: "pideler", label: "Pide" },
            { key: "corbalar", label: "Soup" },
        ],
        aiQ2: "Light, or something filling?",
        aiQ2Options: [
            { key: "yes", label: "Light" },
            { key: "no", label: "Filling" },
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
        locationName: "Samsun Çarşı Restoran & Kafe",
        locationSub: "A flavor stop in the heart of the city — Samsun",
        openMap: "Open in maps",
        shareWA: "Share location",
        followUs: "Follow us",
    },
};

const CATEGORIES = [
    { key: "kahvaltilar", icon: Coffee, label: { tr: "Kahvaltılar", en: "Breakfast" } },
    { key: "arasicaklar", icon: Flame, label: { tr: "Ara Sıcaklar", en: "Warm Starters" } },
    { key: "salatalar", icon: Salad, label: { tr: "Salatalar", en: "Salads" } },
    { key: "corbalar", icon: ChefHat, label: { tr: "Çorbalar", en: "Soups" } },
    { key: "izgaralar", icon: Beef, label: { tr: "Izgaralar", en: "Grills" } },
    { key: "tavayemekleri", icon: UtensilsCrossed, label: { tr: "Tava Yemekleri", en: "Pan Dishes" } },
    { key: "pideler", icon: Wheat, label: { tr: "Pideler", en: "Pides" } },
    { key: "tatlilar", icon: Cake, label: { tr: "Tatlılar", en: "Desserts" } },
];

const ALLERGEN_META = {
    gluten: { icon: Wheat, label: { tr: "Gluten", en: "Gluten" } },
    dairy: { icon: Milk, label: { tr: "Süt Ürünü", en: "Dairy" } },
    egg: { icon: Sparkles, label: { tr: "Yumurta", en: "Egg" } },
};

const FILTER_KEYS = ["popular", "veg", "spicy", "light", "chef"];
const FILTER_ICON = { popular: Star, veg: Leaf, spicy: Flame, light: Feather, chef: ChefHat };

const img = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

const ITEMS = [
    {
        id: "klasikkahvalti", category: "kahvaltilar", price: 600, kcal: 780, tags: ["popular"], img: img(9491137),
        allergens: ["dairy", "egg", "gluten"],
        ingredients: [{ n: "Beyaz peynir", a: "40 g" }, { n: "Kaşar peyniri", a: "30 g" }, { n: "Siyah/yeşil zeytin", a: "40 g" }, { n: "Sahanda yumurta", a: "2 adet" }, { n: "Sigara böreği", a: "2 adet" }, { n: "Patates kızartması", a: "80 g" }],
        name: { tr: "Klasik Kahvaltı", en: "Classic Breakfast" },
        desc: { tr: "Beyaz peynir, kaşar, zeytin çeşitleri, sahanda yumurta, sigara böreği, patates kızartması ve 2 çay ile (2. kişiden servis ücreti alınır).", en: "White cheese, kashar, olives, fried eggs, cheese rolls, fries and 2 teas (a service charge applies from the 2nd guest)." }
    },
    {
        id: "carsikahvalti", category: "kahvaltilar", price: 1800, kcal: 1450, tags: ["popular", "chef"], img: img(7715698),
        allergens: ["dairy", "egg", "gluten"],
        ingredients: [{ n: "Peynir çeşitleri", a: "3 çeşit" }, { n: "Sosis & salam", a: "60 g" }, { n: "Özel süt & çilek reçeli", a: "40 g" }, { n: "Menemen", a: "1 tava" }, { n: "Pişi", a: "3 adet" }, { n: "Sahanda yumurta", a: "2 adet" }],
        name: { tr: "Çarşı Kahvaltı (2 Kişilik)", en: "Çarşı Breakfast (For 2)" },
        desc: { tr: "3 çeşit peynir, sosis, salam, menemen, pişi, sahanda yumurta ve daha fazlasıyla zengin serpme kahvaltı (3. kişiden servis ücreti alınır).", en: "A rich spread with 3 cheeses, sausage, salami, menemen, pişi, fried eggs and more (a service charge applies from the 3rd guest)." }
    },
    {
        id: "menemen", category: "kahvaltilar", price: 240, kcal: 310, tags: ["veg", "spicy"], img: img(18535643),
        allergens: ["egg", "dairy"],
        ingredients: [{ n: "Domates", a: "120 g" }, { n: "Yeşil biber", a: "40 g" }, { n: "Yumurta", a: "2 adet" }, { n: "Kaşar", a: "20 g" }],
        name: { tr: "Menemen", en: "Menemen" },
        desc: { tr: "Domates, yeşil biber ve kaşarla tereyağında pişirilen klasik yumurta.", en: "Classic egg dish with tomato, green pepper and kashar, cooked in butter." }
    },
    {
        id: "kuymak", category: "kahvaltilar", price: 250, kcal: 380, tags: ["veg"], img: img(1707270),
        allergens: ["dairy"],
        ingredients: [{ n: "Kolot peyniri", a: "80 g" }, { n: "Mısır unu", a: "60 g" }, { n: "Tereyağ", a: "20 g" }],
        name: { tr: "Kuymak", en: "Kuymak (Corn & Cheese)" },
        desc: { tr: "Kolot peyniri, mısır unu ve tereyağı ile hazırlanan Karadeniz usulü sıcak lezzet.", en: "A Black Sea specialty of melted cheese, cornmeal and butter." }
    },
    {
        id: "kasarliomlet", category: "kahvaltilar", price: 220, kcal: 340, tags: ["veg"], img: img(10934498),
        allergens: ["egg", "dairy"],
        ingredients: [{ n: "Yumurta", a: "3 adet" }, { n: "Kaşar peyniri", a: "30 g" }, { n: "Tereyağ", a: "10 g" }],
        name: { tr: "Kaşarlı Omlet", en: "Cheese Omelette" },
        desc: { tr: "Bol kaşarlı, tereyağında pişirilen omlet.", en: "A cheese-packed omelette cooked in butter." }
    },

    {
        id: "kalamartava", category: "arasicaklar", price: 260, kcal: 340, tags: ["popular", "chef"], img: img(15801015),
        allergens: ["gluten"],
        ingredients: [{ n: "Kalamar halkası", a: "220 g" }, { n: "Mısır unu", a: "40 g" }, { n: "Tartar sos", a: "30 g" }],
        name: { tr: "Kalamar Tava", en: "Fried Calamari" },
        desc: { tr: "Çıtır kalamar halkaları, özel tartar sos eşliğinde.", en: "Crispy calamari rings served with house tartar sauce." }
    },
    {
        id: "peynirtabagi", category: "arasicaklar", price: 220, kcal: 310, tags: ["veg", "popular"], img: img(4109946),
        allergens: ["dairy"],
        ingredients: [{ n: "Karışık peynir", a: "150 g" }, { n: "Bal & ceviz", a: "30 g" }],
        name: { tr: "Sıcak Peynir Tabağı", en: "Warm Cheese Plate" },
        desc: { tr: "Bal ve cevizle servis edilen sıcak peynir tabağı.", en: "A warm cheese plate served with honey and walnuts." }
    },

    {
        id: "cobansalata", category: "salatalar", price: 170, kcal: 140, tags: ["veg", "light"], img: img(1555814),
        allergens: [],
        ingredients: [{ n: "Domates", a: "100 g" }, { n: "Salatalık", a: "100 g" }, { n: "Soğan", a: "20 g" }, { n: "Zeytinyağı", a: "15 ml" }],
        name: { tr: "Çoban Salata", en: "Shepherd's Salad" },
        desc: { tr: "İnce doğranmış domates, salatalık ve soğan, zeytinyağlı.", en: "Finely chopped tomato, cucumber and onion with olive oil." }
    },
    {
        id: "mevsimsalata", category: "salatalar", price: 210, kcal: 220, tags: ["veg", "light"], img: img(299352),
        allergens: ["dairy"],
        ingredients: [{ n: "Roka", a: "60 g" }, { n: "Mozzarella", a: "50 g" }, { n: "Kiraz domates", a: "60 g" }, { n: "Balzamik sos", a: "15 ml" }],
        name: { tr: "Mevsim Yeşillik Salata", en: "Seasonal Green Salad" },
        desc: { tr: "Roka, mozzarella ve kiraz domatesle hazırlanan ferahlatıcı salata.", en: "A refreshing salad with arugula, mozzarella and cherry tomatoes." }
    },

    {
        id: "mercimekcorbasi", category: "corbalar", price: 140, kcal: 190, tags: ["veg", "popular"], img: img(1707270),
        allergens: ["dairy"],
        ingredients: [{ n: "Kırmızı mercimek", a: "150 g" }, { n: "Tereyağ", a: "10 g" }, { n: "Nane", a: "2 g" }],
        name: { tr: "Mercimek Çorbası", en: "Red Lentil Soup" },
        desc: { tr: "Tereyağlı, nane aromalı klasik mercimek çorbası.", en: "Classic red lentil soup with butter and a hint of mint." }
    },

    {
        id: "izgarakofte", category: "izgaralar", price: 380, kcal: 520, tags: ["popular", "chef"], img: img(1639558),
        allergens: [],
        ingredients: [{ n: "Dana kıyma", a: "220 g" }, { n: "Soğan & baharat", a: "30 g" }, { n: "Bulgur pilavı", a: "100 g" }],
        name: { tr: "Izgara Köfte", en: "Grilled Köfte" },
        desc: { tr: "El yapımı ızgara köfte, bulgur pilavı ile servis edilir.", en: "Handmade grilled köfte, served with bulgur pilaf." }
    },
    {
        id: "pirzola", category: "izgaralar", price: 550, kcal: 610, tags: ["popular", "chef"], img: img(11795607),
        allergens: [],
        ingredients: [{ n: "Kuzu pirzola", a: "280 g" }, { n: "Izgara sebze", a: "100 g" }],
        name: { tr: "Kuzu Pirzola", en: "Grilled Lamb Chops" },
        desc: { tr: "Odun ateşinde ızgara kuzu pirzola, mevsim sebzeleriyle.", en: "Wood-grilled lamb chops served with seasonal vegetables." }
    },

    {
        id: "guvec", category: "tavayemekleri", price: 340, kcal: 480, tags: ["popular"], img: img(772518),
        allergens: [],
        ingredients: [{ n: "Dana kuşbaşı", a: "200 g" }, { n: "Sebze", a: "120 g" }, { n: "Domates sos", a: "80 g" }],
        name: { tr: "Güveçte Kuşbaşı", en: "Beef Casserole" },
        desc: { tr: "Güveçte kendi suyunda pişen kuşbaşı et ve sebzeler.", en: "Diced beef and vegetables slow-cooked in a clay pot." }
    },

    {
        id: "kiymalipide", category: "pideler", price: 260, kcal: 520, tags: ["popular"], img: img(5639381),
        allergens: ["gluten", "dairy"],
        ingredients: [{ n: "Pide hamuru", a: "1 adet" }, { n: "Kıyma", a: "120 g" }, { n: "Kaşar", a: "40 g" }],
        name: { tr: "Kaşarlı Kıymalı Pide", en: "Cheese & Minced Meat Pide" },
        desc: { tr: "Taş fırında pişen, bol kaşarlı kıymalı pide.", en: "Stone-baked pide loaded with minced meat and melted cheese." }
    },

    {
        id: "sutlac", category: "tatlilar", price: 150, kcal: 280, tags: ["veg", "popular"], img: img(37825038),
        allergens: ["dairy"],
        ingredients: [{ n: "Süt", a: "250 ml" }, { n: "Pirinç", a: "40 g" }, { n: "Şeker", a: "30 g" }],
        name: { tr: "Fırın Sütlaç", en: "Baked Rice Pudding" },
        desc: { tr: "Fırında kızartılmış, geleneksel tarif.", en: "Oven-baked with a traditional recipe." }
    },
    {
        id: "kunefe", category: "tatlilar", price: 220, kcal: 460, tags: ["veg", "chef"], img: img(15794017),
        allergens: ["gluten", "dairy"],
        ingredients: [{ n: "Tel kadayıf", a: "150 g" }, { n: "Peynir", a: "80 g" }, { n: "Şerbet", a: "80 ml" }],
        name: { tr: "Künefe", en: "Künefe" },
        desc: { tr: "Sıcak servis edilen, peynirli klasik künefe.", en: "Classic cheese-filled künefe, served hot." }
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
    const [lang, setLang] = useState("tr");
    const [activeCategory, setActiveCategory] = useState("izgaralar");
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
          --petrol-900:#0B1B33; --petrol-800:#0F2545; --petrol-700:#15335C;
          --gold-100:#FCE3B0; --gold-400:#E5A93E; --gold-600:#B87A15;
          --teal-400:#4C8DFF; --cream:#F3F1E9; --ink:#0A1526; --line:rgba(255,255,255,0.08);
          font-family:'Inter',sans-serif;
          min-height:100vh; width:100%; position:relative;
          display:flex; flex-direction:column; align-items:center;
          padding:28px 16px 44px;
          background:
            radial-gradient(ellipse 900px 480px at 50% -10%, rgba(76,141,255,0.16), transparent 60%),
            linear-gradient(180deg,#081527 0%, #0B1B33 45%, #0F2545 100%);
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
          background:rgba(76,141,255,0.1); border:1px solid rgba(76,141,255,0.32);
          padding:5px 9px; border-radius:999px; font-size:9px; font-weight:700;
          color:var(--teal-400); letter-spacing:0.02em; cursor:pointer; white-space:nowrap;
        }
        .qrm-legaltip{
          position:absolute; top:50px; right:14px; width:206px; z-index:40;
          background:#122544; border:1px solid rgba(212,175,106,0.3); border-radius:12px;
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
          background:linear-gradient(135deg,#15335C,#0F2038);
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
          font-size:11.5px; font-weight:700; color:#0A1526; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-gold:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--teal-400); background:transparent;
          border:1px solid rgba(76,141,255,0.35); padding:8px 11px; border-radius:10px;
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
        .qrm-chip.active{ background:var(--teal-400); border-color:var(--teal-400); color:#0A1526; }

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
          background:linear-gradient(150deg,#15335C,#0B1B33); border:1px solid rgba(212,175,106,0.18); }
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
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#0A1526;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; }
        .qrm-addbtn.done{ background:var(--teal-400); color:#0A1526; }

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
          background:linear-gradient(135deg,var(--gold-100),var(--gold-600)); color:#0A1526; font-size:11.5px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 14px 26px rgba(0,0,0,0.4); font-family:'Inter',sans-serif; }

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:#122544; border:1px solid rgba(76,141,255,0.4); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:rgba(11,27,51,0.92); padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(247,242,228,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--gold-100); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--teal-400); color:#0A1526; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

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
          background:linear-gradient(150deg,#15335C,#0B1B33); border:1px solid rgba(212,175,106,0.2); }
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
        .qrm-confirmbtn{ width:100%; background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#0A1526; border:none; font-weight:800; font-size:12.5px; padding:13px; border-radius:13px; cursor:pointer; font-family:'Inter',sans-serif; }
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
                <path d="M0,200 L0,140 L40,140 L40,110 L80,110 L80,150 L130,150 L130,90 L150,90 L150,150 L210,150 L210,120 L260,120 L260,160 L320,160 L320,100 L360,100 L360,160 L430,160 L430,80 L460,80 L460,160 L520,160 L520,130 L580,130 L580,170 L640,170 L640,95 L680,95 L680,170 L740,170 L740,115 L800,115 L800,165 L860,165 L860,85 L900,85 L900,165 L970,165 L970,125 L1030,125 L1030,170 L1090,170 L1090,105 L1130,105 L1130,170 L1200,170 L1200,200 Z" fill="#0B1B33" opacity="0.9" />
            </svg>

            <div className="qrm-topcap">{t.demoTopBanner}</div>
            <div className="qrm-brandrow">
                <img src={LOGO_FULL} alt="Samsun Çarşı Restoran & Kafe" className="qrm-brandimg" />
            </div>

            <div className="qrm-phone">
                <div className="qrm-screen">
                    <div className="qrm-notch" />
                    <div className="qrm-status">
                        <span>9:41</span>
                        <span>Samsun · Wi-Fi</span>
                    </div>
                    <div className="qrm-table"><Hash size={11} /> {t.table} {TABLE_NUMBER}</div>

                    <div className="qrm-scroll">
                        <div className="qrm-header">
                            <img src={LOGO_FULL} alt="Samsun Çarşı Restoran & Kafe" className="qrm-headlogo" />
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
                                <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V40 H0 Z" fill="#15335C" opacity="0.6" />
                                <path d="M0,28 Q50,10 100,28 T200,28 T300,28 T400,28 V40 H0 Z" fill="#15335C" />
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
                                    <div className="qrm-locbtn" style={{ background: "linear-gradient(135deg,var(--gold-100),var(--gold-400))", color: "#0A1526" }}>
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