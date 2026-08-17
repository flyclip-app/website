"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevVariablesPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Variables</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Variables & Placeholders</h1>
          <p className="text-slate-400">
            FlyClip provides standard template placeholders and environment variables for URL templates and scripts.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
            <h3 className="font-bold text-white text-base text-blue-400">URL Template Placeholders</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <code>***</code> or <code>{`{flyclip text}`}</code>: Currently selected text (automatically URL percent-encoded).
              </li>
              <li>
                <code>{`{flyclip option <id>}`}</code>: Injects the user&apos;s configured value for option <code>&lt;id&gt;</code>.
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
            <h3 className="font-bold text-white text-base text-purple-400">PowerShell Environment Variables</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <code>$env:FLYCLIP_TEXT</code>: Raw selected text.
              </li>
              <li>
                <code>$env:FLYCLIP_OPTION_&lt;ID&gt;</code>: Option value configured by the user (e.g., <code>$env:FLYCLIP_OPTION_TARGET_LANG</code>).
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/js-api" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: JavaScript API</span>
          </Link>
          <Link href="/dev/migration" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: PopClip Migration</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Variables</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">占位符与环境变量规范</h1>
        <p className="text-slate-400">
          FlyClip 在执行 URL 打开与脚本时，提供了统一的参数注入与模板占位符机制。
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-blue-400">URL 模板占位符</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <code>***</code> 或 <code>{`{flyclip text}`}</code>：当前用户选中的文本（自动进行标准 URL Percent-Encoding 编码）。
            </li>
            <li>
              <code>{`{flyclip option <id>}`}</code>：插入用户在设置界面中针对该选项配置的当前值。
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-purple-400">PowerShell 环境变量</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <code>$env:FLYCLIP_TEXT</code>：用户选中的原始文本。
            </li>
            <li>
              <code>$env:FLYCLIP_OPTION_&lt;ID&gt;</code>：用户配置的选项值（如 <code>$env:FLYCLIP_OPTION_TARGET_LANG</code>）。
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/js-api" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：JavaScript API</span>
        </Link>
        <Link href="/dev/migration" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：PopClip 迁移指南</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
