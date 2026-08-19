"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bot, Check, Copy, ExternalLink, Sparkles, Terminal, Wrench } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function DevAiSkillPage() {
  const { lang } = useI18n();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const rawSkillUrl = "https://raw.githubusercontent.com/flyclip-app/flyclip-extensions/main/SKILL.md";

  const copyToClipboard = (text: string, type: "url" | number) => {
    navigator.clipboard.writeText(text);
    if (type === "url") {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedPrompt(type);
      setTimeout(() => setCopiedPrompt(null), 2000);
    }
  };

  const samplePrompts = [
    {
      title: lang === "en" ? "AI Text Polish (DeepSeek / OpenAI)" : "AI 文本润色 (DeepSeek / OpenAI)",
      prompt: lang === "en"
        ? "Create a FlyClip extension using JavaScript and DeepSeek API: when text is selected, call the API to polish the text and paste the result. Support configuring the API Key in FlyClip settings options."
        : "帮我写一个 FlyClip 扩展：选中文本后调用 DeepSeek API 进行文案润色，处理完后直接粘贴替换，并在 FlyClip 设置里支持配置 API Key。"
    },
    {
      title: lang === "en" ? "GitHub Commit Quick Opener" : "GitHub Commit 跳转与提取",
      prompt: lang === "en"
        ? "Create a FlyClip URL extension that triggers only when a 7+ character git commit hash (hexadecimal) is selected, opening https://github.com/my-org/my-repo/commit/{text} in the browser."
        : "帮我写一个 FlyClip 扩展：通过正则仅匹配 7 位以上的 Git Commit Hash（十六进制字符），点击后在默认浏览器中打开对应 GitHub 仓库的提交记录页面。"
    },
    {
      title: lang === "en" ? "Snake Case & Camel Case Converter" : "代码命名风格转换器 (snake_case)",
      prompt: lang === "en"
        ? "Create a FlyClip JavaScript snippet extension that converts the selected text to snake_case and replaces the selection directly."
        : "帮我写一个 FlyClip JavaScript 扩展 Snippet：将选中文本转换为下划线命名法（snake_case），执行后自动粘贴替换所选文本。"
    }
  ];

  if (lang === "en") {
    return (
      <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / AI Skill</div>
          <h1 className="text-3xl font-extrabold text-white mb-3 flex items-center gap-3">
            <Bot className="text-blue-400" size={32} />
            <span>AI Extension Developer Skill</span>
          </h1>
          <p className="text-slate-400">
            Supercharge your AI assistants (Cursor, Claude, ChatGPT, Antigravity, Cline, Copilot) with the official FlyClip Extension Skill to design, build, and debug extensions in seconds.
          </p>
        </div>

        {/* Skill URL Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-[#1c1e27] border border-blue-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase">Official AI Skill File</div>
              <div className="text-base font-bold text-white">SKILL.md (Direct Raw Link)</div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/flyclip-app/flyclip-extensions/blob/main/SKILL.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14161d] hover:bg-[#202330] border border-[#2d3142] text-xs text-slate-300 transition-colors"
              >
                <span>View on GitHub</span>
                <ExternalLink size={12} />
              </a>
              <button
                onClick={() => copyToClipboard(rawSkillUrl, "url")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
              >
                {copiedUrl ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedUrl ? "Copied URL!" : "Copy Skill URL"}</span>
              </button>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-300 break-all select-all">
            {rawSkillUrl}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
            <Wrench className="text-blue-400" size={20} />
            <span>How to Load the Skill in Your AI Tool</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Cursor / Windsurf / Copilot</span>
              </div>
              <p className="text-xs text-slate-400">
                Add <code>SKILL.md</code> to your project root or paste its content into <code>.cursorrules</code>. You can also mention <code>@SKILL.md</code> directly in Composer chat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Claude / ChatGPT / Claude Code</span>
              </div>
              <p className="text-xs text-slate-400">
                Upload <code>SKILL.md</code> to Project Knowledge in Claude, add to Custom Instructions in ChatGPT, or pass via <code>claude --skill</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Antigravity / Cline / Roo Code</span>
              </div>
              <p className="text-xs text-slate-400">
                Place the skill in your local <code>.skills/</code> directory or prompt the assistant with the raw URL to automatically activate the FlyClip developer persona.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Instant Installation in FlyClip</span>
              </div>
              <p className="text-xs text-slate-400">
                Once the AI outputs a <code># flyclip</code> snippet, copy the text and highlight it on screen. FlyClip will automatically show the &ldquo;Install Extension&rdquo; action bar!
              </p>
            </div>
          </div>
        </div>

        {/* Sample Prompts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
            <Sparkles className="text-blue-400" size={20} />
            <span>Ready-to-Use Prompts for AI</span>
          </h2>

          <div className="space-y-3">
            {samplePrompts.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">{item.title}</span>
                  <button
                    onClick={() => copyToClipboard(item.prompt, idx)}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedPrompt === idx ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedPrompt === idx ? "Copied" : "Copy Prompt"}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 italic font-mono bg-[#1c1e27] p-2.5 rounded-lg border border-[#2d3142]/60">
                  &ldquo;{item.prompt}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
          <Link href="/dev/migration" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Prev: PopClip Converter Tool</span>
          </Link>
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
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">开发者参考 / AI 辅助开发</div>
        <h1 className="text-3xl font-extrabold text-white mb-3 flex items-center gap-3">
          <Bot className="text-blue-400" size={32} />
          <span>AI 扩展开发 Skill 指南</span>
        </h1>
        <p className="text-slate-400">
          通过官方专为大模型定制的 <strong>FlyClip Extension Developer Skill</strong>，将你的 AI 编码助手（Cursor、Claude、ChatGPT、Antigravity、Cline、Copilot 等）武装为 FlyClip 扩展开发专家，一句话生成、调试与转换任意扩展！
        </p>
      </div>

      {/* Skill URL Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-[#1c1e27] border border-blue-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase">官方 AI Skill 规则文件</div>
            <div className="text-base font-bold text-white">SKILL.md (直接 Raw 在线引用链接)</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/flyclip-app/flyclip-extensions/blob/main/SKILL.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14161d] hover:bg-[#202330] border border-[#2d3142] text-xs text-slate-300 transition-colors"
            >
              <span>在 GitHub 查看</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={() => copyToClipboard(rawSkillUrl, "url")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
            >
              {copiedUrl ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedUrl ? "已复制链接！" : "复制 Skill 在线链接"}</span>
            </button>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-300 break-all select-all">
          {rawSkillUrl}
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Wrench className="text-blue-400" size={20} />
          <span>如何在各大 AI 工具中加载该 Skill？</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Cursor / Windsurf / Copilot</span>
            </div>
            <p className="text-xs text-slate-400">
              将 <code>SKILL.md</code> 放入项目根目录，或在 <code>.cursorrules</code> 中引用该规范。在 Composer 对话中输入 <code>@SKILL.md</code> 即可激活扩展生成能力。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Claude / ChatGPT / Claude Code</span>
            </div>
            <p className="text-xs text-slate-400">
              在 Claude Projects 中上传 <code>SKILL.md</code> 作为项目知识库，或在 ChatGPT 自定义指令中贴入，AI 即可精准遵循 FlyClip API 规范。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Antigravity / Cline / Roo Code</span>
            </div>
            <p className="text-xs text-slate-400">
              将文件放入 <code>.skills/</code> 目录，或向 Agent 发送上述 Raw URL，Agent 会自动学习并执行扩展创建与验证。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>FlyClip 一键复制安装</span>
            </div>
            <p className="text-xs text-slate-400">
              AI 输出 <code># flyclip</code> 代码段后，直接在屏幕上选中该 YAML 文本，FlyClip 会自动识别并弹出「安装扩展」气泡，点击即可瞬间安装生效！
            </p>
          </div>
        </div>
      </div>

      {/* Sample Prompts */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Sparkles className="text-blue-400" size={20} />
          <span>可以直接发给 AI 的常用 Prompt 范例</span>
        </h2>

        <div className="space-y-3">
          {samplePrompts.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">{item.title}</span>
                <button
                  onClick={() => copyToClipboard(item.prompt, idx)}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedPrompt === idx ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedPrompt === idx ? "已复制" : "复制 Prompt"}</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 italic font-mono bg-[#1c1e27] p-2.5 rounded-lg border border-[#2d3142]/60">
                &ldquo;{item.prompt}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/migration" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页: PopClip 扩展转换器</span>
        </Link>
        <Link href="/dev/generator" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一页: 在线扩展生成器</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
