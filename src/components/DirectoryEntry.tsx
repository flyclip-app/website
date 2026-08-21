"use client";

import { ExtensionItem, getExtensionPackageName } from "@/data/extensions";
import { Download, Settings, Zap } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";
import ExtensionIcon from "@/components/ExtensionIcon";

interface Props {
  extension: ExtensionItem;
  onOpenModal: (ext: ExtensionItem, autoTriggerInstall?: boolean) => void;
}

export default function DirectoryEntry({ extension, onOpenModal }: Props) {
  const { lang } = useI18n();
  const pkgName = getExtensionPackageName(extension.id);
  const packageUrl = `https://flyclip-app.github.io/downloads/extensions/${pkgName}.flyclipextz`;
  const schemeInstallUrl = `flyclip://install-extension?url=${encodeURIComponent(packageUrl)}&id=${encodeURIComponent(extension.id)}&name=${encodeURIComponent(extension.name)}`;
  const downloadUrl = `/downloads/extensions/${pkgName}.flyclipextz`;

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.open(schemeInstallUrl, "_blank");
    } catch (_) {}
    onOpenModal(extension, true);
  };

  const displayName = lang === "en" ? (extension.nameEn || extension.name) : (extension.nameZh || extension.name);
  const displayDesc = lang === "en" ? (extension.description || extension.descriptionZh) : (extension.descriptionZh || extension.description);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "js":
        return { label: "JS", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "url":
        return { label: "URL", bg: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
      case "powershell":
        return { label: "PS", bg: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "keys":
        return { label: "Keys", bg: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      default:
        return { label: type.toUpperCase(), bg: "bg-slate-800 text-slate-400 border-slate-700" };
    }
  };

  const typeBadge = getTypeBadge(extension.type);

  return (
    <div className="flex items-center gap-3 sm:gap-4 py-2.5 px-3 rounded-xl hover:bg-[#14161d] border border-transparent hover:border-[#2d3142] transition-colors group">
      {/* Download Icon Button */}
      <a
        href={downloadUrl}
        download={`${pkgName}.flyclipextz`}
        title={lang === "zh" ? `下载离线安装包 (${pkgName}.flyclipextz)` : `Download ${pkgName}.flyclipextz`}
        className="w-8 h-8 rounded-lg bg-[#14161d] border border-[#2d3142] hover:border-blue-500 text-slate-400 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-sm"
      >
        <Download size={14} />
      </a>

      {/* Extension Icon */}
      <div
        onClick={() => onOpenModal(extension, false)}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14161d] border border-[#2d3142] flex items-center justify-center font-bold text-blue-400 group-hover:border-blue-500/40 transition-colors flex-shrink-0 cursor-pointer shadow-sm"
      >
        <ExtensionIcon icon={extension.icon} name={extension.name} className="w-5 h-5" size={20} />
      </div>

      {/* Main Column: Name + Description */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenModal(extension, false)}
            className="font-bold text-slate-100 text-sm sm:text-base hover:text-blue-400 text-left transition-colors cursor-pointer"
          >
            {displayName}
          </button>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${typeBadge.bg}`}>
            {typeBadge.label}
          </span>
          {extension.hasOptions && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-0.5">
              <Settings size={10} />
              <span>{lang === "zh" ? "选项" : "Options"}</span>
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* Quick Install Action Button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleInstallClick}
          title={lang === "zh" ? "一键呼起 FlyClip 客户端安装" : "One-click install into FlyClip"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <Zap size={12} className="text-amber-300" />
          <span className="hidden sm:inline">{lang === "zh" ? "一键安装" : "Install"}</span>
        </button>
      </div>
    </div>
  );
}
