'use client';
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// --- Data Constants ---
const i18n = {
    en: {
        txtSubbrand: "Maison de Haute Chocolaterie • Paris",
        navBuilder: "Visual Builder",
        navAnalytics: "Cacao Analytics",
        navGifting: "Gifting & Delivery",
        navCatalog: "Sommelier Catalog",
        heroBadge: "Interactive Artisanal Experience Report",
        heroTitle: "Craft Your Bespoke Chocolate Bar with Drag-and-Drop Precision",
        heroDesc: "Welcome to the interactive digital atelier of L'Atelier du Chocolat. Select custom bar shapes (Rectangle, Heart, Disc, Hexagon), drag-and-drop organic toppings directly onto the canvas, explore multi-dimensional cacao flavor chemistry, and arrange personalized gift delivery.",
        stat1: "Direct-Trade Cacao",
        stat2: "Custom Slab Geometry",
        stat3: "Real-time Placement",
        heroCtaMain: "Start Crafting Now",
        heroCtaSecondary: "Explore Flavor Profiles",
        sec1Badge: "VISUAL BUILDER ENGINE",
        sec1Title: "Make Your Own Chocolate Slab",
        sec1Desc: "Select your preferred Grand Cru chocolate base and custom bar geometry. Drag and drop toppings directly onto the canvas to position them with organic precision. Drag toppings around on the slab or off the bar to re-arrange or remove them.",
        step1aTitle: "Select Bar Geometry Shape",
        step1bTitle: "Select Chocolate Base",
        step2Title: "Drag & Drop Artisanal Toppings",
        step3Title: "Packaging & Velvet Box Selection",
        summaryLbl: "Total Custom Bar Price",
        btnAddBag: "Proceed to Gift Note",
        sec2Badge: "CACAO INTELLIGENCE & DATA",
        sec2Title: "Dynamic Flavor Profile & Organoleptic Analysis",
        sec2Desc: "Our organoleptic radar maps the sensory profile of your customized chocolate formulation in real-time. As ingredients are dragged onto the visual builder, bitterness, floral notes, crunchiness, and sweetness recalculate dynamically to ensure harmonious flavor balance.",
        sec3Badge: "PERSONALIZATION & SCHEDULING",
        sec3Title: "Artisanal Gift Messaging & Delivery Calendar",
        sec3Desc: "Every bespoke order includes a hand-pressed gold foil gift card. Write your message below to view a real-time calligraphic preview, then select your precise date for temperature-controlled express delivery.",
        sec4Badge: "SOMMELIER SELECTION",
        sec4Title: "Pre-Designed Signature Recipes & Beverage Pairings",
        sec4Desc: "Looking for inspiration? Filter our master chocolatier signature combinations. Each bar is carefully matched with espresso roasting notes, vintage wines, or single-malt spirits for elevated tasting experiences.",
        dragHint: "Drag toppings from the right panel directly onto the slab"
    },
    fr: {
        txtSubbrand: "Maison de Haute Chocolaterie • Paris",
        navBuilder: "Créateur Visuel",
        navAnalytics: "Analytique Cacao",
        navGifting: "Cadeaux & Livraison",
        navCatalog: "Catalogue Sommelier",
        heroBadge: "Rapport d'Expérience Artisanale Interactive",
        heroTitle: "Créez Votre Tablette de Chocolat par Glisser-Déposer",
        heroDesc: "Bienvenue dans l'atelier numérique de L'Atelier du Chocolat. Choisissez la forme de votre tablette (Rectangle, Cœur, Disque, Hexagone), glissez-déposez vos ingrédients directement sur le canevas et personnalisez votre coffret.",
        stat1: "Cacao Commerce Direct",
        stat2: "Formes Sur Mesure",
        stat3: "Placement en Direct",
        heroCtaMain: "Commencer la Création",
        heroCtaSecondary: "Explorer les Profils",
        sec1Badge: "MOTEUR DE CRÉATION VISUELLE",
        sec1Title: "Composez Votre Propre Tablette",
        sec1Desc: "Sélectionnez votre forme et base Grand Cru. Glissez-déposez nos ingrédients directement sur le chocolat pour les placer avec précision. Déplacez-les à volonté ou faites-les glisser hors de la tablette pour les retirer.",
        step1aTitle: "1a. Choisissez la Forme de la Tablette",
        step1bTitle: "1b. Choisissez la Base de Chocolat",
        step2Title: "2. Glissez-Déposez les Ingrédients",
        step3Title: "3. Coffret & Emballage d'Exception",
        summaryLbl: "Prix Total de la Tablette",
        btnAddBag: "Passer au Message Cadeau",
        sec2Badge: "INTELLIGENCE DU CACAO & DONNÉES",
        sec2Title: "Analyse Organoleptique & Profil d'Arômes",
        sec2Desc: "Notre radar sensoriel cartographie le profil de votre création en temps réel à mesure que vous déposez des ingrédients sur le canevas.",
        sec3Badge: "PERSONNALISATION & PLANIFICATION",
        sec3Title: "Message Personnalisé & Calendrier de Livraison",
        sec3Desc: "Chaque commande inclut une carte dorée à la feuille. Rédigez votre message pour un aperçu calligraphique immédiat.",
        sec4Badge: "SÉLECTION DU SOMMELIER",
        sec4Title: "Recettes Signature & Accords Boissons",
        sec4Desc: "Découvrez nos créations uniques associées aux meilleurs grands crus de café, vins rares et spiritueux.",
        dragHint: "Glissez les ingrédients du panneau droit directement sur la tablette"
    },
    it: {
        txtSubbrand: "Maison de Haute Chocolaterie • Parigi",
        navBuilder: "Creatore Visivo",
        navAnalytics: "Analisi Cacao",
        navGifting: "Regali & Consegna",
        navCatalog: "Catalogo Sommelier",
        heroBadge: "Rapporto d'Esperienza Artigianale Interattiva",
        heroTitle: "Crea la Tua Tavoletta con Trascinamento Diretto",
        heroDesc: "Benvenuti nell'atelier digitale di L'Atelier du Chocolat. Scegli la forma della tavoletta (Rettangolo, Cuore, Disco, Esagono), trascina gli ingredienti direttamente sulla tela e pianifica consegne a temperatura controllata.",
        stat1: "Cacao Commercio Diretto",
        stat2: "Forme Personalizzate",
        stat3: "Posizionamento Live",
        heroCtaMain: "Inizia a Creare",
        heroCtaSecondary: "Esplora i Profili",
        sec1Badge: "MOTORE DI CREAZIONE VISIVA",
        sec1Title: "Crea il Tuo Cioccolato",
        sec1Desc: "Seleziona la forma e la base Grand Cru. Trascina e rilascia gli ingredienti sulla tela per posizionarli a piacere. Spostali o trascinali fuori per rimuoverli.",
        step1aTitle: "1a. Seleziona la Forma della Tavoletta",
        step1bTitle: "1b. Seleziona la Base di Cioccolato",
        step2Title: "2. Trascina e Rilascia gli Ingredienti",
        step3Title: "3. Confezione & Scatola di Velluto",
        summaryLbl: "Prezzo Totale Tavoletta",
        btnAddBag: "Procedi al Messaggio",
        sec2Badge: "INTELLIGENZA CACAO & DATI",
        sec2Title: "Profilo Aromatico & Analisi Organolettica",
        sec2Desc: "Il nostro radar sensoriale mappa il profilo della tua creazione in tempo reale ad ogni ingrediente posizionato sulla tela.",
        sec3Badge: "PERSONALIZZAZIONE & CALENDARIO",
        sec3Title: "Messaggio Regalo & Consegna Programmata",
        sec3Desc: "Ogni ordine include un biglietto stampato in foglia d'oro. Scrivi il tuo messaggio per un'anteprima calligrafica immediata.",
        sec4Badge: "SELEZIONE SOMMELIER",
        sec4Title: "Ricette Signature & Abbinamenti",
        sec4Desc: "Filtra le combinazioni dei nostri maestri cioccolatieri abbinate a caffè pregiati e vini d'annata.",
        dragHint: "Trascina gli ingredienti dal pannello destro direttamente sulla tavoletta"
    }
};

