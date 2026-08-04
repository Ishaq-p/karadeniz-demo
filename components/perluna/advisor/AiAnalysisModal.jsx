"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: "q1",
    text: "Cildiniz gün içinde genellikle nasıl hisseder?",
    options: [
      { label: "Gergin ve kuru", value: "dry" },
      { label: "T bölgesinde parlama var", value: "combination" },
      { label: "Genel olarak yağlı", value: "oily" },
      { label: "Sorunsuz ve dengeli", value: "normal" },
    ],
  },
  {
    id: "q2",
    text: "En büyük cilt bakım hedefiniz nedir?",
    options: [
      { label: "İnce çizgileri azaltmak", value: "antiaging" },
      { label: "Lekeleri ve ton eşitsizliğini gidermek", value: "brightening" },
      { label: "Sivilce ve gözenekleri kontrol altına almak", value: "acne" },
      { label: "Yoğun nem ve parlaklık kazanmak", value: "hydration" },
    ],
  },
  {
    id: "q3",
    text: "Güneşe ne kadar maruz kalıyorsunuz?",
    options: [
      { label: "Çok nadir, çoğunlukla kapalı alandayım", value: "low" },
      { label: "Günde 1-2 saat", value: "medium" },
      { label: "Sürekli dışarıdayım", value: "high" },
    ],
  },
];


export default function AiAnalysisModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    } else {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI thinking time
    setTimeout(() => {
      setIsAnalyzing(false);
      // Dummy logic for result
      setResult({
        type: answers.q1 === "dry" ? "Kuru & Hassas Cilt" : answers.q1 === "oily" ? "Yağlı & Akneye Eğilimli Cilt" : "Karma & Dengeli Cilt",
        routine: [
          "1. Çift Aşamalı Temizlik (Yağ bazlı + Su bazlı)",
          "2. " + (answers.q2 === "hydration" ? "Hyalüronik Asit Serumu" : "C Vitamini Serumu"),
          "3. Yoğun Nemlendirici Bariyer Kremi",
          "4. Geniş Spektrumlu Güneş Koruyucu (SPF 50+)",
        ],
      });
    }, 2500);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="glass-panel relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold/20 bg-void-soft/95 p-8 shadow-2xl"
          >
            <button
              onClick={handleReset}
              className="absolute right-4 top-4 z-10 text-pearl-dim transition-colors hover:text-gold"
            >
              <X size={20} />
            </button>

            {!isAnalyzing && !result && (
              <div className="flex flex-col gap-6">
                <div className="mb-2">
                  <p className="eyebrow mb-2">Adım {currentStep + 1} / {questions.length}</p>
                  <h3 className="font-display text-2xl text-pearl">
                    {questions[currentStep].text}
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {questions[currentStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(questions[currentStep].id, opt.value)}
                      className={`group flex items-center justify-between rounded-xl border border-gold/20 bg-white/[0.02] p-4 text-left transition-all hover:bg-gold/10 ${answers[questions[currentStep].id] === opt.value ? "border-gold bg-gold/20" : ""}`}
                    >
                      <span className="font-sans text-sm text-pearl group-hover:text-gold-foil">
                        {opt.label}
                      </span>
                      <ChevronRight size={16} className="text-gold/50 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mb-6 h-16 w-16 rounded-full border-b-2 border-t-2 border-gold/80"
                />
                <h3 className="font-display text-2xl text-gold-foil">AI Yanıtlıyor...</h3>
                <p className="mt-2 font-body text-pearl-dim">
                  Cilt profiliniz Aurora algoritması ile değerlendiriliyor.
                </p>
              </div>
            )}

            {result && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="text-center">
                  <Sparkles className="mx-auto mb-4 h-12 w-12 text-gold" />
                  <p className="eyebrow mb-2">Analiz Sonucu</p>
                  <h3 className="font-display text-3xl text-pearl">{result.type}</h3>
                </div>
                
                <div className="rounded-xl border border-gold/20 bg-white/[0.03] p-5">
                  <h4 className="mb-4 font-sans text-xs uppercase tracking-widest2 text-gold">
                    SİZE ÖZEL RİTÜEL
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {result.routine.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold/70" />
                        <span className="font-body text-sm text-pearl-dim">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#booking"
                  onClick={handleReset}
                  className="mt-4 block w-full rounded-full border border-gold/50 bg-gold/10 py-3 text-center font-sans text-xs uppercase tracking-widest2 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:bg-gold/20"
                >
                  Randevu Al
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
