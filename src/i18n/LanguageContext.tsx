"use client";

import React, { createContext, useContext, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zh } from "./locales/zh";
import { en } from "./locales/en";

export type Language = "zh" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  switchLanguage: (targetLang: Language) => void;
  getLocalizedHref: (href: string) => string;
  t: (path: string, fallback?: string) => string;
}

const translations: Record<Language, any> = {
  zh,
  en,
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "zh",
  setLang: () => {},
  switchLanguage: () => {},
  getLocalizedHref: (href: string) => href,
  t: (path: string, fallback?: string) => fallback || path,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Compute lang directly from URL path
  const isZhPath = pathname === "/zh" || pathname.startsWith("/zh/");
  const lang: Language = isZhPath ? "zh" : "en";

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const getLocalizedHref = useCallback(
    (href: string): string => {
      // External links or hash links
      if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("flyclip:")) {
        return href;
      }

      if (lang === "zh") {
        if (href === "/") return "/zh";
        if (href.startsWith("/zh")) return href;
        return `/zh${href}`;
      } else {
        if (href === "/zh") return "/";
        if (href.startsWith("/zh/")) return href.replace(/^\/zh/, "") || "/";
        return href;
      }
    },
    [lang]
  );

  const switchLanguage = useCallback(
    (targetLang: Language) => {
      localStorage.setItem("flyclip_lang", targetLang);
      document.documentElement.lang = targetLang === "zh" ? "zh-CN" : "en";

      let targetPath = pathname;
      if (targetLang === "zh") {
        if (pathname === "/") {
          targetPath = "/zh";
        } else if (!pathname.startsWith("/zh")) {
          targetPath = `/zh${pathname}`;
        }
      } else {
        if (pathname === "/zh") {
          targetPath = "/";
        } else if (pathname.startsWith("/zh/")) {
          targetPath = pathname.replace(/^\/zh/, "") || "/";
        }
      }

      if (targetPath !== pathname) {
        router.push(targetPath);
      }
    },
    [pathname, router]
  );

  const setLang = useCallback(
    (newLang: Language) => {
      switchLanguage(newLang);
    },
    [switchLanguage]
  );

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
    <LanguageContext.Provider value={{ lang, setLang, switchLanguage, getLocalizedHref, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}
