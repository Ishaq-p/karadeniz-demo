"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Anchor, Salad, Coffee, Wine, Cake, Sparkles, Bell, Search, X, Check,
  ChevronRight, Info, Star, Leaf, ShoppingBag, ShieldCheck, RefreshCw, Plus, Minus,
  MapPin, Hash, Moon, ChefHat, Feather, Milk, Wheat, Egg, Fish, Waves, ExternalLink, Navigation, Share2, Languages, ArrowLeft, Flame
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets (embedded so the demo always renders identically)    */
/* ---------------------------------------------------------------- */

const PRUVA_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313.62 360.35" fill="none">
<g><path d="M188.87,191.99s-10.29,5.04-23.45,5.04-35.81-8.21-47.53-16.96c0,.07,11.2-2.07,18.2-.28,4.62,1.18,12.72,5.35,20.98,8.63,7.31,2.91,15.13,4.27,23,4.09,2.62-.06,5.6-.21,8.79-.52Z" fill="#113651"/><path d="M175.05,153.12c-1.41-.71-2.05-2.38-1.5-3.87l.96-2.59c.55-1.49,2.12-2.33,3.66-1.95,9.58,2.32,25.37,6.36,34.83,6.36,18.75.7,22.66-1.97,22.66-1.97C148.57,76.58,173.89,0,173.89,0c-14.26,7.72-25.41,20.26-32.27,28.73-27.34,35.7-28.7,56.06-28.7,83.48,0,23.4,15.76,25.34,15.76,25.34-22.94,0-50.71-19.23-50.71-19.27,0,9.72,4.32,17.76,4.32,17.76,8.51,21.87,24.16,33.56,24.16,33.56,16.36-2.78,16.69-2.65,28.88-.53,12.23,2.13,23.63,18.37,50.04,18.37s43.71-24.95,43.71-24.95c-28.14,1.44-47.47-6.08-54.03-9.39ZM148.22,42.98c-2.65,15.36-3.45,32.17-3.16,38.61,1,26.52,12.71,50.96,12.71,50.96-5.15-.43-20.36-14.72-20.36-42.82s10.81-46.75,10.81-46.75ZM186.57,176.82c-15.08,0-31.81-11.87-40.35-15.83-3.9-2.39-16.26-3.47-21.01-3.47s-16.53,1.41-16.53,1.41c0,0,9.6-7.83,23.61-7.83h3.71c7.29,0,14.49,1.68,21.02,4.94,3.63,1.81,6.82,4.29,11.17,6.94,9.3,4.93,7.64,5.58,24.51,7.34,6.76.71,13.64.03,20.4-.59.73-.07,1.14-.11,1.14-.11,0,0-12.58,7.18-27.66,7.18Z" fill="#113651"/></g>
<text x="156" y="260" font-family="Georgia,serif" font-size="38" font-weight="bold" fill="#113651" text-anchor="middle" letter-spacing="-1">PRUVA</text>
<text x="156" y="290" font-family="Georgia,serif" font-size="22" fill="#113651" text-anchor="middle" letter-spacing="4">MARINA</text>
<line x1="15" y1="308" x2="298" y2="308" stroke="#113651" stroke-width="3"/>
<text x="156" y="335" font-family="Georgia,serif" font-size="15" fill="#113651" text-anchor="middle" letter-spacing="2">ATAKUM · SAMSUN</text>
</svg>`;

const LOGO_FULL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(PRUVA_LOGO_SVG)}`;

