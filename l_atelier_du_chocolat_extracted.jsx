==== HEADER JSX ====

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" >
                <div className="w-10 h-10 rounded-full bg-cocoa text-gold flex items-center justify-center font-serif text-xl font-bold border border-gold/30">
                    L
                </div>
                <div>
                    <h1 className="serif-font text-xl md:text-2xl font-bold tracking-tight text-charcoal">L'Atelier du Chocolat</h1>
                    <p className="text-[10px] tracking-widest uppercase text-gold font-medium" id="txt-subbrand">Maison de Haute Chocolaterie • Paris</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-charcoal/80">
                <button  className="hover:text-gold transition-colors" id="nav-builder">Visual Builder</button>
                <button  className="hover:text-gold transition-colors" id="nav-analytics">Cacao Analytics</button>
                <button  className="hover:text-gold transition-colors" id="nav-gifting">Gifting & Delivery</button>
                <button  className="hover:text-gold transition-colors" id="nav-catalog">Sommelier Catalog</button>
            </nav>

            {/* Language Switcher & Quick Basket Summary */}
            <div className="flex items-center space-x-4">
                
                {/* Multilingual Switcher */}
                <div className="inline-flex rounded-full border border-bordercolor p-1 bg-white text-xs font-semibold">
                    <button  id="btn-lang-en" className="px-2.5 py-1 rounded-full bg-charcoal text-white transition-all">EN</button>
                    <button  id="btn-lang-fr" className="px-2.5 py-1 rounded-full text-charcoal/70 hover:text-charcoal transition-all">FR</button>
                    <button  id="btn-lang-it" className="px-2.5 py-1 rounded-full text-charcoal/70 hover:text-charcoal transition-all">IT</button>
                </div>

                {/* Shopping Bag Quick CTA */}
                <button  className="flex items-center space-x-2 bg-charcoal text-white px-4 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-cocoa transition-all shadow-sm">
                    <span>🛒</span>
                    <span id="txt-bag-label">Bag</span>
                    <span id="bag-count" className="bg-gold text-charcoal rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px]">0</span>
                    <span id="bag-total" className="font-semibold text-gold-light ml-1">$25.00</span>
                </button>

            </div>
        </div>
    
