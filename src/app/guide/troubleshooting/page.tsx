"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideTroubleshootingPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Troubleshooting</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Troubleshooting & FAQ</h1>
          <p className="text-slate-400">
            Frequently asked questions and troubleshooting steps for common scenarios.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-base">Q: Why does the action bar not popup in some specific applications?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A: For elevated/admin programs (e.g. Task Manager, Registry Editor), standard user processes cannot query UI elements due to Windows UIPI security rules. Run FlyClip as Administrator if you need support in elevated windows.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-base">Q: How do I completely uninstall an extension?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A: Open FlyClip Settings, click &quot;Open Extensions Folder&quot;, and delete the corresponding <code>.flyclipext</code> folder to remove it completely.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-base">Q: How do I adjust spacing if the palette covers adjacent lines of text?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A: Increase the &quot;Vertical Offset&quot; setting in Preferences (e.g. change 6px to 12px) to expand safety margins around selections.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Preferences</span>
          </Link>
          <Link href="/dev" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Go to Developer Reference</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Troubleshooting</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">常见问题排查 (FAQ)</h1>
        <p className="text-slate-400">
          汇集了日常使用中可能遇到的常见场景与解决方案。
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base">Q: 在某些特定程序中划词没有弹出动作栏？</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A: 针对部分以管理员权限运行的程序（如任务管理器、注册表编辑器），普通权限进程无法读取其 UI 元素。如果需要在此类窗口中使用，请以管理员身份运行 FlyClip。
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base">Q: 如何完全卸载某个不需要的扩展？</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A: 打开 FlyClip 设置窗口，点击「打开扩展文件夹」，直接删除对应的 <code>.flyclipext</code> 文件夹即可完全移除。
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base">Q: 动作栏偶尔会遮挡下一行文字如何调整？</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A: 在设置界面中将「动作栏垂直间距」适当调大（例如从 6px 调整为 12px），即可扩大与选区的安全间距。
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：偏好设置</span>
        </Link>
        <Link href="/dev" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>进入开发者参考文档</span>
        </Link>
      </div>
    </div>
  );
}
