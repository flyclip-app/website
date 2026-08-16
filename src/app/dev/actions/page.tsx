import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Globe, Terminal, Cpu } from "lucide-react";

export default function DevActionsPage() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Actions</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">动作类型与跨平台脚本规范</h1>
        <p className="text-slate-400">
          FlyClip 遵循清晰的跨平台分层架构，支持 URL、纯嵌入式高能 JavaScript / TypeScript 引擎以及平台专属脚本。
        </p>
      </div>

      {/* Zero Heavy Runtime Guarantee */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 space-y-1">
        <strong>⚡ 零笨重依赖设计原则 (Zero Heavy Runtime)：</strong>
        <p>
          FlyClip 绝不依赖 <strong>WebView2 (150MB+ 内存)</strong> 或外部 <strong>Node.js</strong>。JS 引擎直接以原生 C/Rust 静态链接进单个 <code>flyclip.exe</code> 内，亚毫秒冷启动，极低内存开销。
        </p>
      </div>

      {/* Cross-platform Matrix */}
      <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Globe size={16} className="text-blue-400" />
          <span>跨平台兼容性分级标准 (Platform Matrix)</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2 px-3">动作类型 (Action Type)</th>
                <th className="py-2 px-3">跨平台属性</th>
                <th className="py-2 px-3">说明与建议</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-mono text-emerald-400">JavaScript / TS</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-xs">🌐 全平台通用</span></td>
                <td className="py-2.5 px-3">跨平台首选。内嵌 QuickJS，支持调用跨平台子进程与 HTTP。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-emerald-400">URL 模板动作</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-xs">🌐 全平台通用</span></td>
                <td className="py-2.5 px-3">调用系统默认浏览器打开。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-blue-400">PowerShell (.ps1)</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold text-xs">🪟 Windows 专属</span></td>
                <td className="py-2.5 px-3">Windows-Only。适合深度调用 .NET / Win32 API 专属生态。</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-amber-400">Shell (.sh / Bash)</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-xs">🍎 macOS / Linux</span></td>
                <td className="py-2.5 px-3">POSIX 系统专属脚本（跨平台版本规划中）。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. JavaScript / TypeScript Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base text-emerald-400 flex items-center gap-2">
              <Zap size={18} />
              <span>1. JavaScript / TypeScript 动作 (跨平台推荐首选)</span>
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              内嵌 QuickJS · 跨平台无缝调用
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            在 JavaScript 中，Rust 宿主环境直接注入了跨平台的系统级 Host API，支持直接执行本地外部命令、网络请求与剪贴板读写，无需编写平台专用的 shell 脚本：
          </p>

          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200 space-y-2">
            <div className="text-slate-500"># Config.yaml 中调用本地命令跨平台示例:</div>
            <pre>{`name: 外部 CLI 处理
identifier: com.flyclip.extension.cli-tool
actions:
  - title: 格式化
    javascript: |
      // 支持调用本地跨平台命令 (Rust 派生子进程)
      const res = flyclip.run("git", ["status"]);
      // 或发起轻量 HTTP 请求
      // const res = await flyclip.fetch("https://api.example.com");
      return res.stdout;
    after: paste-result`}</pre>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 pt-1">
            <p className="font-semibold text-white">💡 注入的 Host API 全局对象规范：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><code>flyclip.input.text</code>：获取当前选中的文本字符串。</li>
              <li><code>flyclip.options.&lt;id&gt;</code>：读取用户在设置界面中配置的选项参数值。</li>
              <li><code>flyclip.run(command, args)</code>：调用本地子进程执行外部命令（全平台通用，由 Rust 宿主执行）。</li>
              <li><code>flyclip.fetch(url, options)</code>：发起原生 HTTP 网络请求。</li>
              <li><code>return &quot;result&quot;</code>：返回处理后的文本（自动配合 <code>after</code> 规则替换或展示）。</li>
            </ul>
          </div>
        </div>

        {/* 2. PowerShell Script Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base text-blue-400">2. PowerShell 脚本动作 [Windows 平台专属]</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
              Windows-Only
            </span>
          </div>
          <p className="text-xs text-slate-400">
            仅在 Windows 系统下执行。文本通过 <code>$env:FLYCLIP_TEXT</code> 传入，脚本的 Standard Output (标准输出) 为结果：
          </p>
          <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
            <pre>{`actions:
  - title: 转换为大写
    shell script: Write-Host -NoNewline $env:FLYCLIP_TEXT.ToUpper()
    after: paste-result`}</pre>
          </div>
        </div>

        {/* 3. URL Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base text-purple-400">3. URL 动作 (Open URL) [全平台通用]</h3>
          <p className="text-xs text-slate-400">调用系统默认浏览器打开指定 URL 模板，支持占位符参数替换：</p>
          <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
            <pre>{`actions:
  - title: 百度搜索
    url: https://www.baidu.com/s?wd=***
    requirements: [text]`}</pre>
          </div>
        </div>

        {/* 4. After Steps */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base text-slate-200">4. 执行后行为 (After Steps)</h3>
          <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
            <li><code>paste-result</code>：将执行结果直接替换并粘贴到当前光标选区。</li>
            <li><code>show-result</code>：在悬浮提示气泡中展示执行结果。</li>
            <li><code>copy-result</code>：将执行结果直接写入系统剪贴板。</li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/options" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：参数选项规范</span>
        </Link>
        <Link href="/dev/variables" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>下一步：占位符与环境变量</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
