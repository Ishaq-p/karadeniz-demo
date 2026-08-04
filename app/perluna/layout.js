import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./perluna.css";
import SmoothScrollProvider from "@/components/perluna/ui/SmoothScrollProvider";
import GlobalStars from "@/components/perluna/ui/GlobalStars";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Perluna Aura — Güzellik • Bakım • Wellness",
  description:
    "Perluna Aura is a luxury beauty and wellness studio blending AI-guided skin analysis, bespoke treatments, and a members' sanctuary of care.",
};

export default function PerlunaLayout({ children }) {
  return (
    <div
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #423B3A 0%, #2B2625 55%, #1F1B1A 100%)",
        minHeight: "100vh",
        color: "#F5F0E8",
        fontFamily: "var(--font-cormorant), serif",
      }}
    >
      <GlobalStars />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </div>
  );
}
