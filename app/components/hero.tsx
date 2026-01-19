"use client";

import { useState } from "react"; 
import MagneticMenu from "./magneticmenu"; 
import Link from "next/link";

export default function Hero() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const content = {
      es: {
        tag: "Enduro Extremo • Costa Rica",
        headline: "Máximo",
        subheadline: "Motorsport",
        description: "El arma definitiva para el terreno latinoamericano. Ligera. Agresiva.",
        cta: "Ver Modelos",
        menu: {
          bikes: "Motos",
          parts: "Partes",
          merch: "Mercancía",
          contact: "Contacto"
        }
      },
      en: {
        tag: "Hard Enduro • Costa Rica",
        headline: "Maximum",
        subheadline: "Motorsport",
        description: "The ultimate weapon for Latin American terrain. Lightweight. Aggressive.",
        cta: "View Models",
        menu: {
          bikes: "Bikes",
          parts: "Parts",
          merch: "Merch",
          contact: "Contact"
        }
      }
    };
  const t = content[lang];

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-zinc-950 selection:bg-[#42F556] selection:text-black">
      
      {/* VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/assets/fakeriejumud.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80 z-10 pointer-events-none" /> 

      {/* MAGNETIC MENU */}
      <MagneticMenu lang={lang} />

      {/* LANGUAGE FLAGS */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-6">
        <button onClick={() => setLang('es')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'es' ? 'scale-125 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-[#42F556]/50 ${lang === 'es' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/cr.png" alt="Costa Rica" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10"/>
        </button>
        <button onClick={() => setLang('en')} className={`group relative flex items-center justify-center transition-all duration-500 ${lang === 'en' ? 'scale-125 opacity-100' : 'scale-90 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
          <div className={`absolute inset-0 rounded-full blur-md bg-blue-500/50 ${lang === 'en' ? 'opacity-100' : 'opacity-0'}`} />
          <img src="https://flagcdn.com/w40/us.png" alt="USA" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20 shadow-xl relative z-10"/>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="z-20 text-center space-y-6 px-4 relative mt-[-10vh] w-full max-w-[100vw]">
        
        <p className="text-zinc-300 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold drop-shadow-md">
          {t.tag}
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl break-words">
          {t.headline}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42F556] to-green-600">
            {t.subheadline}
          </span>
        </h1>

        <p className="max-w-[80%] md:max-w-md mx-auto text-zinc-200 text-xs md:text-base font-medium tracking-wide leading-relaxed drop-shadow-lg">
          {t.description}
        </p>

        <div className="pt-4">
           <Link 
             href="/bikes"
             className="relative z-30 inline-block px-6 py-2 md:px-8 md:py-3 border-2 border-[#42F556] text-[#42F556] hover:bg-[#42F556] hover:text-black transition-all duration-300 uppercase text-[10px] md:text-xs tracking-widest font-black backdrop-blur-sm"
           >
             {t.cta}
           </Link>
        </div>

      </div>

      {/* MOBILE BOTTOM MENU */}
      <div className="md:hidden absolute bottom-16 z-50 flex gap-6 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
        <Link href="/bikes" className="hover:text-white transition-colors">{t.menu.bikes}</Link>
        <Link href="/parts" className="hover:text-white transition-colors">{t.menu.parts}</Link>
        <Link href="/merch" className="hover:text-white transition-colors">{t.menu.merch}</Link>
        <Link href="/contact" className="hover:text-white transition-colors">{t.menu.contact}</Link>
      </div>

      {/* GRID DECORATION */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-10 opacity-20" />
      
    </div>
  );
}