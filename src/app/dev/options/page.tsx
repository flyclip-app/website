"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevOptionsPage() {
  const { lang } = useI18n();

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Options</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Options & Parameter Schema</h1>
          <p className="text-slate-400">
            FlyClip allows developers to declare configurable fields via the <code>options</code> property, rendered automatically as interactive controls in preferences.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">Four Supported Option Types</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm text-blue-400">1. Toggle Switch (boolean)</h3>
              <p className="text-xs text-slate-400">Renders as a Windows switch control. Injected as <code>1</code> (on) or <code>0</code> (off).</p>
              <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
                <pre>{`- identifier: url_safe
  label: URL Safe Mode
  type: boolean
  default value: false`}</pre>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm text-blue-400">2. Segmented Single Choice (multiple)</h3>
              <p className="text-xs text-slate-400">
                Renders as horizontal segmented choice chips (single-select from a list of options, matching PopClip&apos;s <code>multiple</code> option type).
              </p>
              <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
                <pre>{`- identifier: target_lang
  label: Target Language
  type: multiple
  values: [zh-CN, en, ja, ko]
  value labels: [Simplified Chinese, English, Japanese, Korean]
  default value: zh-CN`}</pre>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm text-blue-400">3. Text Input (string)</h3>
              <p className="text-xs text-slate-400">Renders as a single-line or multi-line text input field.</p>
              <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
                <pre>{`- identifier: custom_prefix
  label: Custom Prefix
  type: string
  default value: "# "`}</pre>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm text-blue-400">4. Secret Credentials (secret)</h3>
              <p className="text-xs text-slate-400">Masked password field for storing sensitive API keys such as OpenAI tokens.</p>
              <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
                <pre>{`- identifier: api_key
  label: OpenAI API Key
  type: secret`}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/config" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: Config Spec</span>
          </Link>
          <Link href="/dev/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
            <span>Next: Actions & Scripts</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Options</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">参数选项规范 (Options Specification)</h1>
        <p className="text-slate-400">
          FlyClip 允许开发者通过 <code>options</code> 字段为扩展提供直观的图形化设置面板。
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">支持的 4 种选项类型</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-sm text-blue-400">1. 开关类型 (boolean)</h3>
            <p className="text-xs text-slate-400">渲染为 Windows 开关 Switch 控件。注入为 <code>1</code>（开启）或 <code>0</code>（关闭）。</p>
            <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
              <pre>{`- identifier: url_safe
  label: URL 安全模式
  type: boolean
  default value: false`}</pre>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-sm text-blue-400">2. 候选项单选分段组 (multiple)</h3>
            <p className="text-xs text-slate-400">
              渲染为水平分段按钮组（从多个预设候选项中<strong>单选其一</strong>，与 PopClip 的 <code>multiple</code> 类型标准完全一致）。
            </p>
            <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
              <pre>{`- identifier: target_lang
  label: 目标语言
  type: multiple
  values: [zh-CN, en, ja, ko]
  value labels: [简体中文, English, 日本語, 한국어]
  default value: zh-CN`}</pre>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-sm text-blue-400">3. 文本输入 (string)</h3>
            <p className="text-xs text-slate-400">渲染为单行或多行文本输入框，适合配置自定义分隔符或前缀。</p>
            <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
              <pre>{`- identifier: custom_prefix
  label: 自定义前缀
  type: string
  default value: "# "`}</pre>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <h3 className="font-bold text-white text-sm text-blue-400">4. 密钥凭据 (secret)</h3>
            <p className="text-xs text-slate-400">安全输入框，用于存放 OpenAI API Key 等敏感 Token。</p>
            <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
              <pre>{`- identifier: api_key
  label: OpenAI API Key
  type: secret`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/config" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：Config 规范</span>
        </Link>
        <Link href="/dev/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：动作类型与脚本</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