const TABLE_NUMBER = "08";
const MENU_UPDATED = "01.08.2026";
const MAP_LINK = "https://maps.app.goo.gl/twFwa6JWgFxk5gjv8";
const INSTAGRAM_LINK = "https://www.instagram.com/pruvamarina/";
const WHATSAPP_LINK = "https://wa.me/?text=" + encodeURIComponent("Pruva Marina — Atakum Samsun. Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
  tr: {
    demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
    subtitle: "Atakum · Deniz Manzarasında Özel Lezzetler",
    table: "Masa",
    greeting: "Hoş geldiniz",
    greetingSub: "Denizin sesiyle kahvaltı keyfi — Pruva Marina'da",
    aiEyebrow: "Yapay Zeka Önerisi",
    aiIdleTitle: "Size özel bir öneri ister misiniz?",
    aiIdleSub: "2 kısa soruyla o anki keyfinize en uygun lezzeti buluyoruz.",
    aiStart: "Öneri Al",
    aiQ1: "Ne yemek istiyorsunuz?",
    aiQ1Options: [
      { key: "kahvalti", label: "Kahvaltı" },
      { key: "deniz", label: "Denizden Seçkiler" },
      { key: "pizza", label: "Pizza" },
    ],
    aiQ2: "Doyurucu bir şey mi?",
    aiQ2Options: [
      { key: "yes", label: "Evet, doyurucu olsun" },
      { key: "no", label: "Hafif bir şey yeterli" },
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
    locationName: "Pruva Marina — Atakum",
    locationSub: "Atakum Sahil Cad., Samsun · Deniz manzaralı",
    openMap: "Haritada Aç",
    shareWA: "Konumu Paylaş",
    followUs: "Bizi Takip Edin",
  },
  en: {
    demoTopBanner: "LIVE PREVIEW — built with sample data",
    subtitle: "Atakum · Exclusive Flavours with Sea View",
    table: "Table",
    greeting: "Welcome",
    greetingSub: "Breakfast by the sound of the sea — at Pruva Marina",
    aiEyebrow: "AI Recommendation",
    aiIdleTitle: "Want a pick made just for you?",
    aiIdleSub: "Two quick questions and we'll match a dish to your mood.",
    aiStart: "Get a recommendation",
    aiQ1: "What would you like to eat?",
    aiQ1Options: [
      { key: "kahvalti", label: "Breakfast" },
      { key: "deniz", label: "Seafood Selections" },
      { key: "pizza", label: "Pizza" },
    ],
    aiQ2: "Something filling?",
    aiQ2Options: [
      { key: "yes", label: "Yes, make it hearty" },
      { key: "no", label: "Something light please" },
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
    locationName: "Pruva Marina — Atakum",
    locationSub: "Atakum Coast Rd., Samsun · Sea view",
    openMap: "Open in maps",
    shareWA: "Share location",
    followUs: "Follow us",
  },
};

const CATEGORIES = [
  { key: "kahvalti", icon: Coffee, label: { tr: "Kahvaltı", en: "Breakfast" } },
  { key: "kahvaltiExtra", icon: Star, label: { tr: "Kahvaltı Extraları", en: "Breakfast Extras" } },
  { key: "kapaliPide", icon: ChefHat, label: { tr: "Kapalı Pideler", en: "Closed Pide" } },
  { key: "anaYemek", icon: Anchor, label: { tr: "Ana Yemek", en: "Main Dishes" } },
  { key: "deniz", icon: Waves, label: { tr: "Denizden Seçkiler", en: "Seafood" } },
  { key: "pizza", icon: Star, label: { tr: "Pizzalar", en: "Pizzas" } },
  { key: "burger", icon: Flame, label: { tr: "Burgerler", en: "Burgers" } },
  { key: "tatli", icon: Cake, label: { tr: "Tatlılar", en: "Desserts" } },
  { key: "icecek", icon: Wine, label: { tr: "İçecekler", en: "Drinks" } },
];

const ALLERGEN_META = {
  dairy: { icon: Milk, label: { tr: "Süt Ürünü", en: "Dairy" } },
  gluten: { icon: Wheat, label: { tr: "Gluten", en: "Gluten" } },
  egg: { icon: Feather, label: { tr: "Yumurta", en: "Egg" } },
  fish: { icon: Fish, label: { tr: "Balık", en: "Fish" } },
  shellfish: { icon: Waves, label: { tr: "Kabuklu Deniz Ürünü", en: "Shellfish" } },
};

const FILTER_KEYS = ["popular", "veg", "spicy", "light", "chef"];
const FILTER_ICON = { popular: Star, veg: Leaf, spicy: Flame, light: Feather, chef: ChefHat };
const UNSPLASH_MAP = {
  // Breakfasts / Eggs
  "5945552": "1533089859732-887344b6ab6b",
  "2338711": "1525351484163-7529414344d8",
  "3769021": "1586566874837-77eb48a605f1",
  "9897494": "1551024506-0baa27542c81",
  "9491137": "1533089859732-887344b6ab6b",
  "7715698": "1533089859732-887344b6ab6b",
  "18535643": "1525351484163-7529414344d8",
  "1707270": "1547592180-85f531ce66f5",
  "10934498": "1586566874837-77eb48a605f1",
  // Liver / Grills / Kebaps / Meat
  "410648": "1544025162-d76694265947",
  "1251208": "1558030006-450675393462",
  "2741458": "1529042410759-befb1204b468",
  "1640774": "1626700051175-6818013e1d4f",
  "1639562": "1555939594-58d7cb561ad1",
  "1639558": "1555939594-58d7cb561ad1",
  "11795607": "1558030006-450675393462",
  "772518": "1544025162-d76694265947",
  "5639381": "1541592106381-b31e9677c0e5",
  "1618898": "1512621776951-a57141f2eefd",
  // Seafood
  "15801015": "1565557623262-b51c2513a641",
  "5041485": "1565557623262-b51c2513a641",
  "8639151": "1515516089376-88bd2ce14caa",
  "4445243": "1553621042-f6e147245754",
  // Soups
  "775032": "1547592180-85f531ce66f5",
  // Salads & Starters
  "4109946": "1512621776951-a57141f2eefd",
  "1555814": "1512621776951-a57141f2eefd",
  "299352": "1546069901-ba9599a7e63c",
  // Drinks / Sweets
  "3551324": "1576092768241-dec231879fc3",
  "27757405": "1513558161293-cdaf765ed2fd",
  "3026803": "1623910271109-7756f7e8a93e",
  "37825038": "1623910271109-7756f7e8a93e",
  "15794017": "1551024506-0baa27542c81",
  "312418": "1497935586351-b67a49e012bf",
  "5946803": "1600271886742-f049cd451bba",
  "2983100": "1600271886742-f049cd451bba",
};

const img = (id) => {
  const uId = UNSPLASH_MAP[id.toString()] || "1544025162-d76694265947";
  return `https://images.unsplash.com/photo-${uId}?auto=format&fit=crop&q=80&w=800`;
};

const ITEMS = [
  // Kahvaltı
  { id: "serpme", category: "kahvalti", price: 420, kcal: 850, tags: ["popular", "chef"], img: img(5945552), allergens: ["dairy","egg","gluten"], ingredients: [{n:"Peynir çeşitleri",a:"100 g"},{n:"Yumurta",a:"2 adet"},{n:"Bal & kaymak",a:"40 g"},{n:"Zeytin",a:"30 g"},{n:"Domates/salatalık",a:"80 g"}], name:{tr:"Pruva Serpme Kahvaltısı",en:"Pruva Spread Breakfast"}, desc:{tr:"Deniz manzarasında, nefis çeşitlerle serpme kahvaltı.",en:"Spread breakfast with delicious variety, overlooking the sea."} },
  { id: "omlet", category: "kahvalti", price: 220, kcal: 380, tags: ["popular","veg"], img: img(3769021), allergens: ["egg","dairy"], ingredients: [{n:"Yumurta",a:"3 adet"},{n:"Mantar & peynir",a:"60 g"},{n:"Tereyağı",a:"15 g"}], name:{tr:"Mantarlı Omlet",en:"Mushroom Omelette"}, desc:{tr:"Mantar ve peynirle dolu yumuşak omlet.",en:"Soft omelette filled with mushrooms and cheese."} },
  // Kahvaltı Extra
  { id: "bal_kaymak", category: "kahvaltiExtra", price: 120, kcal: 280, tags: ["popular","veg"], img: img(9897494), allergens: ["dairy"], ingredients: [{n:"Organik bal",a:"40 g"},{n:"Kaymak",a:"50 g"}], name:{tr:"Bal & Kaymak",en:"Honey & Clotted Cream"}, desc:{tr:"Organik çiçek balı ve taze kaymak.",en:"Organic wildflower honey and fresh clotted cream."} },
  // Kapalı Pideler
  { id: "kasarli_pide", category: "kapaliPide", price: 280, kcal: 580, tags: ["popular"], img: img(1640774), allergens: ["gluten","dairy"], ingredients: [{n:"Pide hamuru",a:"1 adet"},{n:"Kaşar peyniri",a:"80 g"},{n:"Tereyağı",a:"15 g"}], name:{tr:"Kaşarlı Kapalı Pide",en:"Cheese Closed Pide"}, desc:{tr:"Bol kaşar peyniriyle doldurulmuş, fırın çıkışı sıcak pide.",en:"Freshly baked closed pide stuffed with plenty of kashkaval cheese."} },
  { id: "kiyimali_pide", category: "kapaliPide", price: 320, kcal: 650, tags: ["popular","chef"], img: img(2741458), allergens: ["gluten"], ingredients: [{n:"Kıymalı harç",a:"120 g"},{n:"Pide hamuru",a:"1 adet"},{n:"Biber & domates",a:"60 g"}], name:{tr:"Kıymalı Kapalı Pide",en:"Minced Meat Closed Pide"}, desc:{tr:"Kıyma ve sebzelerle zenginleştirilmiş geleneksel pide.",en:"Traditional pide enriched with minced meat and vegetables."} },
  // Ana Yemek
  { id: "tavuk_sis", category: "anaYemek", price: 320, kcal: 460, tags: ["popular","light"], img: img(1251208), allergens: [], ingredients: [{n:"Tavuk göğüs",a:"280 g"},{n:"Marine karışımı",a:"15 g"},{n:"Pilav",a:"120 g"}], name:{tr:"Tavuk Şiş",en:"Chicken Skewer"}, desc:{tr:"Marine edilmiş tavuk şiş, pilav ve söğüş eşliğinde.",en:"Marinated chicken skewer served with rice and salad."} },
  { id: "lahmacun", category: "anaYemek", price: 130, kcal: 320, tags: ["popular"], img: img(1640774), allergens: ["gluten"], ingredients: [{n:"İnce hamur",a:"1 adet"},{n:"Kıymalı harç",a:"80 g"},{n:"Maydanoz & limon",a:"10 g"}], name:{tr:"Lahmacun",en:"Lahmacun"}, desc:{tr:"Çıtır ince hamur üzerine baharatlı kıymalı harç.",en:"Crispy thin dough with spiced minced meat topping."} },
  // Denizden Seçkiler
  { id: "karides_guveç", category: "deniz", price: 440, kcal: 480, tags: ["popular","chef","spicy"], img: img(5041485), allergens: ["shellfish","dairy"], ingredients: [{n:"Karides",a:"220 g"},{n:"Domates sos",a:"120 g"},{n:"Kaşar peyniri",a:"40 g"},{n:"Acı biber",a:"15 g"}], name:{tr:"Karides Güveç",en:"Shrimp Casserole"}, desc:{tr:"Domates sos, kaşar ve acı biberle güveçte karides.",en:"Shrimp casserole with tomato sauce, cheese and chilli."} },
  { id: "levrek", category: "deniz", price: 520, kcal: 420, tags: ["light","chef"], img: img(8639151), allergens: ["fish"], ingredients: [{n:"Levrek fileto",a:"280 g"},{n:"Zeytinyağı",a:"15 ml"},{n:"Mevsim yeşillik",a:"50 g"}], name:{tr:"Izgara Levrek",en:"Grilled Sea Bass"}, desc:{tr:"Deniz manzarasında ızgara taze levrek.",en:"Fresh grilled sea bass with a sea view."} },
  { id: "sushi", category: "deniz", price: 360, kcal: 380, tags: ["popular","chef","light"], img: img(4445243), allergens: ["fish","shellfish"], ingredients: [{n:"Sushi pirinci",a:"120 g"},{n:"Somon",a:"80 g"},{n:"Avokado",a:"40 g"},{n:"Nori",a:"4 adet"}], name:{tr:"Sushi Tabağı (8 parça)",en:"Sushi Plate (8 pcs)"}, desc:{tr:"Taze somon ve avokadolu sushi, 8 parça.",en:"Fresh salmon and avocado sushi, 8 pieces."} },
  // Pizzalar
  { id: "caligula", category: "pizza", price: 690, kcal: 1820, tags: ["popular","chef"], img: img(1640774), allergens: ["gluten","dairy"], ingredients: [{n:"Pizza hamuru",a:"1 adet"},{n:"Domates sos",a:"80 g"},{n:"Rende mozarella",a:"100 g"},{n:"Julyen et",a:"80 g"}], name:{tr:"Caligula Pizza",en:"Caligula Pizza"}, desc:{tr:"Julyen et, özel sos ve mozarella ile Pruva usulü pizza.",en:"Pruva-style pizza with julienne meat, special sauce and mozzarella."} },
  { id: "mexican", category: "pizza", price: 700, kcal: 1860, tags: ["popular","spicy"], img: img(2338711), allergens: ["gluten","dairy"], ingredients: [{n:"Pizza hamuru",a:"1 adet"},{n:"Dana kıyma",a:"80 g"},{n:"Jalepeno biber",a:"20 g"},{n:"Mozarella",a:"100 g"}], name:{tr:"Mexican Pizza",en:"Mexican Pizza"}, desc:{tr:"Kıyma, jalepeno, fasulye ve baharatlı sosla Meksika usulü pizza.",en:"Mexican-style pizza with minced meat, jalapeno and spicy sauce."} },
  // Burgerler
  { id: "pruva_burger", category: "burger", price: 380, kcal: 820, tags: ["popular","chef"], img: img(1639562), allergens: ["gluten","dairy","egg"], ingredients: [{n:"Dana köfte",a:"180 g"},{n:"Brioche ekmek",a:"1 adet"},{n:"Cheddar",a:"30 g"},{n:"Marul & domates",a:"40 g"}], name:{tr:"Pruva Burger",en:"Pruva Burger"}, desc:{tr:"180 gr dana köfte, cheddar ve taze sebzelerle ev yapımı burger.",en:"180g beef patty burger with cheddar and fresh vegetables."} },
  // Tatlılar
  { id: "kuzu_kulagi", category: "tatli", price: 200, kcal: 480, tags: ["popular","veg","chef"], img: img(9897494), allergens: ["dairy","gluten","egg"], ingredients: [{n:"Kuzu kulağı hamuru",a:"100 g"},{n:"Kaymak",a:"50 g"},{n:"Şerbet",a:"40 ml"},{n:"Antep fıstığı",a:"10 g"}], name:{tr:"Kuzu Kulağı",en:"Kuzu Kulağı"}, desc:{tr:"Geleneksel Türk tatlısı, kaymak ve fıstıkla.",en:"Traditional Turkish pastry with clotted cream and pistachios."} },
  { id: "sutlac", category: "tatli", price: 150, kcal: 300, tags: ["veg","popular"], img: img(3026803), allergens: ["dairy"], ingredients: [{n:"Süt",a:"250 ml"},{n:"Pirinç",a:"40 g"},{n:"Şeker",a:"30 g"}], name:{tr:"Fırın Sütlaç",en:"Baked Rice Pudding"}, desc:{tr:"Fırında pişirilmiş karamelize sütlaç.",en:"Baked rice pudding with caramelized top."} },
  // İçecekler
  { id: "cay", category: "icecek", price: 50, kcal: 5, tags: ["veg","light"], img: img(3551324), allergens: [], ingredients: [{n:"Çay",a:"1 demleme"}], name:{tr:"Çay",en:"Turkish Tea"}, desc:{tr:"Geleneksel Türk çayı.",en:"Traditional Turkish tea."} },
  { id: "filtre_kahve", category: "icecek", price: 120, kcal: 15, tags: ["veg","light"], img: img(312418), allergens: [], ingredients: [{n:"Filtre kahve",a:"200 ml"}], name:{tr:"Filtre Kahve",en:"Filter Coffee"}, desc:{tr:"Sıcak filtre kahve, deniz manzarasında.",en:"Hot filter coffee with a sea view."} },
  { id: "portakal", category: "icecek", price: 100, kcal: 110, tags: ["veg","light"], img: img(5946803), allergens: [], ingredients: [{n:"Taze portakal",a:"3 adet"}], name:{tr:"Taze Sıkma Portakal Suyu",en:"Fresh Orange Juice"}, desc:{tr:"Günlük sıkılan taze portakal suyu.",en:"Freshly squeezed daily."} },
];

const fmtTL = (n) => n.toLocaleString("tr-TR") + " ₺";

function pickAiSuggestion(q1, q2) {
  if (q1 === "kahvalti") return q2 === "yes" ? ITEMS.find(i => i.id === "serpme") : ITEMS.find(i => i.id === "omlet");
  if (q1 === "deniz") return q2 === "yes" ? ITEMS.find(i => i.id === "karides_guveç") : ITEMS.find(i => i.id === "levrek");
  return q2 === "yes" ? ITEMS.find(i => i.id === "caligula") : ITEMS.find(i => i.id === "mexican");
}

/* ---------------------------------------------------------------- */
/* Component                                                          */
/* ---------------------------------------------------------------- */

export default function PruvaMarinaMenu() {
  const [lang, setLang] = useState("tr");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
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
          /* Marine colors for Pruva Marina brand */
          --ink-900:#03111b; --ink-800:#071e2c; --ink-700:#0d2c41;
          --gold-100:#B08D57; --gold-400:#a37c44; --gold-600:#8a6838;
          --violet-400:#3B82F6; --cream:#f8fafc; --ink:#03111b; --line:rgba(176,141,87,0.15);
          font-family:'Inter',sans-serif;
          min-height:100vh; width:100%; position:relative;
          display:flex; flex-direction:column; align-items:center;
          padding:28px 16px 44px;
          background:
            radial-gradient(ellipse 900px 480px at 50% -10%, rgba(176,141,87,0.1), transparent 60%),
            linear-gradient(180deg,#03111b 0%, #071e2c 45%, #0d2c41 100%);
          color:var(--cream);
          box-sizing:border-box;
        }
        .qrm-root *{ box-sizing:border-box; }
        .qrm-serif{ font-family:'Playfair Display',serif; }

        .qrm-skyline{ position:absolute; left:0; right:0; bottom:0; height:170px; opacity:0.3; pointer-events:none; }

        .qrm-topcap{
          font-size:10.5px; letter-spacing:0.13em; text-transform:uppercase; color:var(--gold-100); opacity:0.85;
          background:rgba(176,141,87,0.1); border:1px solid rgba(176,141,87,0.25);
          padding:7px 16px; border-radius:999px; margin-bottom:16px; text-align:center; position:relative; z-index:2;
        }
        .qrm-brandrow{ display:flex; flex-direction:column; align-items:center; margin-bottom:18px; position:relative; z-index:2; }
        .qrm-brandimg{ height:76px; width:auto; border-radius:14px; box-shadow:0 10px 26px rgba(0,0,0,0.35); filter: brightness(0) invert(1); }

        .qrm-phone{
          position:relative; z-index:2;
          width:min(390px, 94vw);
          height:min(844px, calc(min(390px, 94vw) * 844 / 390));
          border-radius:44px; padding:12px;
          background:linear-gradient(160deg,#1e293b,#020617);
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
        .qrm-headlogo{ height:32px; width:auto; border-radius:7px; flex-shrink:0; filter: brightness(0) invert(1); }
        .qrm-hsub{ font-size:9.5px; color:rgba(253,254,254,0.5); margin-top:1px; }
        .qrm-legal{
          margin-left:auto; display:flex; align-items:center; gap:5px;
          background:rgba(176,141,87,0.15); border:1px solid rgba(176,141,87,0.32);
          padding:5px 9px; border-radius:999px; font-size:9px; font-weight:700;
          color:var(--gold-100); letter-spacing:0.02em; cursor:pointer; white-space:nowrap;
        }
        .qrm-legaltip{
          position:absolute; top:50px; right:14px; width:206px; z-index:40;
          background:#071e2c; border:1px solid rgba(176,141,87,0.3); border-radius:12px;
          padding:11px 12px; font-size:10px; line-height:1.5; color:rgba(253,254,254,0.85);
          box-shadow:0 12px 30px rgba(0,0,0,0.4);
        }
        .qrm-legaltip b{ color:var(--gold-100); display:block; margin-top:6px; font-size:9.5px; }

        .qrm-hero{ position:relative; padding:14px 18px 24px; overflow:hidden; flex-shrink:0;
          background:radial-gradient(120% 100% at 20% 0%, #0d2c41 0%, #071e2c 60%, #03111b 100%); }
        .qrm-hero-wave{ position:absolute; left:0; right:0; bottom:-2px; height:32px; }
        .qrm-greet{ display:flex; align-items:center; gap:8px; font-size:20px; font-weight:700; color:var(--cream); position:relative; z-index:2;}
        .qrm-greetsub{ font-size:11px; color:rgba(253,254,254,0.6); margin-top:3px; position:relative; z-index:2;}

        .qrm-ai{
          margin:-12px 16px 0; position:relative; z-index:5;
          background:linear-gradient(135deg,#071e2c,#03111b);
          border:1px solid rgba(176,141,87,0.25); border-left:3px solid var(--gold-400);
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
        .qrm-ai-opt:active{ background:rgba(176,141,87,0.2); border-color:rgba(176,141,87,0.4); }
        .qrm-ai-back{ display:flex; align-items:center; gap:4px; font-size:10.5px; font-weight:600; color:var(--gold-100); background:none; border:none; cursor:pointer; margin-bottom:2px; }

        .qrm-btn-gold{
          font-size:11.5px; font-weight:700; color:#fff; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-gold:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--gold-100); background:transparent;
          border:1px solid rgba(176,141,87,0.35); padding:8px 11px; border-radius:10px;
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
        .qrm-chip.active{ background:var(--gold-400); border-color:var(--gold-400); color:#fff; }

        .qrm-cats{ display:flex; gap:8px; padding:14px 16px 4px; overflow-x:auto; flex-shrink:0; scrollbar-width:none; }
        .qrm-cats::-webkit-scrollbar{ display:none; }
        .qrm-cat{ display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; padding:9px 13px; border-radius:14px; border:1px solid var(--line); background:rgba(255,255,255,0.025); }
        .qrm-cat.active{ background:linear-gradient(135deg,rgba(176,141,87,0.16),rgba(176,141,87,0.05)); border-color:rgba(176,141,87,0.45); }
        .qrm-cat span{ font-size:9px; font-weight:700; color:rgba(253,254,254,0.65); text-align:center; white-space:nowrap; }
        .qrm-cat.active span{ color:var(--gold-100); }

        .qrm-list{ padding:12px 16px 26px; display:flex; flex-direction:column; gap:11px; }
        .qrm-empty{ text-align:center; padding:40px 20px; color:rgba(253,254,254,0.5); font-size:12px; }
        .qrm-card{ display:flex; gap:11px; background:rgba(255,255,255,0.03); border:1px solid var(--line); border-radius:16px; padding:10px; cursor:pointer; }
        .qrm-card:active{ background:rgba(255,255,255,0.06); }
        .qrm-tile{ width:56px; height:56px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden;
          background:linear-gradient(150deg,#071e2c,#03111b); border:1px solid rgba(176,141,87,0.18); }
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

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:#071e2c; border:1px solid rgba(176,141,87,0.4); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:rgba(3,17,27,0.92); padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(253,254,254,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--gold-100); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--gold-600); color:#fff; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

        .qrm-sheet-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:60; display:flex; align-items:flex-end; }
        .qrm-sheet{ width:100%; max-height:85%; background:var(--ink-800); border-radius:24px 24px 0 0; overflow-y:auto; animation:qrmUp .25s ease; border-top:1px solid rgba(176,141,87,0.28);
          scrollbar-width:thin; scrollbar-color:var(--gold-400) transparent; }
        .qrm-sheet::-webkit-scrollbar{ width:5px; }
        .qrm-sheet::-webkit-scrollbar-thumb{ background:var(--gold-400); border-radius:10px; }
        .qrm-sheet-handle{ width:36px; height:4px; background:rgba(255,255,255,0.2); border-radius:3px; margin:10px auto 4px; }
        .qrm-sheet-head{ display:flex; justify-content:space-between; align-items:center; padding:8px 18px 4px; }
        .qrm-sheet-title{ font-size:18px; font-weight:700; color:var(--cream); }
        .qrm-iconbtn{ background:rgba(255,255,255,0.08); border:none; color:var(--cream); width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }

        .qrm-detail-tile{ height:140px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:14px 18px 0; overflow:hidden;
          background:linear-gradient(150deg,#071e2c,#03111b); border:1px solid rgba(176,141,87,0.2); }
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
        <path d="M0,200 L0,140 L40,140 L40,110 L80,110 L80,150 L130,150 L130,90 L150,90 L150,150 L210,150 L210,120 L260,120 L260,160 L320,160 L320,100 L360,100 L360,160 L430,160 L430,80 L460,80 L460,160 L520,160 L520,130 L580,130 L580,170 L640,170 L640,95 L680,95 L680,170 L740,170 L740,115 L800,115 L800,165 L860,165 L860,85 L900,85 L900,165 L970,165 L970,125 L1030,125 L1030,170 L1090,170 L1090,105 L1130,105 L1130,170 L1200,170 L1200,200 Z" fill="#03111b" opacity="0.9" />
      </svg>

      <div className="qrm-topcap">{t.demoTopBanner}</div>
      <div className="qrm-brandrow">
        <img src={LOGO_FULL} alt="Pruva Marina" className="qrm-brandimg" />
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
              <img src={LOGO_FULL} alt="Pruva Marina" className="qrm-headlogo" />
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
              <div className="qrm-greet"><Waves size={19} color="var(--gold-100)" /> {t.greeting}</div>
              <div className="qrm-greetsub">{t.greetingSub}</div>
              <svg className="qrm-hero-wave" viewBox="0 0 400 40" preserveAspectRatio="none">
                <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V40 H0 Z" fill="#03111b" opacity="0.6" />
                <path d="M0,28 Q50,10 100,28 T200,28 T300,28 T400,28 V40 H0 Z" fill="#03111b" />
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
                      <Icon size={15} color={active ? "#B08D57" : "rgba(253,254,254,0.55)"} />
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
                    <div className="qrm-tile">{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={21} color="#B08D57" />}</div>
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
                  <ExternalLink size={14} /> @pruvamarina
                </a>
              </div>
            </div>
          </div>

          <button className="qrm-fab" onClick={callWaiter}>
            <Bell size={13} /> {t.callWaiter}
          </button>

          {waiterToast && (
            <div className="qrm-toast">
              <Bell size={14} color="#B08D57" /> {t.waiterCalled}
            </div>
          )}

          <div className="qrm-nav">
            <button className="qrm-navitem active">
              <Anchor size={16} /> <span>{t.navMenu}</span>
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
                    : (() => { const Icon = CATEGORIES.find((c) => c.key === selectedItem.category)?.icon || Sparkles; return <Icon size={44} color="#B08D57" />; })()}
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
                            <div className="qrm-tile" style={{ width: 42, height: 42 }}>{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={16} color="#B08D57" />}</div>
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
        Pruva Marina için QR Akıllı Menü Sistemi — masaya özel QR, yapay zeka önerisi, alerjen/malzeme bilgisi, çoklu dil ve yasal uyum tek ekranda.
      </div>
    </div>
  );
}
