"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles as SparklesIcon, Wand2, ClipboardList } from "lucide-react";
import AiAnalysisModal from "./AiAnalysisModal";

const capabilities = [
  {
    icon: ClipboardList,
    title: "Akıllı Test",
    body: "Cilt tipi ve ihtiyaçlarınızı belirlemek için hazırladığımız özel soruları yanıtlayın.",
  },
  {
    icon: Wand2,
    title: "Kişiye Özel Ritüel",
    body: "Test sonucuna göre size özel bir bakım sırası ve ürün eşleştirmesi önerilir.",
  },
  {
    icon: SparklesIcon,
    title: "Zamanla Takip",
    body: "Her ziyarette cildinizin değişimi kaydedilir, ritüeliniz buna göre güncellenir.",
  },
];

export default function VirtualAdvisorSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-void-soft px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Yapay Zeka Danışmanı</p>
          <h2 className="font-display text-4xl text-pearl sm:text-5xl">
            Aurora <span className="text-gold-foil">Bot Analiz</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-pearl-dim">
            Soruları yanıtlayın, akıllı algoritmamız sizin için en uygun cilt bakım 
            yolculuğunu dakikalar içinde hazırlasın.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Mock Bot preview panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative aspect-[4/3] overflow-hidden p-6"
          >
            {/* Scan frame */}
            <div className="relative h-full w-full rounded-xl border border-gold/20 bg-gradient-to-b from-aura/10 to-void/40">
              <div className="absolute left-6 top-6 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-gold/70" />
              <div className="absolute right-6 top-6 h-8 w-8 rounded-tr-lg border-r-2 border-t-2 border-gold/70" />
              <div className="absolute bottom-6 left-6 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-gold/70" />
              <div className="absolute bottom-6 right-6 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-gold/70" />

              <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-8">
                <ClipboardList className="h-14 w-14 text-gold/80" strokeWidth={1} />
                <p className="font-sans text-xs uppercase tracking-widest2 text-pearl-dim mb-4">
                  Cilt Analiz Testi
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full border border-gold/50 bg-gold/10 px-6 py-2 font-sans text-xs uppercase tracking-widest2 text-gold transition-colors hover:bg-gold/20"
                >
                  Testi Başlat
                </button>
              </div>
            </div>
          </motion.div>

          {/* Capability list */}
          <div className="flex flex-col gap-8">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="flex gap-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white/[0.03]">
                  <c.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-pearl">{c.title}</h3>
                  <p className="mt-1 font-body text-base text-pearl-dim">{c.body}</p>
                </div>
              </motion.div>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
              className="group mt-2 inline-flex w-fit items-center gap-2 border-b border-gold/50 pb-1 font-sans text-xs uppercase tracking-widest2 text-gold"
            >
              <span className="transition-transform group-hover:translate-x-1">Analizinizi Başlatın</span> →
            </button>
          </div>
        </div>
      </div>

      <AiAnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
