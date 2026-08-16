import { NavSection } from "@/components/DocsSidebar";

export const GUIDE_NAV: NavSection[] = [
  {
    title: "用户使用指南 (User Guide)",
    items: [
      { title: "欢迎与安装 (Installation)", href: "/guide" },
      { title: "基础与触发机制 (Basics)", href: "/guide/basics" },
      { title: "内置快捷动作 (Built-in Actions)", href: "/guide/actions" },
      { title: "扩展安装与管理 (Extensions)", href: "/guide/extensions" },
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

export const DEV_NAV: NavSection[] = [
  {
    title: "开发者参考 (Developer Reference)",
    items: [
      { title: "概述与开发流程 (Overview)", href: "/dev" },
      { title: "🛠️ 在线扩展生成器", href: "/dev/generator", badge: "Live" },
      { title: "扩展包结构 (.flyclipext)", href: "/dev/packages" },
      { title: "Config 配置文件规范", href: "/dev/config" },
      { title: "参数选项定义 (Options)", href: "/dev/options" },
      { title: "动作类型与脚本 (Actions)", href: "/dev/actions" },
      { title: "占位符与环境变量", href: "/dev/variables" },
      { title: "PopClip 语法平滑迁移", href: "/dev/migration" },
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
