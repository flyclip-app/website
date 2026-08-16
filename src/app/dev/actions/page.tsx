import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function DevActionsPage() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Actions</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">动作类型与脚本规范</h1>
        <p className="text-slate-400">
          FlyClip 支持 URL 打开动作、PowerShell 脚本动作、JavaScript 脚本动作以及键盘按键模拟。
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. URL Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base text-blue-400">1. URL 动作 (Open URL)</h3>
          <p className="text-xs text-slate-400">通过系统默认浏览器打开指定的 URL 模板，支持占位符与参数替换。</p>
          <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
            <pre>{`actions:
  - title: 百度搜索
    url: https://www.baidu.com/s?wd=***
    requirements: [text]`}</pre>
          </div>
        </div>

        {/* 2. PowerShell Script Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base text-purple-400">2. PowerShell 脚本动作 (Shell Script)</h3>
          <p className="text-xs text-slate-400">
            Windows 原生执行环境。选中文本通过 <code>$env:FLYCLIP_TEXT</code> 传入，脚本的 Standard Output (标准输出) 会根据 <code>after</code> 规则进行后续处理。
          </p>
          <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200">
            <pre>{`actions:
  - title: 转换为大写
    shell script: Write-Host -NoNewline $env:FLYCLIP_TEXT.ToUpper()
    after: paste-result`}</pre>
          </div>
        </div>

        {/* 3. JavaScript / TypeScript Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base text-amber-400">3. JavaScript / TypeScript 脚本动作</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              AST 解析就绪 / QuickJS 引擎对接中
            </span>
          </div>
          <p className="text-xs text-slate-400">
            FlyClip 配置解析引擎已完整支持 <code>javascript</code>、<code>javascript file</code> 及 ES Module 模块规范。在 JS 脚本中，可通过全局 <code>flyclip</code>（或 <code>popclip</code>）对象获取选中文本与选项配置：
          </p>
          <div className="p-3 rounded-lg bg-[#14161d] font-mono text-xs text-slate-200 space-y-2">
            <div className="text-slate-500">// Config.yaml 内联 JavaScript 示例:</div>
            <pre>{`actions:
  - title: 驼峰转换
    javascript: |
      const text = flyclip.input.text;
      return text.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    after: paste-result`}</pre>
          </div>
          <p className="text-xs text-slate-400">
            💡 <strong>API 上下文对象：</strong>
            <br />• <code>flyclip.input.text</code>（选中文本）
            <br />• <code>flyclip.options.option_name</code>（读取选项参数）
            <br />• <code>return &quot;new text&quot;</code>（返回执行结果）
          </p>
        </div>

        {/* 4. After Steps */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
          <h3 className="font-bold text-white text-base text-emerald-400">4. 执行后后续行为 (After Steps)</h3>
          <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
            <li><code>paste-result</code>：将脚本返回值/标准输出直接替换并粘贴到当前选区。</li>
            <li><code>show-result</code>：在悬浮提示气泡中展示脚本执行结果。</li>
            <li><code>copy-result</code>：将脚本结果直接写入系统剪贴板。</li>
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
