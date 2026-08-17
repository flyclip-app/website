"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export default function GuideActionsPage() {
  const { lang } = useI18n();

  const actions = lang === "en"
    ? [
        { title: "Copy", desc: "Copy selected text to Windows clipboard." },
        { title: "Cut", desc: "Cut selected text to clipboard and remove from input (requires editable area)." },
        { title: "Paste", desc: "Paste current clipboard content to replace selection." },
        { title: "Open Link", desc: "Automatically lights up when selection is a valid URL, opening in default browser." },
        { title: "Send Email", desc: "Lights up for email addresses, launching the default Windows mail client." },
        { title: "Trim Whitespace", desc: "Removes extra leading and trailing whitespace/newlines from selection." },
        { title: "Select All", desc: "Provides a quick select-all shortcut in the hold-to-paste menu." },
      ]
    : [
        { title: "复制 (Copy)", desc: "将选中的纯文本复制到 Windows 系统剪贴板。" },
        { title: "剪切 (Cut)", desc: "剪切选中文本到剪贴板并从源文本区域移除（需目标输入框可编辑）。" },
        { title: "粘贴 (Paste)", desc: "将剪贴板当前内容直接粘贴替换选区。" },
        { title: "打开网址 (Open Link)", desc: "当选区为合法 HTTP/HTTPS 链接时智能亮起，使用系统默认浏览器秒级打开。" },
        { title: "发送邮件 (Send Email)", desc: "当选区为电子邮箱格式时智能亮起，呼出 Windows 默认邮件客户端。" },
        { title: "去除首尾空格 (Trim)", desc: "消除选中文本两端多余的空格与换行符并替换粘贴。" },
        { title: "全选 (Select All)", desc: "在长按空白区域呼出的粘贴菜单中提供全选当前文档快捷操作。" },
      ];

  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
          {lang === "en" ? "User Guide / Built-in Actions" : "User Guide / Built-in Actions"}
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          {lang === "en" ? "Built-in Quick Actions" : "内置快捷动作"}
        </h1>
        <p className="text-slate-400">
          {lang === "en"
            ? "FlyClip comes with core clipboard and text manipulation tools built-in, working immediately out of the box."
            : "FlyClip 原生内置了常用的剪贴板基础操作，无需额外安装扩展即可开箱即用。"}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">
          {lang === "en" ? "Standard Action Catalog" : "基础内置动作列表"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((act, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1">
              <h3 className="font-bold text-white text-sm text-blue-400">{act.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide/basics" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>{lang === "en" ? "Prev: Basics" : "上一页：触发机制"}</span>
        </Link>
        <Link href="/guide/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>{lang === "en" ? "Next: Extensions" : "下一步：扩展管理"}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
