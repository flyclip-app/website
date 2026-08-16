"use client";

import { ExtensionItem } from "@/data/extensions";
import { X, Copy, Check, Info } from "lucide-react";
import { useState } from "react";

interface Props {
  extension: ExtensionItem | null;
  onClose: () => void;
}

export default function ExtensionModal({ extension, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!extension) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(extension.configYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#1c1e27] border border-[#2d3142] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
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
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">功能描述</span>
            <p className="text-slate-300">{extension.descriptionZh || extension.description}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Config.yaml 扩展配置</span>
              <button
                onClick={handleCopy}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                <span>{copied ? "已复制" : "复制全部"}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed">
              <pre>{extension.configYaml}</pre>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
            <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>安装方式：</strong> 将此配置保存为 <code>Config.yaml</code> 并放入 <code>%APPDATA%\flyclip\extensions\{extension.name}.flyclipext</code> 文件夹内，重启或刷新 FlyClip 即可生效。
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d3142] bg-[#14161d] flex items-center justify-end gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>复制配置代码</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] hover:bg-[#242733] text-slate-300 font-medium text-sm transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
