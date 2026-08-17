"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevPackagesPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Packages</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Extension Package Structure (.flyclipext)</h1>
          <p className="text-slate-400">
            Directory specifications, manifest layout, and distribution packaging for FlyClip extensions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Directory Layout</h2>
          <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-slate-200">
            <pre>{`MyExtension.flyclipext/
├── Config.yaml          # Primary manifest file (Required, also supports Config.json)
├── icon.png / icon.svg  # (Optional) Custom icon file
└── script.js            # (Optional) External standalone JavaScript script`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Single-File Distribution (.flyclipextz)</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            A <code>.flyclipextz</code> file is a standard Zip archive of a <code>.flyclipext</code> directory. Simply compress the directory and rename the file extension to <code>.flyclipextz</code>. FlyClip extracts and activates it automatically.
          </p>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/generator" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Generator</span>
          </Link>
          <Link href="/dev/config" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Config Specification</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Packages</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">扩展包结构 (.flyclipext)</h1>
        <p className="text-slate-400">
          FlyClip 扩展的目录规范与归档打包分发标准。
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">目录组织形式</h2>
        <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-slate-200">
          <pre>{`MyExtension.flyclipext/
├── Config.yaml          # 核心配置文件 (必填，也支持 Config.json)
├── icon.png / icon.svg  # (可选) 自定义图标文件
└── script.js            # (可选) 独立的外部 JavaScript 脚本`}</pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">单文件打包分发 (.flyclipextz)</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          <code>.flyclipextz</code> 是一个标准的 Zip 格式压缩包，只需将 <code>.flyclipext</code> 目录直接压缩并将扩展名重命名为 <code>.flyclipextz</code> 即可。FlyClip 在检测到该文件时会自动解压加载。
        </p>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/generator" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：在线生成器</span>
        </Link>
        <Link href="/dev/config" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：Config 规范</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
