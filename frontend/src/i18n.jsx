import React, { createContext, useCallback, useContext, useState } from 'react';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

// All UI strings live in src/locales/*.json. Category names come from the
// backend (data), so they are not part of these files.
const translations = { uz, ru };

export const LANGUAGES = ['uz', 'ru'];

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('lang');
    return LANGUAGES.includes(saved) ? saved : 'uz';
  });

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem('lang', next);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.uz[key] ?? key,
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
