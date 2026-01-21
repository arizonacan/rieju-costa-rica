"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ZoomIn, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- DATA ---
const galleryItems = [
  { id: 1, category: "action", src: "/assets/riejutrip.webp", alt: { es: "Travesía Enduro", en: "Enduro Trip" } },
  { id: 2, category: "showroom", src: "/assets/riejunewarrival.jpg", alt: { es: "Nueva Llegada", en: "New Arrival" } },
  { id: 3, category: "action", src: "/assets/riejumudrace.webp", alt: { es: "Carrera en Barro", en: "Mud Race" } },
  { id: 4, category: "detail", src: "/assets/riejuengine.jpg", alt: { es: "Detalle Motor", en: "Engine Detail" } },
  { id: 5, category: "action", src: "/assets/riejujump.webp", alt: { es: "Salto", en: "Jump" } },
  { id: 6, category: "showroom", src: "/assets/riejudelivery.jpg", alt: { es: "Día de Entrega", en: "Delivery Day" } },
];

export default function GalleryPage() {
  const { lang, setLang } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<null | typeof galleryItems[0]>(null);

  // NOTE: I removed the scroll-lock useEffect here. 
  // This stops the page from "jumping" when the scrollbar disappears.

  const content = {
    es: {
      back: "Volver",
      title: "Galería",
      filters: { all: "Todos", action: "Acción", showroom: "Sala", detail: "Detalle" }
    },
    en: {
      back: "Back",
      title: "Gallery",
      filters: { all: "All", action: "Action", showroom: "Showroom", detail: "Detail" }
    }
  };

  const t = content[lang];
  const filteredImages = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#D61F26] selection:text-white pb-20 relative">

      {/* --- APP SHELL --- */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/">
          <img
            src="/assets/maxlogo.png"
            alt="Maximum Motorsports"
            className="w-20 md:w-24 h-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
      </div>

      <div className="absolute top-8 right-6 md:right-12 z-50 flex items-center gap-4">
        <button onClick={() => setLang('es')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'es' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-[#D61F26]/40 ${lang === 'es' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/cr.png" alt="Costa Rica" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10" />
        </button>
        <button onClick={() => setLang('en')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'en' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl" />
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-[#D61F26] transition-colors mb-8 uppercase text-xs tracking-widest font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.back}
        </Link>

        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-8">
          {t.title}<span className="text-[#D61F26]">.</span>
        </h1>

        {/* FILTERS */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {['all', 'action', 'showroom', 'detail'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap
                ${filter === cat
                  ? "bg-[#D61F26] text-white border-[#D61F26]"
                  : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white"
                }`}
            >
              {/* @ts-expect-error - Safe key access */}
              {t.filters[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredImages.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => setSelectedImage(item)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt[lang]}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-8 h-8 text-[#D61F26] mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest text-center px-2">
                  {item.alt[lang]}
                </span>
              </div>
              <div className="absolute top-3 left-3 bg-[#D61F26] text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                {/* @ts-expect-error - Safe key access */}
                {t.filters[item.category]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            
            {/* WRAPPER */}
            <div 
               className="relative inline-block"
               onClick={(e) => e.stopPropagation()} 
            >
                {/* THE IMAGE */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt[lang]}
                  style={{
                    maxHeight: '85vh', 
                    maxWidth: '90vw', 
                    width: 'auto', 
                    height: 'auto',
                    display: 'block'
                  }}
                  // REMOVED 'border border-white/10'
                  className="shadow-2xl rounded-sm relative z-10" 
                />

                {/* THE STEALTH BUTTON */}
                <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white/90 hover:text-white p-2 rounded-full backdrop-blur-md transition-all z-50 border border-white/20"
                >
                  <X className="w-6 h-6" />
                </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}