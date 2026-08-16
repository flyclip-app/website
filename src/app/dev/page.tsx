import Link from "next/link";
import { Code, ArrowRight, Sparkles } from "lucide-react";

export default function DevOverviewPage() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Overview</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">FlyClip 扩展开发概述</h1>
        <p className="text-slate-400">
          FlyClip 采用简洁直观的声明式扩展模型。开发者可以使用 YAML、JSON 或脚本，在几分钟内构建出功能完备的 Windows 划词动作扩展。
        </p>
      </div>

      <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="text-blue-400" size={18} />
          <span>核心设计哲学</span>
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
          <li><strong>极简声明式配置</strong>：无需复杂的编译过程，编写一个 <code>Config.yaml</code> 文件即可立即生效。</li>
          <li><strong>Windows 原生深度适配</strong>：支持使用 PowerShell 7/5.1 直接处理文本并支持管道。</li>
          <li><strong>参数化选项 (Options)</strong>：支持为扩展声明开关、单选分段、输入框与凭据选项。</li>
          <li><strong>零摩擦迁移</strong>：100% 兼容 PopClip 的 YAML/JSON 语法体系与占位符，已有扩展秒级移植。</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">快速构建一个搜索扩展</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          在 <code>%APPDATA%\flyclip\extensions\MySearch.flyclipext\Config.yaml</code> 中写入：
        </p>
        <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-200">
          <pre>{`name: 必应搜索
identifier: com.flyclip.extension.bing
icon: iconify:simple-icons:microsoftbing
actions:
  - title: 必应
    url: https://www.bing.com/search?q=***
    requirements: [text]`}</pre>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <span />
        <Link href="/dev/generator" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：在线扩展生成器</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
