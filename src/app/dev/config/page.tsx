"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevConfigPage() {
  const { lang, getLocalizedHref } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Config</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Config.yaml Manifest Specification</h1>
          <p className="text-slate-400">
            <code>Config.yaml</code> is the core metadata file of a FlyClip extension, defining its name, icon, options, and actions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Core Field Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">Field</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">name</td>
                  <td className="py-3 px-3">String / Map</td>
                  <td className="py-3 px-3">Display name of the extension (Required). Supports multilingual key-value mappings.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">identifier</td>
                  <td className="py-3 px-3">String</td>
                  <td className="py-3 px-3">Unique reverse-DNS identifier, e.g. <code>com.flyclip.extension.my-ext</code>.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">icon</td>
                  <td className="py-3 px-3">String</td>
                  <td className="py-3 px-3">Icon declaration. Supports text (e.g. <code>GT</code>) or Iconify IDs (e.g. <code>iconify:mdi:translate</code>).</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">description</td>
                  <td className="py-3 px-3">String / Map</td>
                  <td className="py-3 px-3">Brief description of the extension. Supports multilingual key-value mappings.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">options</td>
                  <td className="py-3 px-3">Array</td>
                  <td className="py-3 px-3">List of user-configurable settings rendered in preferences.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">platforms</td>
                  <td className="py-3 px-3">Array</td>
                  <td className="py-3 px-3">
                    Target operating systems: <code>[windows, macos, linux]</code> (defaults to all).<br />
                    <strong>WebDAV Sync Friendly</strong>: Installs safely across all synced devices, silently disabling actions on unsupported OS without throwing blocking errors.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">actions</td>
                  <td className="py-3 px-3">Array / Object</td>
                  <td className="py-3 px-3">Defines one or multiple selection actions. See Action Fields Reference below.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Fields Reference Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Action Fields Reference (<code>actions[]</code>)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">Field</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">title</td>
                  <td className="py-3 px-3">String / Map</td>
                  <td className="py-3 px-3">Action display label / tooltip. Supports multilingual mappings.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">icon</td>
                  <td className="py-3 px-3">String</td>
                  <td className="py-3 px-3">
                    Icon identifier: built-in (<code>copy</code>, <code>paste</code>, <code>search</code>, <code>link</code>, <code>mail</code>, <code>upper</code>, <code>lower</code>), glyph text (e.g. <code>Aa</code>), or <code>iconify:mdi:translate</code>.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">requirements</td>
                  <td className="py-3 px-3">Array / String</td>
                  <td className="py-3 px-3">
                    Activation rules & text narrowing filters. Defaults to <code>[text]</code> (or <code>[paste]</code> for paste commands). See Requirements section below.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">regex</td>
                  <td className="py-3 px-3">String</td>
                  <td className="py-3 px-3">Regular expression filter. Action appears only if narrowed text matches.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">required apps</td>
                  <td className="py-3 px-3">Array</td>
                  <td className="py-3 px-3">Show action only in specific processes (e.g. <code>[code.exe, devenv.exe]</code>).</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">excluded apps</td>
                  <td className="py-3 px-3">Array</td>
                  <td className="py-3 px-3">Hide action in specific processes.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">before / after</td>
                  <td className="py-3 px-3">String</td>
                  <td className="py-3 px-3">
                    Pipeline steps: <code>copy-selection</code>, <code>paste-result</code>, <code>copy-result</code>, <code>show-result</code>, <code>preview-result</code>.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">stay visible</td>
                  <td className="py-3 px-3">Boolean</td>
                  <td className="py-3 px-3">If <code>true</code>, keeps popup bar visible after executing action.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">restore pasteboard</td>
                  <td className="py-3 px-3">Boolean</td>
                  <td className="py-3 px-3">If <code>true</code> (default), preserves and restores original user clipboard contents.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-emerald-400">javascript / url / command</td>
                  <td className="py-3 px-3">String</td>
                  <td className="py-3 px-3">Action execution payload (JavaScript code, URL template, built-in command, or key combo).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Requirements Specification Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>Activation Requirements & Narrowing (<code>requirements</code>)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            <code>requirements</code> defines when an action should appear and how the input text is automatically narrowed/extracted before reaching your code. PopClip and FlyClip are 100% compatible with the following specification:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">Requirement</th>
                  <th className="py-2.5 px-3">Trigger Condition</th>
                  <th className="py-2.5 px-3">Input Text Narrowing (<code>flyclip.input.text</code>)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">text</td>
                  <td className="py-3 px-3"><strong>Default</strong>. Matches when non-empty text is selected on screen. <em>Hidden during empty selection / long-press.</em></td>
                  <td className="py-3 px-3">Entire trimmed selected text.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">paste</td>
                  <td className="py-3 px-3">Matches during <strong>Long-Press / Caret focus / Empty selection</strong> when clipboard is pasteable.</td>
                  <td className="py-3 px-3">Empty string / clipboard context.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">url / httpurl</td>
                  <td className="py-3 px-3">Selected text contains at least one valid web URL.</td>
                  <td className="py-3 px-3"><strong>Narrowed</strong>: Automatically extracts the URL and prefixes <code>http://</code> if missing.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">isurl</td>
                  <td className="py-3 px-3">The entire selection is strictly a valid URL without surrounding words.</td>
                  <td className="py-3 px-3">The URL string.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">email</td>
                  <td className="py-3 px-3">Selected text contains an email address.</td>
                  <td className="py-3 px-3"><strong>Narrowed</strong>: Automatically extracts the email address.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">path</td>
                  <td className="py-3 px-3">Selected text matches an existing local file or directory path.</td>
                  <td className="py-3 px-3"><strong>Narrowed</strong>: Resolved absolute path.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">option-&lt;id&gt;=&lt;val&gt;</td>
                  <td className="py-3 px-3">Matches only if user preference option <code>&lt;id&gt;</code> equals <code>&lt;val&gt;</code> (e.g. <code>option-enable_pro=1</code>).</td>
                  <td className="py-3 px-3">Unchanged.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-amber-400">!&lt;requirement&gt;</td>
                  <td className="py-3 px-3">Negates the requirement (e.g. <code>!url</code> matches only when text does NOT contain a URL).</td>
                  <td className="py-3 px-3">Unchanged.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Multilingual Localization Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
            <Globe className="text-emerald-400" size={20} />
            <span>Multilingual Localization (i18n in Config.yaml)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Both <strong>PopClip</strong> and <strong>FlyClip</strong> natively support multilingual dictionary maps for <code>name</code>, <code>description</code>, <code>title</code>, and <code>options[].label</code>. The client automatically selects the best matching language based on the user&apos;s system/app language (with fallback to <code>en</code>):
          </p>

          <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-200">
            <pre>{`# Multilingual Extension Example
name:
  en: Case Converter
  zh-CN: 大小写转换
  zh-Hans: 大小写转换
  zh-Hant: 大小寫轉換
  ja: ケース変換

description:
  en: Convert selected text between UPPER, lower, camelCase, snake_case.
  zh-CN: 选中文本在各种大小写与命名风格之间快速转换。

identifier: com.flyclip.extension.case-converter
icon: Aa

options:
  - identifier: target_format
    label:
      en: Default Format
      zh-CN: 默认转换格式
    type: multiple
    values: [upper, lower, camel, snake]
    value labels:
      - Upper (大写)
      - Lower (小写)
      - camelCase (小驼峰)
      - snake_case (下划线)
    default value: upper

actions:
  - title:
      en: Convert to UPPER
      zh-CN: 转换为大写
    javascript: return flyclip.input.text.toUpperCase();
    requirements: [text]
    after: paste-result`}</pre>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href={getLocalizedHref("/dev/packages")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Packages</span>
          </Link>
          <Link href={getLocalizedHref("/dev/options")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Options Specification</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Config</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Config.yaml 配置文件规范</h1>
        <p className="text-slate-400">
          <code>Config.yaml</code> 是 FlyClip 扩展的核心元数据文件，定义了扩展名、图标、选项与动作。
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">核心字段参考表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">字段名</th>
                <th className="py-2.5 px-3">类型</th>
                <th className="py-2.5 px-3">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">name</td>
                <td className="py-3 px-3">String / Map</td>
                <td className="py-3 px-3">扩展显示名称（必填）。支持多语言键值对 Map。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">identifier</td>
                <td className="py-3 px-3">String</td>
                <td className="py-3 px-3">全局唯一反向域名标识符，例如 <code>com.flyclip.extension.my-ext</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">icon</td>
                <td className="py-3 px-3">String</td>
                <td className="py-3 px-3">图标声明。支持纯文本（如 <code>GT</code>）或 Iconify 图标（如 <code>iconify:mdi:translate</code>）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">description</td>
                <td className="py-3 px-3">String / Map</td>
                <td className="py-3 px-3">扩展的简要功能描述。支持多语言键值对 Map。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">options</td>
                <td className="py-3 px-3">Array</td>
                <td className="py-3 px-3">在设置界面中可供用户调整的参数列表。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">platforms</td>
                <td className="py-3 px-3">Array</td>
                <td className="py-3 px-3">
                  支持的操作系统平台：<code>[windows, macos, linux]</code>（默认全部支持）。<br />
                  <strong>WebDAV 同步友好</strong>：跨设备同步时所有系统均允许正常安装，但在非目标系统上自动静默禁用动作，不产生阻断性错误。
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">actions</td>
                <td className="py-3 px-3">Array / Object</td>
                <td className="py-3 px-3">定义一个或多个具体的划词动作。详见下方动作字段参考表。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Fields Reference Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">动作字段详细参考 (<code>actions[]</code>)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">字段名</th>
                <th className="py-2.5 px-3">类型</th>
                <th className="py-2.5 px-3">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">title</td>
                <td className="py-3 px-3">String / Map</td>
                <td className="py-3 px-3">动作按钮名称 / Tooltip 悬停提示。支持多语言字典映射。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">icon</td>
                <td className="py-3 px-3">String</td>
                <td className="py-3 px-3">
                  动作图标：内置关键字（<code>copy</code>、<code>paste</code>、<code>search</code>、<code>link</code>、<code>mail</code>、<code>upper</code>、<code>lower</code>）、自定义单字（如 <code>Aa</code>）或 <code>iconify:...</code>。
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">requirements</td>
                <td className="py-3 px-3">Array / String</td>
                <td className="py-3 px-3">
                  显示门禁与文本收窄规则。缺省默认为 <code>[text]</code>（若 command 为 paste 则默认为 <code>[paste]</code>）。详见下方规范。
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">regex</td>
                <td className="py-3 px-3">String</td>
                <td className="py-3 px-3">正则表达式匹配过滤。仅当收窄后的文本命中正则时才显示动作。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">required apps</td>
                <td className="py-3 px-3">Array</td>
                <td className="py-3 px-3">仅在指定的进程中显示该动作（如 <code>[code.exe, devenv.exe]</code>）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">excluded apps</td>
                <td className="py-3 px-3">Array</td>
                <td className="py-3 px-3">在指定的进程中隐藏该动作。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">before / after</td>
                <td className="py-3 px-3">String</td>
                <td className="py-3 px-3">
                  执行管道步骤：<code>copy-selection</code>、<code>paste-result</code>、<code>copy-result</code>、<code>show-result</code>、<code>preview-result</code>。
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">stay visible</td>
                <td className="py-3 px-3">Boolean</td>
                <td className="py-3 px-3">执行后是否保持弹出条不自动隐藏。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">restore pasteboard</td>
                <td className="py-3 px-3">Boolean</td>
                <td className="py-3 px-3">执行后是否还原用户原有的剪贴板内容（默认 true）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400">javascript / url / command</td>
                <td className="py-3 px-3">String</td>
                <td className="py-3 px-3">动作的实际实现体（JavaScript 脚本、URL 模板、内置命令或快捷键）。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Requirements Specification Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <span className="text-emerald-400">⚡</span>
          <span>匹配门禁与文本收窄规范 (<code>requirements</code>)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          <code>requirements</code> 决定了动作在何时弹出，并在传递给扩展代码前自动对选中文本进行提取与收窄。PopClip 与 FlyClip 100% 遵循此标准：
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">规则值</th>
                <th className="py-2.5 px-3">触发与显示条件</th>
                <th className="py-2.5 px-3">文本收窄效果 (<code>flyclip.input.text</code>)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">text</td>
                <td className="py-3 px-3"><strong>默认值</strong>。屏幕上有选中文本时才显示。<em>在长按/未选中文本时自动隐藏。</em></td>
                <td className="py-3 px-3">完整的选区文本（自动两端去除空白）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">paste</td>
                <td className="py-3 px-3">在<strong>输入框长按 / 光标停留 / 未选中文本</strong>时显示，用于快速粘贴。</td>
                <td className="py-3 px-3">空字符串 / 剪贴板环境。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">url / httpurl</td>
                <td className="py-3 px-3">选中文本中包含至少一个合法的网络 URL。</td>
                <td className="py-3 px-3"><strong>自动收窄</strong>：提取出其中的有效网址，并自动补全 <code>http://</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">isurl</td>
                <td className="py-3 px-3">选中的全部文本必须严格是一个合法网址（前后不能有多余汉字/英文）。</td>
                <td className="py-3 px-3">该网址。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">email</td>
                <td className="py-3 px-3">选中文本中包含有效的电子邮件地址。</td>
                <td className="py-3 px-3"><strong>自动收窄</strong>：提取出其中的邮箱地址。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">path</td>
                <td className="py-3 px-3">选中文本必须是本机实际存在的文件或文件夹路径。</td>
                <td className="py-3 px-3"><strong>自动收窄</strong>：解析为规范化的绝对路径。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">option-&lt;id&gt;=&lt;val&gt;</td>
                <td className="py-3 px-3">当用户在扩展设置中将 <code>&lt;id&gt;</code> 选项配置为 <code>&lt;val&gt;</code> 时才显示动作。</td>
                <td className="py-3 px-3">不收窄。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-amber-400">!&lt;requirement&gt;</td>
                <td className="py-3 px-3">取反条件（如 <code>!url</code> 表示文本中不包含网址时才显示）。</td>
                <td className="py-3 px-3">不收窄。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Multilingual Localization Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Globe className="text-emerald-400" size={20} />
          <span>多语言本地化配置 (i18n 支持)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          <strong>PopClip 与 FlyClip 原生 100% 支持</strong>在 <code>Config.yaml</code> 中直接使用多语言字典映射配置 <code>name</code>（扩展名）、<code>description</code>（描述）、<code>title</code>（动作标题）以及 <code>options[].label</code>（设置项标签）。客户端会根据当前用户的系统/软件语言自动匹配显示（缺省回退至 <code>en</code>）：
        </p>

        <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-200">
          <pre>{`# 多语言扩展声明示例
name:
  en: Case Converter
  zh-CN: 大小写转换
  zh-Hans: 大小写转换
  zh-Hant: 大小寫轉換
  ja: ケース変換

description:
  en: Convert selected text between UPPER, lower, camelCase, snake_case.
  zh-CN: 选中文本在各种大小写与命名风格之间快速转换。

identifier: com.flyclip.extension.case-converter
icon: Aa

options:
  - identifier: target_format
    label:
      en: Default Format
      zh-CN: 默认转换格式
    type: multiple
    values: [upper, lower, camel, snake]
    value labels:
      - Upper (大写)
      - Lower (小写)
      - camelCase (小驼峰)
      - snake_case (下划线)
    default value: upper

actions:
  - title:
      en: Convert to UPPER
      zh-CN: 转换为大写
    javascript: return flyclip.input.text.toUpperCase();
    requirements: [text]
    after: paste-result`}</pre>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href={getLocalizedHref("/dev/packages")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：扩展包结构</span>
        </Link>
        <Link href={getLocalizedHref("/dev/options")} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：参数选项规范</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
