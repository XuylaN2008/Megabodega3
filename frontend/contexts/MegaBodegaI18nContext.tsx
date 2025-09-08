import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { megaBodegaI18n, Language } from '../lib/megabodega-i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: string) => string;
  languages: Array<{ code: string; name: string; flag: string; nativeName: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useMegaBodegaI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useMegaBodegaI18n must be used within an I18nProvider');
  }
  return context;
}

interface I18nProviderProps {
  children: ReactNode;
}

export function MegaBodegaI18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    megaBodegaI18n.init().then(() => {
      setLanguageState(megaBodegaI18n.getCurrentLanguage());
    });

    const unsubscribe = megaBodegaI18n.subscribe((newLanguage) => {
      setLanguageState(newLanguage);
    });

    return unsubscribe;
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    await megaBodegaI18n.setLanguage(newLanguage);
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t: (key: string) => megaBodegaI18n.t(key),
    languages: megaBodegaI18n.getLanguages(),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}