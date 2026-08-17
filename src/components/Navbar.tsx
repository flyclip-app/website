"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sun, Moon, Download, Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useI18n();

  useEffect(() => {
    const saved = localStorage.getItem("flyclip_theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("flyclip_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.extensions"), href: "/extensions" },
    { name: t("nav.guide"), href: "/guide" },
    { name: t("nav.dev"), href: "/dev" },
    { name: t("nav.download"), href: "/download" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0e12]/80 dark:bg-[#0d0e12]/80 backdrop-blur-md border-b border-[#2d3142] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-lg">F</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">FlyClip</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#2d3142] bg-[#14161d] text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500 transition-colors"
            title={lang === "zh" ? "Switch to English" : "切换为中文"}
          >
            <Globe size={14} className="text-blue-400" />
            <span>{lang === "zh" ? "EN" : "中"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2d3142] bg-[#14161d] text-slate-300 hover:text-white hover:border-blue-500 transition-colors"
            title={t("nav.toggleTheme")}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href="https://github.com/flyclip-app/flyclip"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#2d3142] bg-[#14161d] text-slate-300 hover:text-white hover:border-blue-500 transition-colors"
            title={t("nav.github")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>

          <Link
            href="/download"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            <Download size={16} />
            <span>{t("nav.downloadApp")}</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#2d3142] bg-[#14161d] text-slate-300"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2d3142] bg-[#14161d] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm"
          >
            <Download size={16} />
            <span>下载客户端</span>
          </Link>
        </div>
      )}
    </header>
  );
}
