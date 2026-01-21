"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('es');

  // 1. Load from LocalStorage on start
  useEffect(() => {
    const savedLang = localStorage.getItem('site-lang') as Language;
    if (savedLang) {
      setLangState(savedLang);
    }
  }, []);

  // 2. Save to LocalStorage whenever it changes
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('site-lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook to make it easy to use
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}