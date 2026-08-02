"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Coffee, UtensilsCrossed, Martini, Wind, Cake, Sparkles, Bell, Search, X, Check,
  ChevronRight, Info, Star, Leaf, Flame, ShoppingBag, ShieldCheck,
  RefreshCw, Plus, Minus, MapPin, Hash, Moon, ChefHat, Feather,
  Milk, Wheat, Egg, Nut, ExternalLink, Navigation, Share2, Languages, ArrowLeft,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Brand assets (embedded so the demo always renders identically)    */
/* ---------------------------------------------------------------- */

const LOGO_FULL = "data:image/jpeg;base64,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";
const LOGO_ICON = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAB4AHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxlVqRVoVamVadx2GhaeFp6rXX+AfAOs+NLsppsQis0OJbyUERp7D+83sPxxRcDj9tdd4b+HPinxEqyadpE4gbpPP+6Qj1BbGfwzX0t4I+FXhzwqkcothqGorybq6UMQf9lei/z9676i4j5r0z9nrWJVVtS1mxts9VhjaUj89orcj/AGdrQL+88R3Bb/ZtVA/9CNe8UUXA+fLz9nZwpNl4iVm7Ca0wPzDf0rkdc+CHi7TVZ7aG11KMc/6NLhv++Wx+ma+saKLgfBOo6beaZdNbajaz2lwvWOaMo35Gquyvu/XND0zXrM2usWMF5Af4ZUyR7g9QfcV4N8QvgdPZpLfeEHe6gGWaxkOZFH+w38X0PPuaLjPCClMKVdlheORo5EZJEJVlYYKkdQR2qMpRcdioUoqwUoouKxAq1Kq0iiup+HvhS48YeJrbS7fKRH95cTAf6qIdT9ew9zUFHRfCH4az+M737Xfb4NDgfEkg4aZh/An9T2+tfVumafaaXYQ2WnW8dtawrtjijGAopmj6baaPpltp+nQrDaW6BI0XsB/X3q5VEMKKKKACiiigAooooAKKKKAPMfi18MLbxVbyajpKRwa4gzkcLcgfwt/tejfnx0+X7q1ltbiWC5jeKeJijxuMMrDggivu6vFfj/4GS6tG8TaZFi5gAF4ij/WJ0D/Ve/t9KTKTPnQpRVgpRSuVYz1FfV37P/hZdC8GpqE8eL7VMTsSOVi/gX8vm/4FXzR4S0ltc8S6Xpa5/wBKuEiYjspPzH8s19xwxJBDHFEoSONQqqOgA4ApRJkPoooqyQorN8Sa3YeHNDvNW1ecQWVqheR+p9gB3JOAB6muU0EeKfFtqmp6ley+HNNnG+2sLSNGufLPRppHDBWI52qBjuapRbV+gHe0VxupaL4m0uA3PhvXpb+aMbjY6sqNHP8A7IkRVZD6E7h6ir/gTxbZ+L9He7topLW6t5Wt7yzm/wBZbTL95G/oe4ocdLoDo6KK5D4g+Lrnwr/Y/wBl0W+1P7beR2zm2UERhjj1+8ew6deRSjFydkB19FcboHjG61Xx1rGgy6DqNpBYxRSJdyoAjbgc556HHy4znBziuyocXHcApk0STQvFMivG6lWVhkMDwQafRSA+PPiB4cPhjxZfaaAfIVvMgJ7xtyv5dPwor1r9o/Rw9ppWsRr80bm1kPsRuX9Q350Vm9Gax1R51+zzZC7+JVrIwyLW3lm/HG0f+hV9XV8z/syKv/CbagT94WDY/wC/iV9I3lql3GqStMqqwb91K0ZOOxKkEj2qobES3J6K87tJruHTfDN3BcXktzc6k1vKJLpysifv+GBJHG1e2eK238VrFrkujXEcMN9Hl2dpf3flBVO4cZJy4G38c1o4sk4v46MNQ8R/Dzw9PzY6hq4luE7SCLBCn2O6vXa8f+L0OoXnhrw140g0+VLzw9fC+ltRks1vuw5AwDyqq2CMgZz0r1XSdRtNW0y11DTp0ns7mMSxSIchlIyK0n8Ebef3gW6+fPGmrXvgj4p+ObjRXWF7/wAOjU1BUMonjYIHKnjpu/OvoJmCqWYgKBkk9q+bvE4bxXF8UPG0IJ0iLS20fTpT0nCkGSRf9ncMA981WHWrvt/wRM9B8L3ni/x54S0y/t9WXQLWW1TdcJaJLcXUm0b3Ct8sce7OBgkjngEVjeKtV8b+BtK8Pw6rrtnqs97r8Nqtx9jVWNsw5Vh0DZHUdPWvQ/hdx8N/C+Bj/iWW/wD6LWuH/aL/ANR4H/7GK2/rVQadTktoBYPjHWF8efEfTRLD9l0bS0urMeUu5H8rdyf4hnsaX4Wat4s8e+DNO1PU9Q/sq3ZCpltYozPdsGILjcCsacYACknBORXOv/yVL4xf9gOP/wBJ67j4A/8AJHfC/wD17H/0NqJpRhdLt+QGfreuaz4C8X+HrW/1KXWPD2t3H2INdIguLWY42ncgUMpz0IyMda9Qrx/9ogkSeAiDg/8ACQ29ewVlUS5Yy7jOK+MlmLv4d6rkZaEJMvsVcf0zRWl8RgreBNdD9Pskn544ormnubU9j57/AGdrsW3xHiiYgfabWWIfUYb/ANlr6nr4m8Eat/YXi3SNSJwlvcI0n+4Thv0Jr7YVgyhlIKkZBHenDYia1MmLw/aRWunQK02yxuTdREsMlzv68dP3jfpWW+hl/Gd1euJ4XkRHtruHB2kKUkjbIIwQEPI57ciurorS7II4oQkHlOzSjB3GTktnrntXI23gg6JcTSeD9Vl0eCZzJJYNEJ7TcerLGSChPfawHtXZUUKTWwHHah4R1LXo2tvEviGa405+JLKwgFokw/uu25nKnuAwzV/xN4VtdW8DX3hiyKadZz2ptY/KjBWFe2F4roqKfOwMzwxpQ0Lw5pekrMZxY20duJSu3fsULnHbOK80/aBU3N34AsIubifxBAyL7L1P4ZFes3kksVrLJbw+fMqkpFuC7z2GTwPrXC6Z4T1TV/HNv4r8XG2iewiaLTNNtnMiW+770juQNzkccDA96ulK0udgSt8PkPijxhrP9otnxDYrZGLyR+4xHs3A5+b1xxW34C8ODwl4P0vQluTdCxi8vzimwv8AMTnGTjr61v0VDnJqzYHkH7Ri+XZ+DLx+ILbxBbGRj0UHPJ/KvX6w/G3hmy8X+GL7RNS3CC5XAkT70bg5V19wQDVLwWviaxt4tM8Sw2l0LePYmqW8x/fgYA3xkZViOuCRmrbUoJdgIfi1ci2+H2rknBkRYh7lmA/lmiuX+P2piPSdO0xG+eeUzuP9lRgfq36UVyTepvTWh8xp0r60+CXiYeIfBNtHK+6908C2mBPJAHyN+K4/EGvkpDXafC7xdJ4P8TRXblmsJgIruMd0z94D1U8/mO9OLsyZK6PsCiorW4hu7aK4tpFlglUOjochlIyCKlrUyCiiigAooooAKKKKACiiigAoJABJOAOpNFecfGLxYNK0s6RZSf6fdriQqeYoj1/E9B7ZpN2VxpXdjyr4i67/AMJD4ru7qNt1tGfJg/3F7/icn8aK5zFFc7dzrSsrHEIamQ1WU1KhqjI9f+DfxL/4R100fXJCdHkb91KeTbMf/ZD+nWvpOGWOaJJYXWSNwGV1OQwPQg18Jq1eg/Dr4l6p4RK2smb3Sc82ztzH7xnt9On061cZW3IlG+x9W0Vz3hPxjoniq3D6TeI02MvbyfLKn1X+oyK6GtDMKKKKACiiigAoqO4nitoXmuZUiiQZZ3YKoHuTXlfjX4tW1sslp4ZAuZ+hu3H7tP8AdH8R9+n1pOSW41FvY6vx/wCNLTwrZFVKzanKv7mDPT/ab0X+dfOmoXtxqN7NeXsrS3MzF3du5/w9qhu7u4vrqS5vJnnuJDueRzksaYK55S5jphDlH0UCipLOBU1IpoorUxJVNSq1FFICxbzSQSpLBI8cqHKujFWU+xFeh+Hfi74o0lVjnuYtRhXjbdrlv++xg/nmiii9tgtfc7vTvjtaMqjUdFuI27tBKrj8jitqP41+GGXLQ6mh9DCp/k1FFPnYuRFe6+N2hop+y6fqMzdtwRB/6Ea5rVvjZqdwGXStOtrQHo8rGVh+HA/nRRUubGoI4HW/EWra9Lv1a/nuechGOEX6KOB+VZymiioZoiRTUi0UUFD1ooopAf/Z";

