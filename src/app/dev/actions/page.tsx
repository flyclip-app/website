"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Globe, AlertTriangle, Code, Cpu, Terminal } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevActionsPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Actions</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Action Categories & Examples</h1>
          <p className="text-slate-400">
            FlyClip follows a clean cross-platform layered architecture. To ensure consistency and high performance, JavaScript and URL actions are strongly recommended.
          </p>
        </div>

        {/* Zero Heavy Runtime Banner */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 space-y-1">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <Zap size={16} />
            <span>Zero Heavy Runtime Guarantee</span>
          </div>
          <p>
            FlyClip <strong>never relies on WebView2 (150MB+ RAM overhead)</strong> and <strong>does not require Node.js</strong>. Built with a Rust statically-linked QuickJS engine with &lt;1ms cold start and &lt;1.5MB resident memory increment.
          </p>
        </div>

        {/* Priority Matrix Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Action Type Priority Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">Action Type</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Compatibility</th>
                  <th className="py-2.5 px-3">Usage & Best Practices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">JavaScript / TS</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-xs">🥇 Primary Choice</span></td>
                  <td className="py-3 px-3"><span className="text-emerald-400 font-medium">🌐 Universal</span></td>
                  <td className="py-3 px-3">Recommended. Embedded QuickJS with cross-platform native process and async HTTP fetch.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400 font-bold">URL Template</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold text-xs">🥇 Primary Choice</span></td>
                  <td className="py-3 px-3"><span className="text-blue-400 font-medium">🌐 Universal</span></td>
                  <td className="py-3 px-3">Ideal for search engines, web translation, and browser navigation.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-slate-300">Key Combo</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-[#14161d] text-slate-300 font-semibold text-xs">🥈 Secondary</span></td>
                  <td className="py-3 px-3"><span className="text-slate-300">🌐 Universal</span></td>
                  <td className="py-3 px-3">Simulates standard keyboard shortcuts (e.g. <code>ctrl c</code>, <code>ctrl v</code>).</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-amber-400">PowerShell (.ps1)</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-xs">⚠️ Not Recommended</span></td>
                  <td className="py-3 px-3"><span className="text-amber-400 font-medium">🪟 Windows Only</span></td>
                  <td className="py-3 px-3">Cannot run on macOS/Linux. Use only as fallback for deep Windows .NET APIs.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Code Examples */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Code Examples</h2>

          {/* Example 1 */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
            <h3 className="font-bold text-white text-base text-blue-400 flex items-center gap-2">
              <Globe size={16} />
              <span>Example 1: Universal Web Search Extension</span>
            </h3>
            <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-blue-200">
              <pre>{`name: Google Search
identifier: com.flyclip.extension.google-search
description: Search selected text on Google
icon: iconify:simple-icons:google
actions:
  - title: Google
    url: https://www.google.com/search?q=***
    requirements: [text]`}</pre>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
            <h3 className="font-bold text-white text-base text-emerald-400 flex items-center gap-2">
              <Code size={16} />
              <span>Example 2: Pure JavaScript Text Transform (Recommended)</span>
            </h3>
            <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-emerald-200">
              <pre>{`name: CamelCase Convert
identifier: com.flyclip.extension.camel-case
description: Convert text with underscores or spaces to camelCase
icon: Aa
actions:
  - title: CamelCase
    javascript: |
      const text = flyclip.input.text.trim();
      return text.replace(/[-_\\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : "");
    requirements: [text]
    after: paste-result`}</pre>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
            <h3 className="font-bold text-white text-base text-emerald-400 flex items-center gap-2">
              <Terminal size={16} />
              <span>Example 3: Cross-Platform Native Command (flyclip.run)</span>
            </h3>
            <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-emerald-200">
              <pre>{`name: Git Status
identifier: com.flyclip.extension.git-status
icon: iconify:simple-icons:git
actions:
  - title: Git Status
    javascript: |
      const res = flyclip.run("git", ["status", "--short"]);
      if (res.code !== 0) {
        return \`Git Error: \${res.stderr}\`;
      }
      return res.stdout.trim() || "Working tree clean";
    requirements: [text]
    after: show-result`}</pre>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/options" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Options</span>
          </Link>
          <Link href="/dev/js-api" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: JavaScript API Reference</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Actions</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">动作分类标准与开发示例</h1>
        <p className="text-slate-400">
          FlyClip 遵循严格的跨平台分层架构。为保证全平台一致性与轻量性能，强烈推荐优先使用 JavaScript 与 URL 动作。
        </p>
      </div>

      {/* Zero Heavy Runtime Banner */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 space-y-1">
        <div className="flex items-center gap-2 font-bold text-emerald-400">
          <Zap size={16} />
          <span>零笨重依赖架构保证 (Zero Heavy Runtime)</span>
        </div>
        <p>
          FlyClip <strong>绝不依赖 WebView2 (150MB+ 内存开销)</strong>，也<strong>无需用户电脑安装 Node.js</strong>。内置由 Rust 静态编译的高性能 QuickJS 引擎，冷启动耗时 &lt; 1ms，常驻内存增量 &lt; 1.5MB。
        </p>
      </div>

      {/* Priority Matrix Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">动作类型选型优先级</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">动作类型 (Type)</th>
                <th className="py-2.5 px-3">推荐等级</th>
                <th className="py-2.5 px-3">跨平台属性</th>
                <th className="py-2.5 px-3">说明与开发建议</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">JavaScript / TS</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-xs">🥇 推荐首选</span></td>
                <td className="py-3 px-3"><span className="text-emerald-400 font-medium">🌐 全平台通用</span></td>
                <td className="py-3 px-3">核心推荐。内嵌 QuickJS，支持调用跨平台本地命令与网络请求。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400 font-bold">URL 模板动作</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold text-xs">🥇 推荐首选</span></td>
                <td className="py-3 px-3"><span className="text-blue-400 font-medium">🌐 全平台通用</span></td>
                <td className="py-3 px-3">适合搜索引擎、在线翻译、网页跳转等纯 Web 场景。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-slate-300">按键模拟 (Key Combo)</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-[#14161d] text-slate-300 font-semibold text-xs">🥈 次选</span></td>
                <td className="py-3 px-3"><span className="text-slate-300">🌐 平台通用</span></td>
                <td className="py-3 px-3">模拟标准快捷键动作（如 <code>ctrl c</code>、<code>ctrl v</code>）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-amber-400">PowerShell (.ps1)</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-xs">⚠️ 不推荐</span></td>
                <td className="py-3 px-3"><span className="text-amber-400 font-medium">🪟 Windows 专属</span></td>
                <td className="py-3 px-3">无法在 macOS/Linux 运行。仅作为 Windows 深度 API 调用的逃生通道。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-World Code Examples */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">完整扩展开发实战示例</h2>

        {/* Example 1 */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-blue-400 flex items-center gap-2">
            <Globe size={16} />
            <span>示例 1：全平台通用 URL 搜索扩展</span>
          </h3>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-blue-200">
            <pre>{`name: 百度搜索
identifier: com.flyclip.extension.baidu-search
description: 在百度中搜索选中文本
icon: iconify:simple-icons:baidu
actions:
  - title: 百度
    url: https://www.baidu.com/s?wd=***
    requirements: [text]`}</pre>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-emerald-400 flex items-center gap-2">
            <Code size={16} />
            <span>示例 2：纯 JavaScript 文本转换扩展 (推荐首选)</span>
          </h3>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-emerald-200">
            <pre>{`name: 驼峰命名转换
identifier: com.flyclip.extension.camel-case
description: 将下划线或空格文本转换为 camelCase
icon: Aa
actions:
  - title: 转换为驼峰
    javascript: |
      const text = flyclip.input.text.trim();
      return text.replace(/[-_\\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : "");
    requirements: [text]
    after: paste-result`}</pre>
          </div>
        </div>

        {/* Example 3 */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-emerald-400 flex items-center gap-2">
            <Terminal size={16} />
            <span>示例 3：JavaScript 跨平台调用本地 CLI 命令 (flyclip.run)</span>
          </h3>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-emerald-200">
            <pre>{`name: Git 状态速览
identifier: com.flyclip.extension.git-status
icon: iconify:simple-icons:git
actions:
  - title: Git 状态
    javascript: |
      const res = flyclip.run("git", ["status", "--short"]);
      if (res.code !== 0) {
        return \`Git 错误: \${res.stderr}\`;
      }
      return res.stdout.trim() || "工作区干净";
    requirements: [text]
    after: show-result`}</pre>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/options" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：参数选项规范</span>
        </Link>
        <Link href="/dev/js-api" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：JavaScript API 手册</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
