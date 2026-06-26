import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // User requested default language is English ('en')
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem('shengshi_locale');
    return saved === 'zh' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('shengshi_locale', locale);
  }, [locale]);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const t = (key) => {
    if (!translations[locale]) return key;
    return translations[locale][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