const chocolateShapes = [
    { id: 'rectangle', name: 'Classic Slab', icon: '▭' },
    { id: 'heart', name: 'Artisanal Heart', icon: '♥' },
    { id: 'circle', name: 'Gourmet Disc', icon: '●' },
    { id: 'hexagon', name: 'Geometric Hex', icon: '⬡' }
];

const chocolateBases = [
    { id: 'dark', name: 'Dark 70% Single Origin', origin: 'Ecuador (Esmeraldas)', price: 25.00, weight: 100, cocoaPct: 70, bgGradient: ['#2B1B17', '#1C100D'], gridColor: 'rgba(255,255,255,0.08)', flavor: { bitterness: 85, sweetness: 30, fruity: 60, nutty: 45, crunch: 10, floral: 50 } },
    { id: 'milk', name: 'Creamy Milk 42%', origin: 'Madagascar (Sambirano)', price: 25.00, weight: 100, cocoaPct: 42, bgGradient: ['#5C3A21', '#3D2413'], gridColor: 'rgba(255,255,255,0.12)', flavor: { bitterness: 35, sweetness: 75, fruity: 40, nutty: 60, crunch: 10, floral: 30 } },
    { id: 'white', name: 'Pure Cocoa White 35%', origin: 'Ghana (Ashanti Organic)', price: 24.00, weight: 100, cocoaPct: 35, bgGradient: ['#F4E8C1', '#E3D1A3'], gridColor: 'rgba(0,0,0,0.06)', flavor: { bitterness: 10, sweetness: 90, fruity: 20, nutty: 30, crunch: 10, floral: 40 } },
    { id: 'ruby', name: 'Exotic Ruby 47%', origin: 'Brazil (Bahia Estate)', price: 27.00, weight: 100, cocoaPct: 47, bgGradient: ['#A83B58', '#7D233C'], gridColor: 'rgba(255,255,255,0.15)', flavor: { bitterness: 45, sweetness: 60, fruity: 95, nutty: 20, crunch: 10, floral: 70 } }
];

const availableToppings = [
    { id: 'hazelnut', name: 'Piedmont Hazelnuts', price: 3.50, weight: 15, color: '#C68B59', type: 'sphere', flavorBoost: { nutty: 30, crunch: 35 } },
    { id: 'pistachio', name: 'Bronte Pistachios', price: 4.00, weight: 12, color: '#7BA05B', type: 'chunks', flavorBoost: { nutty: 25, crunch: 25, floral: 10 } },
    { id: 'raspberry', name: 'Freeze-Dried Raspberries', price: 3.00, weight: 8, color: '#D2143A', type: 'dots', flavorBoost: { fruity: 40, sweetness: -5 } },
    { id: 'gold', name: '24K Edible Gold Flakes', price: 6.00, weight: 1, color: '#FFD700', type: 'flakes', flavorBoost: { floral: 15 } },
    { id: 'salt', name: 'Maldon Sea Salt Flakes', price: 2.00, weight: 4, color: '#FFFFFF', type: 'crystals', flavorBoost: { bitterness: 10, sweetness: -10 } },
    { id: 'orange', name: 'Candied Orange Peel', price: 3.00, weight: 14, color: '#FFA500', type: 'strips', flavorBoost: { fruity: 30, sweetness: 15 } }
];

const packagingOptions = [
    { id: 'standard', name: 'Signature Eco Sleeve', price: 0.00 },
    { id: 'velvet', name: 'Velvet Gift Box', price: 5.00 },
    { id: 'wooden', name: 'Handcrafted Wooden Chest', price: 12.00 }
];

const catalogItems = [
    { id: 'cat1', title: 'Ecuadorian Gold Rush', category: 'dark', base: 'Dark 70%', toppings: 'Piedmont Hazelnuts, 24K Gold Flakes, Maldon Salt', price: '$36.50', pairing: 'Espresso Ristretto or 18-Year Single Malt Whiskey', imageColor: 'from-[#2B1B17] to-[#C5A059]' },
    { id: 'cat2', title: 'Berry Velvet Ruby', category: 'fruity', base: 'Exotic Ruby 47%', toppings: 'Freeze-Dried Raspberries, Bronte Pistachios', price: '$34.00', pairing: 'Vintage Rose Champagne or Earl Grey Black Tea', imageColor: 'from-[#A83B58] to-[#7BA05B]' },
    { id: 'cat3', title: 'Piedmont Crunch Milk', category: 'nutty', base: 'Creamy Milk 42%', toppings: 'Piedmont Hazelnuts, Candied Orange Peel', price: '$31.50', pairing: 'Cappuccino or Aged Port Wine (Tawny)', imageColor: 'from-[#5C3A21] to-[#FFA500]' }
];

