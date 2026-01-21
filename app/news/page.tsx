"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const newsItems = [
  {
    id: 1,
    date: "10 ENE 2026",
    title: { es: "Llegada de Modelos 2026", en: "2026 Models Arrival" },
    description: { es: "Presentamos nuestra nueva línea de motos Rieju para el mercado latinoamericano.", en: "We present our new line of Rieju motorcycles for the Latin American market." },
    image: "/assets/newlineup.webp"
  },
  {
    id: 2,
    date: "05 ENE 2026",
    title: { es: "Maximum: Nuevo Distribuidor", en: "Maximum: New Distributor" },
    description: { es: "Oficialmente somos la casa de Rieju para todo el territorio nacional.", en: "We are officially the home of Rieju for the entire national territory." },
    image: "/assets/distributor.webp"
  },
  {
    id: 3,
    date: "01 ENE 2026",
    title: { es: "Promociones de Apertura", en: "Opening Promotions" },
    description: { es: "Ofertas exclusivas para clientes nuevos en todo el país.", en: "Exclusive offers for new customers throughout the country." },
    image: "/assets/deals.webp"
  }
];

export default function NewsPage() {
  const { lang, setLang } = useLanguage();
  
  // 1. UI TRANSLATIONS (For the static parts of the page)
  const ui = {
    es: {
      back: "Volver",
      title: "Noticias", // <--- Spanish Title
      readMore: "Leer Más"
    },
    en: {
      back: "Back",
      title: "News",     // <--- English Title
      readMore: "Read More"
    }
  };

  const staticText = ui[lang];

  // 2. DATA TRANSLATION HELPER (For the array above)
  const t = (item: any) => item[lang]; 

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#D61F26] selection:text-white pb-20 relative">
      
      {/* --- TOP NAVBAR --- */}
      
      {/* 1. BRANDING (Top Left) */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <Link href="/">
            <img 
                src="/assets/maxlogo.png" 
                alt="Maximum Motorsports" 
                className="w-10 md:w-14 h-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
        </Link>
      </div>

      {/* 2. LANGUAGE FLAGS (Top Right) */}
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
          {/* UPDATED: Uses the ui object */}
          {staticText.back}
        </Link>

        {/* UPDATED: Uses the ui object for the Title */}
        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-12 border-b border-zinc-800 pb-8">
          {staticText.title}<span className="text-[#D61F26]">.</span>
        </h1>
      </div>

      {/* CARD GRID */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {newsItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }} 
            className="group cursor-pointer"
          >
            {/* IMAGE CARD */}
            <div className="aspect-[4/3] bg-zinc-900 border border-zinc-800 group-hover:border-[#D61F26] transition-colors overflow-hidden relative mb-6">
                <img 
                    src={item.image} 
                    alt={t(item.title)} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
            </div>

            {/* DATE */}
            <div className="flex items-center gap-2 text-[#D61F26] text-xs font-bold tracking-widest uppercase mb-3">
                <Calendar className="w-3 h-3" />
                {item.date}
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-bold uppercase italic leading-none mb-3 text-white group-hover:text-[#D61F26] transition-colors">
                {t(item.title)}
            </h3>

            {/* EXCERPT */}
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {t(item.description)}
            </p>

            {/* READ MORE BUTTON */}
            <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest border-b border-[#D61F26] pb-1 text-white group-hover:text-[#D61F26] transition-colors">
                {/* UPDATED: Uses the ui object */}
                {staticText.readMore} <ArrowRight className="w-3 h-3 ml-2" />
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}