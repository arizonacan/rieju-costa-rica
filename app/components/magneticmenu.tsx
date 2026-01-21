"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation"; 
import { useLanguage } from "@/context/LanguageContext";

// --- UPDATED LINKS (Added Gallery) ---
const menuTranslations = {
  es: [
    { label: "Motos", path: "/bikes" },
    { label: "Partes", path: "/parts" },
    { label: "Noticias", path: "/news" },
    { label: "Galería", path: "/gallery" }, // <--- NEW
    { label: "Mercancía", path: "/merch" },
    { label: "Contacto", path: "/contact" }
  ],
  en: [
    { label: "Bikes", path: "/bikes" },
    { label: "Parts", path: "/parts" },
    { label: "News", path: "/news" },
    { label: "Gallery", path: "/gallery" }, // <--- NEW
    { label: "Merch", path: "/merch" },
    { label: "Contact", path: "/contact" }
  ]
};

type MenuItemProps = {
  item: { label: string; path: string };
};

function MenuItem({ item }: MenuItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter(); 
  const mouseY = useMotionValue(Infinity);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.3, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      onClick={() => router.push(item.path)}
      onMouseMove={(e) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (bounds) mouseY.set(e.clientY);
      }}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="cursor-pointer py-2 group block relative pointer-events-auto"
    >
      <span className="text-right block text-sm font-bold tracking-widest uppercase text-zinc-500 transition-colors duration-300 group-hover:text-[#D61F26]">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function MagneticMenu () {
  const { lang } = useLanguage();
  const items = menuTranslations[lang];

  return (
    <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 items-end z-50 mix-blend-difference pointer-events-none">
      {items.map((item) => (
        <MenuItem key={item.label} item={item} />
      ))}
    </div>
  );
}