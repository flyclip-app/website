"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { zh } from "./locales/zh";
import { en } from "./locales/en";

export type Language = "zh" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (path: string, fallback?: string) => string;
}

const translations: Record<Language, any> = {
  zh,
  en,
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "zh",
  setLang: () => {},
  toggleLang: () => {},
  t: (path: string, fallback?: string) => fallback || path,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("flyclip_lang") as Language;
    if (saved === "zh" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved === "zh" ? "zh-CN" : "en";
    } else {
      const browserLang = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "zh";
      const initial = browserLang.startsWith("zh") ? "zh" : "en";
      setLangState(initial);
      document.documentElement.lang = initial === "zh" ? "zh-CN" : "en";
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("flyclip_lang", newLang);
    document.documentElement.lang = newLang === "zh" ? "zh-CN" : "en";
  }, []);

  const toggleLang = useCallback(() => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
  }, [lang, setLang]);

  const t = useCallback(
    (path: string, fallback?: string): string => {
      const dict = translations[lang] || translations.zh;
      const keys = path.split(".");
      let current: any = dict;
      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k];
        } else {
          return fallback !== undefined ? fallback : path;
        }
      }
      return typeof current === "string" ? current : fallback || path;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}
