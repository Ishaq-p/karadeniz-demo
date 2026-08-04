"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: "skin-care",
    title: "Medikal Cilt Bakımı",
    desc: "Cildinizin derinlemesine temizlenmesi, yenilenmesi ve ışıltısına kavuşması için uygulanan kişiye özel ritüeller.",
    image: "/perluna/skincare.jpg", // Using a downloaded local image to avoid any caching/domain issues
  },
  {
    id: "laser",
    title: "Buz Lazer Epilasyon",
    desc: "Yeni nesil teknoloji ile acısız, hızlı ve kalıcı pürüzsüzlük deneyimi.",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop", // Clean aesthetics, spa items
  },
  {
    id: "spa",
    title: "Aromaterapi Masajı",
    desc: "Ruhunuzu ve bedeninizi dinlendiren, özel esansiyel yağlarla uygulanan rahatlama seansları.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop", // Spa massage
  },
  {
    id: "nail",
    title: "Protez Tırnak & Nail Art",
    desc: "Ellerinizin zarafetini ön plana çıkaran, kalıcı ve estetik tırnak tasarımları.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop", // Nail care
  },
];

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="relative w-full bg-void px-6 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-aura-radial opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="eyebrow mb-4">Sanal Galeri</p>
          <h2 className="font-display text-4xl text-pearl sm:text-5xl">
            Ayrıcalıklı <span className="text-gold-foil">Hizmetlerimiz</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-pearl-dim">
            Güzelliğinizi ve ruhunuzu besleyen, en son teknoloji ve uzman ellerle sunulan
            hizmet dünyamızı keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {services.slice(0, 2).map((service, idx) => (
              <GalleryCard key={service.id} service={service} index={idx} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {services.slice(2, 4).map((service, idx) => (
              <GalleryCard key={service.id} service={service} index={idx + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative h-[400px] overflow-hidden rounded-2xl bg-void-soft border border-gold/10"
      style={{ perspective: 1000 }}
    >
      {/* Parallax Image */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/30 to-transparent z-10" />
        <img
          src={service.image}
          alt={service.title}
          className="object-cover w-full h-full opacity-60 transition-opacity duration-500 group-hover:opacity-80"
        />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <motion.div
          initial={{ y: 20, opacity: 0.8 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 h-px w-12 bg-gold/50" />
          <h3 className="font-display text-2xl text-pearl mb-3">{service.title}</h3>
          <p className="font-body text-sm text-pearl-dim max-w-sm">
            {service.desc}
          </p>
          <motion.a
            href="#booking"
            className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest2 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            Detaylı İncele →
          </motion.a>
        </motion.div>
      </div>

      {/* 3D Lighting effect on hover */}
      <div className="pointer-events-none absolute inset-0 z-30 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
    </motion.div>
  );
}
