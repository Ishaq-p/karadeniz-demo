const fs = require("fs");
const path = require("path");

const menuPath = path.join(__dirname, "DEMO-S", "YAKA-LOUNGE", "menu.json");
const data = JSON.parse(fs.readFileSync(menuPath, "utf-8"));

const menu = data.menu;

let categoriesStr = `const CATEGORIES = [\n`;
let itemsStr = `const ITEMS = [\n`;

const iconMap = {
    "KAHVALTILAR": "Coffee",
    "TOSTLAR": "Sandwich",
    "ATIŞTIRMALIKLAR": "ChefHat",
    "MAKARNALAR": "UtensilsCrossed",
    "WRAPLAR": "Wheat",
    "SALATALAR": "Salad",
    "BOWL'LAR": "Sparkles",
    "PİDELER": "Pizza",
    "BURGERLER": "Flame",
    "TAVA YEMEKLER": "Flame",
    "IZGARALAR": "Flame",
    "MANGAL SÖLENİ": "Flame",
    "PİZZALAR": "Pizza",
    "MANTILAR": "UtensilsCrossed",
    "ÇAYLAR": "Coffee",
    "KAHVELER": "Coffee",
    "SICAK İÇECEKLER": "Coffee",
    "AROMALI KAHVELER": "Coffee",
    "TÜRK KAHVELERİ": "Coffee",
    "SOĞUK İÇECEKLER": "Wine",
    "MILK SHAKE": "Milk",
    "BUBBLE TEA": "Wine",
    "DONDURMALAR": "Cake",
    "TATLILAR ve ÇEREZLER": "Cake"
};

let itemId = 1;

for (const catName of Object.keys(menu)) {
    const key = catName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const icon = iconMap[catName] || "Sparkles";
    
    categoriesStr += `  { key: "${key}", icon: ${icon}, label: { tr: "${catName}", en: "${catName}" } },\n`;
    
    for (const item of menu[catName]) {
        const id = `item_${itemId++}`;
        const price = item.price !== null ? item.price : 0;
        const priceStr = item.price !== null ? price : `"${item.price_note}"`;
        
        itemsStr += `  { id: "${id}", category: "${key}", price: ${priceStr}, img: "", name: { tr: "${item.name}", en: "${item.name}" }, desc: { tr: "", en: "" }, allergens: [], tags: [] },\n`;
    }
}

categoriesStr += `];\n`;
itemsStr += `];\n`;

fs.writeFileSync(path.join(__dirname, "yaka_generated.js"), categoriesStr + "\n" + itemsStr);
console.log("Done");
