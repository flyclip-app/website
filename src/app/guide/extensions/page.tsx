"use client";

import Link from "next/link";
import { Download, Sparkles, FolderDown, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideExtensionsPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Extensions</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Extension Installation & Protocol Specs</h1>
          <p className="text-slate-400">
            FlyClip supports <code>flyclip://</code> custom protocols, automatic online updates, text snippet selection installs, and local packages.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Four Installation Methods</h2>

          <div className="space-y-4">
            {/* Method 1 */}
            <div className="p-5 rounded-xl bg-[#1c1e27] border border-blue-500/40 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Zap size={18} className="text-amber-400" />
                <span>Method 1: One-Click Web Install (URL Scheme: <code>flyclip://</code>) — Recommended</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Click <strong>&quot;One-Click Install&quot;</strong> in the Extension Hub. Your browser launches FlyClip, which downloads and installs the extension while <strong>automatically binding the URL as its update source</strong> for seamless background updates.
              </p>
            </div>

            {/* Method 2 */}
            <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Download size={18} className="text-blue-400" />
                <span>Method 2: Offline Package (.flyclipextz)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Download the <code>.flyclipextz</code> archive file. Double-click it (associated with FlyClip) or drag it into FlyClip to complete installation.
              </p>
            </div>

            {/* Method 3 */}
            <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Sparkles size={18} className="text-amber-400" />
                <span>Method 3: Magic Text Snippet Install</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Select text starting with <code># flyclip</code> or <code># popclip</code> anywhere on your screen. FlyClip detects it and pops up an <strong>&quot;Install Extension&quot;</strong> action button immediately.
              </p>
            </div>

            {/* Method 4 */}
            <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <FolderDown size={18} className="text-slate-400" />
                <span>Method 4: Developer Folder Mode (.flyclipext)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Create a <code>MyTool.flyclipext</code> directory under <code>%APPDATA%\flyclip\extensions\</code> with a <code>Config.yaml</code> for live local debugging.
              </p>
            </div>
          </div>
        </div>

        {/* URL Scheme Protocol Spec */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">flyclip:// Protocol Specification</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">Protocol Format</th>
                  <th className="py-2.5 px-3">Parameters</th>
                  <th className="py-2.5 px-3">Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">flyclip://install-extension?url=&lt;URL&gt;</td>
                  <td className="py-3 px-3"><code>url</code>: Remote package URL (.flyclipextz / .yaml)</td>
                  <td className="py-3 px-3">Downloads and installs package, binding update source URL.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">flyclip://install-extension?data=&lt;CODE&gt;</td>
                  <td className="py-3 px-3"><code>data</code>: URL-encoded YAML / JSON manifest string</td>
                  <td className="py-3 px-3">Installs configuration directly into client without temp files.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/guide/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Actions</span>
          </Link>
          <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Preferences</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Extensions</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">扩展安装、更新与 URL 协议规范</h1>
        <p className="text-slate-400">
          FlyClip 支持 <code>flyclip://</code> 自定义协议一键安装、URL 在线安装绑定更新源、划选即装与本地文件安装。
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">四种安装方式</h2>

        <div className="space-y-4">
          {/* Method 1: URL Scheme */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-blue-500/40 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Zap size={18} className="text-amber-400" />
              <span>方式一：网页一键安装 (URL Scheme: <code>flyclip://</code>) —— 最推荐</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              在官网扩展中心点击 <strong>「一键安装」</strong> 按钮，浏览器会自动唤起本地 FlyClip 客户端，自动从远程 URL 下载并安装扩展，同时<strong>自动将该 URL 绑定为更新源</strong>，后续有新版时支持一键检测与无感静默更新！
            </p>
          </div>

          {/* Method 2: Package Download */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Download size={18} className="text-blue-400" />
              <span>方式二：下载离线扩展包 (.flyclipextz)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              在扩展中心下载 <code>.flyclipextz</code> 归档文件。双击该文件（已与 FlyClip 自动关联）或直接拖入 FlyClip 窗口即可完成安装。
            </p>
          </div>

          {/* Method 3: Snippet */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Sparkles size={18} className="text-amber-400" />
              <span>方式三：划词即装 Snippet (Magic Text Install)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              在任意网页或文本中直接<strong>划选中以 <code># flyclip</code> 或 <code># popclip</code> 开头的配置代码</strong>，FlyClip 会自动感知并浮出 <strong>「安装扩展」</strong> 按钮，免去复制粘贴与保存文件的繁琐步骤。
            </p>
          </div>

          {/* Method 4: Manual Folder */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <FolderDown size={18} className="text-slate-400" />
              <span>方式四：开发者手动目录模式 (.flyclipext)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              在系统扩展目录 <code>%APPDATA%\flyclip\extensions\</code> 下新建 <code>MyTool.flyclipext</code> 文件夹并放置 <code>Config.yaml</code> 即可进行实时本地调试。
            </p>
          </div>
        </div>
      </div>

      {/* URL Scheme Protocol Spec */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">flyclip:// 自定义协议规范</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">协议形式</th>
                <th className="py-2.5 px-3">参数说明</th>
                <th className="py-2.5 px-3">行为效果</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">flyclip://install-extension?url=&lt;URL&gt;</td>
                <td className="py-3 px-3"><code>url</code>: 远程扩展包地址（.flyclipextz / .yaml）</td>
                <td className="py-3 px-3">远程下载并安装，自动绑定该 URL 为更新源，支持后续自动更新。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">flyclip://install-extension?data=&lt;CODE&gt;</td>
                <td className="py-3 px-3"><code>data</code>: URL 编码后的 YAML / JSON 配置文本</td>
                <td className="py-3 px-3">直接将配置代码安装到客户端，无需经过剪贴板或本地文件。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：内置动作</span>
        </Link>
        <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：偏好设置</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
