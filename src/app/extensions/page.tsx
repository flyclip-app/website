"use client";

import { useState, useMemo } from "react";
import { EXTENSIONS_DATA, ExtensionItem } from "@/data/extensions";
import DirectoryEntry from "@/components/DirectoryEntry";
import ExtensionCard from "@/components/ExtensionCard";
import ExtensionModal from "@/components/ExtensionModal";
import { Search, Sparkles, LayoutList, LayoutGrid, X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

type ArrangeMode = "categories" | "alpha" | "newest";
type ViewMode = "list" | "grid";

interface CategoryMeta {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  icon: string;
}

const CATEGORIES_CONFIG: CategoryMeta[] = [
  { id: "translation", slug: "translation", titleEn: "Translation & Language", titleZh: "翻译与语言", icon: "🌐" },
  { id: "search_ai", slug: "search-ai", titleEn: "Search, Academic & Community", titleZh: "搜索、学术与社区", icon: "🔍" },
  { id: "text_tools", slug: "text-tools", titleEn: "Text Tools & Formatting", titleZh: "文本处理与清洗", icon: "✍️" },
  { id: "developer", slug: "developer", titleEn: "Developer & Engineering Tools", titleZh: "开发者与全栈工具", icon: "⚡" },
  { id: "shopping", slug: "shopping-notes", titleEn: "Notes, Media & Utilities", titleZh: "云笔记、影音与生活", icon: "📦" },
];

export default function ExtensionsPage() {
  const [search, setSearch] = useState("");
  const [arrange, setArrange] = useState<ArrangeMode>("categories");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedExt, setSelectedExt] = useState<ExtensionItem | null>(null);
  const [autoInstall, setAutoInstall] = useState(false);
  const { lang } = useI18n();

  const handleOpenModal = (ext: ExtensionItem, autoTrigger = false) => {
    setSelectedExt(ext);
    setAutoInstall(autoTrigger);
  };

  // Filtered extensions
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return EXTENSIONS_DATA;
    return EXTENSIONS_DATA.filter((ext) => {
      const nameMatch = ext.name.toLowerCase().includes(q) || (ext.nameZh && ext.nameZh.toLowerCase().includes(q)) || (ext.nameEn && ext.nameEn.toLowerCase().includes(q));
      const idMatch = ext.id.toLowerCase().includes(q);
      const descMatch = (ext.description && ext.description.toLowerCase().includes(q)) || (ext.descriptionZh && ext.descriptionZh.toLowerCase().includes(q));
      return nameMatch || idMatch || descMatch;
    });
  }, [search]);

  // Grouped by category
  const categorizedGroups = useMemo(() => {
    const groups: { meta: CategoryMeta; items: ExtensionItem[] }[] = [];
    CATEGORIES_CONFIG.forEach((cat) => {
      const items = filtered.filter((ext) => ext.category === cat.id);
      if (items.length > 0) {
        groups.push({ meta: cat, items });
      }
    });
    return groups;
  }, [filtered]);

  // Grouped by Alphabet (A-Z)
  const alphaGroups = useMemo(() => {
    const map: Record<string, ExtensionItem[]> = {};
    const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach((ext) => {
      const firstChar = (ext.name[0] || "#").toUpperCase();
      const letter = /[A-Z]/.test(firstChar) ? firstChar : "#";
      if (!map[letter]) map[letter] = [];
      map[letter].push(ext);
    });
    return Object.keys(map).sort().map((letter) => ({ letter, items: map[letter] }));
  }, [filtered]);

  // Sorted by newest
  const newestList = useMemo(() => {
    // Return in reverse order as latest additions are listed last in array
    return [...filtered].reverse();
  }, [filtered]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="mb-8 space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <span>✨ FlyClip Extensions Directory</span>
          <span>·</span>
          <span>95+ Official Extensions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === "zh" ? "FlyClip 官方扩展目录" : "FlyClip Extensions Directory"}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          {lang === "zh"
            ? "即时划词快捷动作，支持一键安装、选项参数配置与离线安装包下载。"
            : "Instant text actions for Windows with one-click install, options, and offline packages."}
        </p>
      </div>

      {/* PopClip Style Control Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#14161d] border border-[#2d3142] shadow-xl mb-8 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Left: Arrange mode radio group */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-1">
            {lang === "zh" ? "排列方式:" : "Arrange:"}
          </span>
          <div className="inline-flex p-1 rounded-xl bg-[#1c1e27] border border-[#2d3142]">
            <button
              onClick={() => setArrange("categories")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                arrange === "categories"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang === "zh" ? "分类" : "Categories"}
            </button>
            <button
              onClick={() => setArrange("alpha")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                arrange === "alpha"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang === "zh" ? "A–Z 字母" : "A–Z"}
            </button>
            <button
              onClick={() => setArrange("newest")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                arrange === "newest"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang === "zh" ? "最新添加" : "New"}
            </button>
          </div>
        </div>

        {/* Right: Search Box + View Mode Toggle */}
        <div className="flex items-center gap-2.5 flex-1 sm:max-w-md justify-end">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder={lang === "zh" ? "输入名称或关键词搜索..." : "Type to search..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500 shadow-inner"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* View Mode Toggle (List / Grid) */}
          <div className="inline-flex p-1 rounded-xl bg-[#1c1e27] border border-[#2d3142] flex-shrink-0">
            <button
              onClick={() => setViewMode("list")}
              title={lang === "zh" ? "紧凑列表视图 (PopClip 风格)" : "Compact List View"}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutList size={15} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title={lang === "zh" ? "卡片网格视图" : "Grid Cards View"}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
        <span>
          {lang === "zh"
            ? `显示 ${filtered.length} 个扩展（总计 ${EXTENSIONS_DATA.length} 款）`
            : `Showing ${filtered.length} of ${EXTENSIONS_DATA.length} extensions`}
        </span>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-blue-400 hover:underline text-xs"
          >
            {lang === "zh" ? "清除搜索条件" : "Clear search filter"}
          </button>
        )}
      </div>

      {/* Main Directory Body */}
      {filtered.length > 0 ? (
        <div className="space-y-10">
          {/* Mode 1: Categories Grouped View */}
          {arrange === "categories" &&
            categorizedGroups.map((group) => (
              <section key={group.meta.id} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#2d3142]/80">
                  <span className="text-lg">{group.meta.icon}</span>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {lang === "zh" ? group.meta.titleZh : group.meta.titleEn}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1c1e27] border border-[#2d3142] text-slate-400 font-mono">
                    {group.items.length}
                  </span>
                </div>

                {viewMode === "list" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {group.items.map((ext) => (
                      <DirectoryEntry key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((ext) => (
                      <ExtensionCard key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                    ))}
                  </div>
                )}
              </section>
            ))}

          {/* Mode 2: Alphabetical (A-Z) View */}
          {arrange === "alpha" &&
            alphaGroups.map((group) => (
              <section key={group.letter} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#2d3142]/80">
                  <span className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-400 font-black text-sm flex items-center justify-center">
                    {group.letter}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">({group.items.length})</span>
                </div>

                {viewMode === "list" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {group.items.map((ext) => (
                      <DirectoryEntry key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((ext) => (
                      <ExtensionCard key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                    ))}
                  </div>
                )}
              </section>
            ))}

          {/* Mode 3: Newest / Flat View */}
          {arrange === "newest" && (
            <section className="space-y-3">
              {viewMode === "list" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {newestList.map((ext) => (
                    <DirectoryEntry key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newestList.map((ext) => (
                    <ExtensionCard key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-[#14161d] border border-[#2d3142] rounded-2xl p-8">
          <Sparkles className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            {lang === "zh" ? "没有找到匹配的扩展" : "No matching extensions"}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === "zh" ? "尝试更换搜索词或重置筛选" : "Try searching another keyword or clear filter"}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedExt && (
        <ExtensionModal
          extension={selectedExt}
          onClose={() => setSelectedExt(null)}
          autoTriggerInstall={autoInstall}
        />
      )}
    </div>
  );
}
