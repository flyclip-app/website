"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, Terminal, Code, Globe, Laptop, Layers, Wrench } from "lucide-react";
import PopClipConverter from "@/components/PopClipConverter";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevMigrationPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-12 text-slate-300 leading-relaxed text-sm sm:text-base">
        {/* Header */}
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Migration</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">PopClip Converter & Migration Guide</h1>
          <p className="text-slate-400">
            FlyClip features a clean and modern extension specification (based on YAML and QuickJS). To help developers easily port existing PopClip actions, use the <strong>live converter tool</strong> below to transform legacy <code>Config.plist</code> and scripts into native FlyClip format.
          </p>
        </div>

        {/* Live Converter Tool Section */}
        <div className="p-6 rounded-2xl bg-[#1c1e27] border border-[#2d3142] space-y-6 shadow-xl">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg border-b border-[#2d3142] pb-4">
            <Wrench className="text-blue-400" size={22} />
            <span>🔄 PopClip Live Extension Converter</span>
          </div>
          <PopClipConverter />
        </div>

        {/* Highlights Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-300 flex items-start gap-3">
          <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <div className="font-bold text-amber-300">Migration Notice: Legacy PopClip extensions cannot run on Windows directly</div>
            <p className="text-amber-200/80 leading-relaxed text-xs">
              Many legacy <code>.popclipext</code> packages use XML <code>Config.plist</code> or macOS-only AppleScript/Bash scripts. FlyClip requires <code>Config.yaml</code> / <code>Config.json</code> with universal logic (URL / JavaScript / Key Combo). Use the online converter above to upgrade your extensions.
            </p>
          </div>
        </div>

        {/* 1. Comparison Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
            <Layers className="text-cyan-400" size={20} />
            <span>1. PopClip vs. FlyClip Comprehensive Comparison Table</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">Dimension</th>
                  <th className="py-2.5 px-3">FlyClip (Windows / Cross-Platform)</th>
                  <th className="py-2.5 px-3">PopClip (macOS Only)</th>
                  <th className="py-2.5 px-3">Migration & Compatibility Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Extension Folder</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">.flyclipext</td>
                  <td className="py-3 px-3 font-mono text-slate-400">.popclipext</td>
                  <td className="py-3 px-3">FlyClip scans both directory extensions, but the package must contain a valid <code>Config.yaml</code>.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Package Archive</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">.flyclipextz</td>
                  <td className="py-3 px-3 font-mono text-slate-400">.popclipextz</td>
                  <td className="py-3 px-3">Standard zip archive, auto-extracted upon installation.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Config Format</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">Config.yaml / Config.json</td>
                  <td className="py-3 px-3 font-mono text-slate-400">Config.yaml / Config.plist</td>
                  <td className="py-3 px-3">❌ <strong>Deprecated plist</strong>: XML plist is rejected with helpful guidance; convert to YAML.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Selection Text</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">flyclip.input.text</td>
                  <td className="py-3 px-3 font-mono text-blue-400">popclip.input.text</td>
                  <td className="py-3 px-3">✅ <strong>100% Compatible</strong>: <code>popclip.input.text</code> is fully supported as an alias.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Regex Match</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">flyclip.input.matched</td>
                  <td className="py-3 px-3 font-mono text-blue-400">popclip.input.matchedText</td>
                  <td className="py-3 px-3">✅ <strong>100% Compatible</strong>: <code>matched</code> and <code>matchedText</code> are aliases.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Write Clipboard</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">flyclip.copy(text)</td>
                  <td className="py-3 px-3 font-mono text-blue-400">popclip.copyText(text)</td>
                  <td className="py-3 px-3">✅ <strong>100% Compatible</strong>: Both functions are equivalent.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Trigger Paste</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">flyclip.paste(text?)</td>
                  <td className="py-3 px-3 font-mono text-blue-400">popclip.pasteText(text)</td>
                  <td className="py-3 px-3">✅ <strong>100% Compatible</strong>: <code>flyclip.paste()</code> also supports calling without arguments to paste current clipboard.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Read Clipboard</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">flyclip.readClipboard()</td>
                  <td className="py-3 px-3 font-mono text-blue-400">pasteboard.text</td>
                  <td className="py-3 px-3">✅ <strong>Supported Both</strong>: You can call <code>flyclip.readClipboard()</code> or read <code>pasteboard.text</code>.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Async Sleep</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">await sleep(ms)</td>
                  <td className="py-3 px-3 font-mono text-blue-400">await sleep(ms)</td>
                  <td className="py-3 px-3">✅ <strong>Identical</strong>: Standard global Promise function.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Base64 Encode/Decode</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">btoa(str) / atob(b64)</td>
                  <td className="py-3 px-3 font-mono text-blue-400">btoa(str) / atob(b64)</td>
                  <td className="py-3 px-3">✅ <strong>Identical</strong>: Standard Web API globals.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">CLI Command Execution</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.run(cmd, args)</td>
                  <td className="py-3 px-3 text-slate-500">❌ Sandbox restricted</td>
                  <td className="py-3 px-3">🌟 <strong>Synchronous (No await)</strong>: Returns <code>&#123; stdout, stderr, code &#125;</code> directly.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">HTTP Network Fetch</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">await flyclip.fetch(url, opts)</td>
                  <td className="py-3 px-3 font-mono text-slate-400">require(&quot;axios&quot;)</td>
                  <td className="py-3 px-3">🌟 <strong>Native Performance</strong>: Built-in Rust HTTP client without external node_modules.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/variables" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Variables</span>
          </Link>
          <Link href="/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Browse 40+ Extensions</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 text-slate-300 leading-relaxed text-sm sm:text-base">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Migration</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">PopClip 扩展在线转换器与迁移手册</h1>
        <p className="text-slate-400">
          FlyClip 拥有独立且现代化的扩展规范体系（基于 YAML 与轻量 QuickJS）。为了方便开发者将已有的 PopClip 动作快速移植到 FlyClip，您可以通过下方的<strong>在线转换工具</strong>一键将旧版 <code>Config.plist</code> 或代码重构为 FlyClip 现代扩展。
        </p>
      </div>

      {/* Live Converter Tool Section */}
      <div className="p-6 rounded-2xl bg-[#1c1e27] border border-[#2d3142] space-y-6 shadow-xl">
        <div className="flex items-center gap-2.5 text-white font-bold text-lg border-b border-[#2d3142] pb-4">
          <Wrench className="text-blue-400" size={22} />
          <span>🔄 PopClip 扩展在线转换工具 (Live Converter)</span>
        </div>
        <PopClipConverter />
      </div>

      {/* Highlights Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-300 flex items-start gap-3">
        <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
        <div className="space-y-1">
          <div className="font-bold text-amber-300">迁移前提须知：绝大多数旧版 PopClip 扩展无法直接在 Windows 下运行</div>
          <p className="text-amber-200/80 leading-relaxed text-xs">
            网络上现存的很多 <code>.popclipext</code> 包采用了旧式 <code>Config.plist</code> 或 macOS 独有的 AppleScript / Bash 脚本。在 FlyClip 中，只有使用了 <code>Config.yaml</code> / <code>Config.json</code> 且动作是通用逻辑（URL / JS / 按键）的扩展才能被读取。包含 macOS 专属逻辑或旧 plist 的扩展<strong>必须使用上方工具转换配置文件并重构脚本</strong>。
          </p>
        </div>
      </div>

      {/* 1. PopClip vs FlyClip Comprehensive Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Layers className="text-cyan-400" size={20} />
          <span>1. PopClip 与 FlyClip 语法与功能全景对照表</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">对比维度</th>
                <th className="py-2.5 px-3">FlyClip (Windows / 跨平台)</th>
                <th className="py-2.5 px-3">PopClip (macOS 专属)</th>
                <th className="py-2.5 px-3">兼容性与迁移说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-semibold text-white">扩展包目录格式</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">.flyclipext</td>
                <td className="py-3 px-3 font-mono text-slate-400">.popclipext</td>
                <td className="py-3 px-3">⚠️ <strong>需包含 YAML</strong>：FlyClip 扫描两种目录名，但包内必须包含 <code>Config.yaml</code> 或 <code>Config.json</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">单文件归档格式</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">.flyclipextz</td>
                <td className="py-3 px-3 font-mono text-slate-400">.popclipextz</td>
                <td className="py-3 px-3">⚠️ <strong>解压后必须含 YAML</strong>：支持双击解压安装，解压后必须包含有效 YAML。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">配置文件格式</td>
                <td className="py-3 px-3 font-mono text-emerald-400">Config.yaml / Config.json</td>
                <td className="py-3 px-3 font-mono text-slate-400">Config.yaml / Config.plist</td>
                <td className="py-3 px-3">❌ <strong>已废弃 plist</strong>：旧版 <code>Config.plist</code> 会明确报错拒绝，需转换为 YAML。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">选区输入对象</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.input.text</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.input.text</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：在 FlyClip 中调 <code>popclip.input.text</code> 完全等价。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">正则收窄文本</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.input.matched</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.input.matchedText</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：<code>matched</code> 与 <code>matchedText</code> 互为别名。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">写入剪贴板</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.copy(text)</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.copyText(text)</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：两个函数完全等价可用。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">触发粘贴</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.paste(text?)</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.pasteText(text)</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：<code>flyclip.paste()</code> 还支持不传参保留现有剪贴板粘贴。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">读取剪贴板纯文本</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.readClipboard()</td>
                <td className="py-3 px-3 font-mono text-blue-400">pasteboard.text</td>
                <td className="py-3 px-3">✅ <strong>双向支持</strong>：既可调用 <code>readClipboard()</code>，也可读取 <code>pasteboard.text</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">异步延时等待</td>
                <td className="py-3 px-3 font-mono text-emerald-400">await sleep(ms)</td>
                <td className="py-3 px-3 font-mono text-blue-400">await sleep(ms)</td>
                <td className="py-3 px-3">✅ <strong>完全一致</strong>：均为内置全局 Promise 函数。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Base64 编解码</td>
                <td className="py-3 px-3 font-mono text-emerald-400">btoa(str) / atob(b64)</td>
                <td className="py-3 px-3 font-mono text-blue-400">btoa(str) / atob(b64)</td>
                <td className="py-3 px-3">✅ <strong>完全一致</strong>：标准 Web API 全局可用。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">调用本地 CLI 命令行</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.run(cmd, args)</td>
                <td className="py-3 px-3 text-slate-500">❌ 受沙盒限制无法直接调用</td>
                <td className="py-3 px-3">🌟 <strong>同步函数（无需 await）</strong>：直接返回 <code>&#123; stdout, stderr, code &#125;</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">网络 HTTP 请求</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">await flyclip.fetch(url, opts)</td>
                <td className="py-3 px-3 font-mono text-slate-400">require(&quot;axios&quot;)</td>
                <td className="py-3 px-3">🌟 <strong>极速轻量</strong>：FlyClip 内置 Rust 原生 HTTP 客户端，零外部 node 依赖。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/variables" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：占位符与环境变量</span>
        </Link>
        <Link href="/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>浏览 40+ 官方扩展生态</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
