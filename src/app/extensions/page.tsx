"use client";

import { useState, useMemo } from "react";
import { EXTENSIONS_DATA, ExtensionItem } from "@/data/extensions";
import DirectoryEntry from "@/components/DirectoryEntry";
import ExtensionModal from "@/components/ExtensionModal";
import { Search, Sparkles, X, Filter } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

type ArrangeMode = "categories" | "alpha" | "newest";

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
  { id: "developer", slug: "developer", titleEn: "Developer & Engineering", titleZh: "开发与工程工具", icon: "⚡" },
  { id: "shopping", slug: "shopping-notes", titleEn: "Notes, Media & Utilities", titleZh: "云笔记、影音与生活", icon: "📦" },
];

export default function ExtensionsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [arrange, setArrange] = useState<ArrangeMode>("categories");
  const [selectedExt, setSelectedExt] = useState<ExtensionItem | null>(null);
  const [autoInstall, setAutoInstall] = useState(false);
  const { lang } = useI18n();

  const handleOpenModal = (ext: ExtensionItem, autoTrigger = false) => {
    setSelectedExt(ext);
    setAutoInstall(autoTrigger);
  };

  // Category counts for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: EXTENSIONS_DATA.length };
    CATEGORIES_CONFIG.forEach((cat) => {
      counts[cat.id] = EXTENSIONS_DATA.filter((e) => e.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filtered extensions
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return EXTENSIONS_DATA.filter((ext) => {
      const matchCat = selectedCategory === "all" || ext.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const nameMatch =
        ext.name.toLowerCase().includes(q) ||
        (ext.nameZh && ext.nameZh.toLowerCase().includes(q)) ||
        (ext.nameEn && ext.nameEn.toLowerCase().includes(q));
      const idMatch = ext.id.toLowerCase().includes(q);
      const descMatch =
        (ext.description && ext.description.toLowerCase().includes(q)) ||
        (ext.descriptionZh && ext.descriptionZh.toLowerCase().includes(q));
      return nameMatch || idMatch || descMatch;
    });
  }, [search, selectedCategory]);

  // Grouped by category
  const categorizedGroups = useMemo(() => {
    const groups: { meta: CategoryMeta; items: ExtensionItem[] }[] = [];
    CATEGORIES_CONFIG.forEach((cat) => {
      if (selectedCategory !== "all" && selectedCategory !== cat.id) return;
      const items = filtered.filter((ext) => ext.category === cat.id);
      if (items.length > 0) {
        groups.push({ meta: cat, items });
      }
    });
    return groups;
  }, [filtered, selectedCategory]);

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
    return [...filtered].reverse();
  }, [filtered]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === "zh" ? "FlyClip 官方扩展目录" : "FlyClip Extensions Directory"}
        </h1>
        <p className="text-slate-400 text-sm">
          {lang === "zh"
            ? "即时划词快捷动作，点击扩展名称查看详情与参数，支持一键安装。"
            : "Instant text actions for Windows. Click extension name to view details & options."}
        </p>
      </div>

      {/* Control Box: Search on Top, Category Chips + Arrange on Bottom */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#14161d] border border-[#2d3142] shadow-lg mb-6 space-y-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder={
              lang === "zh"
                ? "输入名称、关键词或 ID 快速筛选扩展..."
                : "Filter by name, keyword or description..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Filter Chips & Arrange Mode Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pt-1 border-t border-[#2d3142]/60">
          {/* Category Chips (TextGo / PopClip style) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-slate-400 mr-1 flex-shrink-0">
              <Filter size={13} className="text-blue-400" />
              <span>{lang === "zh" ? "分类:" : "Category:"}</span>
            </div>

            {/* All chip */}
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "bg-[#1c1e27] text-slate-400 hover:text-white hover:bg-[#252836] border border-[#2d3142]"
              }`}
            >
              {lang === "zh" ? "全部" : "All"}
              <span className="ml-1 opacity-70 text-[10px]">({categoryCounts.all})</span>
            </button>

            {/* Individual Category Chips */}
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "bg-[#1c1e27] text-slate-400 hover:text-white hover:bg-[#252836] border border-[#2d3142]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{lang === "zh" ? cat.titleZh : cat.titleEn}</span>
                <span className="opacity-70 text-[10px]">({categoryCounts[cat.id] || 0})</span>
              </button>
            ))}
          </div>

          {/* Arrange Toggle Buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0 self-start lg:self-auto">
            <span className="text-xs text-slate-400 mr-0.5">
              {lang === "zh" ? "排列:" : "Sort:"}
            </span>
            <div className="inline-flex p-0.5 rounded-lg bg-[#1c1e27] border border-[#2d3142]">
              <button
                onClick={() => setArrange("categories")}
                className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-all ${
                  arrange === "categories"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang === "zh" ? "分类" : "Categories"}
              </button>
              <button
                onClick={() => setArrange("alpha")}
                className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-all ${
                  arrange === "alpha"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang === "zh" ? "A–Z" : "A–Z"}
              </button>
              <button
                onClick={() => setArrange("newest")}
                className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-all ${
                  arrange === "newest"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang === "zh" ? "最新" : "New"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-5 px-1">
        <span>
          {lang === "zh"
            ? `显示 ${filtered.length} 个扩展（总计 ${EXTENSIONS_DATA.length} 款）`
            : `Showing ${filtered.length} of ${EXTENSIONS_DATA.length} extensions`}
        </span>
        {(search || selectedCategory !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
            className="text-blue-400 hover:underline text-xs"
          >
            {lang === "zh" ? "重置所有筛选" : "Reset filters"}
          </button>
        )}
      </div>

      {/* Single Column 1-Per-Row Directory List */}
      {filtered.length > 0 ? (
        <div className="space-y-8">
          {/* Mode 1: Categories Mode */}
          {arrange === "categories" &&
            categorizedGroups.map((group) => (
              <section key={group.meta.id} className="space-y-2">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#2d3142]">
                  <span className="text-base">{group.meta.icon}</span>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {lang === "zh" ? group.meta.titleZh : group.meta.titleEn}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#14161d] border border-[#2d3142] text-slate-400 font-mono">
                    {group.items.length}
                  </span>
                </div>

                <div className="flex flex-col space-y-1 divide-y divide-[#2d3142]/30">
                  {group.items.map((ext) => (
                    <DirectoryEntry key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                  ))}
                </div>
              </section>
            ))}

          {/* Mode 2: A-Z Mode */}
          {arrange === "alpha" &&
            alphaGroups.map((group) => (
              <section key={group.letter} className="space-y-2">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#2d3142]">
                  <span className="w-6 h-6 rounded-md bg-blue-600/15 border border-blue-500/30 text-blue-400 font-black text-xs flex items-center justify-center">
                    {group.letter}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">({group.items.length})</span>
                </div>

                <div className="flex flex-col space-y-1 divide-y divide-[#2d3142]/30">
                  {group.items.map((ext) => (
                    <DirectoryEntry key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                  ))}
                </div>
              </section>
            ))}

          {/* Mode 3: Newest Mode */}
          {arrange === "newest" && (
            <section className="space-y-2">
              <div className="flex flex-col space-y-1 divide-y divide-[#2d3142]/30">
                {newestList.map((ext) => (
                  <DirectoryEntry key={ext.id} extension={ext} onOpenModal={handleOpenModal} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Empty Search State */
        <div className="text-center py-16 bg-[#14161d] border border-[#2d3142] rounded-xl p-8">
          <Sparkles className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white mb-1">
            {lang === "zh" ? "没有找到匹配的扩展" : "No matching extensions"}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === "zh" ? "尝试更换搜索词或重置分类筛选" : "Try another keyword or reset category filter"}
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
