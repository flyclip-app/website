import Link from "next/link";
import { BookOpen, MousePointer, Sliders, FolderDown, Settings, HelpCircle } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">User Guide</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">FlyClip 使用指南与教程</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          快速掌握 FlyClip 的核心功能、触发机制、个性化配置与扩展管理。
        </p>
      </div>

      <div className="space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-blue-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <BookOpen size={20} />
            <h2>1. 安装与首次运行</h2>
          </div>
          <p>
            FlyClip 支持 <strong>Windows 10 (1809 及以上)</strong> 与 <strong>Windows 11</strong>（64位系统）。
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-300">
            <li>前往 <Link href="/download" className="text-blue-400 hover:underline">下载中心</Link> 下载安装包（<code>.msi</code>）或免安装便携版（<code>.zip</code>）。</li>
            <li>启动程序后，FlyClip 会自动最小化常驻在 Windows 系统托盘区（右下角托盘图标）。</li>
            <li>在任意文本区域（浏览器、代码编辑器、记事本等）用鼠标拖拽选中文本，FlyClip 动作栏即刻在光标上方弹出！</li>
          </ol>
        </section>

        {/* Section 2 */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-purple-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <MousePointer size={20} />
            <h2>2. 三种触发模式</h2>
          </div>
          <p>为了兼顾不同场景下的操作习惯，FlyClip 原生提供三种灵活的触发机制：</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-1.5">
              <h3 className="font-bold text-white text-sm">① 划选自动触发</h3>
              <p className="text-xs text-slate-400 leading-relaxed">鼠标划选文本松开左键后即时触发，智能识别 URL、邮箱、数字等内容。</p>
            </div>
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-1.5">
              <h3 className="font-bold text-white text-sm">② 鼠标长按静止触发</h3>
              <p className="text-xs text-slate-400 leading-relaxed">在输入框或页面某处按住鼠标不动达到设定时长，自动弹出粘贴与快速动作菜单。</p>
            </div>
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-1.5">
              <h3 className="font-bold text-white text-sm">③ 全局热键被动触发</h3>
              <p className="text-xs text-slate-400 leading-relaxed">关闭自动弹窗后，在划选文字后按下快捷键（默认 <code>Ctrl+Alt+Q</code>）即时唤出。</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <FolderDown size={20} />
            <h2>3. 扩展安装与管理</h2>
          </div>
          <p>FlyClip 支持多种扩展安装方式：</p>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-200">
            <strong>扩展目录绝对路径：</strong> <code>%APPDATA%\flyclip\extensions\</code><br />
            在偏好设置界面的「扩展」标签页底部，点击 <strong>「打开扩展文件夹」</strong> 即可秒级直达该目录。
          </div>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><strong>源码目录 (<code>.flyclipext</code>)</strong>：将从扩展中心复制的配置保存为 <code>Config.yaml</code>，放入以此命名的文件夹中。</li>
            <li><strong>压缩包 (<code>.flyclipextz</code>)</strong>：直接将打包的 zip 文件拖入该目录，程序会自动解压加载。</li>
            <li><strong>调整顺序与开关</strong>：在设置界面中点击上下箭头调整动作栏顺序，点击开关可快速停用。</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <Sliders size={20} />
            <h2>4. 配置扩展参数选项 (Options)</h2>
          </div>
          <p>许多扩展内置了选项（例如 Google 翻译切换站点与目标语言、Base64 开关 URL 安全模式）：</p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-300">
            <li>在设置窗口中切换到 <strong>「扩展」</strong> 分页。</li>
            <li>找到支持选项的扩展，卡片右侧会显示 <strong>「选项」</strong> 按钮。</li>
            <li>点击展开选项配置面板，可直接切换语言、开关配置项或填入 API Key 凭据。</li>
            <li>修改后会自动保存并即时生效，下次划选时即可享受专属配置！</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
