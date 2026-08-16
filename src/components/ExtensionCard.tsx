"use client";

import { ExtensionItem, getExtensionPackageName } from "@/data/extensions";
import { Download, Eye, Settings, Zap } from "lucide-react";
import Link from "next/link";

interface Props {
  extension: ExtensionItem;
  onOpenModal: (ext: ExtensionItem, autoTriggerInstall?: boolean) => void;
}

export default function ExtensionCard({ extension, onOpenModal }: Props) {
  const pkgName = getExtensionPackageName(extension.id);
  const downloadUrl = `/downloads/extensions/${pkgName}.flyclipextz`;
  const installPageUrl = `/install?id=${encodeURIComponent(extension.id)}`;

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
          {/* Primary: 1-Click Install with target _blank */}
          <Link
            href={installPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="在新标签页中打开并呼起客户端一键安装"
            className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Zap size={13} className="text-amber-300" />
            <span>一键安装</span>
          </Link>

          {/* Fallback 1: Direct File Download */}
          <a
            href={downloadUrl}
            download={`${pkgName}.flyclipextz`}
            title="下载离线 .flyclipextz 文件"
            className="p-1.5 rounded-lg bg-[#14161d] border border-[#2d3142] hover:border-slate-400 text-slate-300 hover:text-white transition-colors"
          >
            <Download size={14} />
          </a>

          {/* Fallback 2: Details Modal */}
          <button
            onClick={() => onOpenModal(extension, false)}
            title="查看扩展详情与源码"
            className="py-1.5 px-2.5 rounded-lg bg-[#14161d] border border-[#2d3142] hover:border-slate-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Eye size={13} />
            <span>详情</span>
          </button>
        </div>
      </div>
    </div>
  );
}
