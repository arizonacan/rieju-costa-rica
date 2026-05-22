"use client";

import { useState } from "react"; 
import MagneticMenu from "./magneticmenu"; 
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
const { lang, setLang } = useLanguage();  
  const content = {
      es: {
        tag: "Distribuidor Oficial",
        description: "El arma definitiva para el terreno latinoamericano. Potencia. Control. Pasión.",
        cta: "Ver Modelos",
        menu: {
          bikes: "Motos",
          parts: "Partes",
          news: "Noticias",
          gallery: "Galería", 
          merch: "Ropa y Equipo",
          contact: "Contacto"
        }
      },
      en: {
        tag: "Official Dealer",
        description: "The ultimate weapon for Latin American terrain. Power. Control. Passion.",
        cta: "View Models",
        menu: {
          bikes: "Bikes",
          parts: "Parts",
          news: "News",
          gallery: "Gallery", 
          merch: "Apparel & Gear",
          contact: "Contact"
        }
      }
    };
  const t = content[lang];

  // --- BRAND COLORS ---
  // Racing Red derived from logos
  const brandColor = "text-[#D61F26]";
  const brandBorder = "border-[#D61F26]";
  const brandBg = "bg-[#D61F26]";
  const brandSelection = "selection:bg-[#D61F26]";

  return (
    <div className={`relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-zinc-950 ${brandSelection} selection:text-white`}>
      
      {/* VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 grayscale-[20%]">
        <source src="/assets/fakeriejumud.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Gradient Overlay to make the White Logo pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90 z-10 pointer-events-none" /> 

      {/* MAGNETIC MENU */}
      <MagneticMenu />

      {/* LANGUAGE FLAGS */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-6">
        <button onClick={() => setLang('es')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'es' ? 'scale-125 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-[#D61F26]/50 ${lang === 'es' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/cr.png" alt="Costa Rica" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10"/>
        </button>
        <button onClick={() => setLang('en')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'en' ? 'scale-125 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-blue-500/50 ${lang === 'en' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10"/>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="z-20 text-center space-y-8 px-4 relative mt-[-5vh] w-full max-w-[100vw] flex flex-col items-center">
        
        {/* --- OFFICIAL DEALER TAG + RIEJU LOGO --- */}
        <div className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity duration-300">
            <p className="text-zinc-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold drop-shadow-md">
                {t.tag}
            </p>
            <div className="h-4 w-[1px] bg-zinc-600" /> {/* Little divider line */}
            <img 
                src="/assets/riejulogo.png" 
                alt="Rieju Official" 
                className="h-3 md:h-4 w-auto brightness-200 contrast-125 drop-shadow-lg" 
            />
        </div>

        {/* --- MAIN MAXIMUM LOGO --- */}
        <div className="relative w-full max-w-[320px] md:max-w-[650px] h-auto mx-auto">
            <img 
                src="/assets/maximumlogo.png" 
                alt="Maximum Motorsports" 
                className="w-full h-auto drop-shadow-2xl"
            />
        </div>

        <p className="max-w-[85%] md:max-w-lg mx-auto text-zinc-300 text-xs md:text-base font-medium tracking-wide leading-relaxed drop-shadow-lg">
          {t.description}
        </p>

        <div className="pt-6">
           <Link 
             href="/bikes"
             className={`relative z-30 inline-block px-10 py-3 border-2 ${brandBorder} ${brandColor} hover:${brandBg} hover:text-white transition-all duration-300 uppercase text-xs md:text-sm tracking-[0.2em] font-black backdrop-blur-sm shadow-[0_0_20px_rgba(214,31,38,0.2)] hover:shadow-[0_0_50px_rgba(214,31,38,0.6)]`}
           >
             {t.cta}
           </Link>
        </div>

      </div>

      {/* MOBILE BOTTOM MENU */}
      <div className="md:hidden absolute bottom-12 z-50 flex gap-5 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase flex-wrap justify-center px-4">
        <Link href="/bikes" className="hover:text-white transition-colors">{t.menu.bikes}</Link>
        <Link href="/parts" className="hover:text-white transition-colors">{t.menu.parts}</Link>
        <Link href="/news" className="hover:text-white transition-colors">{t.menu.news}</Link>
        <Link href="/gallery" className="hover:text-white transition-colors">{t.menu.gallery}</Link>
        <Link href="/merch" className="hover:text-white transition-colors">{t.menu.merch}</Link>
        <Link href="/contact" className="hover:text-white transition-colors">{t.menu.contact}</Link>
      </div>

      {/* GRID DECORATION */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-10 opacity-20" />
      
    </div>
  );
}