"use client";

import { Download, Package, Terminal, Check, Copy } from "lucide-react";
import { useState } from "react";

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);

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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">下载 FlyClip for Windows</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          当前稳定版：<strong>v1.0.0 (x64)</strong> · 适用于 Windows 10 与 Windows 11
        </p>
      </div>

      {/* Main Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Installer Card */}
        <div className="bg-[#1c1e27] border-2 border-blue-500 rounded-2xl p-7 flex flex-col justify-between relative shadow-2xl">
          <span className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide">
            推荐安装
          </span>
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Windows 安装程序 (.msi)</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              包含完整的开机自启、开始菜单快捷方式与文件格式关联支持。
            </p>
          </div>
          <a
            href="https://github.com/flyclip-app/flyclip/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
          >
            <Download size={16} />
            <span>下载 64位 安装包 (约 12MB)</span>
          </a>
        </div>

        {/* Portable Card */}
        <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#14161d] text-slate-300 flex items-center justify-center mb-4">
              <Package size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">便携免安装版 (.zip)</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              解压即用，不写入注册表，适合存放在 U 盘或自定义目录中随身携带。
            </p>
          </div>
          <a
            href="https://github.com/flyclip-app/flyclip/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#14161d] border border-[#2d3142] hover:bg-[#242733] text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Download size={16} />
            <span>下载便携版 (.zip)</span>
          </a>
        </div>
      </div>

      {/* Winget Package Command */}
      <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-7 space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-bold text-base">
          <Terminal size={18} className="text-blue-400" />
          <h3>通过包管理器一行命令安装</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">在 PowerShell 中执行以下命令快速安装或无缝更新：</p>
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs sm:text-sm text-blue-200">
          <code>winget install FlyClip.FlyClip</code>
          <button
            onClick={copyWinget}
            className="p-1.5 rounded-lg bg-[#1c1e27] hover:bg-[#242733] text-slate-300 hover:text-white transition-colors"
            title="复制命令"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-7 space-y-4">
        <h3 className="font-bold text-white text-base">系统与环境要求</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <tbody className="divide-y divide-[#2d3142]">
              <tr>
                <td className="py-2.5 font-semibold text-slate-400 w-36">操作系统</td>
                <td className="py-2.5 text-slate-200">Windows 11 / Windows 10 (64-bit, 1809 及以上版本)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-400">硬件要求</td>
                <td className="py-2.5 text-slate-200">x86_64 / x64, ARM64 (通过 Windows 仿真兼容)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-400">内存与磁盘</td>
                <td className="py-2.5 text-slate-200">空闲运行内存约 15 MB，磁盘占用约 30 MB</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-400">开源协议</td>
                <td className="py-2.5 text-slate-200">MIT License (完全免费、无广告、可商业使用)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Changelog */}
      <div id="changelog" className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-7 space-y-4">
        <h3 className="font-bold text-white text-base">更新历史 (Changelog)</h3>
        <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-400 text-sm">v1.0.0 (Initial Stable Release)</span>
            <span className="text-xs text-slate-500 font-mono">2026-08</span>
          </div>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-400 space-y-1">
            <li>全新纯 Rust 核心引擎与 GPUI 现代化界面。</li>
            <li>支持划选自动触发、长按静止触发（Hold Trigger）与全局被动快捷键。</li>
            <li>首发上线 40+ 个官方精选 Windows 原生扩展。</li>
            <li>支持扩展 Options 参数可视化配置面板（开关、多选、输入框、凭据）。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
