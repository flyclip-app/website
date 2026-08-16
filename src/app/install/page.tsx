"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EXTENSIONS_DATA, getExtensionPackageName, ExtensionItem } from "@/data/extensions";
import Link from "next/link";
import { Download, Zap, Check, Copy, ArrowLeft, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

function InstallContent() {
  const searchParams = useSearchParams();
  const extId = searchParams.get("id") || "";
  const [copied, setCopied] = useState(false);
  const [invoked, setInvoked] = useState(false);

  const extension = EXTENSIONS_DATA.find((e) => e.id === extId) || EXTENSIONS_DATA[0];
  const pkgName = getExtensionPackageName(extension.id);
  const packageUrl = `https://flyclip-app.github.io/downloads/extensions/${pkgName}.flyclipextz`;
  const schemeInstallUrl = `flyclip://install-extension?url=${encodeURIComponent(packageUrl)}&id=${encodeURIComponent(extension.id)}&name=${encodeURIComponent(extension.name)}`;
  const snippetContent = `# flyclip\n${extension.configYaml}`;
  const downloadUrl = `/downloads/extensions/${pkgName}.flyclipextz`;

  // Auto trigger protocol scheme once upon opening this tab
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        window.location.href = schemeInstallUrl;
        setInvoked(true);
      } catch (_) {}
    }, 500);
    return () => clearTimeout(timer);
  }, [schemeInstallUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerScheme = () => {
    try {
      window.location.href = schemeInstallUrl;
      setInvoked(true);
    } catch (_) {}
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col justify-center">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/extensions"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>返回扩展中心列表</span>
        </Link>
      </div>

      {/* Main Install Card */}
      <div className="bg-[#1c1e27] border border-[#2d3142] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Header with Icon */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#2d3142]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#14161d] border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/10">
              {extension.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{extension.name}</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5">{extension.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              官方认证扩展
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              自动更新就绪
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">扩展功能说明</span>
          <p className="text-base text-slate-200 leading-relaxed">
            {extension.descriptionZh || extension.description}
          </p>
        </div>

        {/* Status Callout */}
        <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Zap size={16} className="text-amber-400 animate-pulse" />
              <span>正在呼起 FlyClip 客户端一键安装...</span>
            </div>
            <p className="text-xs text-slate-400">
              若浏览器弹出应用授权窗口，请点击「打开 FlyClip」确认。
            </p>
          </div>

          <button
            onClick={triggerScheme}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/25 flex-shrink-0"
          >
            <Zap size={15} className="text-amber-300" />
            <span>重新呼起 FlyClip</span>
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Download Offline Package */}
          <div className="p-5 rounded-2xl bg-[#14161d] border border-[#2d3142] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Download size={15} className="text-blue-400" />
                <span>离线扩展包 (.flyclipextz)</span>
              </h3>
              <p className="text-xs text-slate-400">
                下载后双击文件即可完成安装，无需浏览器协议授权。
              </p>
            </div>
            <a
              href={downloadUrl}
              download={`${pkgName}.flyclipextz`}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] hover:border-slate-400 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={14} />
              <span>下载 {pkgName}.flyclipextz</span>
            </a>
          </div>

          {/* Download App Client */}
          <div className="p-5 rounded-2xl bg-[#14161d] border border-[#2d3142] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>还没有 FlyClip 客户端？</span>
              </h3>
              <p className="text-xs text-slate-400">
                完全免费开源，单文件 15MB 内存常驻，Windows 划词利器。
              </p>
            </div>
            <Link
              href="/download"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Download size={14} />
              <span>下载 FlyClip 客户端</span>
            </Link>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              扩展配置代码 (支持鼠标划选即装)
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
            >
              {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
              <span>{copied ? "已复制到剪贴板" : "复制代码"}</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed select-all">
            <pre>{snippetContent}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstallPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-slate-400 text-sm">
          正在加载扩展安装页面...
        </div>
      }
    >
      <InstallContent />
    </Suspense>
  );
}
