"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, X, Gauge, Weight, Settings2, Info } from "lucide-react";
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
  specLabel: "text-zinc-600 uppercase text-[10px] mb-1",
  viewButton: "w-full py-4 bg-zinc-950 border border-zinc-800 text-white uppercase text-xs font-bold tracking-widest group-hover:bg-[#D61F26] group-hover:border-[#D61F26] transition-all flex items-center justify-center gap-2"
};

export default function BikesPage() {
  const [bikes, setBikes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedBike, setSelectedBike] = useState<any>(null); // MODAL STATE
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    async function fetchBikes() {
      const data = await client.fetch(`
        *[_type == "motorcycle"]{
          "id": _id,
          "name": model,
          "category": "hard-enduro", 
          "price": "$" + string(price),
          "description": description,
          "specs": { 
            "engine": description, 
            "weight": weight,
            "suspension": suspension
          },
          "image": mainImage.asset->url
        }
      `);
      setBikes(data);
    }
    fetchBikes();
  }, []);

  const content = {
    es: {
      back: "Volver a Base",
      title: "Modelos",
      filters: { all: "Todos", "hard-enduro": "Hard Enduro" },
      viewSpecs: "Ver Detalles",
      close: "Cerrar",
      labels: { suspension: "Suspensión", category: "Categoría", weight: "Peso", engine: "Motor", details: "Especificaciones Técnicas" }
    },
    en: {
      back: "Back to Base",
      title: "2026 Models",
      filters: { all: "All", "hard-enduro": "Hard Enduro" },
      viewSpecs: "View Details",
      close: "Close",
      labels: { suspension: "Suspension", category: "Category", weight: "Weight", engine: "Engine", details: "Technical Specs" }
    }
  };

  const t = content[lang as keyof typeof content];
  const filteredBikes = filter === "all" ? bikes : bikes.filter((bike: any) => bike.category === filter);

  return (
    <div className={styles.container}>
      {/* THE LOGO & FLAGS (Keeping your App Shell) */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/"><img src="/assets/maxlogo.png" className="w-10 md:w-14 h-auto opacity-90" /></Link>
      </div>

      <div className="absolute top-8 right-6 md:right-12 z-50 flex items-center gap-4">
        <button onClick={() => setLang('es')} className={`relative ${lang === 'es' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}>
          <img src="https://flagcdn.com/w40/cr.png" className="h-6 w-6 rounded-full object-cover" />
        </button>
        <button onClick={() => setLang('en')} className={`relative ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-40 grayscale'}`}>
          <img src="https://flagcdn.com/w40/us.png" className="h-6 w-6 rounded-full object-cover" />
        </button>
      </div>

      {/* HEADER */}
      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className={styles.backLink}><ArrowLeft className="w-4 h-4 mr-2" /> {t.back}</Link>
        <h1 className={styles.title}>{t.title}</h1>
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {["all", "hard-enduro"].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`${styles.filterBtnBase} ${filter === cat ? styles.filterActive : styles.filterInactive}`}>
               {/* @ts-expect-error */}
              {t.filters[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBikes.map((bike: any) => (
            <motion.div 
                key={bike.id} layout 
                className={styles.card}
                onClick={() => setSelectedBike(bike)}
            >
              <div className="h-80 w-full bg-zinc-800/50 overflow-hidden">
                <img src={bike.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold uppercase italic">{bike.name}</h2>
                    <p className="text-zinc-500 text-xs font-mono mt-2">{bike.specs.engine[lang]}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[#D61F26] font-mono font-bold text-xl">{bike.price}</span>
                    <span className="text-[10px] text-zinc-600 uppercase">MSRP</span>
                  </div>
                </div>
                <div className={styles.viewButton}>
                  {t.viewSpecs} <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SHOWROOM MODAL --- */}
      <AnimatePresence>
        {selectedBike && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedBike(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setSelectedBike(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-[#D61F26] transition-colors rounded-full text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* MODAL LEFT: IMAGE */}
              <div className="w-full md:w-3/5 bg-zinc-800/30 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-zinc-800">
                <img 
                    src={selectedBike.image} 
                    alt={selectedBike.name} 
                    className="max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(214,31,38,0.2)]" 
                />
              </div>

              {/* MODAL RIGHT: INFO */}
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                    <span className="text-[#D61F26] font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
                        {selectedBike.category.replace("-", " ")}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none mb-4">
                        {selectedBike.name}
                    </h2>
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-mono font-bold text-white">{selectedBike.price}</span>
                        <span className="text-xs text-zinc-500 uppercase font-mono">MSRP</span>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2 flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-[#D61F26]" /> {t.labels.details}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Gauge className="w-3 h-3" /> {t.labels.engine}
                            </span>
                            <span className="text-sm font-mono">{selectedBike.specs.engine[lang]}</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Weight className="w-3 h-3" /> {t.labels.weight}
                            </span>
                            <span className="text-sm font-mono">{selectedBike.specs.weight[lang]}</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Info className="w-3 h-3" /> {t.labels.suspension}
                            </span>
                            <span className="text-sm font-mono text-right max-w-[150px]">{selectedBike.specs.suspension[lang]}</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setSelectedBike(null)}
                    className="w-full py-5 bg-[#D61F26] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-[0_10px_30px_rgba(214,31,38,0.3)]"
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