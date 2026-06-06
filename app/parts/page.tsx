"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, X, Settings2, Wrench, Hash, Package } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- 1. SANITY CONFIG ---
const client = createClient({
  projectId: "gjvvvo7w", 
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: true,
});

// --- 2. STYLES ---
const styles = {
  container: "min-h-screen bg-zinc-950 text-white selection:bg-[#D61F26] selection:text-white pb-20 relative",
  backLink: "inline-flex items-center text-zinc-500 hover:text-[#D61F26] transition-colors mb-8 uppercase text-xs tracking-widest font-bold",
  title: "text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 mb-6",
  filterBtnBase: "px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
  filterActive: "bg-[#D61F26] text-white border-[#D61F26]",
  filterInactive: "bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-white",
  card: "group relative bg-zinc-900/50 border border-zinc-800 hover:border-[#D61F26] transition-colors duration-300 overflow-hidden cursor-pointer",
  specLabel: "text-zinc-600 uppercase text-[10px] mb-1"
};

export default function PartsPage() {
  const [parts, setParts] = useState([]); // NOW A LIVE STATE!
  const [filter, setFilter] = useState("all");
  const { lang, setLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPart, setSelectedPart] = useState<any>(null);
  
  // --- 3. FETCH LIVE DATA FROM SANITY ---
  useEffect(() => {
    async function fetchParts() {
      const data = await client.fetch(`
        *[_type == "part"]{
          "id": _id,
          "name": title,
          "category": category, 
          "price": price,
          "specs": { 
            "partNumber": partNumber, 
            "fitment": fitment,
            "stock": stock
          },
          "image": mainImage.asset->url
        }
      `);
      console.log("SANITY PARTS DATA INCOMING:", data);
      setParts(data);
    }
    fetchParts();
  }, []);

  // --- 4. THE UPDATED DICTIONARY ---
  const content = {
    es: {
      back: "Volver a Base",
      title: "Catálogo de Partes",
      // ADDED THE NEW TRANSLATIONS HERE!
      filters: { all: "Todos", controls: "Controles", drivetrain: "Transmisión", engine: "Motor", chassis: "Chasis", maintenance: "Mantenimiento", protection: "Protección", extras: "Extras" },
      viewSpecs: "Ver Detalles",
      close: "Cerrar",
      details: "Especificaciones de la Parte",
      labels: { fitment: "Compatibilidad", category: "Categoría", partNumber: "Nº de Parte", stock: "Inventario" },
      searchPlaceholder: "Buscar por nombre o número de parte..."
    },
    en: {
      back: "Back to Base",
      title: "Parts Catalog",
      // ADDED THE NEW TRANSLATIONS HERE!
      filters: { all: "All", controls: "Controls", drivetrain: "Drivetrain", engine: "Engine", chassis: "Chassis", maintenance: "Maintenance", protection: "Protection", extras: "Extras" },
      viewSpecs: "View Details",
      close: "Close",
      details: "Part Specifications",
      labels: { fitment: "Fitment", category: "Category", partNumber: "Part No.", stock: "Availability" },
      searchPlaceholder: "Search by name or part number..."
    }
  };

  const t = content[lang as keyof typeof content];
  
  const filteredParts = parts.filter((part: any) => {
    const matchesCategory = filter === "all" || part.category === filter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = part.name.toLowerCase().includes(searchLower) || 
                          (part.specs.partNumber && part.specs.partNumber.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      
      {/* THE LOGO & FLAGS */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/">
            <img src="/assets/maxlogo.png" alt="Maximum Motorsports" className="w-10 md:w-14 h-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

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

        <h1 className={styles.title}>{t.title}</h1>

        {/* SEARCH BAR */}
        <div className="relative mb-10 max-w-2xl mx-auto md:mx-0 md:mr-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
            <Search className="w-5 h-5 text-[#D61F26]" />
          </div>
          <input
            type="text"
            className="w-full bg-zinc-950 border border-[#D61F26]/50 text-white text-lg font-medium tracking-wide rounded-full focus:ring-0 focus:border-[#D61F26] focus:shadow-[0_0_20px_rgba(214,31,38,0.3)] outline-none block pl-16 py-4 pr-6 placeholder-zinc-500 transition-all duration-300"            
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {/* UPDATED THE BUTTON ARRAY HERE! */}
          {["all", "controls", "drivetrain", "engine", "chassis", "maintenance", "protection", "extras"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${styles.filterBtnBase} ${filter === cat ? styles.filterActive : styles.filterInactive}`}
            >
              {/* @ts-expect-error */}
              {t.filters[cat]} 
            </button>
          ))}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredParts.map((part: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={part.id}
              className={styles.card}
              onClick={() => setSelectedPart(part)}
            >
              <div className="h-48 w-full bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors overflow-hidden p-4">
                <img 
                  src={part.image} 
                  alt={part.name[lang]} 
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="pr-2">
                    <h2 className="text-lg font-bold uppercase italic font-sans leading-tight">{part.name[lang]}</h2>
                    <p className="text-zinc-500 text-[10px] font-mono mt-1">{part.specs.partNumber}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[#D61F26] font-mono font-bold text-xl whitespace-nowrap">
                      ₡ {Number(part.price).toLocaleString('en-US')}</span>
                    <span className="text-[10px] text-zinc-600 uppercase">MSRP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 font-mono border-t border-zinc-800 pt-4 mt-auto">
                   <div className="flex flex-col">
                      <span className={styles.specLabel}>{t.labels.fitment}</span>
                      <span className="text-white truncate" title={part.specs.fitment}>{part.specs.fitment[lang]}</span>
                   </div>
                   <div className="flex flex-col text-right">
                      <span className={styles.specLabel}>{t.labels.stock}</span>
                      <span className="text-white">{part.specs.stock[lang]}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- SHOWROOM MODAL --- */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedPart(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setSelectedPart(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-[#D61F26] transition-colors rounded-full text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* MODAL LEFT: IMAGE */}
              <div className="w-full md:w-1/2 bg-zinc-800/30 flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-zinc-800">
                <img 
                    src={selectedPart.image} 
                    alt={selectedPart.name[lang]} 
                    className="max-h-[50vh] object-contain drop-shadow-2xl" 
                />
              </div>

              {/* MODAL RIGHT: INFO */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                    <span className="text-[#D61F26] font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
                        {/* @ts-expect-error */}
                        {t.filters[selectedPart.category] || selectedPart.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic leading-none mb-4">
                        {selectedPart.name[lang]}
                    </h2>
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-mono font-bold text-white">₡ {Number(selectedPart.price).toLocaleString('en-US')}</span>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2 flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-[#D61F26]" /> {t.details}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Hash className="w-3 h-3" /> {t.labels.partNumber}
                            </span>
                            <span className="text-sm font-mono text-right text-white">{selectedPart.specs.partNumber}</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Wrench className="w-3 h-3" /> {t.labels.fitment}
                            </span>
                            <span className="text-sm font-mono text-right text-white">{selectedPart.specs.fitment[lang]}</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Package className="w-3 h-3" /> {t.labels.stock}
                            </span>
                            <span className="text-sm font-mono text-right text-[#D61F26]">{selectedPart.specs.stock[lang]}</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setSelectedPart(null)}
                    className="w-full py-5 bg-zinc-950 border border-zinc-800 text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-[#D61F26] hover:border-[#D61F26] transition-all duration-300 mt-auto"
                >
                    {t.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}