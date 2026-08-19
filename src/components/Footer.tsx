"use client";

import Link from "next/link";
import { Globe, Code, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t, getLocalizedHref } = useI18n();

  return (
    <footer className="border-t border-[#2d3142] bg-[#14161d] text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-lg text-white">FlyClip</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">{t("footer.product")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={getLocalizedHref("/download")} className="hover:text-blue-400 transition-colors">{t("footer.download")}</Link></li>
              <li><Link href={getLocalizedHref("/extensions")} className="hover:text-blue-400 transition-colors">{t("footer.extensions")}</Link></li>
              <li><Link href={getLocalizedHref("/guide")} className="hover:text-blue-400 transition-colors">{t("footer.guide")}</Link></li>
              <li><Link href={getLocalizedHref("/dev")} className="hover:text-blue-400 transition-colors">{t("footer.developers")}</Link></li>
            </ul>
          </div>

          {/* Open Source Repos */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">{t("footer.community")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/flyclip-app/flyclip" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  FlyClip Core App
                </a>
              </li>
              <li>
                <a href="https://github.com/flyclip-app/flyclip-extensions" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Code size={14} /> Official Extensions
                </a>
              </li>
              <li>
                <a href="https://github.com/flyclip-app/website" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Globe size={14} /> Website & Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Open Source & License</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/flyclip-app/flyclip/blob/main/LICENSE" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GPL-3.0 License</a></li>
              <li><Link href={getLocalizedHref("/dev")} className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><ShieldCheck size={14} /> Disclaimer</Link></li>
              <li><Link href={getLocalizedHref("/download")} className="hover:text-blue-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2d3142] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FlyClip. Open-source text selection productivity tool for Windows.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Rust & QuickJS</span>
            <span>•</span>
            <a href="https://github.com/flyclip-app/flyclip" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
