"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- DATA ---
const parts = [
  {
    id: "rieju-clutch-01",
    name: "OEM Clutch Lever",
    category: "controls",
    price: "$34.99",
    specs: { partNumber: "RJ-10948", fitment: "MR Pro 2021-2026", stock: "In Stock" },
    image: "/assets/part2.jpg" 
  },
  {
    id: "rieju-sprocket-50t",
    name: "ZF Rear Sprocket 50T",
    category: "drivetrain",
    price: "$65.00",
    specs: { partNumber: "ZF-50T-RED", fitment: "All 300cc Models", stock: "2 Left" },
    image: "/assets/part3.jpg"
  }
];

// --- STYLES ---
const styles = {
  container: "min-h-screen bg-zinc-950 text-white selection:bg-[#D61F26] selection:text-white pb-20 relative",
  backLink: "inline-flex items-center text-zinc-500 hover:text-[#D61F26] transition-colors mb-8 uppercase text-xs tracking-widest font-bold",
  title: "text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 mb-6",
  filterBtnBase: "px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
  filterActive: "bg-[#D61F26] text-white border-[#D61F26]",
  filterInactive: "bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-white",
  card: "group relative bg-zinc-900/50 border border-zinc-800 hover:border-[#D61F26] transition-colors duration-300 overflow-hidden",
  cardImage: "h-40 w-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800 transition-colors",
  specLabel: "text-zinc-600 uppercase text-[10px] mb-1",
  viewButton: "w-full py-4 bg-zinc-950 border border-zinc-800 text-white uppercase text-xs font-bold tracking-widest hover:bg-[#D61F26] hover:text-white hover:border-[#D61F26] transition-all flex items-center justify-center gap-2 cursor-pointer"
};

export default function PartsPage() {
  const [filter, setFilter] = useState("all");
  const { lang, setLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  const content = {
    es: {
      back: "Volver a Base",
      title: "Catálogo de Partes",
      filters: { all: "Todos", controls: "Controles", drivetrain: "Transmisión" },
      viewSpecs: "Ver Detalles",
      labels: { fitment: "Compatibilidad", category: "Categoría" },
      searchPlaceholder: "Buscar por nombre o número de parte..."
    },
    en: {
      back: "Back to Base",
      title: "Parts Catalog",
      filters: { all: "All", controls: "Controls", drivetrain: "Drivetrain" },
      viewSpecs: "View Details",
      labels: { fitment: "Fitment", category: "Category" },
      searchPlaceholder: "Search by name or part number..."
    }
  };

    const t = content[lang as keyof typeof content];
  
    const filteredParts = parts.filter(part => {
    // Check 1: Does it match the category?
    const matchesCategory = filter === "all" || part.category === filter;
    
    // Check 2: Does the name OR part number contain the search text?
    // We convert everything to lowercase so "OEM" and "oem" both work.
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = part.name.toLowerCase().includes(searchLower) || 
                          part.specs.partNumber.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });
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
      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className={styles.backLink}>
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.back}
        </Link>

        <h1 className={styles.title}>
          {t.title}
        </h1>

      {/* SEARCH BAR */}
        <div className="relative mb-10 max-w-2xl mx-auto md:mx-0 md:mr-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
            <search className="w-5 h-5 text-[#D61F26]" />
          </div>
          <input
            type="text"
            className="w-full bg-zinc-950 border border-[#D61F26]/50 text-white text-lg font-medium tracking-wide rounded-full focus:ring-0 focus:border-[#D61F26] focus:shadow-[0_0_20px_rgba(214,31,38,0.3)] outline-none block pl-16 py-4 pr-6 placeholder-zinc-500 transition-all duration-300"            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {["all", "controls", "drivetrain"].map((cat) => (
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
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loop is now correctly mapped to 'part' */}
          {filteredParts.map((part) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={part.id}
              className={styles.card}
            >
              <div className="h-40 w-full bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors overflow-hidden">
                <img 
                  src={part.image} 
                  alt={part.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-bold uppercase italic font-sans">{part.name}</h2>
                    {/* Updated to pull partNumber and stock status */}
                    <p className="text-zinc-500 text-xs font-mono mt-2">{part.specs.partNumber} • {part.specs.stock}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#D61F26] font-mono font-bold text-xl">{part.price}</span>
                    <span className="text-[10px] text-zinc-600 uppercase">MSRP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-zinc-400 font-mono border-t border-zinc-800 pt-6">
                   <div className="flex flex-col">
                      <span className={styles.specLabel}>{t.labels.fitment}</span>
                      {/* Updated to pull fitment */}
                      <span className="text-white">{part.specs.fitment}</span>
                   </div>
                   <div className="flex flex-col text-right">
                      <span className={styles.specLabel}>{t.labels.category}</span>
                      <span className="uppercase text-white">{part.category}</span>
                   </div>
                </div>

                <Link href={`/parts/${part.id}`} className="w-full block">
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