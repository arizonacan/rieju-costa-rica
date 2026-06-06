"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowLeft, MessageCircle, MapPin, Clock, Mail } from "lucide-react";

export default function ContactPage() {
  const { lang, setLang } = useLanguage();
  
  const content = {
    es: {
      back: "Volver a Base",
      title: "Contacto",
      subtitle: "El terreno te espera. Hablemos.",
      whatsapp: "Chatear por WhatsApp",
      whatsappDesc: "Respuesta inmediata para ventas y soporte",
      location: "Ubicación",
      locationDesc: "San Ramon, Costa Rica",
      hours: "Horario",
      hoursDesc: "Lun - Sab: 8:00 AM - 5:00 PM",
      email: "Correo Electrónico",
      emailDesc: "info@maximummotorsports.cr"
    },
    en: {
      back: "Back to Base",
      title: "Contact",
      subtitle: "The terrain awaits. Let's talk.",
      whatsapp: "Chat on WhatsApp",
      whatsappDesc: "Immediate response for sales & support",
      location: "Location",
      locationDesc: "San Ramon, Costa Rica",
      hours: "Hours",
      hoursDesc: "Mon - Sat: 8:00 AM - 5:00 PM",
      email: "Email",
      emailDesc: "info@maximummotorsports.cr"
    }
  };

  const t = content[lang as keyof typeof content];

  // The client's WhatsApp Number (Include country code, no + or spaces)
  const whatsappNumber = "+506 6108 5846".replace(/\D/g, ''); // This will ensure only numbers are used in the link
  const whatsappMessage = lang === 'es' 
    ? "¡Hola! Estoy interesado en los modelos Rieju." 
    : "Hello! I am interested in the Rieju models.";
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col bg-zinc-950 selection:bg-[#D61F26] selection:text-white">
      
      {/* --- BACKGROUNDS (Matching the Hero exactly) --- */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 grayscale-[20%]">
        <source src="/assets/fakeriejumud.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95 z-10 pointer-events-none" /> 
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-10 opacity-20" />

      {/* --- TOP SHELL --- */}
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

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 flex-grow flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full pt-32 pb-20">
        
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-[#D61F26] transition-colors mb-8 uppercase text-xs tracking-widest font-bold w-max">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.back}
        </Link>

        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2 drop-shadow-2xl">
          {t.title}<span className="text-[#D61F26]">.</span>
        </h1>
        <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest mb-12">
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PRIMARY CTA: WHATSAPP CARD */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer" 
            className="md:col-span-2 group relative bg-[#D61F26]/10 backdrop-blur-md border border-[#D61F26]/30 p-8 md:p-12 overflow-hidden hover:bg-[#D61F26] hover:border-[#D61F26] transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D61F26]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold uppercase italic text-white flex items-center gap-4 mb-2">
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-[#25D366] group-hover:text-white transition-colors" />
                {t.whatsapp}
              </h2>
              <p className="text-zinc-400 font-mono text-xs md:text-sm group-hover:text-white/80 transition-colors">
                {t.whatsappDesc}
              </p>
            </div>
            <div className="relative z-10 px-8 py-4 border-2 border-[#D61F26] group-hover:border-white text-[#D61F26] group-hover:text-black group-hover:bg-white uppercase tracking-[0.2em] text-xs font-black transition-all duration-300">
              {lang === 'es' ? 'Iniciar Chat' : 'Start Chat'}
            </div>
          </a>

          {/* SECONDARY INFO CARDS */}
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-8 hover:border-zinc-600 transition-colors flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#D61F26] shrink-0" />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{t.location}</h3>
              <p className="text-zinc-500 font-mono text-xs">{t.locationDesc}</p>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-8 hover:border-zinc-600 transition-colors flex items-start gap-4">
            <Clock className="w-6 h-6 text-[#D61F26] shrink-0" />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{t.hours}</h3>
              <p className="text-zinc-500 font-mono text-xs">{t.hoursDesc}</p>
            </div>
          </div>

          <a href={`mailto:${t.emailDesc}`} className="md:col-span-2 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-8 hover:border-zinc-600 hover:bg-zinc-900/60 transition-colors flex items-center gap-4 group">
            <Mail className="w-6 h-6 text-zinc-500 group-hover:text-[#D61F26] transition-colors shrink-0" />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{t.email}</h3>
              <p className="text-zinc-500 font-mono text-xs">{t.emailDesc}</p>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}