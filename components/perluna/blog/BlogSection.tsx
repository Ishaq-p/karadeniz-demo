"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
  {
    id: "post-1",
    title: "Kış Aylarında Cilt Bariyerini Güçlendirmenin Yolları",
    category: "Cilt Bakımı",
    date: "12 Kasım 2026",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2070&auto=format&fit=crop", // Skincare products
    excerpt: "Soğuk hava ve rüzgarın yıpratıcı etkilerine karşı cildinizin koruyucu bariyerini nasıl destekleyebileceğinizi uzmanlarımızdan öğrenin.",
  },
  {
    id: "post-2",
    title: "Geleceğin Güzellik Trendi: Holistik Wellness",
    category: "Trendler",
    date: "05 Ekim 2026",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop", // Wellness, food, healthy lifestyle
    excerpt: "Sadece dış görünümü değil, içsel sağlığı da merkeze alan holistik güzellik anlayışı neden giderek daha fazla önem kazanıyor?",
  },
  {
    id: "post-3",
    title: "Lazer Epilasyon Öncesi ve Sonrası Bilinmesi Gerekenler",
    category: "Rehber",
    date: "28 Eylül 2026",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop", // Smooth skin, spa
    excerpt: "Pürüzsüz bir tene kavuşma yolculuğunda dikkat etmeniz gereken kritik adımlar ve doğru bilinen yanlışlar.",
  },
];

export default function BlogSection() {
  return (
    <section className="relative w-full bg-void px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Perluna Bülten</p>
            <h2 className="font-display text-4xl text-pearl sm:text-5xl">
              Güzellik <span className="text-gold-foil">Rehberi</span>
            </h2>
          </div>
          <motion.a
            href="#blog"
            whileHover={{ x: 4 }}
            className="group flex items-center gap-2 border-b border-gold/50 pb-1 font-sans text-xs uppercase tracking-widest2 text-gold transition-colors hover:border-gold hover:text-gold-foil"
          >
            Tüm Yazıları Gör <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group cursor-pointer rounded-2xl bg-void-soft border border-white/[0.05] overflow-hidden transition-all hover:border-gold/30 hover:bg-white/[0.02]"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-void/20 transition-colors group-hover:bg-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-void/80 px-3 py-1 backdrop-blur-md border border-gold/20">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-pearl-dim">
                  <Calendar size={14} className="text-gold/60" />
                  <span className="font-sans text-xs tracking-wider">{post.date}</span>
                </div>
                
                <h3 className="mb-3 font-display text-xl text-pearl transition-colors group-hover:text-gold-foil line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="mb-6 font-body text-sm text-pearl-dim line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest2 text-gold/80 transition-colors group-hover:text-gold">
                  Devamını Oku <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
