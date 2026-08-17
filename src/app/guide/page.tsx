"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideInstallationPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Installation</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Welcome & Installation Guide</h1>
          <p className="text-slate-400">
            FlyClip is a native text selection action and clipboard tool built for Windows 10 & 11. This guide walks you through setup and initial configuration.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-200 space-y-1">
          <strong>Supported Environment:</strong>
          <p>Windows 10 (1809+) / Windows 11 (x64 & ARM64 with full multi-monitor and per-monitor DPI scaling support).</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Download Packages</h2>
          <p>Choose the edition that best fits your preference:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm">Option 1: Windows Setup (.msi)</h3>
              <p className="text-xs text-slate-400">Standard installer with auto-start, Start Menu entry, and file associations.</p>
              <Link href="/download" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold pt-1">
                Download .msi <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm">Option 2: Portable Zip (.zip)</h3>
              <p className="text-xs text-slate-400">Zero installation required. Keep all data in the local folder — ideal for USB drives.</p>
              <Link href="/download" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold pt-1">
                Download .zip <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">First Launch</h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li>Run <code>flyclip.exe</code>. The app will minimize to the <strong>Windows System Tray (bottom right notification area)</strong>.</li>
            <li>Select any text in your browser, editor, or app with your mouse. The FlyClip action bar will appear above your cursor.</li>
            <li>Right-click the tray icon to access <strong>Preferences</strong> or quit the application.</li>
          </ol>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <span />
          <Link href="/guide/basics" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Basics & Triggers</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Installation</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">欢迎与安装指南</h1>
        <p className="text-slate-400">
          FlyClip 是一款专为 Windows 10 与 Windows 11 设计的原生划词动作工具。本文将引导您完成安装与初始化配置。
        </p>
      </div>

      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-200 space-y-1">
        <strong>系统支持环境：</strong>
        <p>Windows 10（1809 及以上）/ Windows 11（x64 架构，完全支持多屏幕与跨 DPI 缩放）。</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">获取安装包</h2>
        <p>您可以根据个人偏好选择安装版或便携版：</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-sm">方式一：Windows 安装包 (.msi)</h3>
            <p className="text-xs text-slate-400">标准安装程序，自动注册开机自启、开始菜单与 <code>.flyclipext</code> 文件扩展名关联。</p>
            <Link href="/download" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold pt-1">
              前往下载 .msi <ArrowRight size={12} />
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-sm">方式二：便携免安装版 (.zip)</h3>
            <p className="text-xs text-slate-400">解压至任意目录双击即可运行，不写入注册表，适合随身携带。</p>
            <Link href="/download" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold pt-1">
              前往下载 .zip <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">首次启动</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li>运行 <code>flyclip.exe</code> 后，软件将自动常驻于 Windows <strong>系统托盘（右下角任务栏通知区域）</strong>。</li>
          <li>在任意文本框、浏览器或文档编辑器中用鼠标划选一段文本，FlyClip 动作栏将立即在鼠标上方浮现。</li>
          <li>右键点击右下角托盘图标，可选择「偏好设置」或「退出程序」。</li>
        </ol>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <span />
        <Link href="/guide/basics" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：基础与触发机制</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