// --- Main Component ---
export default function LAtelierDuChocolat() {
    const [selectedShapeId, setSelectedShapeId] = useState('rectangle');
    const [selectedBaseId, setSelectedBaseId] = useState('dark');
    const [activeToppings, setActiveToppings] = useState([]);
    const [selectedPackagingId, setSelectedPackagingId] = useState('velvet');

    const [recipientName, setRecipientName] = useState('Madame Claire Laurent');
    const [giftMessage, setGiftMessage] = useState('May this custom chocolate creation bring sweet moments of joy and elegance to your celebration. With love and warmest wishes.');
    const [senderName, setSenderName] = useState('With admiration, Julian');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('afternoon');

    const [currentLang, setCurrentLang] = useState('en');
    const dict = i18n[currentLang];

    const [catalogFilter, setCatalogFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const radarChartRef = useRef(null);
    const barChartRef = useRef(null);
    const doughnutChartRef = useRef(null);
    const canvasDragState = useRef({ isDragging: false, draggedInstanceIndex: -1, offsetX: 0, offsetY: 0 });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 4);
        setDeliveryDate(targetDate.toISOString().split('T')[0]);
    }, []);

    const base = chocolateBases.find(b => b.id === selectedBaseId) || chocolateBases[0];
    const pack = packagingOptions.find(p => p.id === selectedPackagingId) || packagingOptions[0];
    const shape = chocolateShapes.find(s => s.id === selectedShapeId) || chocolateShapes[0];

    let totalPrice = base.price + pack.price;
    let totalWeight = base.weight;
    activeToppings.forEach(t => {
        const info = availableToppings.find(i => i.id === t.id);
        if (info) {
            totalPrice += info.price;
            totalWeight += info.weight;
        }
    });

    // Draw Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const defineShapePath = (ctx, shapeId, width, height) => {
            ctx.beginPath();
            if (shapeId === 'rectangle') {
                const radius = 16;
                const margin = 20;
                ctx.roundRect(margin, margin, width - margin * 2, height - margin * 2, radius);
            } else if (shapeId === 'heart') {
                const cx = width / 2;
                const cy = height / 2 + 10;
                ctx.moveTo(cx, cy + 140);
                ctx.bezierCurveTo(cx - 200, cy + 40, cx - 180, cy - 120, cx, cy - 40);
                ctx.bezierCurveTo(cx + 180, cy - 120, cx + 200, cy + 40, cx, cy + 140);
            } else if (shapeId === 'circle') {
                ctx.arc(width / 2, height / 2, 150, 0, Math.PI * 2);
            } else if (shapeId === 'hexagon') {
                const cx = width / 2;
                const cy = height / 2;
                const r = 160;
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i - Math.PI / 6;
                    const x = cx + r * Math.cos(angle);
                    const y = cy + r * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
            }
        };

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur = 22;
        ctx.shadowOffsetY = 10;

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, base.bgGradient[0]);
        gradient.addColorStop(1, base.bgGradient[1]);
        ctx.fillStyle = gradient;

        defineShapePath(ctx, selectedShapeId, width, height);
        ctx.fill();
        ctx.restore();

        ctx.save();
        defineShapePath(ctx, selectedShapeId, width, height);
        ctx.clip();

        ctx.strokeStyle = base.gridColor;
        ctx.lineWidth = 1.5;

        if (selectedShapeId === 'rectangle') {
            const cols = 3, rows = 5;
            const cellW = (width - 40) / cols;
            const cellH = (height - 40) / rows;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const cx = 20 + c * cellW;
                    const cy = 20 + r * cellH;
                    ctx.strokeRect(cx + 4, cy + 4, cellW - 8, cellH - 8);
                    ctx.fillStyle = base.gridColor;
                    ctx.font = '10px serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText("L'A", cx + cellW / 2, cy + cellH / 2);
                }
            }
        } else if (selectedShapeId === 'heart') {
            ctx.beginPath();
            ctx.arc(width / 2, height / 2 - 10, 80, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = base.gridColor;
            ctx.font = '14px serif';
            ctx.textAlign = 'center';
            ctx.fillText("L'Atelier", width / 2, height / 2 - 10);
        } else if (selectedShapeId === 'circle') {
            for (let r = 30; r <= 130; r += 35) {
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.fillStyle = base.gridColor;
            ctx.font = '12px serif';
            ctx.textAlign = 'center';
            ctx.fillText("L'ATELIER DU CHOCOLAT", width / 2, height / 2);
        } else if (selectedShapeId === 'hexagon') {
            ctx.beginPath();
            ctx.moveTo(width / 2, 50);
            ctx.lineTo(width / 2, height - 50);
            ctx.moveTo(50, height / 2);
            ctx.lineTo(width - 50, height / 2);
            ctx.stroke();
        }

        ctx.restore();

        activeToppings.forEach(t => {
            const info = availableToppings.find(item => item.id === t.id);
            if (!info) return;

            ctx.save();
            ctx.translate(t.x, t.y);

            if (info.type === 'sphere') {
                ctx.shadowColor = 'rgba(0,0,0,0.35)';
                ctx.shadowBlur = 5;
                ctx.fillStyle = info.color;
                ctx.beginPath();
                ctx.arc(0, 0, 11, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#EBD5B3';
                ctx.beginPath();
                ctx.arc(-3, -3, 3, 0, Math.PI * 2);
                ctx.fill();
            } else if (info.type === 'chunks') {
                ctx.shadowColor = 'rgba(0,0,0,0.25)';
                ctx.shadowBlur = 4;
                ctx.fillStyle = info.color;
                ctx.beginPath();
                ctx.ellipse(0, 0, 10, 7, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#4A6B2F';
                ctx.beginPath();
                ctx.arc(2, 1, 3.5, 0, Math.PI * 2);
                ctx.fill();
            } else if (info.type === 'dots') {
                ctx.fillStyle = info.color;
                ctx.beginPath();
                ctx.arc(0, 0, 7, 0, Math.PI * 2);
                ctx.arc(5, 3, 4.5, 0, Math.PI * 2);
                ctx.arc(-4, 2, 3.5, 0, Math.PI * 2);
                ctx.fill();
            } else if (info.type === 'flakes') {
                ctx.fillStyle = info.color;
                ctx.beginPath();
                ctx.moveTo(0, -7);
                ctx.lineTo(5, -2);
                ctx.lineTo(9, 3);
                ctx.lineTo(2, 7);
                ctx.lineTo(-5, 4);
                ctx.closePath();
                ctx.fill();
            } else if (info.type === 'crystals') {
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.strokeStyle = 'rgba(180,180,180,0.6)';
                ctx.lineWidth = 1;
                ctx.fillRect(-5, -5, 10, 10);
                ctx.strokeRect(-5, -5, 10, 10);
            } else if (info.type === 'strips') {
                ctx.fillStyle = info.color;
                ctx.beginPath();
                ctx.roundRect(-12, -4, 24, 8, 4);
                ctx.fill();
            }

            ctx.restore();
        });
    }, [selectedShapeId, selectedBaseId, activeToppings]);

    // Charts
    useEffect(() => {
        if (!radarChartRef.current || !barChartRef.current || !doughnutChartRef.current) return;

        let radarChartInstance = Chart.getChart(radarChartRef.current);
        if (!radarChartInstance) {
            radarChartInstance = new Chart(radarChartRef.current, {
                type: 'radar',
                data: {
                    labels: ['Bitterness', 'Sweetness', 'Fruity Notes', 'Nutty Profile', 'Crunchiness', 'Floral Notes'],
                    datasets: [{
                        label: 'Active Formulation',
                        data: [85, 30, 60, 45, 10, 50],
                        backgroundColor: 'rgba(197, 160, 89, 0.25)',
                        borderColor: '#C5A059',
                        pointBackgroundColor: '#1A1A1A',
                        pointBorderColor: '#FFF',
                        pointHoverBackgroundColor: '#FFF',
                        pointHoverBorderColor: '#C5A059'
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0,0,0,0.08)' },
                            grid: { color: 'rgba(0,0,0,0.08)' },
                            pointLabels: {
                                font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' },
                                color: '#1A1A1A'
                            },
                            ticks: { display: false, max: 100 }
                        }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }

        let barChartInstance = Chart.getChart(barChartRef.current);
        if (!barChartInstance) {
            barChartInstance = new Chart(barChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Dark 70%', 'Milk 42%', 'White 35%', 'Ruby 47%'],
                    datasets: [
                        { label: 'Cocoa Solids %', data: [70, 42, 35, 47], backgroundColor: '#2C1E16' },
                        { label: 'Cocoa Butter %', data: [20, 25, 35, 28], backgroundColor: '#C5A059' },
                        { label: 'Natural Sugars %', data: [10, 33, 30, 25], backgroundColor: '#F4E8C1' }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, max: 100 }
                    },
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } }
                }
            });
        }

        let doughnutChartInstance = Chart.getChart(doughnutChartRef.current);
        if (!doughnutChartInstance) {
            doughnutChartInstance = new Chart(doughnutChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Ecuador (Esmeraldas)', 'Madagascar (Sambirano)', 'Ghana (Ashanti)', 'Peru (Apurímac)'],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: ['#2C1E16', '#C5A059', '#7BA05B', '#A83B58'],
                        borderWidth: 2,
                        borderColor: '#FAF9F6'
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } }
                }
            });
        }

        let scores = { ...base.flavor };
        activeToppings.forEach(t => {
            const info = availableToppings.find(i => i.id === t.id);
            if (info && info.flavorBoost) {
                Object.keys(info.flavorBoost).forEach(key => {
                    scores[key] = Math.min(100, Math.max(0, (scores[key] || 0) + info.flavorBoost[key]));
                });
            }
        });
        radarChartInstance.data.datasets[0].data = [
            scores.bitterness, scores.sweetness, scores.fruity, scores.nutty, scores.crunch, scores.floral
        ];
        radarChartInstance.update();

    }, [base, activeToppings]);

    const handleToppingDragStart = (e, toppingId) => {
        e.dataTransfer.setData('text/plain', toppingId);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        wrapperRef.current?.classList.add('drag-over');
    };

    const handleDragLeave = () => {
        wrapperRef.current?.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        wrapperRef.current?.classList.remove('drag-over');
        const toppingId = e.dataTransfer.getData('text/plain');
        if (!toppingId) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const dropX = e.clientX - rect.left;
        const dropY = e.clientY - rect.top;

        if (activeToppings.length >= 24) {
            alert("Maximum topping capacity reached on slab!");
            return;
        }

        setActiveToppings(prev => [...prev, {
            instanceId: Date.now() + Math.random(),
            id: toppingId,
            x: Math.max(30, Math.min(310, dropX)),
            y: Math.max(30, Math.min(390, dropY))
        }]);
    };

    const handleCanvasPointerDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX || e.touches?.[0].clientX) - rect.left;
        const mouseY = (e.clientY || e.touches?.[0].clientY) - rect.top;

        for (let i = activeToppings.length - 1; i >= 0; i--) {
            const item = activeToppings[i];
            const dist = Math.hypot(item.x - mouseX, item.y - mouseY);
            if (dist < 20) {
                canvasDragState.current = {
                    isDragging: true,
                    draggedInstanceIndex: i,
                    offsetX: mouseX - item.x,
                    offsetY: mouseY - item.y
                };
                return;
            }
        }
    };

    const handleCanvasPointerMove = (e) => {
        if (!canvasDragState.current.isDragging || canvasDragState.current.draggedInstanceIndex === -1) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX || e.touches?.[0].clientX) - rect.left;
        const mouseY = (e.clientY || e.touches?.[0].clientY) - rect.top;

        setActiveToppings(prev => {
            const newToppings = [...prev];
            const idx = canvasDragState.current.draggedInstanceIndex;
            if (newToppings[idx]) {
                newToppings[idx].x = mouseX - canvasDragState.current.offsetX;
                newToppings[idx].y = mouseY - canvasDragState.current.offsetY;
            }
            return newToppings;
        });
    };

    const handleCanvasPointerUp = () => {
        if (canvasDragState.current.isDragging) {
            canvasDragState.current.isDragging = false;
            canvasDragState.current.draggedInstanceIndex = -1;
        }
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleCanvasPointerUp);
        window.addEventListener('touchend', handleCanvasPointerUp);
        return () => {
            window.removeEventListener('mouseup', handleCanvasPointerUp);
            window.removeEventListener('touchend', handleCanvasPointerUp);
        };
    }, []);

    const addToppingAuto = (id) => {
        if (activeToppings.length >= 24) {
            alert("Maximum topping density reached on slab!");
            return;
        }
        const x = 120 + Math.random() * 100;
        const y = 140 + Math.random() * 140;
        setActiveToppings(prev => [...prev, { instanceId: Date.now() + Math.random(), id, x, y }]);
    };

    const removeTopping = (id) => {
        setActiveToppings(prev => {
            const index = prev.findIndex(item => item.id === id);
            if (index !== -1) {
                const newToppings = [...prev];
                newToppings.splice(index, 1);
                return newToppings;
            }
            return prev;
        });
    };

    const resetSlab = () => setActiveToppings([]);

    const randomizeToppings = () => {
        const ids = availableToppings.map(t => t.id);
        const count = 8 + Math.floor(Math.random() * 6);
        const newToppings = [];
        for (let i = 0; i < count; i++) {
            const randomId = ids[Math.floor(Math.random() * ids.length)];
            const x = 120 + Math.random() * 100;
            const y = 140 + Math.random() * 140;
            newToppings.push({ instanceId: Date.now() + Math.random(), id: randomId, x, y });
        }
        setActiveToppings(newToppings);
    };

    const loadSignatureRecipe = (id) => {
        if (id === 'cat1') {
            setSelectedShapeId('rectangle');
            setSelectedBaseId('dark');
            setActiveToppings([]);
            addToppingAuto('hazelnut');
            addToppingAuto('gold');
            addToppingAuto('salt');
        } else if (id === 'cat2') {
            setSelectedShapeId('heart');
            setSelectedBaseId('ruby');
            setActiveToppings([]);
            addToppingAuto('raspberry');
            addToppingAuto('pistachio');
        } else if (id === 'cat3') {
            setSelectedShapeId('circle');
            setSelectedBaseId('milk');
            setActiveToppings([]);
            addToppingAuto('hazelnut');
            addToppingAuto('orange');
        }
        document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
    };

    const filteredCatalog = catalogItems.filter(i =>
        (catalogFilter === 'all' || i.category === catalogFilter) &&
        (i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.toppings.toLowerCase().includes(searchQuery.toLowerCase()) || i.pairing.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const exportJSONSpec = () => {
        const spec = {
            brand: "L'Atelier du Chocolat",
            timestamp: new Date().toISOString(),
            shape,
            base,
            toppings: activeToppings.map(t => ({
                ...availableToppings.find(i => i.id === t.id),
                coordinates: { x: Math.round(t.x), y: Math.round(t.y) }
            })),
            packaging: pack,
            giftCard: {
                recipient: recipientName,
                message: giftMessage,
                sender: senderName
            },
            delivery: {
                date: deliveryDate,
                timeSlot: deliveryTimeSlot
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(spec, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `Latelier_Chocolat_Spec_${Date.now()}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[white] text-[#1A1A1A] font-sans" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', overflowX: 'hidden' }}>
            {/* Top Announcement Bar */}
            <div className="bg-[#2C1E16] text-[#FAF9F6] text-xs text-center py-2 px-4 tracking-widest uppercase flex justify-between items-center md:px-8">
                <span>✦ Artisanal Craftsmanship & Direct-Trade Cacao ✦</span>
                <span className="hidden md:inline">Complimentary Luxury Gift Packaging & Scheduled Delivery</span>
                <span>Free Worldwide Cold-Chain Express on Orders $85+</span>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EAEAEA] transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
                        <div className="w-10 h-10 rounded-full bg-[#2C1E16] text-[#C5A059] flex items-center justify-center font-serif text-xl font-bold border border-[#C5A059]/30">L</div>
                        <div>
                            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A]">L'Atelier du Chocolat</h1>
                            <p className="text-[10px] tracking-widest uppercase text-[#C5A059] font-medium">{dict.txtSubbrand}</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#1A1A1A]/80">
                        <button onClick={() => scrollToSection('builder')} className="hover:text-[#C5A059] transition-colors">{dict.navBuilder}</button>
                        <button onClick={() => scrollToSection('analytics')} className="hover:text-[#C5A059] transition-colors">{dict.navAnalytics}</button>
                        <button onClick={() => scrollToSection('gifting')} className="hover:text-[#C5A059] transition-colors">{dict.navGifting}</button>
                        <button onClick={() => scrollToSection('catalog')} className="hover:text-[#C5A059] transition-colors">{dict.navCatalog}</button>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="inline-flex rounded-full border border-[#EAEAEA] p-1 bg-white text-xs font-semibold">
                            {['en', 'fr', 'it'].map(lang => (
                                <button key={lang} onClick={() => setCurrentLang(lang)} className={`px-2.5 py-1 rounded-full transition-all ${currentLang === lang ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'}`}>
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-[#2C1E16] transition-all shadow-sm">
                            <span>🛒</span>
                            <span>Bag</span>
                            <span className="bg-[#C5A059] text-[#1A1A1A] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px]">{activeToppings.length}</span>
                            <span className="font-semibold text-[#F4E8C1] ml-1">${totalPrice.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section id="hero" className="py-12 md:py-16 bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] border-b border-[#EAEAEA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F4E8C1]/40 border border-[#C5A059]/30 text-xs font-semibold text-[#2C1E16]">
                                    <span>✦</span>
                                    <span>{dict.heroBadge}</span>
                                </div>
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">{dict.heroTitle}</h2>
                                <p className="text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed max-w-2xl">{dict.heroDesc}</p>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EAEAEA]">
                                    <div><p className="text-2xl md:text-3xl font-serif font-bold text-[#2C1E16]">100%</p><p className="text-xs text-[#1A1A1A]/60 uppercase tracking-wider font-semibold">{dict.stat1}</p></div>
                                    <div><p className="text-2xl md:text-3xl font-serif font-bold text-[#2C1E16]">4 Shapes</p><p className="text-xs text-[#1A1A1A]/60 uppercase tracking-wider font-semibold">{dict.stat2}</p></div>
                                    <div><p className="text-2xl md:text-3xl font-serif font-bold text-[#2C1E16]">Drag&Drop</p><p className="text-xs text-[#1A1A1A]/60 uppercase tracking-wider font-semibold">{dict.stat3}</p></div>
                                </div>
                                <div className="pt-2 flex flex-wrap gap-4">
                                    <button onClick={() => scrollToSection('builder')} className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#2C1E16] transition-all shadow-md flex items-center space-x-2">
                                        <span>{dict.heroCtaMain}</span><span>↓</span>
                                    </button>
                                    <button onClick={() => scrollToSection('analytics')} className="border border-[#1A1A1A]/20 text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#1A1A1A] hover:text-white transition-all">
                                        <span>{dict.heroCtaSecondary}</span>
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex justify-center">
                                <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-xl w-full max-w-md relative overflow-hidden">
                                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#F4E8C1]/30 rounded-full blur-2xl"></div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">Atelier Spotlight</span>
                                        <span className="text-xs bg-[#FAF9F6] px-2.5 py-1 rounded-full border border-[#EAEAEA] font-medium text-[#2C1E16]">Grand Cru Grand Noir</span>
                                    </div>
                                    <div className="h-48 rounded-xl bg-gradient-to-br from-[#2B1B17] via-[#3E241B] to-[#1A0E0B] p-4 text-white flex flex-col justify-between relative shadow-inner">
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs tracking-widest font-serif text-[#C5A059] font-bold">L'ATELIER DU CHOCOLAT</span>
                                            <span className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded border border-white/10">70% CACAO</span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-serif italic text-[#F4E8C1]">"Ecuadorian Single Origin with Drag & Drop Gold Flakes"</p>
                                            <p className="text-[11px] text-white/70">Master Chocolatier Selection • Batch #409</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-[#EAEAEA] flex justify-between items-center text-xs text-[#1A1A1A]/70">
                                        <span>Estimated Crafting Time: <strong>24 Hours</strong></span>
                                        <span className="text-[#C5A059] font-bold">✦ Certified Organic</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 1: Visual Chocolate Builder */}
                <section id="builder" className="py-12 md:py-16 bg-[#FAF9F6]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mb-10">
                            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2">
                                <span>SECTION 01</span><span>•</span><span>{dict.sec1Badge}</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">{dict.sec1Title}</h2>
                            <p className="text-[#1A1A1A]/70 mt-3 text-sm md:text-base leading-relaxed">{dict.sec1Desc}</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Column Canvas */}
                            <div className="lg:col-span-6 lg:sticky lg:top-28">
                                <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-md space-y-4">
                                    <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-3">
                                        <div>
                                            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Visual Canvas Preview</h3>
                                            <p className="text-xs text-[#1A1A1A]/60">Drag toppings onto slab or move them around directly</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={resetSlab} className="text-xs px-3 py-1.5 rounded-full border border-[#EAEAEA] hover:bg-[#FAF9F6] text-[#1A1A1A]/70 transition-all">↺ Reset</button>
                                            <button onClick={randomizeToppings} className="text-xs px-3 py-1.5 rounded-full bg-[#F4E8C1]/50 border border-[#C5A059]/30 text-[#2C1E16] font-medium hover:bg-[#F4E8C1] transition-all">✨ Chef's Scatter</button>
                                        </div>
                                    </div>
                                    <div
                                        ref={wrapperRef}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className="relative w-full flex justify-center items-center py-4 bg-[#FAF9F6]/50 rounded-xl border border-dashed border-[#EAEAEA] min-h-[400px] transition-all"
                                    >
                                        <canvas
                                            ref={canvasRef}
                                            width="340" height="420"
                                            onMouseDown={handleCanvasPointerDown}
                                            onMouseMove={handleCanvasPointerMove}
                                            onTouchStart={handleCanvasPointerDown}
                                            onTouchMove={handleCanvasPointerMove}
                                            className="rounded-lg cursor-crosshair bg-white shadow-[0_20px_40px_-15px_rgba(44,30,22,0.08)] border border-[#EAEAEA] transition-transform"
                                        />
                                        <div className="absolute bottom-6 bg-[#1A1A1A]/85 text-[#F4E8C1] text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md pointer-events-none transition-opacity">
                                            🎯 <span>{dict.dragHint}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                                        <div className="p-2 bg-[#FAF9F6] rounded-lg border border-[#EAEAEA]">
                                            <span className="block text-[#1A1A1A]/60 text-[10px] uppercase font-semibold">Est. Weight</span>
                                            <span className="font-serif text-sm font-bold text-[#2C1E16]">{totalWeight}g</span>
                                        </div>
                                        <div className="p-2 bg-[#FAF9F6] rounded-lg border border-[#EAEAEA]">
                                            <span className="block text-[#1A1A1A]/60 text-[10px] uppercase font-semibold">Cocoa Content</span>
                                            <span className="font-serif text-sm font-bold text-[#2C1E16]">{base.cocoaPct}%</span>
                                        </div>
                                        <div className="p-2 bg-[#FAF9F6] rounded-lg border border-[#EAEAEA]">
                                            <span className="block text-[#1A1A1A]/60 text-[10px] uppercase font-semibold">Toppings</span>
                                            <span className="font-serif text-sm font-bold text-[#2C1E16]">{activeToppings.length} Items</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column Wizard */}
                            <div className="lg:col-span-6 space-y-6">
                                <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-sm space-y-5">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center space-x-2">
                                                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[11px] flex items-center justify-center font-sans">1a</span>
                                                <span>{dict.step1aTitle}</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {chocolateShapes.map(s => (
                                                <button key={s.id} onClick={() => setSelectedShapeId(s.id)} className={`p-2 rounded-xl border text-center transition-all ${s.id === selectedShapeId ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm font-bold' : 'border-[#EAEAEA] bg-white hover:border-[#1A1A1A]/40 text-[#1A1A1A]'}`}>
                                                    <span className="text-base block">{s.icon}</span>
                                                    <span className="text-[11px] block mt-0.5">{s.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-[#EAEAEA]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center space-x-2">
                                                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[11px] flex items-center justify-center font-sans">1b</span>
                                                <span>{dict.step1bTitle}</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {chocolateBases.map(b => (
                                                <div key={b.id} onClick={() => setSelectedBaseId(b.id)} className={`p-3.5 rounded-xl border cursor-pointer transition-all ${b.id === selectedBaseId ? 'border-[#1A1A1A] bg-[#FAF9F6] shadow-sm' : 'border-[#EAEAEA] hover:border-[#1A1A1A]/40'}`}>
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-serif font-bold text-xs text-[#1A1A1A]">{b.name}</span>
                                                        <span className="text-xs font-bold text-[#2C1E16]">${b.price.toFixed(2)}</span>
                                                    </div>
                                                    <p className="text-[10px] text-[#1A1A1A]/60 mt-1">{b.origin}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-sm space-y-4">
                                    <h3 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center space-x-2">
                                        <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-sans">2</span>
                                        <span>{dict.step2Title}</span>
                                    </h3>
                                    <p className="text-xs text-[#1A1A1A]/70">✋ <strong>Drag any ingredient badge below</strong> directly onto the chocolate bar image, or click <strong>+</strong> to auto-place.</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {availableToppings.map(t => {
                                            const count = activeToppings.filter(item => item.id === t.id).length;
                                            return (
                                                <div key={t.id} className="p-3 rounded-xl border border-[#EAEAEA] bg-white flex justify-between items-center hover:-translate-y-0.5 hover:shadow-md transition-all cursor-grab active:cursor-grabbing" draggable onDragStart={(e) => handleToppingDragStart(e, t.id)}>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs cursor-grab">⋮⋮</span>
                                                        <div>
                                                            <p className="font-semibold text-xs text-[#1A1A1A]">{t.name}</p>
                                                            <p className="text-[10px] text-[#C5A059] font-bold">+${t.price.toFixed(2)} ({t.weight}g)</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <button onClick={() => removeTopping(t.id)} className="w-6 h-6 rounded-full border border-[#EAEAEA] flex items-center justify-center text-xs text-[#1A1A1A]/70 hover:bg-[#FAF9F6]" disabled={count === 0} style={{ opacity: count === 0 ? 0.3 : 1 }}>-</button>
                                                        <span className="text-xs font-bold text-[#2C1E16] w-4 text-center">{count}</span>
                                                        <button onClick={() => addToppingAuto(t.id)} className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold hover:bg-[#2C1E16]">+</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-sm space-y-4">
                                    <h3 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center space-x-2">
                                        <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-sans">3</span>
                                        <span>{dict.step3Title}</span>
                                    </h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {packagingOptions.map(p => (
                                            <div key={p.id} onClick={() => setSelectedPackagingId(p.id)} className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${p.id === selectedPackagingId ? 'border-[#C5A059] bg-[#F4E8C1]/20 font-bold' : 'border-[#EAEAEA] hover:border-[#C5A059]/40'}`}>
                                                <p className="text-xs text-[#1A1A1A]">{p.name}</p>
                                                <p className="text-[10px] text-[#2C1E16] mt-0.5">{p.price === 0 ? 'Included' : '+$' + p.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#1A1A1A] text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                                    <div>
                                        <span className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider block">{dict.summaryLbl}</span>
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-3xl font-serif font-bold text-white">${totalPrice.toFixed(2)}</span>
                                            <span className="text-xs text-white/60">Tax & Gift Box Included</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-[#C5A059] text-[#1A1A1A] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-[#F4E8C1] transition-all shadow-md flex items-center justify-center space-x-2 hover:scale-105">
                                        <span>{dict.btnAddBag}</span><span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Analytics */}
                <section id="analytics" className="py-12 md:py-16 bg-white border-y border-[#EAEAEA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mb-12">
                            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2">
                                <span>SECTION 02</span><span>•</span><span>{dict.sec2Badge}</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">{dict.sec2Title}</h2>
                            <p className="text-[#1A1A1A]/70 mt-3 text-sm md:text-base leading-relaxed">{dict.sec2Desc}</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-6 bg-[#FAF9F6] p-6 rounded-2xl border border-[#EAEAEA] shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Organoleptic Sensory Matrix</h3>
                                    </div>
                                </div>
                                <div className="relative w-full max-w-[600px] mx-auto h-[320px] md:h-[350px]">
                                    <canvas ref={radarChartRef} />
                                </div>
                            </div>
                            <div className="lg:col-span-6 bg-[#FAF9F6] p-6 rounded-2xl border border-[#EAEAEA] shadow-sm space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Base Cocoa Comparative Metrics</h3>
                                    </div>
                                    <div className="relative w-full max-w-[600px] mx-auto h-[320px] md:h-[350px] mt-4">
                                        <canvas ref={barChartRef} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 bg-[#FAF9F6] p-6 rounded-2xl border border-[#EAEAEA] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-5 space-y-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">Direct-Trade Origins</span>
                                <h3 className="font-serif font-bold text-2xl text-[#1A1A1A]">Sustainable Fair-Trade Cocoa Sourcing</h3>
                                <p className="text-xs md:text-sm text-[#1A1A1A]/70 leading-relaxed">
                                    We partner directly with smallholder farming cooperatives across Ecuador, Madagascar, Ghana, and Peru.
                                </p>
                            </div>
                            <div className="md:col-span-7 flex justify-center">
                                <div className="relative w-full max-w-[600px] mx-auto h-[260px]">
                                    <canvas ref={doughnutChartRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Gifting */}
                <section id="gifting" className="py-12 md:py-16 bg-[#FAF9F6] border-b border-[#EAEAEA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mb-10">
                            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2">
                                <span>SECTION 03</span><span>•</span><span>{dict.sec3Badge}</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">{dict.sec3Title}</h2>
                            <p className="text-[#1A1A1A]/70 mt-3 text-sm md:text-base leading-relaxed">{dict.sec3Desc}</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-sm space-y-5">
                                <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">Compose Personalized Gift Note</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1">Recipient Name</label>
                                    <input type="text" value={recipientName} onChange={e => setRecipientName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#EAEAEA] text-sm focus:outline-none focus:border-[#C5A059]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1">Custom Message</label>
                                    <textarea rows="4" maxLength={200} value={giftMessage} onChange={e => setGiftMessage(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#EAEAEA] text-sm focus:outline-none focus:border-[#C5A059] resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1">Sender Signature</label>
                                    <input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#EAEAEA] text-sm focus:outline-none focus:border-[#C5A059]" />
                                </div>
                                <div className="pt-4 border-t border-[#EAEAEA] space-y-3">
                                    <h4 className="font-serif font-bold text-base text-[#1A1A1A]">Select Express Dispatch Date</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-semibold text-[#1A1A1A]/70 mb-1">Preferred Delivery Date</label>
                                            <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAEAEA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A059]" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-[#1A1A1A]/70 mb-1">Delivery Time Slot</label>
                                            <select value={deliveryTimeSlot} onChange={e => setDeliveryTimeSlot(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EAEAEA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A059]">
                                                <option value="morning">Morning (09:00 - 12:00)</option>
                                                <option value="afternoon">Afternoon (13:00 - 17:00)</option>
                                                <option value="evening">Evening Express (18:00 - 21:00)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-[#C5A059]/40 shadow-lg relative min-h-[360px] flex flex-col justify-between" style={{ backgroundImage: 'radial-gradient(#F4E8C1 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}>
                                <div className="flex justify-between items-center border-b border-[#C5A059]/20 pb-4">
                                    <span className="font-serif font-bold text-[#C5A059] tracking-widest text-xs uppercase">L'ATELIER DU CHOCOLAT • PARIS</span>
                                    <span className="text-[10px] text-[#2C1E16]/60 font-mono tracking-widest uppercase">HAND-LETTERED CARD</span>
                                </div>
                                <div className="my-6 space-y-4">
                                    <p className="text-sm font-semibold text-[#2C1E16] italic">To: {recipientName || 'Dear Guest'}</p>
                                    <p className="font-handwriting text-2xl md:text-3xl text-[#1A1A1A] leading-relaxed px-2" style={{ fontFamily: '"Alex Brush", cursive' }}>
                                        "{giftMessage || 'Warmest wishes.'}"
                                    </p>
                                    <p className="text-right text-xs font-serif font-bold text-[#2C1E16] italic">{senderName || 'Warm regards'}</p>
                                </div>
                                <div className="border-t border-[#C5A059]/20 pt-3 flex justify-between items-center text-[11px] text-[#1A1A1A]/60">
                                    <span>Embossed Gold Foil Envelope</span>
                                    <span>Scheduled: {deliveryDate || 'Standard'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Catalog */}
                <section id="catalog" className="py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mb-10">
                            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2">
                                <span>SECTION 04</span><span>•</span><span>{dict.sec4Badge}</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">{dict.sec4Title}</h2>
                            <p className="text-[#1A1A1A]/70 mt-3 text-sm md:text-base leading-relaxed">{dict.sec4Desc}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAEAEA]">
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => setCatalogFilter('all')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${catalogFilter === 'all' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#EAEAEA]'}`}>All Collections</button>
                                <button onClick={() => setCatalogFilter('dark')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${catalogFilter === 'dark' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#EAEAEA]'}`}>Dark Cacao</button>
                                <button onClick={() => setCatalogFilter('fruity')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${catalogFilter === 'fruity' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#EAEAEA]'}`}>Fruity & Floral</button>
                                <button onClick={() => setCatalogFilter('nutty')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${catalogFilter === 'nutty' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#EAEAEA]'}`}>Nuts & Crunch</button>
                            </div>
                            <div className="relative w-full sm:w-64">
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search flavor, wine pairing..." className="w-full px-3.5 py-1.5 pl-8 rounded-full border border-[#EAEAEA] text-xs focus:outline-none focus:border-[#C5A059]" />
                                <span className="absolute left-3 top-2 text-xs text-[#1A1A1A]/40">🔍</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCatalog.map(item => (
                                <div key={item.id} className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#EAEAEA] shadow-sm space-y-4 hover:border-[#C5A059]/50 transition-all flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className={`h-28 rounded-xl bg-gradient-to-r ${item.imageColor} p-4 text-white flex flex-col justify-between shadow-inner`}>
                                            <span className="text-[10px] font-mono uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded w-max">{item.base}</span>
                                            <p className="font-serif font-bold text-lg">{item.title}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#1A1A1A]">Toppings Composition:</p>
                                            <p className="text-xs text-[#1A1A1A]/70">{item.toppings}</p>
                                        </div>
                                        <div className="pt-2 border-t border-[#EAEAEA]">
                                            <p className="text-[11px] font-bold text-[#2C1E16]">🍷 Recommended Sommelier Pairing:</p>
                                            <p className="text-[11px] text-[#1A1A1A]/70 italic">{item.pairing}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="font-serif font-bold text-base text-[#1A1A1A]">{item.price}</span>
                                        <button onClick={() => loadSignatureRecipe(item.id)} className="text-xs bg-[#1A1A1A] text-white px-3.5 py-1.5 rounded-full hover:bg-[#2C1E16] transition-all">Quick Load Recipe</button>
                                    </div>
                                </div>
                            ))}
                            {filteredCatalog.length === 0 && <p className="col-span-3 text-center py-8 text-xs text-[#1A1A1A]/60">No recipes matched your query.</p>}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#2C1E16] text-[#FAF9F6] border-t border-[#C5A059]/20 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
                        <div className="md:col-span-5 space-y-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#1A1A1A] flex items-center justify-center font-serif font-bold">L</div>
                                <span className="font-serif text-xl font-bold tracking-tight text-white">L'Atelier du Chocolat</span>
                            </div>
                            <p className="text-xs text-[#FAF9F6]/70 leading-relaxed max-w-sm">Parem Academy Demonstration Application. Crafting high-end bespoke interactive visual ecommerce experiences for luxury brands worldwide.</p>
                        </div>
                        <div className="md:col-span-3 space-y-2 text-xs">
                            <p className="font-bold text-[#C5A059] uppercase tracking-widest">Atelier Locations</p>
                            <p className="text-[#FAF9F6]/80">Paris: 24 Rue Saint-Honoré</p>
                            <p className="text-[#FAF9F6]/80">Lyon: 12 Place Bellecour</p>
                            <p className="text-[#FAF9F6]/80">Milan: Via Montenapoleone 8</p>
                        </div>
                        <div className="md:col-span-4 space-y-2 text-xs">
                            <p className="font-bold text-[#C5A059] uppercase tracking-widest">Crafting Guarantee</p>
                            <p className="text-[#FAF9F6]/80">✦ Freshly poured within 24h of dispatch</p>
                            <p className="text-[#FAF9F6]/80">✦ Insulated temperature-controlled packaging</p>
                            <p className="text-[#FAF9F6]/80">✦ 100% Organic Direct-Trade Cocoa</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#FAF9F6]/50 space-y-2 sm:space-y-0">
                        <p>© 2026 L'Atelier du Chocolat • Demo Built by Parem Academy</p>
                        <div className="flex space-x-4">
                            <span>Privacy Policy</span><span>•</span><span>Terms of Crafting</span><span>•</span><span>Quality Certificate</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-[#EAEAEA] flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="font-serif font-bold text-2xl text-[#1A1A1A]">Checkout & Specification</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] text-xl">×</button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-3">Custom Chocolate Specification</h4>
                                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA] space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[#1A1A1A]/70">Base & Shape</span><span className="font-bold text-[#1A1A1A]">{base.name} • {shape.name}</span></div>
                                    <div className="flex justify-between"><span className="text-[#1A1A1A]/70">Net Weight</span><span className="font-bold text-[#1A1A1A]">{totalWeight}g</span></div>
                                    <div className="flex justify-between"><span className="text-[#1A1A1A]/70">Packaging</span><span className="font-bold text-[#1A1A1A]">{pack.name}</span></div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-3">Artisanal Toppings</h4>
                                <div className="space-y-2 text-sm">
                                    {activeToppings.length === 0 && <p className="text-[#1A1A1A]/50 italic">No extra toppings added.</p>}
                                    {activeToppings.map((t, idx) => {
                                        const info = availableToppings.find(i => i.id === t.id);
                                        return info ? <div key={idx} className="flex justify-between text-[#1A1A1A]"><span>✦ {info.name}</span><span className="font-semibold">+${info.price.toFixed(2)}</span></div> : null;
                                    })}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-3">Delivery & Gifting</h4>
                                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAEAEA] space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[#1A1A1A]/70">Schedule</span><span className="font-bold text-[#1A1A1A] text-right">{deliveryDate} ({deliveryTimeSlot})</span></div>
                                    <div className="flex justify-between items-start mt-2 pt-2 border-t border-[#EAEAEA]"><span className="text-[#1A1A1A]/70">Message</span><span className="font-serif italic text-[#1A1A1A] text-right w-2/3">"{giftMessage}"</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-[#FAF9F6] border-t border-[#EAEAEA] rounded-b-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Grand Total</span>
                                <span className="font-serif text-3xl font-bold text-[#2C1E16]">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={exportJSONSpec} className="flex-1 py-3.5 rounded-xl border border-[#1A1A1A] text-[#1A1A1A] font-bold text-sm hover:bg-[#1A1A1A] hover:text-white transition-all">Download JSON Spec</button>
                                <button onClick={() => { alert("✦ Order Confirmed! Your bespoke chocolate bar specification has been dispatched to master chocolatiers in Paris."); setIsModalOpen(false); resetSlab(); }} className="flex-1 py-3.5 rounded-xl bg-[#C5A059] text-[#1A1A1A] font-bold text-sm hover:bg-[#F4E8C1] transition-all shadow-md">Confirm Masterpiece</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
