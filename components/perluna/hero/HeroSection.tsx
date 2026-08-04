"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Suspense } from "react";

// The R3F canvas is client-only and heavy — load it dynamically so the
// text and layout paint immediately while WebGL spins up behind it.
const MoonPearlScene = dynamic(() => import("./MoonPearlScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-void" aria-hidden />,
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-void-vignette">
      {/* Logo */}
      <div className="absolute left-6 top-6 z-50">
        <img src="/perluna/logo-clean.png" alt="Perluna Logo" className="h-32 w-auto mix-blend-screen opacity-90" />
      </div>

      {/* 3D layer */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <MoonPearlScene />
        </Suspense>
      </div>

      {/* Ambient aura wash sitting above the canvas, below the text */}
      <div className="pointer-events-none absolute inset-0 bg-aura-radial" />

      {/* Text layer */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          Bir Perluna Aura Deneyimi
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-semibold tracking-wide text-gold-foil sm:text-7xl md:text-8xl"
        >
          PERLUNA AURA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="divider-aura mt-6 font-display text-lg tracking-widest2 text-aura sm:text-xl"
        >
          AURA
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-4 font-sans text-sm uppercase tracking-widest2 text-pearl-dim sm:text-base"
        >
          Güzellik &nbsp;•&nbsp; Bakım &nbsp;•&nbsp; Wellness
        </motion.p>

        <motion.a
          href="#booking"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(212,175,55,0.55)" }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-12 overflow-hidden rounded-full border border-gold/50 bg-white/[0.02] px-10 py-4 font-sans text-xs uppercase tracking-widest2 text-gold shadow-gold-glow backdrop-blur-sm"
        >
          Prestij Deneyimini Ayırt
        </motion.a>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-gold/70 to-transparent"
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </section>
  );
}
