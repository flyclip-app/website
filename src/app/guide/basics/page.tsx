"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideBasicsPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Basics</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Basics & Triggers</h1>
          <p className="text-slate-400">
            FlyClip provides multiple smart, low-friction trigger mechanisms to assist your workflow without getting in the way.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Three Core Trigger Modes</h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-base text-blue-400">1. Auto Selection Trigger</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Select text anywhere with your left mouse button. Upon releasing the mouse, the FlyClip action palette floats right above the selection.
              </p>
              <p className="text-xs text-slate-400">
                💡 Smart Filtering: If an excluded app or fullscreen game is active, FlyClip automatically stays silent.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-base text-purple-400">2. Mouse Hold Trigger</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Press and hold the mouse button in an empty text field for &gt;500ms to immediately bring up quick paste and action tools without pressing <code>Ctrl+V</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-base text-emerald-400">3. Global Hotkey Trigger (Passive Mode)</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                If you prefer manual control, disable auto-trigger in Preferences and wake up the palette on-demand using a global shortcut (default: <code>Ctrl+Alt+Q</code>).
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/guide" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Installation</span>
          </Link>
          <Link href="/guide/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Built-in Actions</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Basics</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">基础交互与触发机制</h1>
        <p className="text-slate-400">
          FlyClip 提供了多种智能化、低干扰的触发方式，确保在不打扰您日常输入的前提下随叫随到。
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">三种核心触发模式</h2>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-base text-blue-400">1. 鼠标划选自动触发 (Auto Trigger)</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              在任意应用程序中使用鼠标左键拖拽选中文本，松开鼠标时，FlyClip 动作栏会自动在选中文本的正上方弹出。
            </p>
            <p className="text-xs text-slate-400">
              💡 智能过滤：如果当前程序处于全屏游戏模式或特定排除名单中，FlyClip 会自动静默不弹出。
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-base text-purple-400">2. 鼠标长按静止触发 (Hold Trigger)</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              在空白文本输入框或网页区域按住鼠标左键不动超过 500ms（可在设置中微调），将自动呼出快捷粘贴与动作菜单，免去按 <code>Ctrl+V</code> 的步骤。
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-base text-emerald-400">3. 全局热键被动触发 (Hotkey Mode)</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              如果您不希望每次选中文本都自动弹窗，可在设置中关闭「划选自动触发」，转为纯被动模式：划选文字后按下快捷键（默认 <code>Ctrl+Alt+Q</code>）即刻唤醒动作栏。
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：安装指南</span>
        </Link>
        <Link href="/guide/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：内置动作</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
