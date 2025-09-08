import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { i18n, Language, Translations } from '../lib/i18n';

interface I18nContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: string) => string;
  supportedLanguages: Array<{ code: string; name: string; flag: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');
  const [translations, setTranslations] = useState<Translations>(i18n.getTranslations());

  useEffect(() => {
    // Initialize i18n service
    i18n.init().then(() => {
      setLanguageState(i18n.getCurrentLanguage());
      setTranslations(i18n.getTranslations());
    });

    // Subscribe to language changes
    const unsubscribe = i18n.subscribe((newLanguage) => {
      setLanguageState(newLanguage);
      setTranslations(i18n.getTranslations());
    });

    return unsubscribe;
  }, []);

  const setLanguage = async (newLanguage: Language) => {
    await i18n.setLanguage(newLanguage);
  };

  const t = (key: string): string => {
    return i18n.t(key);
  };

  const value: I18nContextType = {
    language,
    translations,
    setLanguage,
    t,
    supportedLanguages: i18n.getSupportedLanguages(),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}