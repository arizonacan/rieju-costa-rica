"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- DATA ---
const bikes = [
  {
    id: "mr300pro",
    name: "MR PRO 300i",
    category: "hard-enduro",
    price: "$12,899",
    specs: { engine: "300cc TFI 2-Stroke", weight: "103.5kg", suspension: "KYB AOS (DLC Coated)" },
    image: "/assets/300i.webp" 
  },
  {
    id: "mr300racing",
    name: "MR RACING 300i",
    category: "hard-enduro",
    price: "$11,699",
    specs: { engine: "300cc TFI 2-Stroke", weight: "103.5kg", suspension: "KYB AOS" },
    image: "/assets/300.jpg"
  }
];

// --- STYLES ---
const styles = {
  container: "min-h-screen bg-zinc-950 text-white selection:bg-[#D61F26] selection:text-white pb-20 relative",
  // Updated backLink to match News Page logic (we will put it inside the header section)
  backLink: "inline-flex items-center text-zinc-500 hover:text-[#D61F26] transition-colors mb-8 uppercase text-xs tracking-widest font-bold",
  title: "text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 mb-6",
  filterBtnBase: "px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
  filterActive: "bg-[#D61F26] text-white border-[#D61F26]",
  filterInactive: "bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-white",
  card: "group relative bg-zinc-900/50 border border-zinc-800 hover:border-[#D61F26] transition-colors duration-300 overflow-hidden",
  cardImage: "h-80 w-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800 transition-colors",
  specLabel: "text-zinc-600 uppercase text-[10px] mb-1",
  viewButton: "w-full py-4 bg-zinc-950 border border-zinc-800 text-white uppercase text-xs font-bold tracking-widest hover:bg-[#D61F26] hover:text-white hover:border-[#D61F26] transition-all flex items-center justify-center gap-2 cursor-pointer"
};

export default function BikesPage() {
  const [filter, setFilter] = useState("all");
  const { lang, setLang } = useLanguage();
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
      
      {/* --- 1. THE LOGO (Top Left) --- */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/">
            <img 
                src="/assets/maxlogo.png" 
                alt="Maximum Motorsports" 
                className="w-10 md:w-14 h-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
        </Link>
      </div>

      {/* --- 2. THE FLAGS (Top Right) --- */}
      <div className="absolute top-8 right-6 md:right-12 z-50 flex items-center gap-4">
        <button onClick={() => setLang('es')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'es' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-[#D61F26]/40 ${lang === 'es' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/cr.png" alt="Costa Rica" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10"/>
        </button>
        <button onClick={() => setLang('en')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'en' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl"/>
        </button>
      </div>

      {/* HEADER SECTION */}
      {/* SENSEI NOTE: We increased padding-top (pt-32) so the title doesn't hit the Logo */}
      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto">
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
              <div className="h-80 w-full bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors overflow-hidden">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold uppercase italic font-sans">{bike.name}</h2>
                    <p className="text-zinc-500 text-xs font-mono mt-2">{bike.specs.engine} • {bike.specs.weight}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#D61F26] font-mono font-bold text-xl">{bike.price}</span>
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