"use client";

import { useState, useRef } from "react";
import { Copy, Globe, Type, Calculator, Search, Check } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function HeroDemo() {
  const { lang } = useI18n();
  const [text, setText] = useState(
    lang === "en"
      ? "FlyClip provides instant text actions on Windows with zero latency."
      : "FlyClip 专为 Windows 打造，提供零延迟的即时文本划词动作体验。"
  );
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const samples = lang === "en"
    ? [
        { label: "🌐 Translate Demo", value: "FlyClip provides instant text actions on Windows with zero latency." },
        { label: "🧮 Math Calc", value: "128 * 1024 / 4" },
        { label: "Aa Case Convert", value: "get_user_profile_data" },
        { label: "⏱️ Unix Timestamp", value: "1773676800" },
      ]
    : [
        { label: "🌐 翻译示例", value: "FlyClip provides instant text actions on Windows with zero latency." },
        { label: "🧮 数学计算", value: "128 * 1024 / 4" },
        { label: "Aa 命名转换", value: "get_user_profile_data" },
        { label: "⏱️ Unix 时间戳", value: "1773676800" },
      ];

  const handleAction = (type: string) => {
    if (type === "copy") {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setOutput(lang === "en" ? "Copied text to clipboard!" : "已将文本复制到剪贴板！");
      setTimeout(() => setCopied(false), 2000);
    } else if (type === "translate") {
      setOutput(
        lang === "en"
          ? "Translation: FlyClip is an ultra-fast text selection action tool for Windows."
          : "Google 翻译: FlyClip 在 Windows 上提供零延迟的即时文本划词动作。"
      );
    } else if (type === "upper") {
      const upper = text.toUpperCase();
      setText(upper);
      setOutput(lang === "en" ? `Converted to uppercase: ${upper}` : `已转换为大写: ${upper}`);
    } else if (type === "calc") {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(text);
        setOutput(lang === "en" ? `Result: ${text} = ${res}` : `计算结果: ${text} = ${res}`);
      } catch {
        setOutput(lang === "en" ? "Error: please select a valid math expression" : "计算错误: 请选中有效的数学表达式");
      }
    } else if (type === "search") {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#1c1e27] border border-[#2d3142] rounded-2xl shadow-2xl p-6 text-left relative overflow-hidden">
      {/* Top Titlebar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#2d3142] mb-5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs font-semibold text-slate-400 ml-2">
            {lang === "en" ? "Live Action Bar Preview" : "在线交互体验 · Simulated Action Bar"}
          </span>
        </div>
        <span className="text-xs text-slate-500">
          {lang === "en" ? "Select text or click samples" : "在下方划选或点击快捷示例"}
        </span>
      </div>

      {/* Preset Samples */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-slate-500">{lang === "en" ? "Presets:" : "预设测试:"}</span>
        {samples.map((s) => (
          <button
            key={s.label}
            onClick={() => {
              setText(s.value);
              setOutput(null);
            }}
            className="px-2.5 py-1 rounded-md bg-[#14161d] border border-[#2d3142] hover:border-blue-500 text-xs text-slate-300 transition-colors"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Simulated Desktop Editor & Floating FlyClip Bar */}
      <div className="relative pt-10">
        {/* Floating Bar */}
        <div className="absolute top-0 left-6 z-20 flex items-center gap-1 p-1.5 bg-[#17181c] border border-[#34363e] rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => handleAction("copy")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
          >
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            <span>{lang === "en" ? "Copy" : "复制"}</span>
          </button>
          <button
            onClick={() => handleAction("translate")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
          >
            <Globe size={13} className="text-blue-400" />
            <span>{lang === "en" ? "Translate" : "翻译"}</span>
          </button>
          <button
            onClick={() => handleAction("upper")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
          >
            <Type size={13} className="text-indigo-400" />
            <span>{lang === "en" ? "Upper" : "大写"}</span>
          </button>
          <button
            onClick={() => handleAction("calc")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
          >
            <Calculator size={13} className="text-amber-400" />
            <span>{lang === "en" ? "Calc" : "计算"}</span>
          </button>
          <button
            onClick={() => handleAction("search")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
          >
            <Search size={13} className="text-emerald-400" />
            <span>{lang === "en" ? "Search" : "搜索"}</span>
          </button>
        </div>

        {/* Text Field */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setText(e.currentTarget.innerText)}
          className="w-full min-h-[90px] p-4 rounded-xl bg-[#14161d] border border-[#2d3142] text-slate-100 font-normal text-base focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
        >
          {text}
        </div>
      </div>

      {/* Live Action Output */}
      {output && (
        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border-l-4 border-blue-500 text-sm text-blue-200 animate-in fade-in duration-150">
          {output}
        </div>
      )}
    </div>
  );
}
