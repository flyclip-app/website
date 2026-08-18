import { NavSection } from "@/components/DocsSidebar";
import { Language } from "@/i18n/LanguageContext";

export function getGuideNav(lang: Language): NavSection[] {
  if (lang === "en") {
    return [
      {
        title: "User Guide",
        items: [
          { title: "Welcome & Installation", href: "/guide" },
          { title: "Basics & Triggers", href: "/guide/basics" },
          { title: "Built-in Quick Actions", href: "/guide/actions" },
          { title: "Extension Management", href: "/guide/extensions" },
          { title: "Exclusion Rules (Apps & URLs)", href: "/guide/rules" },
          { title: "Preferences & Settings", href: "/guide/settings" },
          { title: "Troubleshooting FAQ", href: "/guide/troubleshooting" },
        ],
      },
      {
        title: "Ecosystem & Resources",
        items: [
          { title: "Extension Hub (40+)", href: "/extensions" },
          { title: "Developer Reference", href: "/dev" },
          { title: "Download Center", href: "/download" },
        ],
      },
    ];
  }

  return [
    {
      title: "用户使用指南 (User Guide)",
      items: [
        { title: "欢迎与安装 (Installation)", href: "/guide" },
        { title: "基础与触发机制 (Basics)", href: "/guide/basics" },
        { title: "内置快捷动作 (Built-in Actions)", href: "/guide/actions" },
        { title: "扩展安装与管理 (Extensions)", href: "/guide/extensions" },
        { title: "排除规则设置 (Rules)", href: "/guide/rules" },
        { title: "偏好设置 (Settings)", href: "/guide/settings" },
        { title: "常见问题排查 (Troubleshooting)", href: "/guide/troubleshooting" },
      ],
    },
    {
      title: "产品与生态",
      items: [
        { title: "扩展中心 (40+)", href: "/extensions" },
        { title: "开发者参考 (Reference)", href: "/dev" },
        { title: "下载中心 (Download)", href: "/download" },
      ],
    },
  ];
}

export function getDevNav(lang: Language): NavSection[] {
  if (lang === "en") {
    return [
      {
        title: "Developer Reference",
        items: [
          { title: "Overview & Workflow", href: "/dev" },
          { title: "🛠️ Live Extension Generator", href: "/dev/generator", badge: "Live" },
          { title: "Package Structure (.flyclipext)", href: "/dev/packages" },
          { title: "Config Specification", href: "/dev/config" },
          { title: "Options & Schema", href: "/dev/options" },
          { title: "Action Types & Scripts", href: "/dev/actions" },
          { title: "JavaScript API Reference", href: "/dev/js-api", badge: "API" },
          { title: "Variables & Placeholders", href: "/dev/variables" },
          { title: "🔄 PopClip Converter Tool", href: "/dev/migration", badge: "Tool" },
        ],
      },
      {
        title: "Resources",
        items: [
          { title: "User Guide", href: "/guide" },
          { title: "Extension Marketplace", href: "/extensions" },
        ],
      },
    ];
  }

  return [
    {
      title: "开发者参考 (Developer Reference)",
      items: [
        { title: "概述与开发流程 (Overview)", href: "/dev" },
        { title: "🛠️ 在线扩展生成器", href: "/dev/generator", badge: "Live" },
        { title: "扩展包结构 (.flyclipext)", href: "/dev/packages" },
        { title: "Config 配置文件规范", href: "/dev/config" },
        { title: "参数选项定义 (Options)", href: "/dev/options" },
        { title: "动作类型与脚本 (Actions)", href: "/dev/actions" },
        { title: "JavaScript 脚本 API 手册", href: "/dev/js-api", badge: "API" },
        { title: "占位符与环境变量", href: "/dev/variables" },
        { title: "🔄 PopClip 扩展转换器", href: "/dev/migration", badge: "Tool" },
      ],
    },
    {
      title: "开发资源",
      items: [
        { title: "用户使用指南", href: "/guide" },
        { title: "扩展中心市场", href: "/extensions" },
      ],
    },
  ];
}

export const GUIDE_NAV = getGuideNav("zh");
export const DEV_NAV = getDevNav("zh");
