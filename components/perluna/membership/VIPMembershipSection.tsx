"use client";

import { motion } from "framer-motion";
import { Check, Crown, Gem, Sparkle } from "lucide-react";
import TiltCard from "./TiltCard";

type Tier = {
  name: string;
  icon: typeof Crown;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Aura Essential",
    icon: Sparkle,
    price: "₺1.200",
    cadence: "/ ay",
    tagline: "Ritüelinize sadık, sade bir başlangıç.",
    features: [
      "Ayda 1 bakım seansı",
      "Dijital güzellik puanları",
      "WhatsApp randevu hatırlatmaları",
    ],
  },
  {
    name: "Perluna VIP",
    icon: Crown,
    price: "₺2.800",
    cadence: "/ ay",
    tagline: "En çok tercih edilen, dengeli ayrıcalık.",
    features: [
      "Ayda 2 bakım seansı",
      "Öncelikli randevu erişimi",
      "Otomatik no-show önleme (SMS + WA)",
      "Şifrelenmiş öncesi/sonrası galeri",
    ],
    featured: true,
  },
  {
    name: "Aura Prestige",
    icon: Gem,
    price: "₺5.400",
    cadence: "/ ay",
    tagline: "Sınırsız erişim, kişisel bakım küratörü.",
    features: [
      "Sınırsız bakım seansı",
      "Kişisel güzellik danışmanı",
      "Özel etkinlik davetleri",
      "Şifrelenmiş öncesi/sonrası galeri",
      "Aile üyesi eşleştirme",
    ],
  },
];

export default function VIPMembershipSection() {
  return (
    <section className="relative w-full bg-void-soft px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Üyelik</p>
          <h2 className="font-display text-4xl text-pearl sm:text-5xl">
            <span className="text-gold-foil">VIP</span> Üyelik Katmanları
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-pearl-dim">
            Puan biriktirin, no-show'suz bir takvim yönetin ve bakım
            geçmişinizi şifreli bir galeride saklayın.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={tier.featured ? "md:-translate-y-4" : ""}
            >
              <TiltCard
                className={
                  tier.featured
                    ? "border-gold/60 shadow-gold-glow"
                    : ""
                }
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-foil bg-[length:200%_auto] px-4 py-1 font-sans text-[10px] uppercase tracking-widest text-void-raised">
                    En Çok Tercih Edilen
                  </span>
                )}

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-white/[0.03]">
                  <tier.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>

                <h3 className="mt-5 font-display text-2xl text-pearl">
                  {tier.name}
                </h3>
                <p className="mt-1 font-body text-base text-pearl-dim">
                  {tier.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-3xl text-gold">
                    {tier.price}
                  </span>
                  <span className="font-sans text-xs text-pearl-dim">
                    {tier.cadence}
                  </span>
                </div>

                <ul className="mt-6 flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-aura" strokeWidth={2} />
                      <span className="font-body text-base text-pearl-dim">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-full px-6 py-3 font-sans text-xs uppercase tracking-widest2 transition-colors ${
                    tier.featured
                      ? "bg-gold-foil bg-[length:200%_auto] text-void-raised shadow-gold-glow"
                      : "border border-gold/40 text-gold hover:bg-gold/10"
                  }`}
                >
                  Üyeliği Seç
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
