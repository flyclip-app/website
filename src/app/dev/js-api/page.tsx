import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Code, Globe, Terminal, Keyboard, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

export default function DevJsApiPage() {
  return (
    <div className="space-y-12 text-slate-300 leading-relaxed text-sm sm:text-base">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Developer Reference / JavaScript Runtime</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">JavaScript 脚本 API 参考手册</h1>
        <p className="text-slate-400">
          FlyClip 内置基于 Rust 静态编译的高性能 QuickJS 引擎（完全支持 ES2020 现代语法规范）。本文档详细列出所有全局宿主对象、内置函数、配置参数以及完整实战示例。
        </p>
      </div>

      {/* Runtime Features Badge */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-bold text-emerald-400">
          <Zap size={18} />
          <span>QuickJS 极速运行时特性：微秒级冷启动 · 零外部依赖 · 跨平台通用</span>
        </div>
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
          ES2020 Full Standard
        </span>
      </div>

      {/* 1. Global Host Objects */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Code className="text-blue-400" size={20} />
          <span>1. 全局宿主对象 (Global Objects)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          FlyClip 在执行 JavaScript 脚本时会自动注入全局命名空间，支持 <code className="text-emerald-400 font-bold">flyclip</code> 与 <code className="text-blue-400 font-bold">popclip</code> 两个完全等价的全局对象（双向别名完全兼容）：
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">属性 / 方法</th>
                <th className="py-2.5 px-3">类型</th>
                <th className="py-2.5 px-3">描述</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.input</td>
                <td className="py-3 px-3 font-mono text-slate-400">Object</td>
                <td className="py-3 px-3">包含当前用户划词/选区文本的对象。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.options</td>
                <td className="py-3 px-3 font-mono text-slate-400">Object</td>
                <td className="py-3 px-3">获取用户在设置页面配置的扩展参数键值对。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.pressKey(combo)</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">底层硬件级模拟键盘按键输入。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.sleep(ms) / wait(ms)</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">阻塞休眠指定的毫秒数（用于按键间隙或等待系统就绪）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.readClipboard()</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">读取当前系统剪贴板中的纯文本内容。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.copy(text)</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">将指定文本写入系统剪贴板。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.paste(text?)</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">模拟按下 Ctrl+V 粘贴到当前光标处（可选传入新文本）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.run(cmd, args)</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">跨平台拉起并执行本地外部命令行工具或程序。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.fetch(url, opts)</td>
                <td className="py-3 px-3 font-mono text-cyan-400">Function</td>
                <td className="py-3 px-3">极速同步 HTTP/HTTPS 网络与本地接口请求（默认 10s 超时，可自定义）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.process</td>
                <td className="py-3 px-3 font-mono text-slate-400">string</td>
                <td className="py-3 px-3">当前触发划词的前台应用进程名（如 <code>&quot;chrome.exe&quot;</code>）。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">flyclip.actionIdentifier</td>
                <td className="py-3 px-3 font-mono text-slate-400">string</td>
                <td className="py-3 px-3">当前被点击执行动作的唯一标识符。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. flyclip.input */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Sparkles className="text-emerald-400" size={20} />
          <span>2. 输入文本对象 (flyclip.input)</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><code className="text-emerald-400 font-mono font-bold">flyclip.input.text</code>：用户当前选中的文本内容（<strong>最常用</strong>，如果动作定义了正则或匹配要求，该字段为匹配后的提取文本）。</li>
            <li><code className="text-emerald-400 font-mono font-bold">flyclip.input.matched</code>：等同于 <code>text</code>。</li>
            <li><code className="text-emerald-400 font-mono font-bold">flyclip.input.fullText</code>：用户在界面中划选的完整原始字符串（包含正则提取前的前后文）。</li>
          </ul>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-emerald-200">
            <pre>{`// 示例：获取选中文本并转换为大写
const text = flyclip.input.text;
return text.toUpperCase();`}</pre>
          </div>
        </div>
      </div>

      {/* 3. flyclip.options */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Cpu className="text-purple-400" size={20} />
          <span>3. 扩展设置参数 (flyclip.options)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          当扩展在 <code>Config.yaml</code> 中定义了 <code>options</code> 列表时，用户在 FlyClip 偏好设置中配置的值会自动注入到 <code>flyclip.options</code> 对象中：
        </p>
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-purple-200">
            <pre>{`// 读取设置中的自定义前缀与端口号
const prefix = flyclip.options.prefix || ">>";
const port = flyclip.options.port || "50020";

return prefix + " " + flyclip.input.text;`}</pre>
          </div>
        </div>
      </div>

      {/* 4. flyclip.pressKey */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Keyboard className="text-cyan-400" size={20} />
          <span>4. 键盘按键模拟 (flyclip.pressKey)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          向当前系统焦点窗口发送原生硬件级按键输入。返回 <code>true</code> 表示发送成功。
        </p>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-4">
          <div className="font-mono text-xs text-cyan-300">
            <strong>函数签名：</strong> <code>flyclip.pressKey(combo: string): boolean</code>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">支持的按键语法示例：</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#14161d] border border-[#2d3142] text-slate-200">
                <span className="text-cyan-400">&quot;ctrl c&quot;</span> <span className="text-slate-500">// 复制</span>
              </div>
              <div className="p-2.5 rounded bg-[#14161d] border border-[#2d3142] text-slate-200">
                <span className="text-cyan-400">&quot;ctrl v&quot;</span> <span className="text-slate-500">// 粘贴</span>
              </div>
              <div className="p-2.5 rounded bg-[#14161d] border border-[#2d3142] text-slate-200">
                <span className="text-cyan-400">&quot;ctrl shift f&quot;</span> <span className="text-slate-500">// 全局查找</span>
              </div>
              <div className="p-2.5 rounded bg-[#14161d] border border-[#2d3142] text-slate-200">
                <span className="text-cyan-400">&quot;alt f4&quot;</span> <span className="text-slate-500">// 关闭窗口</span>
              </div>
              <div className="p-2.5 rounded bg-[#14161d] border border-[#2d3142] text-slate-200">
                <span className="text-cyan-400">&quot;enter&quot; / &quot;escape&quot;</span> <span className="text-slate-500">// 回车 / 退出</span>
              </div>
              <div className="p-2.5 rounded bg-[#14161d] border border-[#2d3142] text-slate-200">
                <span className="text-cyan-400">&quot;wait 50&quot;</span> <span className="text-slate-500">// 延时 50ms</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-cyan-200">
            <pre>{`// 示例：复制选中文本并触发快捷键
flyclip.pressKey("ctrl c");`}</pre>
          </div>
        </div>
      </div>

      {/* 5. flyclip.run */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Terminal className="text-emerald-400" size={20} />
          <span>5. 执行本地命令行工具 (flyclip.run)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          通过 Rust 宿主在底层跨平台派生外部进程，用于调用本地可执行文件、系统工具或 CLI 命令。
        </p>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-4">
          <div className="font-mono text-xs text-emerald-300">
            <strong>函数签名：</strong> <code>flyclip.run(command: string, args?: string[]): &#123; ok: boolean, pid?: number, error?: string &#125;</code>
          </div>

          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-emerald-200">
            <pre>{`// 示例：使用外部记事本打开当前选中文本
const res = flyclip.run("notepad.exe", []);
if (!res.ok) {
  return "启动失败: " + res.error;
}`}</pre>
          </div>
        </div>
      </div>

      {/* 6. flyclip.fetch */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Globe className="text-blue-400" size={20} />
          <span>6. 发送 HTTP 网络请求 (flyclip.fetch)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          用于请求本地守护工具提供的 Local HTTP API（如 STranslate 的 <code>50020</code> 端口、Pot Desktop 的 <code>60828</code> 端口）或远程 Web API。
        </p>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-4">
          <div className="font-mono text-xs text-blue-300">
            <strong>函数签名：</strong>
            <pre className="mt-1 p-2.5 rounded bg-[#14161d] text-blue-200">{`flyclip.fetch(url: string, options?: {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "HEAD",
  headers?: Record<string, string>,
  body?: string,
  timeout?: number    // 请求超时毫秒数 (默认 10000 即 10 秒)
}): {
  status: number,     // HTTP 状态码 (200, 404, 500 等)
  statusText: string, // 状态文本 (如 "OK")
  ok: boolean,        // 是否在 200-299 成功区间
  data: string,       // 原始响应文本
  text(): string,     // 获取响应文本
  json(): any         // 自动解析为 JSON 对象
}`}</pre>
          </div>

          <h4 className="font-bold text-white text-xs uppercase tracking-wider">实战代码示例：</h4>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-blue-200 space-y-3">
            <div>
              <span className="text-slate-500">// 示例 A: 调用 STranslate 划词翻译 (GET, 3 秒超时)</span>
              <pre>{`const text = flyclip.input.text.trim();
const port = flyclip.options.port || "50020";
const res = flyclip.fetch(\`http://127.0.0.1:\${port}/text?content=\${encodeURIComponent(text)}\`, {
  timeout: 3000 // 自定义 3 秒超时
});
return res.ok ? res.text() : "翻译接口未响应";`}</pre>
            </div>

            <div>
              <span className="text-slate-500">// 示例 B: 调用 Pot Desktop 翻译 (POST JSON)</span>
              <pre>{`const text = flyclip.input.text.trim();
const port = flyclip.options.port || "60828";
const res = flyclip.fetch(\`http://127.0.0.1:\${port}/api/translate\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: text }),
  timeout: 5000
});
if (res.ok) {
  const data = res.json();
  return data.result || "无翻译结果";
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Sleep / Wait Function */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Zap className="text-amber-400" size={20} />
          <span>7. 延时等待 (flyclip.sleep / flyclip.wait)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          用于在连续模拟按键或等待第三方应用窗口就绪时进行毫秒级阻塞延时。
        </p>
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <div className="font-mono text-xs text-amber-300">
            <strong>函数签名：</strong> <code>flyclip.sleep(ms: number): void</code> / <code>flyclip.wait(ms: number): void</code>
          </div>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-amber-200">
            <pre>{`// 示例：先按下复制，等待 50 毫秒后再触发其他动作
flyclip.pressKey("ctrl c");
flyclip.sleep(50); // 延时 50ms
flyclip.pressKey("ctrl v");`}</pre>
          </div>
        </div>
      </div>

      {/* Clipboard Operations */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Code className="text-cyan-400" size={20} />
          <span>8. 剪贴板三大操作函数 (readClipboard / copy / paste)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          极简设计，仅需 3 个函数即可覆盖所有剪贴板读取、写入与模拟粘贴场景：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="font-bold text-emerald-400">📖 1. 读取剪贴板</div>
            <code className="text-slate-300 font-mono block">flyclip.readClipboard()</code>
            <p className="text-slate-400 text-[11px]">读取并返回当前系统剪贴板中的纯文本。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="font-bold text-blue-400">✍️ 2. 写入剪贴板</div>
            <code className="text-slate-300 font-mono block">flyclip.copy(text)</code>
            <p className="text-slate-400 text-[11px]">将指定文本写入系统剪贴板（返回布尔值）。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-2">
            <div className="font-bold text-cyan-400">📋 3. 模拟粘贴到光标处</div>
            <code className="text-slate-300 font-mono block">flyclip.paste(text?)</code>
            <p className="text-slate-400 text-[11px]">模拟按下 Ctrl+V 快捷键将文本粘贴至焦点输入框。</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">实战代码示例：</h4>
          <div className="p-3.5 rounded-lg bg-[#14161d] font-mono text-xs text-cyan-200 space-y-2">
            <div className="text-slate-500">// 示例 1: 读取当前剪贴板并在前后加工后写回</div>
            <pre>{`const current = flyclip.readClipboard();
flyclip.copy("【备份】" + current);`}</pre>

            <div className="text-slate-500 mt-2">// 示例 2: 处理选中文本后直接粘贴到光标处</div>
            <pre>{`const processed = flyclip.input.text.trim().toLowerCase();
flyclip.paste(processed);`}</pre>
          </div>
        </div>
      </div>

      {/* 9. Built-in Standard Libraries */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <CheckCircle2 className="text-emerald-400" size={20} />
          <span>9. 标准内置 JavaScript 核心库支持</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          内置引擎完整支持 ES2020 现代 JavaScript 标准库，您可以直接调用以下所有标准工具：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-emerald-400">●</span> JSON 解析与序列化
            </div>
            <code className="text-slate-300 font-mono block">JSON.parse(str)</code>
            <code className="text-slate-300 font-mono block">JSON.stringify(obj, null, 2)</code>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-blue-400">●</span> 正则表达式 (RegExp)
            </div>
            <code className="text-slate-300 font-mono block">/^[a-z0-9_-]+$/i.test(text)</code>
            <code className="text-slate-300 font-mono block">text.replace(/pattern/g, fn)</code>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-cyan-400">●</span> URL 编解码与 Base64
            </div>
            <code className="text-slate-300 font-mono block">encodeURIComponent(text)</code>
            <code className="text-slate-300 font-mono block">btoa(str) / atob(str)</code>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-purple-400">●</span> 数学计算 (Math) 与时间 (Date)
            </div>
            <code className="text-slate-300 font-mono block">Math.round(), Math.random(), Math.floor()</code>
            <code className="text-slate-300 font-mono block">Date.now(), new Date().toISOString()</code>
          </div>
        </div>
      </div>

      {/* 10. Return Value & After Steps */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">10. 脚本返回值与后续流水线处理 (after)</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          脚本末尾使用 <code>return &quot;结果字符串&quot;</code> 返回文本时，FlyClip 会根据动作配置中的 <code>after</code> 字段自动执行相应后续动作：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-mono font-bold text-emerald-400">after: paste-result</div>
            <p className="text-slate-300">自动用返回的文本替换当前选区的内容（如大小写转换、格式化等）。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-mono font-bold text-blue-400">after: show-result</div>
            <p className="text-slate-300">在 FlyClip 悬浮栏中直接弹出提示气泡展示返回结果（如字数统计、哈希计算）。</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-1.5">
            <div className="font-mono font-bold text-purple-400">after: copy-result</div>
            <p className="text-slate-300">自动将返回的文本写入系统剪贴板备用。</p>
          </div>
        </div>
      </div>

      {/* 11. Standalone Script Files & npm Libraries */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2 flex items-center gap-2">
          <Code className="text-amber-400" size={20} />
          <span>11. 独立 JS 脚本文件与使用外部 npm 依赖库</span>
        </h2>

        {/* 11.1 Standalone File */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-3">
          <h3 className="font-bold text-white text-sm text-emerald-400">
            11.1 引用独立的 .js 脚本文件
          </h3>
          <p className="text-xs text-slate-300">
            当脚本逻辑较长时，可以在扩展目录中创建独立的 <code>.js</code> 文件（如 <code>main.js</code>），并在 <code>Config.yaml</code> 中直接指向该文件：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-slate-500 block mb-1"># 目录结构</span>
              <pre>{`MyExt.flyclipext/
├── Config.yaml
└── main.js`}</pre>
            </div>
            <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142]">
              <span className="text-slate-500 block mb-1"># Config.yaml 引用</span>
              <pre>{`name: 文本处理
actions:
  - title: 执行
    javascript: main.js
    after: paste-result`}</pre>
            </div>
          </div>
        </div>

        {/* 9.2 Using npm Libraries */}
        <div className="p-5 rounded-xl bg-[#1c1e27] border border-[#2d3142] space-y-4">
          <h3 className="font-bold text-white text-sm text-blue-400">
            9.2 引入外部 npm 依赖库（如 lodash、dayjs、pinyin、crypto-js 等）
          </h3>
          <p className="text-xs text-slate-300">
            如果您在开发中需要使用庞大的 npm 生态库，只需在开发阶段使用现代轻量打包工具（如 <strong>esbuild</strong>、<strong>bun</strong> 或 <strong>tsup</strong>）将代码及第三方 npm 依赖打包为一个单文件 <code>bundle.js</code>：
          </p>

          <div className="p-3.5 rounded-lg bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-200 space-y-2">
            <div className="text-slate-500">// 1. 安装所需 npm 库</div>
            <div className="text-slate-300">npm install dayjs</div>
            <div className="text-slate-500 mt-2">// 2. 在 src/index.js 中编写代码</div>
            <pre>{`import dayjs from "dayjs";

const text = flyclip.input.text.trim();
const formatted = dayjs(text).format("YYYY-MM-DD HH:mm:ss");
return formatted;`}</pre>
            <div className="text-slate-500 mt-2">// 3. 使用 esbuild 单文件打包 (几毫秒完成)</div>
            <div className="text-emerald-400">npx esbuild src/index.js --bundle --outfile=action.js --format=iife</div>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            💡 <strong>打包优势</strong>：打包后的 <code>action.js</code> 是自包含的纯 JavaScript 文件。分发给其他用户时，<strong>用户电脑无需安装 Node.js 或 npm</strong>，FlyClip 内置的 QuickJS 引擎即可直接极速运行！
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/actions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：动作类型与脚本</span>
        </Link>
        <Link href="/dev/generator" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors">
          <span>进入在线扩展生成器实测</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
