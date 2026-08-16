import Link from "next/link";
import { Download, Layers, Zap, Sliders, Monitor, RefreshCw, Lock, ArrowRight } from "lucide-react";
import HeroDemo from "@/components/HeroDemo";

export default function Home() {
  const features = [
    {
      icon: <Zap className="text-amber-400" size={24} />,
      title: "零延迟原生性能",
      desc: "采用纯 Rust 编写与 GPUI 现代化渲染，毫秒级划选捕获响应，空闲内存占用仅 15MB 左右。",
    },
    {
      icon: <Layers className="text-blue-400" size={24} />,
      title: "40+ 丰富官方扩展",
      desc: "涵盖 Google/DeepL/百度翻译、ChatGPT/Claude/DeepSeek 搜索、全能命名转换与 Base64 编解码。",
    },
    {
      icon: <Sliders className="text-emerald-400" size={24} />,
      title: "全功能参数选项 (Options)",
      desc: "独创支持在图形界面直接配置扩展选项（开关、分段单选、文本输入、密钥凭据），让扩展随心所欲。",
    },
    {
      icon: <Monitor className="text-purple-400" size={24} />,
      title: "深度 Windows 交互适配",
      desc: "完美支持划选自动触发、鼠标长按静止触发（Hold Trigger）、全局被动热键与 PowerShell 7/5.1 自动化脚本。",
    },
    {
      icon: <RefreshCw className="text-cyan-400" size={24} />,
      title: "平滑迁移与语法兼容",
      desc: "原生采用 .flyclipext 标准，同时 100% 兼容 PopClip 脚本逻辑与参数占位符，极低学习与迁移成本。",
    },
    {
      icon: <Lock className="text-rose-400" size={24} />,
      title: "纯净本地执行与隐私保护",
      desc: "无后台数据上报，无广告，所有操作与脚本均在本地或官方公开 API 执行，剪贴板数据阅后即焚。",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <span>✨ FlyClip for Windows</span>
            <span>·</span>
            <span>全新 1.0 正式版发布</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            划选文本，<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
              即刻触发无限可能。
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            专为 Windows 打造的原生划词快捷动作神器。鼠标划选文本即刻弹出动作栏，集搜索、翻译、AI 对话、文本格式化及 PowerShell 自动化于一体。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-8">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              <Download size={18} />
              <span>立即下载 (Windows 64位)</span>
            </Link>

            <Link
              href="/extensions"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] hover:border-blue-500 text-slate-200 hover:text-white font-semibold text-base transition-all hover:-translate-y-0.5"
            >
              <Layers size={18} />
              <span>浏览 40+ 扩展中心</span>
            </Link>
          </div>

          {/* Interactive Hero Demo */}
          <div className="pt-2">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#14161d] border-y border-[#2d3142] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Powerful & Lightweight</span>
            <h2 className="text-3xl font-extrabold text-white">为极致效率与美感而生</h2>
            <p className="text-slate-400 text-base">采用纯 Rust 原生编写，彻底告别传统划词工具卡顿臃肿的问题。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#1c1e27] border border-[#2d3142] hover:border-blue-500/50 rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[#14161d] border border-[#2d3142] flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Options Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Customizable</span>
          <h2 className="text-3xl font-extrabold text-white">告别死板，扩展支持丰富选项</h2>
          <p className="text-slate-400 text-base">无论是指定翻译目标语言、切换 Google 搜索站点，还是配置 Base64 URL 安全开关，一切尽在掌控。</p>
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

      {/* CTA Banner */}
      <section className="py-16 bg-[#14161d] border-t border-[#2d3142] text-center px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold text-white">立即开启您的 Windows 极速划词体验</h2>
          <p className="text-slate-400 text-base">完全开源免费，零配置开箱即用，支持 Windows 10 与 Windows 11。</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
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
