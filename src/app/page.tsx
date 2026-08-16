import Link from "next/link";
import { Download, Layers, Zap, Sliders, Monitor, RefreshCw, Lock, ArrowRight } from "lucide-react";
import HeroDemo from "@/components/HeroDemo";

export default function Home() {
  const features = [
    {
      title: "多功能文本瑞士军刀",
      desc: "无论是复制、翻译、搜索、AI 对话还是代码格式化，FlyClip 都能在鼠标抬起瞬间随手触达，大幅提升日常工作流效率。",
      link: "/guide",
      linkText: "了解基础功能",
    },
    {
      title: "丰富的扩展中心生态",
      desc: "40+ 精选开箱即用的原生扩展，涵盖 Google/DeepL 翻译、ChatGPT/Claude、Base64 编解码与 PowerShell 自动化。",
      link: "/extensions",
      linkText: "浏览扩展中心",
    },
    {
      title: "可视化参数选项 (Options)",
      desc: "告别死板配置，首创在设置界面中直接提供开关、单选下拉、文本输入与密钥凭据调整，随心定制扩展行为。",
      link: "/dev#options-spec",
      linkText: "查看选项规范",
    },
    {
      title: "深度 Windows 原生适配",
      desc: "专为 Windows 10/11 打造。支持划选自动触发、长按静止呼出、全局被动热键与多显示器跨 DPI 精准定位。",
      link: "/guide#triggers",
      linkText: "探索触发机制",
    },
    {
      title: "极低迁移成本与语法兼容",
      desc: "采用原生 .flyclipext 标准，同时底层 100% 兼容 PopClip 脚本语法与占位符，可秒级无缝迁移已有扩展资产。",
      link: "/dev#migration",
      linkText: "查看迁移指南",
    },
    {
      title: "纯净本地执行与隐私至上",
      desc: "采用纯 Rust 构建，内存占用仅 15MB。无后台上传、无广告追踪，所有操作均在本地或官方公开 API 执行。",
      link: "/download",
      linkText: "下载安全客户端",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* PopClip-style Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines and Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <span>✨ FlyClip for Windows</span>
              <span>·</span>
              <span>纯 Rust 原生打造</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Windows 上的<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
                极速划词快捷动作。
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              在任意应用程序中选中文本，FlyClip 会即刻在光标附近浮出动作栏，集即时搜索、翻译、AI 交互、格式化与 PowerShell 脚本于一体。
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
              >
                <Download size={18} />
                <span>免费下载 (Windows 64位)</span>
              </Link>

              <Link
                href="/extensions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] hover:border-blue-500 text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5"
              >
                <Layers size={18} />
                <span>浏览扩展中心</span>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">✓ 纯净无广告</span>
              <span className="flex items-center gap-1.5">✓ 仅 15MB 内存占用</span>
              <span className="flex items-center gap-1.5">✓ MIT 开源协议</span>
            </div>
          </div>

          {/* Right Column: Interactive Live Demo */}
          <div className="lg:col-span-6 w-full">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* PopClip-style Feature Boxes */}
      <section className="py-20 bg-[#14161d] border-y border-[#2d3142] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-extrabold text-white">强大、轻量、开箱即用</h2>
            <p className="text-slate-400 text-sm sm:text-base">专为 Windows 打造的下一代划词效率神器，兼顾极速性能与现代设计美学。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#1c1e27] border border-[#2d3142] hover:border-blue-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl group"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{f.desc}</p>
                </div>
                <Link
                  href={f.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{f.linkText}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Options Feature Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Extension Options</span>
          <h2 className="text-3xl font-extrabold text-white">告别死板，支持多维参数选项</h2>
          <p className="text-slate-400 text-sm sm:text-base">在设置界面中即可随意切换目标语言、搜索站点、自定义分隔符或填入 API Key 凭据。</p>
        </div>

        <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#2d3142]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">GT</div>
              <div>
                <h4 className="font-bold text-white">Google Translate</h4>
                <p className="text-xs text-slate-500 font-mono">com.flyclip.extension.google-translate</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">已启用</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">翻译站点 (Site)</span>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">translate.google.com</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#14161d] border border-[#2d3142] text-slate-400 text-xs">google.cn</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">目标语言 (Target Language)</span>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">简体中文 (zh-CN)</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#14161d] border border-[#2d3142] text-slate-400 text-xs">English</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#14161d] border border-[#2d3142] text-slate-400 text-xs">日本語</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-[#14161d] border-t border-[#2d3142] text-center px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold text-white">准备好提升您的 Windows 划词效率了吗？</h2>
          <p className="text-slate-400 text-sm sm:text-base">完全开源免费，零配置即装即用，支持 Windows 10 与 Windows 11。</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25"
            >
              <Download size={16} />
              <span>下载 FlyClip 安装包</span>
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold text-sm transition-all"
            >
              <span>查看新手教程</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
