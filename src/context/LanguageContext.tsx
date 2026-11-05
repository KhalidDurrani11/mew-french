import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (frText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => {
      const next = prev === 'fr' ? 'en' : 'fr';
      document.documentElement.lang = next;
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (frText: string, enText: string) => {
    return language === 'en' ? enText : frText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
