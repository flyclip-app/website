"use client";

import { Download, Package, Terminal, Check, Copy } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const { t, lang } = useI18n();

  const copyWinget = () => {
    navigator.clipboard.writeText("winget install FlyClip.FlyClip");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Download Packages</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{t("download.title")}</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          {t("download.subtitle")}
        </p>
      </div>

      {/* Main Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Installer Card */}
        <div className="bg-[#1c1e27] border-2 border-blue-500 rounded-2xl p-7 flex flex-col justify-between relative shadow-2xl">
          <span className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide">
            {lang === "zh" ? "推荐安装" : "Recommended"}
          </span>
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t("download.installerTitle")}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {t("download.installerDesc")}
            </p>
          </div>
          <a
            href="https://github.com/flyclip-app/flyclip/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
          >
            <Download size={16} />
            <span>{lang === "zh" ? "下载 64位 安装包 (约 12MB)" : "Download 64-bit Installer (~12MB)"}</span>
          </a>
        </div>

        {/* Portable Card */}
        <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#14161d] text-slate-300 flex items-center justify-center mb-4">
              <Package size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t("download.portableTitle")}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {t("download.portableDesc")}
            </p>
          </div>
          <a
            href="https://github.com/flyclip-app/flyclip/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#14161d] border border-[#2d3142] hover:bg-[#242733] text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Download size={16} />
            <span>{lang === "zh" ? "下载便携版 (.zip)" : "Download Portable Zip"}</span>
          </a>
        </div>
      </div>

      {/* Winget Package Command */}
      <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-7 space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-bold text-base">
          <Terminal size={18} className="text-blue-400" />
          <h3>{lang === "zh" ? "通过包管理器一行命令安装" : "Install via Package Manager"}</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          {lang === "zh" ? "在 PowerShell 中执行以下命令快速安装或无缝更新：" : "Run this command in PowerShell to install or update:"}
        </p>
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs sm:text-sm text-blue-200">
          <code>winget install FlyClip.FlyClip</code>
          <button
            onClick={copyWinget}
            className="p-1.5 rounded-lg bg-[#1c1e27] hover:bg-[#242733] text-slate-300 hover:text-white transition-colors"
            title="Copy command"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-7 space-y-4">
        <h3 className="font-bold text-white text-base">{t("download.sysReqTitle")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <tbody className="divide-y divide-[#2d3142]">
              <tr>
                <td className="py-2.5 font-semibold text-slate-400 w-36">{lang === "zh" ? "操作系统" : "OS"}</td>
                <td className="py-2.5 text-slate-200">Windows 11 / Windows 10 (64-bit, 1809+)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-400">{lang === "zh" ? "硬件架构" : "Architecture"}</td>
                <td className="py-2.5 text-slate-200">x86_64 / x64, ARM64</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-400">{lang === "zh" ? "内存与磁盘" : "Footprint"}</td>
                <td className="py-2.5 text-slate-200">{lang === "zh" ? "空闲内存 ~15 MB，磁盘 ~30 MB" : "RAM ~15 MB, Disk ~30 MB"}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-400">{lang === "zh" ? "开源协议" : "License"}</td>
                <td className="py-2.5 text-slate-200">MIT License</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
