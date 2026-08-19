"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevOverviewPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Overview</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">FlyClip Extension Development</h1>
          <p className="text-slate-400">
            FlyClip adopts a clean, declarative extension model. You can build complete, high-performance Windows text selection extensions using YAML, JavaScript, or PowerShell in minutes.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="text-blue-400" size={18} />
            <span>Core Design Philosophy</span>
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
            <li><strong>Declarative Simplicity</strong>: No build steps or bundlers required — create a single <code>Config.yaml</code> to run immediately.</li>
            <li><strong>Lightweight QuickJS Engine</strong>: Built-in JavaScript execution engine without Node.js or WebView2 bloat.</li>
            <li><strong>Configurable Options</strong>: Declaratively add checkboxes, segmented selectors, text inputs, and secret keys in the UI.</li>
            <li><strong>PopClip Converter & Migration</strong>: Dedicated online migration tools to upgrade legacy PopClip packages into modern FlyClip extensions.</li>
          </ul>
        </div>

        {/* AI Skill Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-[#1c1e27] border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <span>🤖 New AI Skill Available</span>
            </div>
            <h4 className="text-base font-bold text-white">Develop FlyClip Extensions with AI Assistants</h4>
            <p className="text-xs text-slate-300">
              Load our official <code>SKILL.md</code> into Cursor, Claude, ChatGPT, Antigravity, or Cline to generate custom extensions from natural language prompts in seconds.
            </p>
          </div>
          <Link
            href="/dev/ai-skill"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
          >
            <span>Explore AI Skill</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Quick Example: Bing Search Extension</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Save this in <code>%APPDATA%\flyclip\extensions\MySearch.flyclipext\Config.yaml</code>:
          </p>
          <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-200">
            <pre>{`name: Bing Search
identifier: com.flyclip.extension.bing
icon: iconify:simple-icons:microsoftbing
actions:
  - title: Bing
    url: https://www.bing.com/search?q=***
    requirements: [text]`}</pre>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <span />
          <Link href="/dev/generator" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Live Extension Generator</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

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
          <li><strong>内置 QuickJS 轻量引擎</strong>：原生支持现代 JavaScript 与异步 fetch，零 Node.js / WebView2 笨重依赖。</li>
          <li><strong>参数化选项 (Options)</strong>：支持为扩展声明开关、单选分段、输入框与凭据选项。</li>
          <li><strong>在线转换与迁移工具</strong>：提供专用的 PopClip 在线转换器，一键重构历史扩展资产。</li>
        </ul>
      </div>

      {/* AI Skill Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-[#1c1e27] border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <span>🤖 全新 AI Skill 支持</span>
          </div>
          <h4 className="text-base font-bold text-white">让 AI 助手直接帮你定制开发扩展</h4>
          <p className="text-xs text-slate-300">
            将官方 <code>SKILL.md</code> 导入 Cursor、Claude、ChatGPT、Antigravity 或 Cline，输入一句话需求，AI 即可自动生成生产级扩展代码！
          </p>
        </div>
        <Link
          href="/dev/ai-skill"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
        >
          <span>查看 AI Skill 指南</span>
          <ArrowRight size={14} />
        </Link>
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
