import Link from "next/link";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, Terminal, Code, Globe, Laptop, Layers, Wrench } from "lucide-react";
import PopClipConverter from "@/components/PopClipConverter";

export default function DevMigrationPage() {
  return (
    <div className="space-y-12 text-slate-300 leading-relaxed text-sm sm:text-base">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Migration</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">PopClip 扩展在线转换器与迁移手册</h1>
        <p className="text-slate-400">
          FlyClip 拥有独立且现代化的扩展规范体系（基于 YAML 与轻量 QuickJS）。为了方便开发者将已有的 PopClip 动作快速移植到 FlyClip，您可以通过下方的<strong>在线转换工具</strong>一键将旧版 <code>Config.plist</code> 或代码重构为 FlyClip 现代扩展。
        </p>
      </div>

      {/* Live Converter Tool Section */}
      <div className="p-6 rounded-2xl bg-[#1c1e27] border border-[#2d3142] space-y-6 shadow-xl">
        <div className="flex items-center gap-2.5 text-white font-bold text-lg border-b border-[#2d3142] pb-4">
          <Wrench className="text-blue-400" size={22} />
          <span>🔄 PopClip 扩展在线转换工具 (Live Converter)</span>
        </div>
        <PopClipConverter />
      </div>

      {/* Highlights Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-300 flex items-start gap-3">
        <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
        <div className="space-y-1">
          <div className="font-bold text-amber-300">迁移前提须知：绝大多数旧版 PopClip 扩展无法直接在 Windows 下运行</div>
          <p className="text-amber-200/80 leading-relaxed text-xs">
            网络上现存的很多 <code>.popclipext</code> 包采用了旧式 <code>Config.plist</code> 或 macOS 独有的 AppleScript / Bash 脚本。在 FlyClip 中，只有使用了 <code>Config.yaml</code> / <code>Config.json</code> 且动作是通用逻辑（URL / JS / 按键）的扩展才能被读取。包含 macOS 专属逻辑或旧 plist 的扩展<strong>必须使用上方工具转换配置文件并重构脚本</strong>。
          </p>
        </div>
      </div>

      {/* 1. PopClip vs FlyClip Comprehensive Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Layers className="text-cyan-400" size={20} />
          <span>1. PopClip 与 FlyClip 语法与功能全景对照表</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">对比维度</th>
                <th className="py-2.5 px-3">FlyClip (Windows / 跨平台)</th>
                <th className="py-2.5 px-3">PopClip (macOS 专属)</th>
                <th className="py-2.5 px-3">兼容性与迁移说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-semibold text-white">扩展包目录格式</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">.flyclipext</td>
                <td className="py-3 px-3 font-mono text-slate-400">.popclipext</td>
                <td className="py-3 px-3">⚠️ <strong>需包含 YAML</strong>：FlyClip 扫描两种目录名，但包内必须包含 <code>Config.yaml</code> 或 <code>Config.json</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">单文件归档格式</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">.flyclipextz</td>
                <td className="py-3 px-3 font-mono text-slate-400">.popclipextz</td>
                <td className="py-3 px-3">⚠️ <strong>解压后必须含 YAML</strong>：支持双击解压安装，解压后必须包含有效 YAML。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">配置文件格式</td>
                <td className="py-3 px-3 font-mono text-emerald-400">Config.yaml / Config.json</td>
                <td className="py-3 px-3 font-mono text-slate-400">Config.yaml / Config.plist</td>
                <td className="py-3 px-3">❌ <strong>已废弃 plist</strong>：旧版 <code>Config.plist</code> 会明确报错拒绝，需转换为 YAML。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">选区输入对象</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.input.text</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.input.text</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：在 FlyClip 中调 <code>popclip.input.text</code> 完全等价。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">正则收窄文本</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.input.matched</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.input.matchedText</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：<code>matched</code> 与 <code>matchedText</code> 互为别名。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">写入剪贴板</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.copy(text)</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.copyText(text)</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：两个函数完全等价可用。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">触发粘贴</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.paste(text?)</td>
                <td className="py-3 px-3 font-mono text-blue-400">popclip.pasteText(text)</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：<code>flyclip.paste()</code> 还支持不传参保留现有剪贴板粘贴。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">读取剪贴板纯文本</td>
                <td className="py-3 px-3 font-mono text-emerald-400">flyclip.readClipboard()</td>
                <td className="py-3 px-3 font-mono text-blue-400">pasteboard.text</td>
                <td className="py-3 px-3">✅ <strong>双向支持</strong>：既可调用 <code>readClipboard()</code>，也可读取 <code>pasteboard.text</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">异步延时等待</td>
                <td className="py-3 px-3 font-mono text-emerald-400">await sleep(ms)</td>
                <td className="py-3 px-3 font-mono text-blue-400">await sleep(ms)</td>
                <td className="py-3 px-3">✅ <strong>完全一致</strong>：均为内置全局 Promise 函数。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Base64 编解码</td>
                <td className="py-3 px-3 font-mono text-emerald-400">btoa(str) / atob(b64)</td>
                <td className="py-3 px-3 font-mono text-blue-400">btoa(str) / atob(b64)</td>
                <td className="py-3 px-3">✅ <strong>完全一致</strong>：标准 Web API 全局可用。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">调用本地 CLI 命令行</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.run(cmd, args)</td>
                <td className="py-3 px-3 text-slate-500">❌ 受沙盒限制无法直接调用</td>
                <td className="py-3 px-3">🌟 <strong>同步函数（无需 await）</strong>：直接返回 <code>&#123; stdout, stderr, code &#125;</code>。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">网络 HTTP 请求</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">await flyclip.fetch(url, opts)</td>
                <td className="py-3 px-3 font-mono text-slate-400">require(&quot;axios&quot;)</td>
                <td className="py-3 px-3">🌟 <strong>极速轻量</strong>：FlyClip 内置 Rust 原生 HTTP 客户端，零外部 node 依赖。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">URL 模板占位符</td>
                <td className="py-3 px-3 font-mono text-emerald-400">&#123;flyclip text&#125; / ***</td>
                <td className="py-3 px-3 font-mono text-slate-400">&#123;popclip text&#125; / ***</td>
                <td className="py-3 px-3">✅ <strong>100% 兼容</strong>：<code>***</code>、<code>&#123;popclip text&#125;</code>、<code>&#123;flyclip text&#125;</code> 均通用。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">快捷键修饰符</td>
                <td className="py-3 px-3 font-mono text-emerald-400">ctrl / alt / shift / win</td>
                <td className="py-3 px-3 font-mono text-slate-400">command / option / shift / control</td>
                <td className="py-3 px-3">✅ <strong>自动映射</strong>：PopClip 的 <code>command</code> 会在 Windows 下自动映射为 <code>ctrl</code>。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Step-by-Step Migration Tutorials */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <RefreshCw className="text-blue-400" size={20} />
          <span>2. 常见场景迁移实战教程</span>
        </h2>

        {/* Tutorial 1: URL Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-blue-400 flex items-center gap-2">
            <Globe size={16} />
            <span>场景 1：URL 搜索与在线翻译扩展（最容易迁移）</span>
          </h3>
          <p className="text-xs text-slate-300">
            如果 PopClip 扩展原本就是 <code>Config.yaml</code> 格式且包含 <code>url: https://...***</code>，可直接在 FlyClip 中使用：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-slate-500 block mb-1"># 原 PopClip Config.yaml</span>
              <pre>{`name: Google Search
actions:
  - title: Google
    url: https://www.google.com/search?q=***
    requirements: [text]`}</pre>
            </div>
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-emerald-400 block mb-1"># FlyClip 中完全通用</span>
              <pre>{`name: Google Search
actions:
  - title: Google
    url: https://www.google.com/search?q=***
    requirements: [text]`}</pre>
            </div>
          </div>
        </div>

        {/* Tutorial 2: JavaScript Actions */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-emerald-400 flex items-center gap-2">
            <Code size={16} />
            <span>场景 2：JavaScript 文本处理扩展（语法兼容与重构）</span>
          </h3>
          <p className="text-xs text-slate-300">
            FlyClip 注入了 <code>popclip</code> 全局兼容别名。只要配置文件是 <code>Config.yaml</code>，纯文本 JS 动作直接可用；也可重构为 <code>flyclip.*</code> 规范写法：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-slate-500 block mb-1"># 原 PopClip 脚本写法 (直接可跑)</span>
              <pre>{`// 读取剪贴板并粘贴
const text = popclip.input.matchedText;
pasteboard.text = text.trim();
popclip.pasteText();`}</pre>
            </div>
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-emerald-400 block mb-1"># 推荐的 FlyClip 现代写法</span>
              <pre>{`// 更精简直接的语法
const text = flyclip.input.text;
flyclip.copy(text.trim());
flyclip.paste();`}</pre>
            </div>
          </div>
        </div>

        {/* Tutorial 3: AppleScript -> flyclip.run */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-purple-400 flex items-center gap-2">
            <Terminal size={16} />
            <span>场景 3：将 macOS 专属 AppleScript / .sh 重构为跨平台 JS (flyclip.run)</span>
          </h3>
          <p className="text-xs text-slate-300">
            在 macOS 上很多扩展使用 AppleScript 或 Bash 脚本调用本地程序（Windows 下无法执行）。在 FlyClip 中，推荐使用 <code>flyclip.run(cmd, args)</code>（同步执行，无需 await）重构为跨平台 JavaScript：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-rose-400 block mb-1">❌ 旧 AppleScript (Windows 无法运行)</span>
              <pre>{`# applescript.applescript
tell application "Git"
  do shell script "git status"
end tell`}</pre>
            </div>
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-emerald-400 block mb-1">✅ FlyClip 跨平台 JavaScript (同步调用)</span>
              <pre>{`// flyclip.run 为同步调用，直接捕获输出
const res = flyclip.run("git", ["status", "--short"]);
if (res.code === 0) {
  return res.stdout.trim() || "Clean";
}`}</pre>
            </div>
          </div>
        </div>

        {/* Tutorial 4: Config.plist to Config.yaml */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-base text-amber-400 flex items-center gap-2">
            <Laptop size={16} />
            <span>场景 4：将旧版 Config.plist 转换为 Config.yaml (必做步骤)</span>
          </h3>
          <p className="text-xs text-slate-300">
            早期的 PopClip 扩展采用 macOS 独有的 XML 属性列表（<code>Config.plist</code>）。FlyClip 会明确拒绝解析 plist，<strong>必须将其转换为 Config.yaml 才能被 FlyClip 加载</strong>：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-rose-400 block mb-1">&lt;!-- 旧 Config.plist (XML 冗长，FlyClip 不支持) --&gt;</span>
              <pre>{`&lt;dict&gt;
  &lt;key&gt;Extension Name&lt;/key&gt;
  &lt;string&gt;Baidu&lt;/string&gt;
  &lt;key&gt;Extension Identifier&lt;/key&gt;
  &lt;string&gt;com.example.baidu&lt;/string&gt;
  &lt;key&gt;Actions&lt;/key&gt;
  &lt;array&gt;
    &lt;dict&gt;
      &lt;key&gt;URL&lt;/key&gt;
      &lt;string&gt;https://www.baidu.com/s?wd=***&lt;/string&gt;
    &lt;/dict&gt;
  &lt;/array&gt;
&lt;/dict&gt;`}</pre>
            </div>
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-emerald-400 block mb-1"># 转换后的 Config.yaml (格式简洁，全平台通用)</span>
              <pre>{`name: Baidu
identifier: com.example.baidu
actions:
  - title: 百度
    url: https://www.baidu.com/s?wd=***
    requirements: [text]`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Migration FAQ */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <CheckCircle2 className="text-emerald-400" size={20} />
          <span>3. 迁移常见疑问解答 (FAQ)</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <h4 className="font-bold text-white">Q: 我直接在网上下载的 .popclipext 包能直接扔进 FlyClip 跑吗？</h4>
            <p className="text-slate-300">
              <strong>通常不能直接运行，必须满足前提：</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
              <li>如果该包包含 <code>Config.plist</code>，FlyClip 会报错提示不支持，需先将 plist 转为 <code>Config.yaml</code>。</li>
              <li>如果该包包含 AppleScript、macOS 专用 Bash 脚本或调用了 macOS 独占软件（如 Safari/Notes），在 Windows 下无法执行，需重写为通用 JS。</li>
              <li><strong>只有</strong>原本就采用 <code>Config.yaml</code> / <code>Config.json</code> 且动作是通用 Web URL、通用 JS 纯文本处理或标准快捷键的扩展，才能直接放入 <code>%APPDATA%\flyclip\extensions\</code> 加载使用。</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <h4 className="font-bold text-white">Q: flyclip.run 命令行调用需要使用 await 吗？</h4>
            <p className="text-slate-300">
              <strong>不需要。</strong><code>flyclip.run(command, args)</code> 是同步阻塞执行函数，直接执行并同步返回 <code>&#123; stdout: string, stderr: string, code: number &#125;</code> 结果对象。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <h4 className="font-bold text-white">Q: 快捷键里的 Command 键在 Windows 下怎么生效？</h4>
            <p className="text-slate-300">
              FlyClip 内置了跨平台键位映射。当解析到配置包含 <code>command</code> 时，Windows 环境会自动重映射为 <code>Ctrl</code>（如 <code>command c</code> 映射为 <code>Ctrl+C</code>）。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <h4 className="font-bold text-white">Q: 为什么 FlyClip 不再支持 Config.plist 格式？</h4>
            <p className="text-slate-300">
              <code>Config.plist</code> 是苹果 macOS 专属的旧式私有 XML 格式，体积冗余且在跨平台跨设备同步（如 WebDAV）中容易产生编码损坏。PopClip 官方团队早在数年前已全面推荐 <code>Config.yaml</code> / <code>Config.json</code>。转换为 YAML 后体积缩减 70% 且全平台通用。
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/js-api" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：JavaScript 脚本 API</span>
        </Link>
        <Link href="/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>浏览 40+ 官方扩展生态</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
