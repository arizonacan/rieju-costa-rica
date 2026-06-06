"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, X, Settings2, Ruler, Layers, Tag } from "lucide-react";
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
  card: "group relative bg-zinc-900/50 border border-zinc-800 hover:border-[#D61F26] transition-colors duration-300 overflow-hidden flex flex-col cursor-pointer",
  cardImage: "h-80 w-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800 transition-colors",
  specLabel: "text-zinc-600 uppercase text-[10px] mb-1"
};

// --- 3. MAIN COMPONENT ---
export default function MerchPage() {
  const [merch, setMerch] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedMerch, setSelectedMerch] = useState<any>(null); // MODAL STATE
  const { lang, setLang } = useLanguage();

  // --- 4. FETCH THE DATA FROM SANITY ---
  useEffect(() => {
    async function fetchMerch() {
      const data = await client.fetch(`
        *[_type == "merch"]{
          "id": _id,
          "name": title,
          "category": category, 
          "price": price,
          "specs": { 
            "material": material, 
            "sizes": sizes
          },
          "image": mainImage.asset->url
        }
      `);
      setMerch(data);
    }
    fetchMerch();
  }, []);

  // --- 5. TRANSLATION DATA ---
  const content = {
    es: {
      back: "Volver a Base",
      title: "Ropa y Equipo",
      filters: { all: "Todo", apparel: "Ropa", accessories: "Accesorios", goggles: "Gafas", nutrition: "Nutrición" },
      close: "Cerrar",
      details: "Detalles del Producto",
      labels: { sizes: "Tallas", material: "Material", category: "Categoría" }
    },
    en: {
      back: "Back to Base",
      title: "Apparel & Gear",
      filters: { all: "All", apparel: "Apparel", accessories: "Accessories", goggles: "Goggles", nutrition: "Nutrition" },
      close: "Close",
      details: "Product Details",
      labels: { sizes: "Sizes", material: "Material", category: "Category" }
    }
  };

  const t = content[lang as keyof typeof content];
  
  // Filter the live merch from Sanity
  const filteredMerch = filter === "all" ? merch : merch.filter((item: any) => item.category === filter);

  return (
    <div className={styles.container}>
      {/* THE LOGO */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/">
            <img 
                src="/assets/maxlogo.png" 
                alt="Maximum Motorsports" 
                className="w-10 md:w-14 h-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
        </Link>
      </div>

      {/* THE FLAGS */}
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

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {["all", "apparel", "accessories", "goggles", "nutrition"].map((cat) => (
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-8">
          {filteredMerch.map((item: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className={styles.card}
              onClick={() => setSelectedMerch(item)}
            >
              <div className={styles.cardImage}>
                <img 
                  src={item.image} 
                  alt={item.name[lang]}
                  className="w-full h-full object-contain p-6 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="pr-4">
                    <h2 className="text-2xl font-bold uppercase italic font-sans leading-tight">{item.name[lang]}</h2>
                    <p className="text-zinc-500 text-xs font-mono mt-2">{item.specs.material[lang]}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[#D61F26] font-mono font-bold text-xl whitespace-nowrap">
                      ₡ {Number(item.price).toLocaleString('en-US')}</span>
                    <span className="text-[10px] text-zinc-600 uppercase">MSRP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400 font-mono border-t border-zinc-800 pt-6 mt-auto">
                   <div className="flex flex-col">
                      <span className={styles.specLabel}>{t.labels.sizes}</span>
                      <span className="text-white">{item.specs.sizes[lang]}</span>
                   </div>
                   <div className="flex flex-col text-right">
                      <span className={styles.specLabel}>{t.labels.category}</span>
                      <span className="uppercase text-white">{item.category}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- SHOWROOM MODAL --- */}
      <AnimatePresence>
        {selectedMerch && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedMerch(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setSelectedMerch(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-[#D61F26] transition-colors rounded-full text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* MODAL LEFT: IMAGE */}
              <div className="w-full md:w-3/5 bg-zinc-800/30 flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-zinc-800">
                <img 
                    src={selectedMerch.image} 
                    alt={selectedMerch.name[lang]} 
                    className="max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(214,31,38,0.15)]" 
                />
              </div>

              {/* MODAL RIGHT: INFO */}
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                    <span className="text-[#D61F26] font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
                        {/* @ts-expect-error */}
                        {t.filters[selectedMerch.category] || selectedMerch.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-none mb-4">
                        {selectedMerch.name[lang]}
                    </h2>
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-mono font-bold text-white">₡ {Number(selectedMerch.price).toLocaleString('en-US')}</span>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2 flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-[#D61F26]" /> {t.details}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Layers className="w-3 h-3" /> {t.labels.material}
                            </span>
                            <span className="text-sm font-mono text-right">{selectedMerch.specs.material[lang]}</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Ruler className="w-3 h-3" /> {t.labels.sizes}
                            </span>
                            <span className="text-sm font-mono text-right">{selectedMerch.specs.sizes[lang]}</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-sm border border-zinc-800">
                            <span className="text-zinc-500 text-xs uppercase flex items-center gap-2">
                                <Tag className="w-3 h-3" /> {t.labels.category}
                            </span>
                            <span className="text-sm font-mono text-right uppercase">
                              {/* @ts-expect-error */}
                              {t.filters[selectedMerch.category] || selectedMerch.category}
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setSelectedMerch(null)}
                    className="w-full py-5 bg-[#D61F26] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-[0_10px_30px_rgba(214,31,38,0.3)] mt-auto"
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