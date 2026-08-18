"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Shield, Globe, Monitor, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideRulesPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Exclusion Rules</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Exclusion Rules (Apps & Websites)</h1>
          <p className="text-slate-400">
            Configure applications and websites where FlyClip should not pop up automatically, preventing interference with in-app native menus while keeping manual hotkeys functional.
          </p>
        </div>

        {/* Core highlight notice */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
          <Zap className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
          <div className="text-xs sm:text-sm text-slate-300">
            <strong className="text-white">Manual Hotkey is Always Available:</strong> In excluded applications or suppressed websites, FlyClip only silences automatic popups upon mouse selection. Pressing your global hotkey (default: <code className="text-blue-300 bg-blue-900/40 px-1.5 py-0.5 rounded">Ctrl + Alt + Q</code>) will always bring up the action bar on demand.
          </div>
        </div>

        {/* Section 1: Application Rules */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2d3142] pb-2">
            <Monitor className="text-blue-400" size={20} />
            <h2 className="text-xl font-bold text-white">1. Application Exclusion Rules</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Suppress automatic popups in IDEs (like VS Code, IntelliJ), graphic design tools (Photoshop, AutoCAD), or games:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-xs text-blue-400">Process Name Matching</h3>
              <p className="text-xs text-slate-400">Type <code>code</code> or <code>code.exe</code>. Case-insensitive and <code>.exe</code> suffix is handled automatically.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-xs text-blue-400">Wildcards Support</h3>
              <p className="text-xs text-slate-400">Use <code>*game*</code> or <code>sublime*</code> to exclude groups of related background applications.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Interactive App Picker</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Click <strong>&quot;Select from Running Apps...&quot;</strong> in Settings to open a fast, multi-threaded background process scanner.</li>
              <li>Filter running desktop applications in real-time or toggle <strong>&quot;Include Background Processes&quot;</strong>.</li>
              <li>Or click <strong>&quot;📂 Browse .exe file...&quot;</strong> to directly pick any executable on your disk.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Website & URL Rules */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2d3142] pb-2">
            <Globe className="text-blue-400" size={20} />
            <h2 className="text-xl font-bold text-white">2. Website & Domain Rules</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Silence popups on rich web applications like Figma, Notion, Google Docs, or GitHub Code Editor:
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#2d3142] bg-[#14161d]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c1e27] text-slate-300 font-semibold border-b border-[#2d3142]">
                <tr>
                  <th className="p-3">Rule Syntax</th>
                  <th className="p-3">Example</th>
                  <th className="p-3">Behavior & Matching Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-400">
                <tr>
                  <td className="p-3 font-mono text-blue-300 font-semibold">Exact Domain</td>
                  <td className="p-3 font-mono text-slate-200">figma.com</td>
                  <td className="p-3">Excludes root domain and pages, but allows subdomains like <code className="text-slate-300">docs.figma.com</code>.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-300 font-semibold">Subdomain Wildcard</td>
                  <td className="p-3 font-mono text-slate-200">*.github.com</td>
                  <td className="p-3">Excludes all subdomains (<code className="text-slate-300">gist.github.com</code>, <code className="text-slate-300">raw.github.com</code>, etc.).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-300 font-semibold">Deep Path Pattern</td>
                  <td className="p-3 font-mono text-slate-200">github.com/*/edit/*</td>
                  <td className="p-3">Suppresses only inside code editing pages, normal browsing stays active.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-emerald-400 font-semibold">Whitelist Exception (!)</td>
                  <td className="p-3 font-mono text-slate-200">!docs.figma.com</td>
                  <td className="p-3"><strong className="text-emerald-400">Highest priority</strong>: Overrides broad wildcard rules and allows popups.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-purple-400 font-semibold">Regex Pattern (regex:)</td>
                  <td className="p-3 font-mono text-slate-200">regex:.*notion\.site/p/.*</td>
                  <td className="p-3">Matches complex dynamic URLs with zero-alloc global compiled caching.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Multi-browser Architecture */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2d3142] pb-2">
            <Shield className="text-blue-400" size={20} />
            <h2 className="text-xl font-bold text-white">3. Supported Browsers & Architecture</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-xs text-blue-400">Chromium & Firefox Support</h3>
              <p className="text-xs text-slate-400">
                Native support for Chrome, Edge, Brave, Vivaldi, Opera, Arc, 360 Browser, Firefox, Zen Browser, and all derivatives.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-xs text-blue-400">600ms Multi-Window TTL Cache</h3>
              <p className="text-xs text-slate-400">
                Independent cache per window handle. Switching tabs or browsers yields instant ~0ms lookup without UI freezing.
              </p>
            </div>
          </div>
        </div>

        {/* Pagination Nav */}
        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/guide/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Extensions</span>
          </Link>
          <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Preferences & Settings</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Exclusion Rules</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">排除规则系统 (Exclusion Rules)</h1>
        <p className="text-slate-400">
          通过排除规则，您可以指定在特定的应用程序或网站中静默自动划词弹窗，彻底避免与软件自带的原生快捷栏冲突。
        </p>
      </div>

      {/* 核心亮点提示 */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
        <Zap className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
        <div className="text-xs sm:text-sm text-slate-300">
          <strong className="text-white">全局快捷键随时生效：</strong> 在被排除的应用或网址中，FlyClip 仅静默鼠标自动选词弹窗。使用全局快捷键（默认 <code className="text-blue-300 bg-blue-900/40 px-1.5 py-0.5 rounded">Ctrl + Alt + Q</code>）始终可以主动呼出动作栏。
        </div>
      </div>

      {/* 第一部分：应用排除规则 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2d3142] pb-2">
          <Monitor className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">1. 应用程序排除规则</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          在代码编辑器（VS Code、JetBrains）、设计软件（Photoshop、Figma Desktop）、全屏游戏等频繁选词场景中屏蔽自动弹窗：
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-xs text-blue-400">进程名精准匹配</h3>
            <p className="text-xs text-slate-400">输入 <code>code</code> 或 <code>code.exe</code> 均可。系统自动忽略大小写并自适应 <code>.exe</code> 后缀。</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-xs text-blue-400">通配符模糊匹配</h3>
            <p className="text-xs text-slate-400">支持 <code>*game*</code>、<code>sublime*</code> 等模式，一键批量排除同系列应用。</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">可视化运行中应用选择器</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>在设置中点击 <strong>「从运行中的应用选择...」</strong>，后台多线程极速扫描桌面窗口与进程，UI 全程 0 卡顿。</li>
            <li>支持实时输入进程名或窗口标题即时搜索过滤，可自由勾选 <strong>「包含后台进程」</strong>。</li>
            <li>亦可点击 <strong>「📂 浏览 .exe 文件...」</strong> 直接通过文件管理器选择磁盘中的程序。</li>
          </ul>
        </div>
      </div>

      {/* 第二部分：网址排除规则 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2d3142] pb-2">
          <Globe className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">2. 网站与 URL 规则</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          针对 Figma、Notion、语雀、飞书文档、Google Docs 或特定网页路径进行精细化控制：
        </p>

        <div className="overflow-x-auto rounded-xl border border-[#2d3142] bg-[#14161d]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1c1e27] text-slate-300 font-semibold border-b border-[#2d3142]">
              <tr>
                <th className="p-3">规则语法</th>
                <th className="p-3">示例</th>
                <th className="p-3">匹配行为与适用场景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-400">
              <tr>
                <td className="p-3 font-mono text-blue-300 font-semibold">精确主域名</td>
                <td className="p-3 font-mono text-slate-200">figma.com</td>
                <td className="p-3">仅排除设计器主站，不会影响 <code className="text-slate-300">docs.figma.com</code> 或帮助文档。</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-blue-300 font-semibold">子域名通配符</td>
                <td className="p-3 font-mono text-slate-200">*.github.com</td>
                <td className="p-3">匹配该域名下的所有子站（如 <code className="text-slate-300">gist.github.com</code>、<code className="text-slate-300">raw.github.com</code> 等）。</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-blue-300 font-semibold">路径通配符</td>
                <td className="p-3 font-mono text-slate-200">github.com/*/edit/*</td>
                <td className="p-3">仅在代码在线编辑页静默，浏览仓库普通页面时仍然正常划词。</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-emerald-400 font-semibold">白名单例外 (!)</td>
                <td className="p-3 font-mono text-slate-200">!docs.figma.com</td>
                <td className="p-3"><strong className="text-emerald-400">最高优先级</strong>：即便主域或子域名已被排除，以 ! 开头的规则依然强制放行。</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-purple-400 font-semibold">正则表达式 (regex:)</td>
                <td className="p-3 font-mono text-slate-200">regex:.*notion\.site/p/.*</td>
                <td className="p-3">匹配动态 URL，全局带原子指针缓存，零编译开销。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 第三部分：浏览器适配与架构 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#2d3142] pb-2">
          <Shield className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">3. 浏览器支持与缓存架构</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-xs text-blue-400">全系浏览器内核适配</h3>
            <p className="text-xs text-slate-400">
              原生支持 Chrome、Edge、Brave、Vivaldi、Opera、Arc、360 浏览器、Firefox、Zen 等所有 Chromium 与 Gecko 浏览器。
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
            <h3 className="font-bold text-white text-xs text-blue-400">600ms 多窗口独立 TTL 缓存</h3>
            <p className="text-xs text-slate-400">
              每个浏览器窗口独立分配缓存槽位，高频切换窗口或标签页时直接内存命中（~0ms），彻底告别卡顿。
            </p>
          </div>
        </div>
      </div>

      {/* 底部前后导航 */}
      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：扩展管理</span>
        </Link>
        <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：偏好设置</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
