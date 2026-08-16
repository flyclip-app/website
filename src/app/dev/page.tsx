import ExtensionGenerator from "@/components/ExtensionGenerator";
import { Code, BookOpen, Terminal, Sliders, ShieldCheck } from "lucide-react";

export default function DevPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Developer Reference</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">扩展开发指南与规范</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          基于声明式 YAML 与 PowerShell 脚本构建强大、优雅的 Windows 划词动作扩展。
        </p>
      </div>

      {/* Interactive Generator */}
      <ExtensionGenerator />

      {/* Reference Docs */}
      <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1: Structure */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-blue-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <BookOpen size={20} />
            <h2>1. 扩展包结构 (.flyclipext)</h2>
          </div>
          <p>标准的 FlyClip 扩展为一个以 <code>.flyclipext</code> 结尾的目录：</p>
          <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-slate-200">
            <pre>{`MyExtension.flyclipext/
├── Config.yaml          # 核心配置文件 (也支持 Config.json / Config.plist)
├── icon.png / icon.svg  # (可选) 自定义图标
└── script.ps1           # (可选) 独立的外部 PowerShell 脚本`}</pre>
          </div>
        </section>

        {/* Section 2: Options */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <Sliders size={20} />
            <h2>2. 选项参数规范 (Options)</h2>
          </div>
          <p>FlyClip 支持 4 种原生的参数选项类型：</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2d3142] text-slate-400">
                  <th className="py-2.5 px-3">类型 (type)</th>
                  <th className="py-2.5 px-3">UI 形态</th>
                  <th className="py-2.5 px-3">说明与 YAML 示例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3142] text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">boolean</td>
                  <td className="py-3 px-3">开关 (Switch)</td>
                  <td className="py-3 px-3"><code>type: boolean</code>, <code>default value: false</code></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">multiple</td>
                  <td className="py-3 px-3">分段按钮 / 单选</td>
                  <td className="py-3 px-3"><code>values: [zh, en]</code>, <code>value labels: [中文, English]</code></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">string</td>
                  <td className="py-3 px-3">文本输入框</td>
                  <td className="py-3 px-3"><code>type: string</code>, <code>multiline: false</code> (可选多行)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-mono text-blue-400">secret</td>
                  <td className="py-3 px-3">密码/凭据输入</td>
                  <td className="py-3 px-3"><code>type: secret</code> (安全保存 API Key 等私密参数)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Scripts & Environment */}
        <section className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-purple-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <Terminal size={20} />
            <h2>3. 环境变量与占位符规范</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm">URL 占位符</h3>
              <ul className="text-xs space-y-1.5 font-mono text-slate-300">
                <li><code>***</code> 或 <code>{`{flyclip text}`}</code>：选中文本</li>
                <li><code>{`{flyclip option <id>}`}</code>：插入配置参数</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] space-y-2">
              <h3 className="font-bold text-white text-sm">PowerShell 环境变量</h3>
              <ul className="text-xs space-y-1.5 font-mono text-slate-300">
                <li><code>$env:FLYCLIP_TEXT</code>：选中文本</li>
                <li><code>$env:FLYCLIP_OPTION_&lt;ID&gt;</code>：选项值</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Disclaimer */}
        <section id="disclaimer" className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-lg border-b border-[#2d3142] pb-3">
            <ShieldCheck size={20} />
            <h2>4. 开源合规声明 (Legal Disclaimer)</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            FlyClip is an independent open-source Windows application developed by its contributors under the MIT License. PopClip is a trademark of Pilotmoon Software. FlyClip is not affiliated with, endorsed by, or sponsored by Pilotmoon Software. Compatibility with PopClip extension syntax is provided solely for frictionless cross-platform migration.
          </p>
        </section>
      </div>
    </div>
  );
}
