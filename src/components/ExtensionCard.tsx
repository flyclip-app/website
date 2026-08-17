"use client";

import { ExtensionItem, getExtensionPackageName } from "@/data/extensions";
import { Download, Eye, Settings, Zap } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

interface Props {
  extension: ExtensionItem;
  onOpenModal: (ext: ExtensionItem, autoTriggerInstall?: boolean) => void;
}

export default function ExtensionCard({ extension, onOpenModal }: Props) {
  const { lang, t } = useI18n();
  const pkgName = getExtensionPackageName(extension.id);
  const packageUrl = `https://flyclip-app.github.io/downloads/extensions/${pkgName}.flyclipextz`;
  const schemeInstallUrl = `flyclip://install-extension?url=${encodeURIComponent(packageUrl)}&id=${encodeURIComponent(extension.id)}&name=${encodeURIComponent(extension.name)}`;
  const downloadUrl = `/downloads/extensions/${pkgName}.flyclipextz`;

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      window.open(schemeInstallUrl, "_blank");
    } catch (_) {}
    onOpenModal(extension, true);
  };

  const getCategoryLabel = (cat: string) => {
    if (lang === "en") {
      switch (cat) {
        case "translation": return "Translation";
        case "search_ai": return "Search & AI";
        case "text_tools": return "Productivity";
        case "developer": return "Developer";
        case "shopping": return "Utilities";
        default: return "General";
      }
    }
    switch (cat) {
      case "translation": return "翻译词典";
      case "search_ai": return "搜索与AI";
      case "text_tools": return "文本处理";
      case "developer": return "开发工具";
      case "shopping": return "电商媒体";
      default: return "通用";
    }
  };

  const getTypeLabel = (type: string) => {
    if (lang === "en") {
      switch (type) {
        case "js": return "JavaScript";
        case "url": return "URL Action";
        case "powershell": return "PowerShell";
        case "keys": return "Key Combo";
        default: return type.toUpperCase();
      }
    }
    switch (type) {
      case "js": return "JavaScript";
      case "url": return "URL 模板";
      case "powershell": return "PowerShell";
      case "keys": return "快捷键";
      default: return type.toUpperCase();
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
            <h3 className="font-bold text-slate-100 text-base leading-snug truncate">
              {lang === "en" ? (extension.nameEn || extension.name) : (extension.nameZh || extension.name)}
            </h3>
            <p className="text-xs text-slate-500 font-mono truncate">{extension.id}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {lang === "en" ? (extension.description || extension.descriptionZh) : (extension.descriptionZh || extension.description)}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded bg-[#14161d] text-slate-400 border border-[#2d3142]">
            {getCategoryLabel(extension.category)}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
            extension.type === "js"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : extension.type === "url"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : extension.type === "powershell"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-[#14161d] text-slate-400 border-[#2d3142]"
          }`}>
            {getTypeLabel(extension.type)}
          </span>
          {extension.hasOptions && (
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Settings size={11} /> {lang === "zh" ? "选项配置" : "Options"}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-[#2d3142] flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            title={lang === "zh" ? "一键打开安装引导并唤起客户端" : "One-click install into FlyClip"}
            className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Zap size={13} className="text-amber-300" />
            <span>{t("extensions.installBtn")}</span>
          </button>

          <a
            href={downloadUrl}
            download={`${pkgName}.flyclipextz`}
            title={lang === "zh" ? "下载离线 .flyclipextz 文件" : "Download offline .flyclipextz file"}
            className="p-1.5 rounded-lg bg-[#14161d] border border-[#2d3142] hover:border-slate-400 text-slate-300 hover:text-white transition-colors"
          >
            <Download size={14} />
          </a>

          <button
            onClick={() => onOpenModal(extension, false)}
            title={lang === "zh" ? "查看扩展详情与源码" : "View details and source"}
            className="py-1.5 px-2.5 rounded-lg bg-[#14161d] border border-[#2d3142] hover:border-slate-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Eye size={13} />
            <span>{lang === "zh" ? "详情" : "Details"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