const TABLE_NUMBER = "07";
const MENU_UPDATED = "02.08.2026";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=The+Orjin+Cafe+Atakum+Samsun";
const INSTAGRAM_LINK = "https://www.instagram.com/theorjinatakum";
const WHATSAPP_LINK =
  "https://wa.me/905309512106?text=" +
  encodeURIComponent("The Orjin — Atakum, Samsun. Konum: " + MAP_LINK);

/* ---------------------------------------------------------------- */
/* Content                                                            */
/* ---------------------------------------------------------------- */

const UI = {
  tr: {
    demoTopBanner: "CANLI ÖN İZLEME — örnek veriler ile hazırlanmıştır",
    subtitle: "Atakum · kahvaltı, nargile & kokteyl",
    table: "Masa",
    greeting: "İyi akşamlar",
    greetingSub: "The Orjin'e hoş geldiniz",
    aiEyebrow: "Yapay Zeka Önerisi",
    aiIdleTitle: "Size özel bir öneri ister misiniz?",
    aiIdleSub: "2 kısa soruyla o anki keyfinize en uygun lezzeti buluyoruz.",
    aiStart: "Öneri Al",
    aiQ1: "Canınız ne çekiyor?",
    aiQ1Options: [
      { key: "food", label: "Doyurucu Bir Şey" },
      { key: "desserts", label: "Tatlı" },
      { key: "drinks", label: "Kokteyl" },
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
    locationName: "The Orjin Atakum",
    locationSub: "Güzelyalı Mah., Atakum / Samsun — şık ve konforlu bir ortam",
    openMap: "Haritada Aç",
    shareWA: "Konumu Paylaş",
    followUs: "Bizi Takip Edin",
  },
  en: {
    demoTopBanner: "LIVE PREVIEW — built with sample data",
    subtitle: "Atakum · breakfast, hookah & cocktails",
    table: "Table",
    greeting: "Good evening",
    greetingSub: "Welcome to The Orjin",
    aiEyebrow: "AI Recommendation",
    aiIdleTitle: "Want a pick made just for you?",
    aiIdleSub: "Two quick questions and we'll match something to your mood.",
    aiStart: "Get a recommendation",
    aiQ1: "What are you in the mood for?",
    aiQ1Options: [
      { key: "food", label: "Something hearty" },
      { key: "desserts", label: "Dessert" },
      { key: "drinks", label: "A cocktail" },
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
    locationName: "The Orjin Atakum",
    locationSub: "Güzelyalı Mah., Atakum / Samsun — stylish, comfortable setting",
    openMap: "Open in maps",
    shareWA: "Share location",
    followUs: "Follow us",
  },
};

const CATEGORIES = [
  { key: "breakfast", icon: Coffee, label: { tr: "Kahvaltı", en: "Breakfast" } },
  { key: "food", icon: UtensilsCrossed, label: { tr: "Lezzet", en: "Food" } },
  { key: "desserts", icon: Cake, label: { tr: "Tatlı", en: "Desserts" } },
  { key: "hookah", icon: Wind, label: { tr: "Nargile", en: "Hookah" } },
  { key: "drinks", icon: Martini, label: { tr: "Kokteyl", en: "Drinks" } },
];

const ALLERGEN_META = {
  dairy: { icon: Milk, label: { tr: "Süt Ürünü", en: "Dairy" } },
  gluten: { icon: Wheat, label: { tr: "Gluten", en: "Gluten" } },
  egg: { icon: Egg, label: { tr: "Yumurta", en: "Egg" } },
  nuts: { icon: Nut, label: { tr: "Kuruyemiş", en: "Nuts" } },
};

const FILTER_KEYS = ["popular", "veg", "spicy", "light", "chef"];
const FILTER_ICON = { popular: Star, veg: Leaf, spicy: Flame, light: Feather, chef: ChefHat };

const ITEMS = [
  // Kahvaltı / Breakfast
  {
    id: "serpme", category: "breakfast", price: 420, kcal: 680, tags: ["popular", "chef"], img: "/serpme_kahvalti.png",
    allergens: ["dairy", "egg", "gluten"],
    ingredients: [{ n: "Peynir çeşitleri", a: "120 g" }, { n: "Zeytin", a: "60 g" }, { n: "Reçel & bal", a: "3 çeşit" }, { n: "Sahanda yumurta", a: "2 adet" }, { n: "Sıcak ekmek", a: "servis ile" }],
    name: { tr: "Orjin Serpme Kahvaltı", en: "Orjin Breakfast Spread" },
    desc: { tr: "İki kişilik, günün taze ürünleriyle hazırlanan zengin serpme kahvaltı tabağı.", en: "A generous spread for two, built fresh each morning with local favorites." }
  },
  {
    id: "avokado", category: "breakfast", price: 240, kcal: 390, tags: ["veg", "light"], img: "/avokado_tost.png",
    allergens: ["gluten"],
    ingredients: [{ n: "Ezme avokado", a: "120 g" }, { n: "Ekşi maya ekmek", a: "2 dilim" }, { n: "Cherry domates", a: "40 g" }, { n: "Chili flakes", a: "1 g" }],
    name: { tr: "Avokado Tost", en: "Avocado Toast" },
    desc: { tr: "Ekşi mayalı ekmek üzerinde ezme avokado, cherry domates ve tatlı biber.", en: "Sourdough topped with smashed avocado, cherry tomato and chili flakes." }
  },
  {
    id: "menemen", category: "breakfast", price: 190, kcal: 330, tags: ["veg", "popular"], img: "/menemen.png",
    allergens: ["egg", "dairy"],
    ingredients: [{ n: "Yumurta", a: "3 adet" }, { n: "Domates", a: "80 g" }, { n: "Biber", a: "40 g" }, { n: "Tereyağı", a: "10 g" }],
    name: { tr: "Menemen", en: "Menemen (Turkish Scramble)" },
    desc: { tr: "Domates ve biberle yavaşça pişirilmiş klasik menemen, sahanda servis edilir.", en: "Classic slow-cooked eggs with tomato and pepper, served sizzling." }
  },

  // Lezzet / Food
  {
    id: "orjinburger", category: "food", price: 340, kcal: 790, tags: ["popular", "chef"], img: "/orjinburger.png",
    allergens: ["dairy", "gluten"],
    ingredients: [{ n: "Dana köfte", a: "180 g" }, { n: "Cheddar", a: "30 g" }, { n: "Karamelize soğan", a: "40 g" }, { n: "Brioche ekmek", a: "1 adet" }],
    name: { tr: "Orjin Burger", en: "The Orjin Burger" },
    desc: { tr: "El yapımı dana köfte, cheddar ve karamelize soğanla, brioche ekmek arasında.", en: "House-ground beef patty with cheddar and caramelized onion on brioche." }
  },
  {
    id: "fajitawrap", category: "food", price: 290, kcal: 560, tags: ["spicy"], img: "/fajitawrap.png",
    allergens: ["gluten", "dairy"],
    ingredients: [{ n: "Tavuk fajita", a: "150 g" }, { n: "Tortilla", a: "1 adet" }, { n: "Acı sos", a: "20 g" }, { n: "Cheddar", a: "20 g" }],
    name: { tr: "Tavuk Fajita Wrap", en: "Chicken Fajita Wrap" },
    desc: { tr: "Marine edilmiş tavuk, közlenmiş biberler ve acı sosla dürüm.", en: "Marinated chicken with charred peppers and spicy sauce, wrapped." }
  },
  {
    id: "kinoa", category: "food", price: 250, kcal: 320, tags: ["veg", "light"], img: "/kinoa.png",
    allergens: ["nuts"],
    ingredients: [{ n: "Kinoa", a: "100 g" }, { n: "Mevsim yeşillik", a: "60 g" }, { n: "Ceviz", a: "15 g" }, { n: "Nar ekşisi sos", a: "20 ml" }],
    name: { tr: "Kinoa Salata", en: "Quinoa Salad" },
    desc: { tr: "Kinoa, mevsim yeşillikleri ve cevizle, nar ekşili sos eşliğinde.", en: "Quinoa with seasonal greens and walnuts in a pomegranate dressing." }
  },

  // Tatlı / Desserts
  {
    id: "cortexlog", category: "desserts", price: 220, kcal: 540, tags: ["popular", "chef"], img: "/cortexlog.png",
    allergens: ["dairy", "gluten", "nuts"],
    ingredients: [{ n: "Bitter çikolata", a: "80 g" }, { n: "Antep fıstığı", a: "20 g" }, { n: "Krema", a: "40 ml" }],
    name: { tr: "Çikolatalı Fıstık Küp", en: "Chocolate Pistachio Cube" },
    desc: { tr: "Yoğun bitter çikolata ve Antep fıstığıyla, imza tatlımız.", en: "Rich dark chocolate paired with pistachio — our signature dessert." }
  },
  {
    id: "cheesecake", category: "desserts", price: 200, kcal: 450, tags: ["veg"], img: "/cheesecake.png",
    allergens: ["dairy", "gluten"],
    ingredients: [{ n: "Cream cheese", a: "150 g" }, { n: "Frambuaz sos", a: "40 g" }, { n: "Bisküvi taban", a: "60 g" }],
    name: { tr: "Frambuazlı Cheesecake", en: "Raspberry Cheesecake" },
    desc: { tr: "Kadife dokulu cheesecake, taze frambuaz sosuyla.", en: "Velvety cheesecake finished with fresh raspberry sauce." }
  },
  {
    id: "kunefe", category: "desserts", price: 230, kcal: 490, tags: ["popular"], img: "/kunefe.png",
    allergens: ["dairy", "gluten", "nuts"],
    ingredients: [{ n: "Tel kadayıf", a: "120 g" }, { n: "Peynir", a: "80 g" }, { n: "Antep fıstığı", a: "15 g" }, { n: "Şerbet", a: "60 ml" }],
    name: { tr: "Antep Fıstıklı Künefe", en: "Pistachio Künefe" },
    desc: { tr: "Sıcak servis edilen, fıstık serpilmiş klasik künefe.", en: "Served hot and finished with crushed pistachio." }
  },

  // Nargile / Hookah
  {
    id: "elmanane", category: "hookah", price: 350, kcal: 0, tags: ["popular"], img: "/elmanane.png",
    allergens: [],
    ingredients: [{ n: "Elma aromalı tütün", a: "20 g" }, { n: "Taze nane", a: "servis ile" }],
    name: { tr: "Elma Nane Nargile", en: "Apple Mint Hookah" },
    desc: { tr: "Ferahlatıcı elma ve nane karışımı, klasik favorimiz.", en: "A refreshing apple and mint blend — our classic favorite." }
  },
  {
    id: "karpuznane", category: "hookah", price: 350, kcal: 0, tags: ["light"], img: "/karpuznane.png",
    allergens: [],
    ingredients: [{ n: "Karpuz aromalı tütün", a: "20 g" }, { n: "Taze nane", a: "servis ile" }],
    name: { tr: "Karpuz Nane Nargile", en: "Watermelon Mint Hookah" },
    desc: { tr: "Yaz meyveli, hafif ve serinletici bir karışım.", en: "A light, cooling summer-fruit blend." }
  },
  {
    id: "orjinkaris", category: "hookah", price: 420, kcal: 0, tags: ["chef"], img: "/karpuznane.png",
    allergens: [],
    ingredients: [{ n: "Özel meyve karışımı", a: "20 g" }, { n: "Buzlu kap servisi", a: "opsiyonel" }],
    name: { tr: "Orjin Özel Karışım", en: "The Orjin House Blend" },
    desc: { tr: "Şefimizin imzası, mevsime göre değişen özel tütün karışımı.", en: "Our house signature blend, changing with the season." }
  },

  // Kokteyl / Drinks (alkolsüz)
  {
    id: "vespa", category: "drinks", price: 260, kcal: 180, tags: ["popular", "chef"], img: "/cocktail.png",
    allergens: [],
    ingredients: [{ n: "Ananas suyu", a: "80 ml" }, { n: "Nane", a: "5 yaprak" }, { n: "Soda", a: "60 ml" }, { n: "Lime", a: "1/2 adet" }],
    name: { tr: "Vespa", en: "Vespa" },
    desc: { tr: "Ananas, nane ve limla hazırlanan imza alkolsüz kokteylimiz.", en: "Our signature alcohol-free cocktail with pineapple, mint and lime." }
  },
  {
    id: "narekşi", category: "drinks", price: 220, kcal: 140, tags: ["light"], img: "/cocktail.png",
    allergens: [],
    ingredients: [{ n: "Nar ekşisi", a: "30 ml" }, { n: "Elma suyu", a: "80 ml" }, { n: "Soda", a: "60 ml" }],
    name: { tr: "Nar Ekşili Mocktail", en: "Pomegranate Mocktail" },
    desc: { tr: "Ekşi-tatlı dengeyle ferahlatan, nar ekşili soğuk içecek.", en: "A tangy-sweet, refreshing pomegranate cooler." }
  },
  {
    id: "passion", category: "drinks", price: 230, kcal: 150, tags: ["popular"], img: "/cocktail.png",
    allergens: [],
    ingredients: [{ n: "Passion fruit püresi", a: "40 g" }, { n: "Portakal suyu", a: "60 ml" }, { n: "Soda", a: "60 ml" }],
    name: { tr: "Passion Fruit Fizz", en: "Passion Fruit Fizz" },
    desc: { tr: "Passion fruit, portakal ve sodayla hazırlanan canlandırıcı kokteyl.", en: "A vibrant mix of passion fruit, orange and soda." }
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

export default function TheOrjinMenu() {
  const [lang, setLang] = useState("tr");
  const [activeCategory, setActiveCategory] = useState("breakfast");
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
          --ink-900:#0B0A10; --ink-800:#161320; --ink-700:#221C30;
          --gold-100:#E7C77A; --gold-400:#C89B4A; --gold-600:#96702B;
          --violet-400:#9B8AFB; --cream:#F5F0E6; --ink:#0B0A10; --line:rgba(255,255,255,0.08);
          font-family:'Inter',sans-serif;
          min-height:100vh; width:100%; position:relative;
          display:flex; flex-direction:column; align-items:center;
          padding:28px 16px 44px;
          background:
            radial-gradient(ellipse 900px 480px at 50% -10%, rgba(155,138,251,0.14), transparent 60%),
            linear-gradient(180deg,#08070C 0%, #14111C 45%, #1C1626 100%);
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
          background:var(--ink-900); display:flex; flex-direction:column;
        }
        .qrm-notch{ position:absolute; top:6px; left:50%; transform:translateX(-50%); width:104px; height:20px; background:#000; border-radius:14px; z-index:30; }
        .qrm-status{ display:flex; justify-content:space-between; padding:13px 24px 0; font-size:11.5px; font-weight:700; color:rgba(255,255,255,0.8); flex-shrink:0; }
        .qrm-table{
          display:flex; align-items:center; justify-content:center; gap:5px; margin:6px auto 0; width:fit-content;
          font-size:10.5px; font-weight:700; letter-spacing:0.05em; color:var(--ink-900);
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
        .qrm-hsub{ font-size:9.5px; color:rgba(247,242,228,0.5); margin-top:1px; }
        .qrm-legal{
          margin-left:auto; display:flex; align-items:center; gap:5px;
          background:rgba(155,138,251,0.1); border:1px solid rgba(155,138,251,0.32);
          padding:5px 9px; border-radius:999px; font-size:9px; font-weight:700;
          color:var(--violet-400); letter-spacing:0.02em; cursor:pointer; white-space:nowrap;
        }
        .qrm-legaltip{
          position:absolute; top:50px; right:14px; width:206px; z-index:40;
          background:#17131F; border:1px solid rgba(212,175,106,0.3); border-radius:12px;
          padding:11px 12px; font-size:10px; line-height:1.5; color:rgba(247,242,228,0.85);
          box-shadow:0 12px 30px rgba(0,0,0,0.4);
        }
        .qrm-legaltip b{ color:var(--gold-100); display:block; margin-top:6px; font-size:9.5px; }

        .qrm-hero{ position:relative; padding:14px 18px 24px; overflow:hidden; flex-shrink:0;
          background:radial-gradient(120% 100% at 20% 0%, #2E2340 0%, #1C1626 60%, #14111C 100%); }
        .qrm-hero-wave{ position:absolute; left:0; right:0; bottom:-2px; height:32px; }
        .qrm-greet{ display:flex; align-items:center; gap:8px; font-size:20px; font-weight:700; color:var(--cream); position:relative; z-index:2;}
        .qrm-greetsub{ font-size:11px; color:rgba(247,242,228,0.6); margin-top:3px; position:relative; z-index:2;}

        .qrm-ai{
          margin:-12px 16px 0; position:relative; z-index:5;
          background:linear-gradient(135deg,#241B33,#181420);
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
        .qrm-ai-back{ display:flex; align-items:center; gap:4px; font-size:10.5px; font-weight:600; color:var(--violet-400); background:none; border:none; cursor:pointer; margin-bottom:2px; }

        .qrm-btn-gold{
          font-size:11.5px; font-weight:700; color:#231703; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400));
          padding:9px 14px; border-radius:10px; display:flex; align-items:center; gap:6px;
          font-family:'Inter',sans-serif; transition:transform .15s ease;
        }
        .qrm-btn-gold:active{ transform:scale(0.96); }
        .qrm-btn-ghost{
          font-size:11px; font-weight:600; color:var(--violet-400); background:transparent;
          border:1px solid rgba(155,138,251,0.35); padding:8px 11px; border-radius:10px;
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
        .qrm-chip.active{ background:var(--violet-400); border-color:var(--violet-400); color:#1E1730; }

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
          background:linear-gradient(150deg,#241B33,#14111C); border:1px solid rgba(212,175,106,0.18); }
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
          background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#231703;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; }
        .qrm-addbtn.done{ background:var(--violet-400); color:#1E1730; }

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
          background:linear-gradient(135deg,var(--gold-100),var(--gold-600)); color:#231703; font-size:11.5px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 14px 26px rgba(0,0,0,0.4); font-family:'Inter',sans-serif; }

        .qrm-toast{ position:absolute; left:14px; right:14px; bottom:88px; z-index:50; background:#17131F; border:1px solid rgba(155,138,251,0.4); border-radius:13px;
          padding:11px 13px; display:flex; align-items:center; gap:9px; font-size:11px; font-weight:600; color:var(--cream);
          box-shadow:0 14px 30px rgba(0,0,0,0.45); animation:qrmUp .28s ease; }
        @keyframes qrmUp{ from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }

        .qrm-nav{ display:flex; flex-shrink:0; border-top:1px solid var(--line); background:rgba(11,10,16,0.92); padding:9px 6px 12px; }
        .qrm-navitem{ flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; position:relative; color:rgba(247,242,228,0.45); background:none; border:none; font-family:'Inter',sans-serif; }
        .qrm-navitem.active{ color:var(--gold-100); }
        .qrm-navitem span{ font-size:9px; font-weight:700; }
        .qrm-navbadge{ position:absolute; top:-3px; right:22%; background:var(--violet-400); color:#1E1730; font-size:8px; font-weight:800; min-width:14px; height:14px; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:0 3px; }

        .qrm-sheet-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:60; display:flex; align-items:flex-end; }
        .qrm-sheet{ width:100%; max-height:85%; background:var(--ink-800); border-radius:24px 24px 0 0; overflow-y:auto; animation:qrmUp .25s ease; border-top:1px solid rgba(212,175,106,0.28);
          scrollbar-width:thin; scrollbar-color:var(--gold-400) transparent; }
        .qrm-sheet::-webkit-scrollbar{ width:5px; }
        .qrm-sheet::-webkit-scrollbar-thumb{ background:var(--gold-400); border-radius:10px; }
        .qrm-sheet-handle{ width:36px; height:4px; background:rgba(255,255,255,0.2); border-radius:3px; margin:10px auto 4px; }
        .qrm-sheet-head{ display:flex; justify-content:space-between; align-items:center; padding:8px 18px 4px; }
        .qrm-sheet-title{ font-size:18px; font-weight:700; color:var(--cream); }
        .qrm-iconbtn{ background:rgba(255,255,255,0.08); border:none; color:var(--cream); width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; }

        .qrm-detail-tile{ height:140px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:14px 18px 0; overflow:hidden;
          background:linear-gradient(150deg,#241B33,#14111C); border:1px solid rgba(212,175,106,0.2); }
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
        .qrm-confirmbtn{ width:100%; background:linear-gradient(135deg,var(--gold-100),var(--gold-400)); color:#231703; border:none; font-weight:800; font-size:12.5px; padding:13px; border-radius:13px; cursor:pointer; font-family:'Inter',sans-serif; }
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
        <path d="M0,200 L0,140 L40,140 L40,110 L80,110 L80,150 L130,150 L130,90 L150,90 L150,150 L210,150 L210,120 L260,120 L260,160 L320,160 L320,100 L360,100 L360,160 L430,160 L430,80 L460,80 L460,160 L520,160 L520,130 L580,130 L580,170 L640,170 L640,95 L680,95 L680,170 L740,170 L740,115 L800,115 L800,165 L860,165 L860,85 L900,85 L900,165 L970,165 L970,125 L1030,125 L1030,170 L1090,170 L1090,105 L1130,105 L1130,170 L1200,170 L1200,200 Z" fill="#100D18" opacity="0.9" />
      </svg>

      <div className="qrm-topcap">{t.demoTopBanner}</div>
      <div className="qrm-brandrow">
        <img src={LOGO_FULL} alt="The Orjin" className="qrm-brandimg" />
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
              <img src={LOGO_FULL} alt="The Orjin" className="qrm-headlogo" />
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
              <div className="qrm-greet"><Moon size={19} color="var(--gold-100)" /> {t.greeting}</div>
              <div className="qrm-greetsub">{t.greetingSub}</div>
              <svg className="qrm-hero-wave" viewBox="0 0 400 40" preserveAspectRatio="none">
                <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V40 H0 Z" fill="#14111C" opacity="0.6" />
                <path d="M0,28 Q50,10 100,28 T200,28 T300,28 T400,28 V40 H0 Z" fill="#14111C" />
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
                const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Sparkles;
                const justAdded = flashId === item.id;
                return (
                  <div className="qrm-card" key={item.id} onClick={() => openDetail(item)}>
                    <div className="qrm-tile">{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={21} color="#E7C77A" />}</div>
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
                  <div className="qrm-locbtn" style={{ background: "linear-gradient(135deg,var(--gold-100),var(--gold-400))", color: "#231703" }}>
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
                  <ExternalLink size={14} /> @theorjinatakum
                </a>
              </div>
            </div>
          </div>

          <button className="qrm-fab" onClick={callWaiter}>
            <Bell size={13} /> {t.callWaiter}
          </button>

          {waiterToast && (
            <div className="qrm-toast">
              <Bell size={14} color="#9B8AFB" /> {t.waiterCalled}
            </div>
          )}

          <div className="qrm-nav">
            <button className="qrm-navitem active">
              <UtensilsCrossed size={16} /> <span>{t.navMenu}</span>
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
                    : (() => { const Icon = CATEGORIES.find((c) => c.key === selectedItem.category)?.icon || Sparkles; return <Icon size={44} color="#E7C77A" />; })()}
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
                        const Icon = CATEGORIES.find((c) => c.key === item.category)?.icon || Sparkles;
                        return (
                          <div className="qrm-cartrow" key={id}>
                            <div className="qrm-tile" style={{ width: 42, height: 42 }}>{item.img ? <img src={item.img} alt={item.name[lang]} loading="lazy" /> : <Icon size={16} color="#E7C77A" />}</div>
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
        The Orjin için QR Akıllı Menü Sistemi — masaya özel QR, yapay zeka önerisi, alerjen/malzeme bilgisi, çoklu dil ve yasal uyum tek ekranda.
      </div>
    </div>
  );
}

