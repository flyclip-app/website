import Link from "next/link";
import { FolderDown, ArrowRight, ArrowLeft, Layers } from "lucide-react";

export default function GuideExtensionsPage() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Extensions</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">扩展安装与管理</h1>
        <p className="text-slate-400">
          FlyClip 拥有丰富的扩展生态，您可以随时从扩展中心安装翻译、搜索、AI、文本处理等几十款实用工具。
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">扩展文件夹位置</h2>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-200">
          <strong>系统扩展目录：</strong> <code>%APPDATA%\flyclip\extensions\</code><br />
          在 FlyClip 设置窗口的「扩展」分页底部，点击 <strong>「打开扩展文件夹」</strong> 按钮即可直接直达。
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">安装扩展的两种方式</h2>
        <ol className="list-decimal pl-5 space-y-3 text-slate-300">
          <li>
            <strong>文件夹模式 (<code>.flyclipext</code>)</strong>：
            在扩展中心点击「查看详情」复制代码，在扩展目录下新建 <code>扩展名.flyclipext</code> 文件夹并创建 <code>Config.yaml</code> 保存即可。
          </li>
          <li>
            <strong>打包文件模式 (<code>.flyclipextz</code>)</strong>：
            直接将 <code>.flyclipextz</code> 或 <code>.popclipextz</code> 归档文件拖入该目录，FlyClip 扫描时会自动完成解压与注册。
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">配置扩展选项 (Options)</h2>
        <p>
          对于支持选项的扩展（如 Google 翻译切换目标语言、Base64 开关 URL 安全模式），在设置界面中点击扩展右侧的 <strong>「选项」</strong> 按钮即可展开直观的图形化调整面板，修改后即刻生效！
        </p>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/guide/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：内置动作</span>
        </Link>
        <Link href="/guide/settings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：偏好设置</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
