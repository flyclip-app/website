import Link from "next/link";
import { Download, Sparkles, FolderDown, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

export default function GuideExtensionsPage() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">User Guide / Extensions</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">扩展安装、更新与管理</h1>
        <p className="text-slate-400">
          FlyClip 支持从扩展中心直接下载打包文件安装、划词魔法即装以及版本更新检测。
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">三种便捷安装方式</h2>

        <div className="space-y-4">
          {/* Method 1 */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-blue-500/30 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Download size={18} className="text-blue-400" />
              <span>方式一：一键下载安装包 (.flyclipextz) —— 官方推荐首选</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              在官网扩展中心点击 <strong>「下载扩展包」</strong> 获取 <code>.flyclipextz</code> 文件。双击该文件（已与 FlyClip 自动关联）或直接拖入 FlyClip 窗口，即可弹出确认窗口一键安装！
            </p>
            <p className="text-xs text-blue-300">
              ✓ <strong>完整版本追踪与自动更新</strong>：打包文件完整携带 <code>identifier</code> 与 <code>version</code>，支持后续在设置中一键检测并无缝升级。
            </p>
          </div>

          {/* Method 2 */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Sparkles size={18} className="text-amber-400" />
              <span>方式二：划词即装 Snippet (Magic Text Install) —— 极客黑科技</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              任何以 <code># flyclip</code> 或 <code># popclip</code> 开头的 YAML 代码段，您只需用鼠标<strong>在网页或文本编辑器中划选这段文字</strong>，FlyClip 动作栏会自动感知并亮起 <strong>「安装扩展」</strong> 按钮，点击即可直接载入！
            </p>
          </div>

          {/* Method 3 */}
          <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <FolderDown size={18} className="text-slate-400" />
              <span>方式三：开发者手动目录模式 (.flyclipext)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              适合开发者调试。直接在系统扩展目录 <code>%APPDATA%\flyclip\extensions\</code> 下新建 <code>MyTool.flyclipext</code> 文件夹并放置 <code>Config.yaml</code>。
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">扩展更新机制</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          通过 <code>.flyclipextz</code> 打包安装的扩展，FlyClip 会自动记录扩展唯一标识与版本号。当扩展中心发布新版本时，在设置界面点击「检查更新」即可无损覆盖升级，且<strong>完全保留您之前配置的所有 Options 参数与密钥</strong>。
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
