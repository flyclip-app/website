"use client";

import { useState } from "react";
import { EXTENSIONS_DATA, ExtensionItem } from "@/data/extensions";
import ExtensionCard from "@/components/ExtensionCard";
import ExtensionModal from "@/components/ExtensionModal";
import { Search, Sparkles } from "lucide-react";

export default function ExtensionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedExt, setSelectedExt] = useState<ExtensionItem | null>(null);

  const categories = [
    { id: "all", label: "全部" },
    { id: "translation", label: "翻译词典" },
    { id: "search_ai", label: "搜索与 AI" },
    { id: "text_tools", label: "文本处理" },
    { id: "developer", label: "开发工具" },
    { id: "shopping", label: "电商媒体" },
  ];

  const filtered = EXTENSIONS_DATA.filter((ext) => {
    const matchCat = category === "all" || ext.category === category;
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      ext.name.toLowerCase().includes(q) ||
      ext.id.toLowerCase().includes(q) ||
      (ext.description && ext.description.toLowerCase().includes(q)) ||
      (ext.descriptionZh && ext.descriptionZh.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Extension Marketplace</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">官方与社区扩展中心</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          已为 Windows 深度优化 40+ 个原生扩展，点击「复制 Snippet」或查看配置即可秒级使用。
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-10">
        <div className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="搜索扩展名称、标识符、功能描述或关键词..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1e27] border border-[#2d3142] text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500 shadow-lg"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  category === c.id
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20"
                    : "bg-[#1c1e27] border border-[#2d3142] text-slate-400 hover:text-white hover:border-slate-400"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            找到 {filtered.length} 个扩展
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ext) => (
            <ExtensionCard key={ext.id} extension={ext} onOpenModal={setSelectedExt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#14161d] border border-[#2d3142] rounded-2xl p-8">
          <Sparkles className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">没有找到匹配的扩展</h3>
          <p className="text-sm text-slate-400">尝试更换搜索词或选择其他分类</p>
        </div>
      )}

      {/* Modal */}
      <ExtensionModal extension={selectedExt} onClose={() => setSelectedExt(null)} />
    </div>
  );
}
