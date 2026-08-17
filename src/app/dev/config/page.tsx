"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevConfigPage() {
  const { lang } = useI18n();

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
                  <td className="py-3 px-3">Brief description of the extension.</td>
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
                  <td className="py-3 px-3">Defines one or multiple selection actions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/packages" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Packages</span>
          </Link>
          <Link href="/dev/options" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
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
                <td className="py-3 px-3">扩展显示名称（必填）。支持多语言键值对。</td>
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
                <td className="py-3 px-3">扩展的简要功能描述。</td>
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
                <td className="py-3 px-3">定义一个或多个具体的划词动作。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/packages" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：扩展包结构</span>
        </Link>
        <Link href="/dev/options" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：参数选项规范</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
