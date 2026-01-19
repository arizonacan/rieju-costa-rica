"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

// --- DATA ---
const bikes = [
  {
    id: "mr300pro",
    name: "MR PRO 300i",
    category: "hard-enduro",
    price: "$12,899",
    specs: { engine: "300cc TFI 2-Stroke", weight: "103.5kg", suspension: "KYB AOS (DLC Coated)" },
    tag: { es: "Ingeniería Española", en: "Spanish Engineering" },
    image: "/assets/bike-placeholder.png" 
  },
  {
    id: "mr300racing",
    name: "MR RACING 300i",
    category: "hard-enduro",
    price: "$11,699",
    specs: { engine: "300cc TFI 2-Stroke", weight: "103.5kg", suspension: "KYB AOS" },
    tag: { es: "Pura Emoción", en: "Pure Emotion" },
    image: "/assets/bike-placeholder.png"
  }
];

// --- STYLES (Restored to Tailwind Names) ---
const styles = {
  container: "min-h-screen bg-zinc-950 text-white selection:bg-[#42F556] selection:text-black pb-20 relative",
  backLink: "inline-flex items-center text-zinc-500 hover:text-[#42F556] transition-colors mb-8 uppercase text-xs tracking-widest font-bold",
  title: "text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 mb-6",
  filterBtnBase: "px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
  filterActive: "bg-[#42F556] text-black border-[#42F556]",
  filterInactive: "bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-white",
  card: "group relative bg-zinc-900/50 border border-zinc-800 hover:border-[#42F556] transition-colors duration-300 overflow-hidden",
  cardImage: "h-80 w-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800 transition-colors",
  specLabel: "text-zinc-600 uppercase text-[10px] mb-1",
  viewButton: "w-full py-4 bg-zinc-950 border border-zinc-800 text-white uppercase text-xs font-bold tracking-widest hover:bg-[#42F556] hover:text-black hover:border-[#42F556] transition-all flex items-center justify-center gap-2 cursor-pointer"
};

export default function BikesPage() {
  const [filter, setFilter] = useState("all");
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const content = {
    es: {
      back: "Volver a Base",
      title: "Modelos 2026",
      filters: { all: "Todos", "hard-enduro": "Hard Enduro" },
      viewSpecs: "Ver Detalles",
      labels: { suspension: "Suspensión", category: "Categoría" }
    },
    en: {
      back: "Back to Base",
      title: "2026 Models",
      filters: { all: "All", "hard-enduro": "Hard Enduro" },
      viewSpecs: "View Details",
      labels: { suspension: "Suspension", category: "Category" }
    }
  };

  const t = content[lang];
  const filteredBikes = filter === "all" ? bikes : bikes.filter(bike => bike.category === filter);

  return (
    <div className={styles.container}>
      
      {/* LANGUAGE FLAGS */}
      <div className="absolute top-8 right-6 md:right-12 z-50 flex items-center gap-4">
        <button onClick={() => setLang('es')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'es' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <img src="https://flagcdn.com/w40/cr.png" alt="Costa Rica" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl"/>
        </button>
        <button onClick={() => setLang('en')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'en' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl"/>
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className={styles.backLink}>
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.back}
        </Link>

        <h1 className={styles.title}>
          {t.title}
        </h1>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {["all", "hard-enduro"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${styles.filterBtnBase} ${filter === cat ? styles.filterActive : styles.filterInactive}`}
            >
              {/* @ts-expect-error - Simple key access */}
              {t.filters[cat]} 
            </button>
          ))}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBikes.map((bike) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={bike.id}
              className={styles.card}
            >
              <div className="absolute top-4 left-4 z-10 bg-[#42F556] text-black text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                {bike.tag[lang]}
              </div>

              <div className={styles.cardImage}>
                 <span className="text-zinc-600 font-mono text-xs">[ {bike.name} IMAGE ]</span>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold uppercase italic font-sans">{bike.name}</h2>
                    <p className="text-zinc-500 text-xs font-mono mt-2">{bike.specs.engine} • {bike.specs.weight}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#42F556] font-mono font-bold text-xl">{bike.price}</span>
                    <span className="text-[10px] text-zinc-600 uppercase">MSRP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-zinc-400 font-mono border-t border-zinc-800 pt-6">
                   <div className="flex flex-col">
                      <span className={styles.specLabel}>{t.labels.suspension}</span>
                      <span className="text-white">{bike.specs.suspension}</span>
                   </div>
                   <div className="flex flex-col text-right">
                      <span className={styles.specLabel}>{t.labels.category}</span>
                      <span className="uppercase text-white">{bike.category.replace("-", " ")}</span>
                   </div>
                </div>

                {/* THE UNBREAKABLE LINK */}
                <Link href="/specs" className="w-full block">
                  <div className={styles.viewButton}>
                    {t.viewSpecs} <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}