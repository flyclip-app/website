"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useI18n } from "@/i18n/LanguageContext";
import { getDevNav, getGuideNav } from "@/data/docsNav";

export interface NavSection {
  title: string;
  items: {
    title: string;
    href: string;
    badge?: string;
  }[];
}

interface Props {
  sections?: NavSection[];
  basePath: string;
}

export default function DocsSidebar({ sections, basePath }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, getLocalizedHref } = useI18n();

  const activeSections = useMemo(() => {
    if (basePath === "/dev" || basePath === "/zh/dev") return getDevNav(lang);
    if (basePath === "/guide" || basePath === "/zh/guide") return getGuideNav(lang);
    return sections || [];
  }, [basePath, lang, sections]);

  return (
    <>
      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden sticky top-16 z-40 bg-[#14161d] border-b border-[#2d3142] px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
          <span>{lang === "zh" ? "文档导航目录" : "Documentation Menu"}</span>
        </button>
        <span className="text-xs text-slate-500">FlyClip Docs</span>
      </div>

      {/* Sidebar Content */}
      <aside
        className={`fixed lg:sticky top-16 z-30 lg:z-auto h-[calc(100vh-4rem)] w-64 flex-shrink-0 bg-[#0d0e12] lg:bg-transparent border-r border-[#2d3142] overflow-y-auto px-4 py-6 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {activeSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const localizedHref = getLocalizedHref(item.href);
                  const isActive = pathname === localizedHref || pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={localizedHref}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-500/10 text-blue-400 font-semibold border-l-2 border-blue-500 rounded-l-none"
                            : "text-slate-400 hover:text-slate-200 hover:bg-[#1c1e27]"
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}
    </>
  );
}
