"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideSettingsPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Settings</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Preferences & Settings</h1>
          <p className="text-slate-400">
            Customize FlyClip&apos;s interactions, visual appearance, and system integration through the Preferences panel.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Common Configuration Options</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-sm text-blue-400">Start with Windows</h3>
              <p className="text-xs text-slate-400">When enabled, FlyClip launches automatically in the system tray on startup, ready at all times.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-sm text-blue-400">Vertical Offset</h3>
              <p className="text-xs text-slate-400">Fine-tune the pixel distance between the action bar and the selection boundary (default: 6px).</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-sm text-blue-400">Hold Trigger Duration</h3>
              <p className="text-xs text-slate-400">Configure mouse hold duration required to trigger quick paste in text fields (default: 500ms).</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-sm text-blue-400">Global Passive Hotkey</h3>
              <p className="text-xs text-slate-400">Customize global shortcut keys for passive trigger mode (e.g., <code>Ctrl+Alt+Q</code> or <code>Alt+Space</code>).</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/guide/rules" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Exclusion Rules</span>
          </Link>
          <Link href="/guide/troubleshooting" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Troubleshooting FAQ</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Settings</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">偏好设置 (Settings)</h1>
        <p className="text-slate-400">
          通过偏好设置面板，您可以随心所欲定制 FlyClip 的交互行为、显示样式与系统集成。
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">常用配置项说明</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-sm text-blue-400">开机自动启动 (Start with Windows)</h3>
            <p className="text-xs text-slate-400">开启后 FlyClip 会在系统启动时自动在托盘中常驻运行，随时待命。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-sm text-blue-400">动作栏垂直间距偏移 (Vertical Offset)</h3>
            <p className="text-xs text-slate-400">支持微调浮动动作栏相对于选中文本顶部的像素距离（默认 6px），避免遮挡光标或上下行文字。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-sm text-blue-400">长按阈值时间 (Hold Threshold)</h3>
            <p className="text-xs text-slate-400">配置鼠标长按静止触发粘贴栏所需的时间（毫秒，默认 500ms）。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-sm text-blue-400">全局被动唤醒热键 (Passive Hotkey)</h3>
            <p className="text-xs text-slate-400">自定义被动模式下的键盘快捷键组合（例如 <code>Ctrl+Alt+Q</code> 或 <code>Alt+Space</code>）。</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide/rules" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：排除规则</span>
        </Link>
        <Link href="/guide/troubleshooting" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：常见问题排查</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
