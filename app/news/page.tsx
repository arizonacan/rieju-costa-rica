"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- 1. SANITY CONFIG ---
const client = createClient({
  projectId: "gjvvvo7w", 
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: true,
});

export default function NewsPage() {
  const { lang, setLang } = useLanguage();
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null); // MODAL STATE
  
  // --- 2. FETCH THE LIVE DATA ---
  useEffect(() => {
    async function fetchNews() {
      // Fetches news and orders them by date (newest first)
      const data = await client.fetch(`
        *[_type == "news"] | order(date desc) {
          "id": _id,
          "title": title,
          "date": date,
          "excerpt": excerpt,
          "content": content,
          "image": mainImage.asset->url
        }
      `);
      console.log("SANITY NEWS DATA INCOMING:", data);
      setNews(data);
    }
    fetchNews();
  }, []);

  // 3. UI TRANSLATIONS (For the static buttons)
  const ui = {
    es: {
      back: "Volver",
      title: "Noticias",
      readMore: "Leer Más",
      close: "Cerrar Artículo"
    },
    en: {
      back: "Back",
      title: "News",
      readMore: "Read More",
      close: "Close Article"
    }
  };

  const staticText = ui[lang as keyof typeof ui];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#D61F26] selection:text-white pb-20 relative">
      
      {/* --- APP SHELL --- */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/">
            <img 
                src="/assets/maxlogo.png" 
                alt="Maximum Motorsports" 
                className="w-10 md:w-14 h-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
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
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-[#D61F26] transition-colors mb-8 uppercase text-xs tracking-widest font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" /> 
          {staticText.back}
        </Link>

        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-12 border-b border-zinc-800 pb-8">
          {staticText.title}<span className="text-[#D61F26]">.</span>
        </h1>
      </div>

      {/* CARD GRID */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item: any, index: number) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }} 
            className="group cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedArticle(item)}
          >
            {/* IMAGE CARD */}
            <div className="aspect-[4/3] w-full bg-zinc-900 border border-zinc-800 group-hover:border-[#D61F26] transition-colors overflow-hidden relative mb-6">
                <img 
                    src={item.image} 
                    alt={item.title[lang]} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
            </div>

            {/* DATE */}
            <div className="flex items-center gap-2 text-[#D61F26] text-xs font-bold tracking-widest uppercase mb-3">
                <Calendar className="w-3 h-3" />
                {item.date}
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-bold uppercase italic leading-tight mb-3 text-white group-hover:text-[#D61F26] transition-colors line-clamp-2">
                {item.title[lang]}
            </h3>

            {/* EXCERPT */}
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                {item.excerpt[lang]}
            </p>

            {/* READ MORE BUTTON */}
            <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest border-b border-[#D61F26] pb-1 text-white group-hover:text-[#D61F26] transition-colors self-start mt-auto">
                {staticText.readMore} <ArrowRight className="w-3 h-3 ml-2" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- CINEMATIC ARTICLE MODAL --- */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-800 w-full max-w-5xl h-[90vh] overflow-y-auto relative flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* STEALTH CLOSE BUTTON */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-[#D61F26] transition-colors rounded-full text-white backdrop-blur-md border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* HERO BANNER */}
              <div className="w-full h-[40vh] md:h-[50vh] relative shrink-0">
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                 <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title[lang]} 
                    className="w-full h-full object-cover"
                 />
              </div>

              {/* ARTICLE CONTENT */}
              <div className="px-8 md:px-16 pb-16 relative z-20 -mt-20 md:-mt-32 max-w-4xl mx-auto w-full">
                  <div className="flex items-center gap-2 text-[#D61F26] text-sm font-bold tracking-widest uppercase mb-4 drop-shadow-md">
                      <Calendar className="w-4 h-4" />
                      {selectedArticle.date}
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none mb-10 text-white drop-shadow-lg">
                      {selectedArticle.title[lang]}
                  </h2>

                  {/* whitespace-pre-wrap ensures that line breaks from the CMS 
                    actually render as real paragraphs on the screen! 
                  */}
                  <div className="text-zinc-300 text-lg md:text-xl leading-relaxed font-sans whitespace-pre-wrap">
                      {selectedArticle.content[lang] || selectedArticle.excerpt[lang]}
                  </div>
                  
                  {/* BOTTOM CLOSE BUTTON */}
                  <div className="mt-16 pt-8 border-t border-zinc-800 text-center">
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#D61F26] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> {staticText.close}
                    </button>
                  </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}