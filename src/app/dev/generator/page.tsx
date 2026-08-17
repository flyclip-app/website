"use client";

import ExtensionGenerator from "@/components/ExtensionGenerator";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevGeneratorPage() {
  const { lang } = useI18n();

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Tool</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          {lang === "en" ? "🛠️ Live Extension Generator" : "🛠️ 在线扩展生成器 (Live Tool)"}
        </h1>
        <p className="text-slate-400">
          {lang === "en"
            ? "Visually configure and generate compliant FlyClip Config.yaml extension manifests in real time."
            : "通过下方可视化表单快速配置并实时生成符合 FlyClip 原生规范的 Config.yaml。"}
        </p>
      </div>

      <ExtensionGenerator />

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>{lang === "en" ? "Prev: Overview" : "上一页：开发概述"}</span>
        </Link>
        <Link href="/dev/packages" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>{lang === "en" ? "Next: Package Structure" : "下一步：扩展包结构"}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
