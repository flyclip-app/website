"use client";

import { ExtensionItem, getExtensionPackageName } from "@/data/extensions";
import { X, Copy, Check, Info, Download, Sparkles, Zap, FolderCheck } from "lucide-react";
import { useState } from "react";

interface Props {
  extension: ExtensionItem | null;
  onClose: () => void;
}

export default function ExtensionModal({ extension, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!extension) return null;

  const pkgName = getExtensionPackageName(extension.id);
  const downloadUrl = `/downloads/extensions/${pkgName}.flyclipextz`;
  const snippetContent = `# flyclip\n${extension.configYaml}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">功能描述</span>
            <p className="text-slate-300">{extension.descriptionZh || extension.description}</p>
          </div>

          {/* Installation Methods (PopClip / Modern Standard) */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">推荐安装方式</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Method 1: Package Download */}
              <div className="p-4 rounded-xl bg-[#14161d] border border-blue-500/30 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Download size={14} className="text-blue-400" />
                    <span>方式一：下载扩展包 (推荐)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    下载 <code>{pkgName}.flyclipextz</code>，双击或拖入 FlyClip 即可自动安装并支持后续版本检查更新。
                  </p>
                </div>
                <a
                  href={downloadUrl}
                  download={`${pkgName}.flyclipextz`}
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-500/20"
                >
                  <Download size={13} />
                  <span>下载 .flyclipextz 包</span>
                </a>
              </div>

              {/* Method 2: Magic Selection Snippet */}
              <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>方式二：划词即装 Snippet</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    用鼠标直接<strong>划选下方配置代码块</strong>，FlyClip 动作栏会自动亮起「安装扩展」魔法按钮，点击即刻安装！
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="w-full py-2 px-3 rounded-lg bg-[#1c1e27] border border-[#2d3142] hover:border-slate-400 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  <span>{copied ? "已复制 Snippet" : "复制 Snippet 代码"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                扩展配置源码 (可直接鼠标划选安装)
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                <span>{copied ? "已复制" : "复制代码"}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed select-all">
              <pre>{snippetContent}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d3142] bg-[#14161d] flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline">
            文件格式：.flyclipext / .flyclipextz
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={downloadUrl}
              download={`${pkgName}.flyclipextz`}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Download size={15} />
              <span>下载安装包</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] hover:bg-[#242733] text-slate-300 font-medium text-xs sm:text-sm transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
