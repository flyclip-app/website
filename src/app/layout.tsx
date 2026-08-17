import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "FlyClip - Windows 极速划词快捷动作工具 | 40+ 丰富扩展生态",
  description: "专为 Windows 打造的下一代划词动作与剪贴板增强工具。零延迟划选弹窗、40+ 官方精选扩展、全功能参数配置选项、内置轻量 QuickJS 与跨平台原生引擎。",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="dark">
      <body className="min-h-screen flex flex-col bg-[#0d0e12] text-[#f1f3f9] antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
