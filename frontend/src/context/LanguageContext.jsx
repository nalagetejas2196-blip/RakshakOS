import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import mr from '../locales/mr.json';
import hi from '../locales/hi.json';

const translations = { en, mr, hi };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('rakshakos_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('rakshakos_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, fallback = '') => {
    const dict = translations[lang] || translations.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
