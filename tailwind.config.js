/** @type {import('tailwindcss').Config} */
const config = {
  // Use a prefix to avoid conflicts with other demos in the app
  // All perluna classes already use unprefixed names, so no prefix here —
  // but we scope content to avoid purging non-Tailwind demos.
  darkMode: "class",
  content: [
    "./app/perluna/**/*.{js,jsx,ts,tsx}",
    "./components/perluna/**/*.{js,jsx,ts,tsx}",
    "./app/l-atelier-du-chocolat/**/*.{js,jsx,ts,tsx}",
    "./components/LAtelierDuChocolat.jsx",
    "./components/KayaBalikMenu.jsx",
    "./components/KayaBalikMenu2.jsx",
    "./app/kaya-balik/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — warm luxury taupe to be elegant but not depressing
        void: {
          DEFAULT: "#2B2625",
          soft: "#36302F",
          raised: "#423B3A",
        },
        // Gold — the brand's metal. Three weights so gradients read as
        // actual metal (highlight/base/shadow) instead of a flat tint.
        gold: {
          highlight: "#F7E7A0",
          DEFAULT: "#D4AF37",
          deep: "#9C7A24",
          foil: "#B8860B",
        },
        // Pearl — the glowing accent object + light UI text on dark
        pearl: {
          DEFAULT: "#F5F0E8",
          glow: "#FFFDF7",
          dim: "#C9C2B4",
        },
        // Aura lavender — secondary accent pulled from the "AURA" wordmark
        aura: {
          DEFAULT: "#B794F6",
          soft: "#8E6FC4",
        },
      },
      fontFamily: {
        // Display: ceremonial, tall, engraved — for headings & the wordmark
        display: ["var(--font-cinzel)", "serif"],
        // Body: warm humanist serif for long-form / elegant copy
        body: ["var(--font-cormorant)", "serif"],
        // Utility: clean sans for labels, buttons, form fields, data
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gold-foil":
          "linear-gradient(135deg, #F7E7A0 0%, #D4AF37 35%, #9C7A24 60%, #D4AF37 85%, #F7E7A0 100%)",
        "aura-radial":
          "radial-gradient(circle at 50% 30%, rgba(212,175,55,0.08), transparent 60%)",
        "void-vignette":
          "radial-gradient(ellipse at center, #423B3A 0%, #2B2625 70%, #1F1B1A 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(212,175,55,0.35), 0 0 4px rgba(212,175,55,0.6)",
        "pearl-glow": "0 0 40px rgba(245,240,232,0.45)",
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