==== MAIN JSX ====


        {/* HERO SECTION & INTRODUCTORY REPORT */}
        <section id="hero" className="py-12 md:py-16 bg-gradient-to-b from-ivory via-white to-ivory border-b border-bordercolor">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-light/40 border border-gold/30 text-xs font-semibold text-cocoa">
                            <span>✦</span>
                            <span id="hero-badge">Interactive Artisanal Experience Report</span>
                        </div>
                        <h2 className="serif-font text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-tight" id="hero-title">
                            Craft Your Bespoke Chocolate Bar with Drag-and-Drop Precision
                        </h2>
                        <p className="text-charcoal/70 text-base md:text-lg leading-relaxed max-w-2xl" id="hero-desc">
                            Welcome to the interactive digital atelier of L'Atelier du Chocolat. Select custom bar shapes (Rectangle, Heart, Disc, Hexagon), drag-and-drop organic toppings directly onto the canvas, explore multi-dimensional cacao flavor chemistry, and arrange personalized gift delivery.
                        </p>

                        {/* Key Performance Metrics Row */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-bordercolor">
                            <div>
                                <p className="text-2xl md:text-3xl font-serif font-bold text-cocoa">100%</p>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold" id="stat-1-label">Direct-Trade Cacao</p>
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-serif font-bold text-cocoa">4 Shapes</p>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold" id="stat-2-label">Custom Slab Geometry</p>
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-serif font-bold text-cocoa">Drag&Drop</p>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold" id="stat-3-label">Real-time Placement</p>
                            </div>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-4">
                            <button  className="bg-charcoal text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-cocoa transition-all shadow-md flex items-center space-x-2">
                                <span id="hero-cta-main">Start Crafting Now</span>
                                <span>↓</span>
                            </button>
                            <button  className="border border-charcoal/20 text-charcoal px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-charcoal hover:text-white transition-all">
                                <span id="hero-cta-secondary">Explore Flavor Profiles</span>
                            </button>
                        </div>
                    </div>

                    {/* Visual Hero Feature Box */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="bg-white p-6 rounded-2xl border border-bordercolor shadow-xl w-full max-w-md relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gold-light/30 rounded-full blur-2xl"></div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-gold" id="card-hero-head">Atelier Spotlight</span>
                                <span className="text-xs bg-ivory px-2.5 py-1 rounded-full border border-bordercolor font-medium text-cocoa">Grand Cru Grand Noir</span>
                            </div>
                            <div className="h-48 rounded-xl bg-gradient-to-br from-[#2B1B17] via-[#3E241B] to-[#1A0E0B] p-4 text-white flex flex-col justify-between relative shadow-inner">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs tracking-widest font-serif text-gold font-bold">L'ATELIER DU CHOCOLAT</span>
                                    <span className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded border border-white/10">70% CACAO</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-serif italic text-gold-light">"Ecuadorian Single Origin with Drag & Drop Gold Flakes"</p>
                                    <p className="text-[11px] text-white/70">Master Chocolatier Selection • Batch #409</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-bordercolor flex justify-between items-center text-xs text-charcoal/70">
                                <span>Estimated Crafting Time: <strong>24 Hours</strong></span>
                                <span className="text-gold font-bold">✦ Certified Organic</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* SECTION 1: VISUAL CHOCOLATE BUILDER (MAKE YOUR OWN CHOCOLATE) */}
        <section id="builder" className="py-12 md:py-16 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Intro Paragraph */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                        <span>SECTION 01</span>
                        <span>•</span>
                        <span id="sec1-badge">VISUAL BUILDER ENGINE</span>
                    </div>
                    <h2 className="serif-font text-3xl md:text-4xl font-bold text-charcoal" id="sec1-title">Make Your Own Chocolate Slab</h2>
                    <p className="text-charcoal/70 mt-3 text-sm md:text-base leading-relaxed" id="sec1-desc">
                        Select your preferred Grand Cru chocolate base and custom bar geometry. Drag and drop toppings directly onto the canvas to position them with organic precision. Drag toppings around on the slab or off the bar to re-arrange or remove them.
                    </p>
                </div>

                {/* Split-Screen Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: STICKY VISUAL CANVAS */}
                    <div className="lg:col-span-6 lg:sticky lg:top-28">
                        <div className="bg-white p-6 rounded-2xl border border-bordercolor shadow-md space-y-4">
                            
                            <div className="flex justify-between items-center border-b border-bordercolor pb-3">
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-charcoal" id="canvas-heading">Visual Canvas Preview</h3>
                                    <p className="text-xs text-charcoal/60" id="canvas-sub">Drag toppings onto slab or move them around directly</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button  className="text-xs px-3 py-1.5 rounded-full border border-bordercolor hover:bg-ivory text-charcoal/70 transition-all" id="btn-reset">
                                        ↺ Reset Slab
                                    </button>
                                    <button  className="text-xs px-3 py-1.5 rounded-full bg-gold-light/50 border border-gold/30 text-cocoa font-medium hover:bg-gold-light transition-all" id="btn-random">
                                        ✨ Chef's Scatter
                                    </button>
                                </div>
                            </div>

                            {/* Interactive Canvas Element Container (Drop Zone Target) */}
                            <div id="canvas-drop-wrapper" className="relative w-full flex justify-center items-center py-4 bg-ivory/50 rounded-xl border border-dashed border-bordercolor min-h-[400px] transition-all">
                                <canvas id="chocolateCanvas" width="340" height="420" className="canvas-container rounded-lg cursor-crosshair bg-white transition-transform"></canvas>

                                {/* Drag Guidance Badge */}
                                <div id="drag-hint-badge" className="absolute bottom-6 bg-charcoal/85 text-gold-light text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md pointer-events-none transition-opacity">
                                    🎯 <span id="txt-drag-hint">Drag toppings from the right panel directly onto the slab</span>
                                </div>
                            </div>

                            {/* Canvas Live Metrics Status */}
                            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                                <div className="p-2 bg-ivory rounded-lg border border-bordercolor">
                                    <span className="block text-charcoal/60 text-[10px] uppercase font-semibold" id="lbl-weight">Est. Weight</span>
                                    <span id="val-weight" className="font-serif text-sm font-bold text-cocoa">120g</span>
                                </div>
                                <div className="p-2 bg-ivory rounded-lg border border-bordercolor">
                                    <span className="block text-charcoal/60 text-[10px] uppercase font-semibold" id="lbl-cocoa-pct">Cocoa Content</span>
                                    <span id="val-cocoa-pct" className="font-serif text-sm font-bold text-cocoa">70%</span>
                                </div>
                                <div className="p-2 bg-ivory rounded-lg border border-bordercolor">
                                    <span className="block text-charcoal/60 text-[10px] uppercase font-semibold" id="lbl-toppings-cnt">Toppings</span>
                                    <span id="val-toppings-cnt" className="font-serif text-sm font-bold text-cocoa">0 Items</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COLUMN: CONFIGURATION PANEL (STEP WIZARD) */}
                    <div className="lg:col-span-6 space-y-6">
                        
                        {/* STEP 1: CHOCOLATE SHAPE & BASE SELECTION */}
                        <div className="bg-white p-6 rounded-2xl border border-bordercolor shadow-sm space-y-5">
                            
                            {/* Shape Selector Sub-step */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-serif font-bold text-base text-charcoal flex items-center space-x-2">
                                        <span className="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] flex items-center justify-center font-sans">1a</span>
                                        <span id="step1a-title">Select Bar Geometry Shape</span>
                                    </h3>
                                    <span className="text-xs text-gold font-bold" id="lbl-shape-tag">4 Styles</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="shape-options-grid">
                                    {/* Populated via JS */}
                                </div>
                            </div>

                            {/* Cocoa Base Sub-step */}
                            <div className="pt-3 border-t border-bordercolor">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-serif font-bold text-base text-charcoal flex items-center space-x-2">
                                        <span className="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] flex items-center justify-center font-sans">1b</span>
                                        <span id="step1b-title">Select Chocolate Base</span>
                                    </h3>
                                    <span className="text-xs font-semibold text-gold" id="step1-required">Required</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3" id="base-options-grid">
                                    {/* Populated via JS */}
                                </div>
                            </div>

                        </div>

                        {/* STEP 2: ARTISANAL TOPPINGS GRID (DRAGGABLE ITEMS) */}
                        <div className="bg-white p-6 rounded-2xl border border-bordercolor shadow-sm space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-serif font-bold text-lg text-charcoal flex items-center space-x-2">
                                    <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center font-sans">2</span>
                                    <span id="step2-title">Drag & Drop Artisanal Toppings</span>
                                </h3>
                                <span className="text-xs text-charcoal/60" id="step2-max">Max 24 items</span>
                            </div>

                            <p className="text-xs text-charcoal/70" id="step2-sub">
                                ✋ <strong>Drag any ingredient badge below</strong> directly onto the chocolate bar image, or click <strong>+</strong> to auto-place.
                            </p>

                            {/* Toppings Selector Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="toppings-options-grid">
                                {/* Rendered via JS */}
                            </div>
                        </div>

                        {/* STEP 3: PACKAGING & GIFTING */}
                        <div className="bg-white p-6 rounded-2xl border border-bordercolor shadow-sm space-y-4">
                            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center space-x-2">
                                <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center font-sans">3</span>
                                <span id="step3-title">Packaging & Velvet Box Selection</span>
                            </h3>

                            <div className="grid grid-cols-3 gap-3" id="packaging-options-grid">
                                {/* Rendered via JS */}
                            </div>
                        </div>

                        {/* STICKY BOTTOM CHECKOUT SUMMARY */}
                        <div className="bg-charcoal text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <div>
                                <span className="text-xs text-gold font-semibold uppercase tracking-wider block" id="summary-lbl">Total Custom Bar Price</span>
                                <div className="flex items-baseline space-x-2">
                                    <span id="summary-price" className="text-3xl font-serif font-bold text-white">$25.00</span>
                                    <span className="text-xs text-white/60" id="summary-tax">Tax & Gift Box Included</span>
                                </div>
                            </div>
                            <button  className="w-full sm:w-auto bg-gold text-charcoal px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-gold-light transition-all shadow-md pulse-hover flex items-center justify-center space-x-2">
                                <span id="btn-add-bag">Proceed to Gift Note</span>
                                <span>→</span>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        {/* SECTION 2: ANALYTICAL FLAVOR PROFILE & CACAO DASHBOARD */}
        <section id="analytics" className="py-12 md:py-16 bg-white border-y border-bordercolor">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Intro Paragraph */}
                <div className="max-w-3xl mb-12">
                    <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                        <span>SECTION 02</span>
                        <span>•</span>
                        <span id="sec2-badge">CACAO INTELLIGENCE & DATA</span>
                    </div>
                    <h2 className="serif-font text-3xl md:text-4xl font-bold text-charcoal" id="sec2-title">Dynamic Flavor Profile & Organoleptic Analysis</h2>
                    <p className="text-charcoal/70 mt-3 text-sm md:text-base leading-relaxed" id="sec2-desc">
                        Our organoleptic radar maps the sensory profile of your customized chocolate formulation in real-time. As ingredients are dragged onto the visual builder, bitterness, floral notes, crunchiness, and sweetness recalculate dynamically to ensure harmonious flavor balance.
                    </p>
                </div>

                {/* Charts Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* CHART 1: FLAVOR BALANCE RADAR CHART */}
                    <div className="lg:col-span-6 bg-ivory p-6 rounded-2xl border border-bordercolor shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-serif font-bold text-lg text-charcoal" id="chart1-title">Organoleptic Sensory Matrix</h3>
                                <p className="text-xs text-charcoal/60" id="chart1-sub">Real-time radar evaluation based on active formulation</p>
                            </div>
                            <span className="text-xs bg-white border border-bordercolor px-2.5 py-1 rounded-full font-mono text-cocoa">Interactive</span>
                        </div>
                        <div className="chart-container">
                            <canvas id="flavorRadarChart"></canvas>
                        </div>
                        <p className="text-[11px] text-charcoal/60 text-center mt-3" id="chart1-footer">
                            ✦ Profile updates automatically upon adding ingredients in Step 1 & 2.
                        </p>
                    </div>

                    {/* CHART 2: NUTRITIONAL & CACAO CONTENT BREAKDOWN */}
                    <div className="lg:col-span-6 bg-ivory p-6 rounded-2xl border border-bordercolor shadow-sm space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-serif font-bold text-lg text-charcoal" id="chart2-title">Base Cocoa Comparative Metrics</h3>
                                <span className="text-xs text-gold font-bold">100g Standardized</span>
                            </div>
                            <p className="text-xs text-charcoal/60" id="chart2-sub">Caloric density, sugar levels, and cacao butter ratios per base type</p>
                            <div className="chart-container mt-4">
                                <canvas id="cocoaBarChart"></canvas>
                            </div>
                        </div>
                    </div>

                </div>

                {/* SECONDARY DATA ROW: ETHICAL SOURCING DISTRIBUTION */}
                <div className="mt-8 bg-ivory p-6 rounded-2xl border border-bordercolor grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold" id="sourcing-tag">Direct-Trade Origins</span>
                        <h3 className="font-serif font-bold text-2xl text-charcoal" id="sourcing-title">Sustainable Fair-Trade Cocoa Sourcing</h3>
                        <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed" id="sourcing-desc">
                            We partner directly with smallholder farming cooperatives across Ecuador, Madagascar, Ghana, and Peru. Fair premium prices ensure ecosystem conservation, zero child labor, and pristine bean quality.
                        </p>
                        <div className="flex items-center space-x-4 pt-2 text-xs font-semibold text-cocoa">
                            <span>🌱 100% Traceable</span>
                            <span>✦ Solar-Dried Beans</span>
                            <span>📦 Zero Plastic</span>
                        </div>
                    </div>
                    <div className="md:col-span-7 flex justify-center">
                        <div className="chart-container" style={{ maxHeight: "260px" }}>
                            <canvas id="sourcingDoughnutChart"></canvas>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 3: PERSONALIZED GIFT NOTE & SCHEDULED DELIVERY */}
        <section id="gifting" className="py-12 md:py-16 bg-ivory border-b border-bordercolor">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Intro Paragraph */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                        <span>SECTION 03</span>
                        <span>•</span>
                        <span id="sec3-badge">PERSONALIZATION & SCHEDULING</span>
                    </div>
                    <h2 className="serif-font text-3xl md:text-4xl font-bold text-charcoal" id="sec3-title">Artisanal Gift Messaging & Delivery Calendar</h2>
                    <p className="text-charcoal/70 mt-3 text-sm md:text-base leading-relaxed" id="sec3-desc">
                        Every bespoke order includes a hand-pressed gold foil gift card. Write your message below to view a real-time calligraphic preview, then select your precise date for temperature-controlled express delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* GIFT CARD INPUT FORM */}
                    <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-bordercolor shadow-sm space-y-5">
                        <h3 className="font-serif font-bold text-xl text-charcoal" id="form-card-title">Compose Personalized Gift Note</h3>
                        
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1" id="lbl-recipient">Recipient Name</label>
                            <input type="text" id="input-recipient" value="Madame Claire Laurent" onChange="updateCardPreview()" className="w-full px-4 py-2.5 rounded-xl border border-bordercolor text-sm focus:outline-none focus:border-gold transition-all" placeholder="Enter recipient name..." />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70" id="lbl-message">Custom Message</label>
                                <span id="char-count" className="text-xs text-charcoal/50">84 / 200</span>
                            </div>
                            <textarea id="input-message" rows="4" maxLength="200" onChange="updateCardPreview()" className="w-full px-4 py-2.5 rounded-xl border border-bordercolor text-sm focus:outline-none focus:border-gold transition-all resize-none" placeholder="Write your heartfelt message here...">May this custom chocolate creation bring sweet moments of joy and elegance to your celebration. With love and warmest wishes.</textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1" id="lbl-sender">Sender Signature</label>
                            <input type="text" id="input-sender" value="With admiration, Julian" onChange="updateCardPreview()" className="w-full px-4 py-2.5 rounded-xl border border-bordercolor text-sm focus:outline-none focus:border-gold transition-all" placeholder="Enter your name or sign-off..." />
                        </div>

                        {/* Delivery Date Selector */}
                        <div className="pt-4 border-t border-bordercolor space-y-3">
                            <h4 className="font-serif font-bold text-base text-charcoal" id="title-delivery-schedule">Select Express Dispatch Date</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-semibold text-charcoal/70 mb-1" id="lbl-delivery-date">Preferred Delivery Date</label>
                                    <input type="date" id="input-delivery-date" className="w-full px-3 py-2 rounded-lg border border-bordercolor text-xs text-charcoal focus:outline-none focus:border-gold" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-charcoal/70 mb-1" id="lbl-time-slot">Delivery Time Slot</label>
                                    <select id="input-time-slot" className="w-full px-3 py-2 rounded-lg border border-bordercolor text-xs text-charcoal focus:outline-none focus:border-gold">
                                        <option value="morning">Morning (09:00 - 12:00)</option>
                                        <option value="afternoon" selected>Afternoon (13:00 - 17:00)</option>
                                        <option value="evening">Evening Express (18:00 - 21:00)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* REAL-TIME LIVE CARD PREVIEW */}
                    <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-gold/40 shadow-lg relative min-h-[360px] flex flex-col justify-between" style={{ backgroundImage: "radial-gradient(#F4E8C1 0.5px, transparent 0.5px)", backgroundSize: "16px 16px" }}>
                        
                        <div className="flex justify-between items-center border-b border-gold/20 pb-4">
                            <span className="serif-font font-bold text-gold tracking-widest text-xs uppercase">L'ATELIER DU CHOCOLAT • PARIS</span>
                            <span className="text-[10px] text-cocoa/60 font-mono tracking-widest uppercase">HAND-LETTERED CARD</span>
                        </div>

                        <div className="my-6 space-y-4">
                            <p className="text-sm font-semibold text-cocoa italic" id="preview-recipient">To: Madame Claire Laurent</p>
                            <p className="handwriting-font text-2xl md:text-3xl text-charcoal leading-relaxed px-2" id="preview-message">
                                "May this custom chocolate creation bring sweet moments of joy and elegance to your celebration. With love and warmest wishes."
                            </p>
                            <p className="text-right text-xs font-serif font-bold text-cocoa italic" id="preview-sender">With admiration, Julian</p>
                        </div>

                        <div className="border-t border-gold/20 pt-3 flex justify-between items-center text-[11px] text-charcoal/60">
                            <span>Embossed Gold Foil Envelope</span>
                            <span id="preview-date-label">Scheduled: Aug 18, 2026</span>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        {/* SECTION 4: SOMMELIER CATALOG & PAIRING GUIDE */}
        <section id="catalog" className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Intro Paragraph */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                        <span>SECTION 04</span>
                        <span>•</span>
                        <span id="sec4-badge">SOMMELIER SELECTION</span>
                    </div>
                    <h2 className="serif-font text-3xl md:text-4xl font-bold text-charcoal" id="sec4-title">Pre-Designed Signature Recipes & Beverage Pairings</h2>
                    <p className="text-charcoal/70 mt-3 text-sm md:text-base leading-relaxed" id="sec4-desc">
                        Looking for inspiration? Filter our master chocolatier signature combinations. Each bar is carefully matched with espresso roasting notes, vintage wines, or single-malt spirits for elevated tasting experiences.
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-bordercolor">
                    <div className="flex flex-wrap gap-2" id="catalog-filter-btns">
                        <button  className="cat-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-charcoal text-white transition-all">All Collections</button>
                        <button  className="cat-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-ivory text-charcoal hover:bg-bordercolor transition-all">Dark Cacao</button>
                        <button  className="cat-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-ivory text-charcoal hover:bg-bordercolor transition-all">Fruity & Floral</button>
                        <button  className="cat-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-ivory text-charcoal hover:bg-bordercolor transition-all">Nuts & Crunch</button>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <input type="text" id="catalog-search" onChange="searchCatalog()" placeholder="Search flavor, wine pairing..." className="w-full px-3.5 py-1.5 pl-8 rounded-full border border-bordercolor text-xs focus:outline-none focus:border-gold" />
                        <span className="absolute left-3 top-2 text-xs text-charcoal/40">🔍</span>
                    </div>
                </div>

                {/* Catalog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="catalog-grid">
                    {/* Cards populated dynamically via JS */}
                </div>

            </div>
        </section>

    
==== FOOTER JSX ====

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
                
                <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center font-serif font-bold">L</div>
                        <span className="serif-font text-xl font-bold tracking-tight text-white">L'Atelier du Chocolat</span>
                    </div>
                    <p className="text-xs text-ivory/70 leading-relaxed max-w-sm">
                        Parem Academy Demonstration Application. Crafting high-end bespoke interactive visual ecommerce experiences for luxury brands worldwide.
                    </p>
                </div>

                <div className="md:col-span-3 space-y-2 text-xs">
                    <p className="font-bold text-gold uppercase tracking-widest">Atelier Locations</p>
                    <p className="text-ivory/80">Paris: 24 Rue Saint-Honoré</p>
                    <p className="text-ivory/80">Lyon: 12 Place Bellecour</p>
                    <p className="text-ivory/80">Milan: Via Montenapoleone 8</p>
                </div>

                <div className="md:col-span-4 space-y-2 text-xs">
                    <p className="font-bold text-gold uppercase tracking-widest">Crafting Guarantee</p>
                    <p className="text-ivory/80">✦ Freshly poured within 24h of dispatch</p>
                    <p className="text-ivory/80">✦ Insulated temperature-controlled packaging</p>
                    <p className="text-ivory/80">✦ 100% Organic Direct-Trade Cocoa</p>
                </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-ivory/50 space-y-2 sm:space-y-0">
                <p>© 2026 L'Atelier du Chocolat • Demo Built by Parem Academy (paremacademy.com)</p>
                <div className="flex space-x-4">
                    <span>Privacy Policy</span>
                    <span>•</span>
                    <span>Terms of Crafting</span>
                    <span>•</span>
                    <span>Quality Certificate</span>
                </div>
            </div>
        </div>
    
==== MODAL JSX ====
<div id="checkoutModal" className="fixed inset-0 z-50 hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl border border-bordercolor relative">
            
            {/* Close Modal Button */}
            <button  className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal text-xl font-bold w-8 h-8 rounded-full bg-ivory flex items-center justify-center">
                ✕
            </button>

            <div className="border-b border-bordercolor pb-4">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">ORDER SPECIFICATION SPEC</span>
                <h3 className="serif-font text-2xl font-bold text-charcoal">Bespoke Chocolate Summary</h3>
            </div>

            {/* Modal Content Breakdown */}
            <div className="space-y-4 text-xs">
                
                <div className="bg-ivory p-4 rounded-xl border border-bordercolor space-y-2">
                    <div className="flex justify-between items-center font-bold text-charcoal border-b border-bordercolor pb-2">
                        <span id="modal-base-label">Base Chocolate & Shape:</span>
                        <span id="modal-base-val" className="text-cocoa font-serif text-sm">70% Dark • Classic Rectangle</span>
                    </div>
                    <div className="space-y-1 pt-1" id="modal-toppings-list">
                        {/* Populated dynamically */}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-ivory rounded-xl border border-bordercolor">
                        <span className="block text-charcoal/60 text-[10px] uppercase font-bold">Packaging Choice</span>
                        <span id="modal-pack-val" className="font-semibold text-cocoa">Velvet Gift Box (+ $5.00)</span>
                    </div>
                    <div className="p-3 bg-ivory rounded-xl border border-bordercolor">
                        <span className="block text-charcoal/60 text-[10px] uppercase font-bold">Scheduled Dispatch</span>
                        <span id="modal-date-val" className="font-semibold text-cocoa">Aug 18, 2026 (Afternoon)</span>
                    </div>
                </div>

                {/* Gift Note Summary */}
                <div className="p-3 bg-ivory rounded-xl border border-bordercolor space-y-1">
                    <span className="block text-charcoal/60 text-[10px] uppercase font-bold">Gift Message Preview</span>
                    <p id="modal-msg-val" className="italic text-charcoal/80">"May this custom chocolate creation bring sweet moments..."</p>
                </div>

                {/* Price Totals */}
                <div className="pt-2 border-t border-bordercolor flex justify-between items-center text-sm font-bold text-charcoal">
                    <span>Total Calculated Amount:</span>
                    <span id="modal-total-price" className="text-2xl font-serif text-cocoa">$35.00</span>
                </div>

            </div>

            {/* CTA Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button  className="w-full border border-charcoal text-charcoal py-3 rounded-full text-xs font-bold hover:bg-ivory transition-all">
                    📄 Export JSON Recipe
                </button>
                <button  className="w-full bg-charcoal text-white py-3 rounded-full text-xs font-bold hover:bg-cocoa transition-all shadow-md">
                    ✨ Confirm & Dispatch
                </button>
            </div></div></div>