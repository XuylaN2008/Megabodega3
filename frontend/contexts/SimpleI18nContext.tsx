import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { i18n, Language } from '../lib/simple-i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: string) => string;
  languages: Array<{ code: string; name: string; flag: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useSimpleI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useSimpleI18n must be used within an I18nProvider');
  }
  return context;
}

interface I18nProviderProps {
  children: ReactNode;
}

export function SimpleI18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    i18n.init().then(() => {
      setLanguageState(i18n.getCurrentLanguage());
    });
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    await i18n.setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t: (key: string) => i18n.t(key),
    languages: i18n.getLanguages(),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}