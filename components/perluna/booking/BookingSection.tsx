"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

type DayPrice = {
  date: number;
  tier: "off-peak" | "standard" | "peak";
  price: number;
};

// Placeholder yield-managed pricing — wire to real availability/pricing
// engine later. Tiers drive both the badge color and the price shown.
const days: DayPrice[] = [
  { date: 3, tier: "off-peak", price: 1450 },
  { date: 4, tier: "off-peak", price: 1450 },
  { date: 5, tier: "standard", price: 1850 },
  { date: 6, tier: "standard", price: 1850 },
  { date: 7, tier: "peak", price: 2400 },
  { date: 8, tier: "peak", price: 2600 },
  { date: 9, tier: "standard", price: 1850 },
  { date: 10, tier: "off-peak", price: 1450 },
  { date: 11, tier: "off-peak", price: 1450 },
  { date: 12, tier: "standard", price: 1850 },
  { date: 13, tier: "peak", price: 2400 },
  { date: 14, tier: "peak", price: 2600 },
  { date: 15, tier: "standard", price: 1850 },
  { date: 16, tier: "off-peak", price: 1450 },
];

const tierStyles: Record<DayPrice["tier"], { dot: string; label: string }> = {
  "off-peak": { dot: "bg-aura/70", label: "Sakin Saat" },
  standard: { dot: "bg-gold/70", label: "Standart" },
  peak: { dot: "bg-pearl-glow", label: "Yoğun Talep" },
};

const timeSlots = ["10:00", "11:30", "13:00", "15:30", "17:00", "19:00"];

export default function BookingSection() {
  const [selectedDay, setSelectedDay] = useState<number>(5);
  const [selectedTime, setSelectedTime] = useState<string>("15:30");

  const activeDay = days.find((d) => d.date === selectedDay) ?? days[0];

  return (
    <section id="booking" className="relative w-full bg-void px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-4">Rezervasyon</p>
          <h2 className="font-display text-4xl text-pearl sm:text-5xl">
            Randevunuzu <span className="text-gold-foil">Seçin</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-pearl-dim">
            Fiyatlar yoğunluğa göre değişir — sakin saatlerde ayrıcalıklı
            indirimlerden yararlanın.
          </p>
        </div>

        <div className="glass-panel grid gap-px overflow-hidden md:grid-cols-[1.3fr_1fr]">
          {/* Calendar grid */}
          <div className="bg-void-raised/40 p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg text-pearl">Ağustos 2026</h3>
              <div className="flex gap-4 font-sans text-[10px] uppercase tracking-widest text-pearl-dim">
                {(Object.keys(tierStyles) as DayPrice["tier"][]).map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${tierStyles[t].dot}`} />
                    {tierStyles[t].label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {days.map((d) => {
                const isSelected = d.date === selectedDay;
                return (
                  <motion.button
                    key={d.date}
                    onClick={() => setSelectedDay(d.date)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative flex flex-col items-center gap-1.5 rounded-xl border px-2 py-4 transition-colors ${
                      isSelected
                        ? "border-gold bg-gold/10 shadow-gold-glow"
                        : "border-white/10 bg-white/[0.02] hover:border-gold/40"
                    }`}
                  >
                    <span className="font-display text-lg text-pearl">{d.date}</span>
                    <span className={`h-1.5 w-1.5 rounded-full ${tierStyles[d.tier].dot}`} />
                    <span className="font-sans text-[10px] text-pearl-dim">
                      ₺{d.price}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selected day summary + time slots */}
          <div className="flex flex-col justify-between bg-void-raised/70 p-6 sm:p-8">
            <div>
              <p className="eyebrow mb-2">Seçili Gün</p>
              <p className="font-display text-3xl text-gold">
                Ağustos {activeDay.date}
              </p>
              <p className="mt-1 font-sans text-xs uppercase tracking-widest text-pearl-dim">
                {tierStyles[activeDay.tier].label} · ₺{activeDay.price}
              </p>

              <div className="mt-8">
                <p className="mb-3 flex items-center gap-2 font-sans text-xs uppercase tracking-widest2 text-pearl-dim">
                  <Clock className="h-3.5 w-3.5" /> Uygun Saatler
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`rounded-lg border px-2 py-2 font-sans text-xs transition-colors ${
                        selectedTime === t
                          ? "border-gold bg-gold text-void-raised"
                          : "border-white/10 text-pearl-dim hover:border-gold/40 hover:text-pearl"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 w-full rounded-full bg-gold-foil bg-[length:200%_auto] px-6 py-4 font-sans text-xs uppercase tracking-widest2 text-void-raised shadow-gold-glow"
            >
              Rezervasyonu Onayla
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
