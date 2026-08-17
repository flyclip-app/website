"use client";

import Link from "next/link";
import { Download, Layers, ArrowRight } from "lucide-react";
import HeroDemo from "@/components/HeroDemo";
import { useI18n } from "@/i18n/LanguageContext";

export default function Home() {
  const { t, lang } = useI18n();

  const features = [
    {
      title: t("home.f1Title"),
      desc: t("home.f1Desc"),
      link: "/guide",
      linkText: lang === "zh" ? "了解基础功能" : "Learn Basics",
    },
    {
      title: t("home.f2Title"),
      desc: t("home.f2Desc"),
      link: "/dev",
      linkText: lang === "zh" ? "查看轻量架构" : "Architecture",
    },
    {
      title: t("home.f3Title"),
      desc: t("home.f3Desc"),
      link: "/extensions",
      linkText: lang === "zh" ? "浏览扩展中心" : "Browse Extensions",
    },
    {
      title: t("home.f4Title"),
      desc: t("home.f4Desc"),
      link: "/download",
      linkText: lang === "zh" ? "下载安全客户端" : "Download App",
    },
    {
      title: lang === "zh" ? "🎛️ 可视化参数选项 (Options)" : "🎛️ Configurable Options",
      desc: lang === "zh" 
        ? "首创在设置界面中直接提供开关、单选下拉、文本输入与密钥凭据调整，随心定制扩展行为。"
        : "Directly configure switches, dropdowns, text inputs, and secret API keys right in settings.",
      link: "/dev/options",
      linkText: lang === "zh" ? "查看选项规范" : "Options Spec",
    },
    {
      title: lang === "zh" ? "🔄 PopClip 扩展无缝转换" : "🔄 PopClip Converter Tool",
      desc: lang === "zh"
        ? "提供专门的在线转换工具，一键将旧版 macOS Config.plist 或代码重构为 FlyClip 现代扩展。"
        : "Dedicated online tool to convert legacy macOS Config.plist and scripts into modern FlyClip extensions.",
      link: "/dev/migration",
      linkText: lang === "zh" ? "立即体验转换器" : "Try Converter",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <span>✨ FlyClip for Windows</span>
              <span>·</span>
              <span>Rust Native · QuickJS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {t("home.heroTitlePrefix")}<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
                {t("home.heroTitleHighlight")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              {t("home.heroSubtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
              >
                <Download size={18} />
                <span>{t("home.downloadBtn")}</span>
              </Link>

              <Link
                href="/extensions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1c1e27] border border-[#2d3142] hover:border-blue-500 text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5"
              >
                <Layers size={18} />
                <span>{t("home.browseExtensions")}</span>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">✓ {lang === "zh" ? "纯净无广告" : "Zero Telemetry"}</span>
              <span className="flex items-center gap-1.5">✓ {lang === "zh" ? "仅 15MB 内存占用" : "< 15MB RAM"}</span>
              <span className="flex items-center gap-1.5">✓ {lang === "zh" ? "MIT 开源协议" : "MIT Open Source"}</span>
            </div>
          </div>

          {/* Right Column: Interactive Live Demo */}
          <div className="lg:col-span-6 w-full">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* Feature Boxes */}
      <section className="py-20 bg-[#14161d] border-y border-[#2d3142] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-extrabold text-white">{t("home.featuresTitle")}</h2>
            <p className="text-slate-400 text-sm sm:text-base">{t("home.featuresSubtitle")}</p>
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

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-[#14161d] border-t border-[#2d3142] text-center px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold text-white">{t("home.ctaTitle")}</h2>
          <p className="text-slate-400 text-sm sm:text-base">{t("home.ctaSubtitle")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25"
            >
              <Download size={16} />
              <span>{t("home.downloadBtn")}</span>
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold text-sm transition-all"
            >
              <span>{lang === "zh" ? "查看新手教程" : "Get Started Guide"}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
