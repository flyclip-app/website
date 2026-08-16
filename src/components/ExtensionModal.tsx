"use client";

import { ExtensionItem, getExtensionPackageName } from "@/data/extensions";
import { X, Copy, Check, Info, Download, Sparkles, Zap, Globe, ArrowRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  extension: ExtensionItem | null;
  autoTriggerInstall?: boolean;
  onClose: () => void;
}

export default function ExtensionModal({ extension, autoTriggerInstall, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const [schemeInvoked, setSchemeInvoked] = useState(false);

  useEffect(() => {
    if (extension && autoTriggerInstall) {
      setSchemeInvoked(true);
    } else {
      setSchemeInvoked(false);
    }
  }, [extension, autoTriggerInstall]);

  if (!extension) return null;

  const pkgName = getExtensionPackageName(extension.id);
  const packageUrl = `https://flyclip-app.github.io/downloads/extensions/${pkgName}.flyclipextz`;
  const schemeInstallUrl = `flyclip://install-extension?url=${encodeURIComponent(packageUrl)}&id=${encodeURIComponent(extension.id)}&name=${encodeURIComponent(extension.name)}`;
  const snippetContent = `# flyclip\n${extension.configYaml}`;
  const schemeDataUrl = `flyclip://install-extension?name=${encodeURIComponent(extension.name)}&data=${encodeURIComponent(snippetContent)}`;
  const downloadUrl = `/downloads/extensions/${pkgName}.flyclipextz`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerScheme = () => {
    setSchemeInvoked(true);
    try {
      window.location.href = schemeInstallUrl;
    } catch (_) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#1c1e27] border border-[#2d3142] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#2d3142] flex items-center justify-between bg-[#14161d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1c1e27] border border-[#2d3142] flex items-center justify-center font-bold text-blue-400">
              {extension.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">{extension.name}</h3>
              <p className="text-xs text-slate-500 font-mono">{extension.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Active Invocation Banner if triggered */}
          {schemeInvoked && (
            <div className="p-4 rounded-xl bg-blue-500/15 border border-blue-500/30 text-xs sm:text-sm text-blue-200 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Zap size={16} className="text-amber-400 animate-pulse" />
                  <span>正在尝试呼起 FlyClip 客户端安装...</span>
                </div>
                <button
                  onClick={triggerScheme}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  重新呼起
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                若您的浏览器未弹出应用授权确认，或您的电脑尚未安装 FlyClip，请直接{" "}
                <Link href="/download" className="text-blue-400 underline hover:text-blue-300">下载客户端</Link>
                {" "}或选择下方【方式二：下载离线扩展包】进行手动安装。
              </p>
            </div>
          )}

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">功能描述</span>
            <p className="text-slate-300">{extension.descriptionZh || extension.description}</p>
          </div>

          {/* Installation Methods */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              安装与更新方式
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Method 1: URL Scheme Online Package */}
              <div className="p-4 rounded-xl bg-[#14161d] border border-blue-500/40 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Zap size={14} className="text-amber-400" />
                    <span>方式一：新标签页一键安装 (推荐)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    在新页面中打开并唤起 <code>flyclip://</code> 协议，自动绑定更新源。
                  </p>
                </div>
                <Link
                  href={`/install?id=${encodeURIComponent(extension.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-500/20"
                >
                  <Zap size={13} className="text-amber-300" />
                  <span>在新标签页中打开安装</span>
                  <ExternalLink size={12} />
                </Link>
              </div>

              {/* Method 2: Offline Package */}
              <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Download size={14} className="text-blue-400" />
                    <span>方式二：下载离线包 (.flyclipextz)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    下载 <code>{pkgName}.flyclipextz</code> 文件，双击或拖入 FlyClip 窗口即可完成安装。
                  </p>
                </div>
                <a
                  href={downloadUrl}
                  download={`${pkgName}.flyclipextz`}
                  className="w-full py-2 px-3 rounded-lg bg-[#1c1e27] border border-[#2d3142] hover:border-slate-400 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download size={13} />
                  <span>下载离线文件</span>
                </a>
              </div>
            </div>
          </div>

          {/* Snippet Viewer */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                方式三：划选即装 Snippet (直接用鼠标划选下方文本即可)
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={schemeDataUrl}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                >
                  <Zap size={12} />
                  <span>载入 Snippet</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  <span>{copied ? "已复制" : "复制代码"}</span>
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed select-all">
              <pre>{snippetContent}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d3142] bg-[#14161d] flex items-center justify-between gap-3">
          <Link
            href="/download"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
          >
            <span>还没有 FlyClip 客户端？立即下载</span>
            <ArrowRight size={13} />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={downloadUrl}
              download={`${pkgName}.flyclipextz`}
              className="px-3.5 py-1.5 rounded-lg bg-[#1c1e27] border border-[#2d3142] hover:bg-[#242733] text-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>下载离线包</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
