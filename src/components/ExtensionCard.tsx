"use client";

import { ExtensionItem } from "@/data/extensions";
import { Copy, Eye, Settings, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  extension: ExtensionItem;
  onOpenModal: (ext: ExtensionItem) => void;
}

export default function ExtensionCard({ extension, onOpenModal }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(extension.configYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "translation": return "翻译词典";
      case "search_ai": return "搜索与AI";
      case "text_tools": return "文本处理";
      case "developer": return "开发工具";
      case "shopping": return "电商媒体";
      default: return "通用";
    }
  };

  return (
    <div className="bg-[#1c1e27] border border-[#2d3142] hover:border-blue-500/60 rounded-xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl group">
      <div>
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-lg bg-[#14161d] border border-[#2d3142] flex items-center justify-center font-bold text-base text-blue-400 group-hover:border-blue-500/40 transition-colors flex-shrink-0">
            {extension.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-100 text-base leading-snug truncate">{extension.name}</h3>
            <p className="text-xs text-slate-500 font-mono truncate">{extension.id}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {extension.descriptionZh || extension.description}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded bg-[#14161d] text-slate-400 border border-[#2d3142]">
            {getCategoryLabel(extension.category)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#14161d] text-slate-400 border border-[#2d3142]">
            {extension.type.toUpperCase()}
          </span>
          {extension.hasOptions && (
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Settings size={11} /> 选项配置
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-[#2d3142] flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            <span>{copied ? "已复制 Snippet" : "复制 Snippet"}</span>
          </button>
          <button
            onClick={() => onOpenModal(extension)}
            className="py-1.5 px-3 rounded-lg bg-[#14161d] border border-[#2d3142] hover:border-slate-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Eye size={13} />
            <span>详情</span>
          </button>
        </div>
      </div>
    </div>
  );
}
