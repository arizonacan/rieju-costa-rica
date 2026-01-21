"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const content = {
    es: {
      title: "Señal GPS Perdida",
      alert: "FALLO CRÍTICO",
      button: "Volver a Base"
    },
    en: {
      title: "GPS Signal Lost",
      alert: "CRITICAL FAILURE",
      button: "Return to Base"
    }
  };

  const t = content[lang];

  // --- BRAND COLOR ---
  const brandRed = "#D61F26"; 

  return (
    <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden selection:bg-[#D61F26] selection:text-white">
      
      {/* LANGUAGE FLAGS */}
      <div className="absolute top-8 right-6 md:right-12 z-50 flex items-center gap-4">
        <button onClick={() => setLang('es')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'es' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-[#D61F26]/40 ${lang === 'es' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/cr.png" alt="Costa Rica" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10"/>
        </button>
        <button onClick={() => setLang('en')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'en' ? 'scale-110 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20 shadow-xl"/>
        </button>
      </div>

      {/* BACKGROUND LAYERS */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen grayscale">
        <source src="/assets/radar.mp4" type="video/mp4" />
      </video>

      {/* OVERLAYS - RED HUE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,31,38,0.1)_0%,transparent_70%)] animate-pulse z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_90%)] z-10 pointer-events-none" />

      {/* CONTENT */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-20 max-w-2xl relative"
      >
        {/* ICON - RED GLOW */}
        <motion.div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-[#D61F26]/10 text-[#D61F26] border border-[#D61F26]/50 shadow-lg shadow-[#D61F26]/20">
          <AlertTriangle className="w-8 h-8" />
        </motion.div>

        {/* 404 - RED GRADIENT */}
        <h1 className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-transparent to-[#D61F26] leading-none tracking-tighter drop-shadow-2xl">
          404
        </h1>

        <div className="space-y-2 mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#D61F26] uppercase tracking-[0.2em] drop-shadow-lg">
            {t.title}
          </h2>
        </div>

        <p className="text-[#D61F26] max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed font-mono opacity-80">
          {t.alert} <br/>
        </p>

        {/* LINK BUTTON - RED BACKGROUND */}
        <Link 
          href="/"
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#D61F26] text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(214,31,38,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t.button}
          
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30" />
        </Link>

      </motion.div>
    </div>
  );
}