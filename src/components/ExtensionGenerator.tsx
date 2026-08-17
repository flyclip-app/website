"use client";

import { useState, useRef, useMemo } from "react";
import { Copy, Check, Sparkles, Wrench, Download, Zap, Code, Terminal, Globe, Keyboard, Play, FileCode, CheckCircle2 } from "lucide-react";

interface OptionItem {
  id: string;
  label: string;
  type: "string" | "multiple" | "boolean" | "secret";
  defaultValue: string;
  values?: string;
}

function highlightJavaScript(code: string): string {
  if (!code) return "";
  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const tokenRegex = new RegExp(
    [
      "(?<comment>\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",
      "(?<string>`(?:\\\\[\\s\\S]|[^`\\\\])*`|\"(?:\\\\[\\s\\S]|[^\"\\\\])*\"|'(?:\\\\[\\s\\S]|[^'\\\\])*')",
      "\\b(?<keyword>async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield)\\b",
      "\\b(?<flyclip>flyclip|popclip|pressKey|fetch|run|input|options|text|matched|modifiers|process)\\b",
      "\\b(?<builtin>JSON|Math|Date|String|Array|Object|Promise|RegExp|Set|Map|TextEncoder|TextDecoder|encodeURIComponent|decodeURIComponent|btoa|atob|parseInt|parseFloat|console)\\b",
      "\\b(?<boolean>true|false|null|undefined|NaN|Infinity)\\b",
      "\\b(?<number>0x[\\da-fA-F]+|0b[01]+|0o[0-7]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)\\b",
      "(?<operator>=>|===|!==|==|!=|<=|>=|&&|\\|\\||\\+\\+|--|[+\\-*/%&|^!=<>?:]+)",
    ].join("|"),
    "g"
  );

  let html = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      html += escapeHtml(code.slice(lastIndex, match.index));
    }

    const groups = match.groups as Record<string, string | undefined>;
    const matchedText = escapeHtml(match[0]);

    if (groups.comment) {
      html += `<span class="text-slate-500 italic">${matchedText}</span>`;
    } else if (groups.string) {
      html += `<span class="text-emerald-400">${matchedText}</span>`;
    } else if (groups.keyword) {
      html += `<span class="text-purple-400 font-semibold">${matchedText}</span>`;
    } else if (groups.flyclip) {
      html += `<span class="text-cyan-300 font-bold">${matchedText}</span>`;
    } else if (groups.builtin) {
      html += `<span class="text-amber-300 font-semibold">${matchedText}</span>`;
    } else if (groups.boolean) {
      html += `<span class="text-rose-400 font-semibold">${matchedText}</span>`;
    } else if (groups.number) {
      html += `<span class="text-orange-300">${matchedText}</span>`;
    } else if (groups.operator) {
      html += `<span class="text-pink-400">${matchedText}</span>`;
    } else {
      html += matchedText;
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < code.length) {
    html += escapeHtml(code.slice(lastIndex));
  }

  return html;
}

function highlightYAML(yaml: string): string {
  if (!yaml) return "";
  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const lines = yaml.split("\n");
  return lines
    .map((line) => {
      if (line.trim().startsWith("#")) {
        return `<span class="text-slate-500 italic">${escapeHtml(line)}</span>`;
      }
      const match = line.match(/^(\s*)([a-zA-Z0-9_\-\s]+)(:)(.*)$/);
      if (match) {
        const indent = escapeHtml(match[1]);
        const key = escapeHtml(match[2]);
        const colon = escapeHtml(match[3]);
        const value = match[4];

        let valHtml = "";
        if (value.trim().startsWith("|") || value.trim().startsWith(">")) {
          valHtml = ` <span class="text-pink-400 font-bold">${escapeHtml(value.trim())}</span>`;
        } else if (value.trim().startsWith("[") && value.trim().endsWith("]")) {
          valHtml = ` <span class="text-amber-300">${escapeHtml(value.trim())}</span>`;
        } else if (value.trim().startsWith('"') || value.trim().startsWith("'")) {
          valHtml = ` <span class="text-emerald-400">${escapeHtml(value.trim())}</span>`;
        } else if (value.trim() === "true" || value.trim() === "false") {
          valHtml = ` <span class="text-rose-400 font-semibold">${escapeHtml(value.trim())}</span>`;
        } else if (value.trim().length > 0) {
          valHtml = ` <span class="text-slate-200">${escapeHtml(value.trim())}</span>`;
        }
        return `${indent}<span class="text-cyan-400 font-semibold">${key}</span><span class="text-slate-400">${colon}</span>${valHtml}`;
      }
      return escapeHtml(line);
    })
    .join("\n");
}

const JS_PRESETS = [
  {
    name: "文本转换 (大写)",
    code: `// 获取选中文本并转换为大写\nconst text = flyclip.input.text;\nreturn text.toUpperCase();`,
    after: "paste-result",
  },
  {
    name: "模拟快捷键 (Ctrl+C)",
    code: `// 使用 JS 模拟触发快捷键组合 (如 Ctrl+C, Ctrl+V, Ctrl+Shift+F 等)\nflyclip.pressKey("ctrl c");`,
    after: "none",
  },
  {
    name: "正则清理 (消除多余空格)",
    code: `// 使用正则将连续多余空格压缩为单个空格\nconst text = flyclip.input.text;\nreturn text.replace(/\\s+/g, ' ').trim();`,
    after: "paste-result",
  },
  {
    name: "HTTP 请求 (API 翻译/调用)",
    code: `// 发送本地或远程 HTTP 请求\nconst text = flyclip.input.text.trim();\nconst port = flyclip.options.port || "50020";\n\ntry {\n  const res = await flyclip.fetch(\`http://127.0.0.1:\${port}/text?content=\${encodeURIComponent(text)}\`);\n  // 如果接口有返回内容，可直接返回结果\n} catch (e) {\n  // 异常回退：唤起 CLI 或提示\n  flyclip.run("cmd", ["/c", "start", \`pot:translate?text=\${encodeURIComponent(text)}\`]);\n}`,
    after: "none",
  },
  {
    name: "命令行调用 (运行本地程序)",
    code: `// 跨平台调用本地可执行文件\nconst text = flyclip.input.text;\nflyclip.run("notepad.exe", [text]);`,
    after: "none",
  },
  {
    name: "字数统计 (提示栏显示)",
    code: `// 统计字数并在 FlyClip 提示栏浮层中展示\nconst text = flyclip.input.text;\nconst chars = text.length;\nconst words = (text.match(/\\S+/g) || []).length;\nreturn \`\${chars} 字符 · \${words} 词\`;`,
    after: "show-result",
  },
];

export default function ExtensionGenerator() {
  const [name, setName] = useState("文本大写转换");
  const [id, setId] = useState("com.flyclip.extension.uppercase");
  const [icon, setIcon] = useState("Aa");
  const [desc, setDesc] = useState("选中文本快速转换为大写");
  const [actionType, setActionType] = useState<"javascript" | "url" | "powershell" | "keys">("javascript");
  
  // Action Contents
  const [jsCode, setJsCode] = useState(JS_PRESETS[0].code);
  const [urlTemplate, setUrlTemplate] = useState("https://www.google.com/search?q=***");
  const [psCode, setPsCode] = useState("Write-Host -NoNewline $env:FLYCLIP_TEXT.ToUpper()");
  const [keyCombo, setKeyCombo] = useState("ctrl c");
  
  const [afterStep, setAfterStep] = useState("paste-result");
  const [requirements, setRequirements] = useState("text");
  
  // Options
  const [hasOptions, setHasOptions] = useState(false);
  const [options, setOptions] = useState<OptionItem[]>([
    { id: "port", label: "本地端口", type: "string", defaultValue: "50020" }
  ]);

  const [copied, setCopied] = useState(false);
  const [installed, setInstalled] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const highlightedJsHtml = useMemo(() => highlightJavaScript(jsCode), [jsCode]);

  // Handle Tab key in JavaScript Code Editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      textarea.value = value.substring(0, start) + "  " + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      setJsCode(textarea.value);
    }
  };

  const applyPreset = (preset: typeof JS_PRESETS[0]) => {
    setJsCode(preset.code);
    setAfterStep(preset.after);
  };

  const generateYaml = useMemo(() => {
    let yaml = `name: ${name}\n`;
    yaml += `identifier: ${id}\n`;
    yaml += `description: ${desc}\n`;
    yaml += `icon: ${icon}\n`;

    if (hasOptions && options.length > 0) {
      yaml += `options:\n`;
      options.forEach(opt => {
        yaml += `  - identifier: ${opt.id}\n`;
        yaml += `    label: ${opt.label}\n`;
        yaml += `    type: ${opt.type}\n`;
        if (opt.type === "multiple" && opt.values) {
          const vals = opt.values.split(",").map(v => v.trim()).filter(Boolean);
          yaml += `    values: [${vals.join(", ")}]\n`;
        }
        if (opt.defaultValue) {
          yaml += `    default value: ${opt.type === "boolean" ? opt.defaultValue : `"${opt.defaultValue}"`}\n`;
        }
      });
    }

    yaml += `actions:\n`;
    yaml += `  - title: ${name}\n`;
    
    if (actionType === "javascript") {
      const indented = jsCode
        .split("\n")
        .map(line => line.length > 0 ? `      ${line}` : "")
        .join("\n");
      yaml += `    javascript: |\n${indented}\n`;
    } else if (actionType === "url") {
      yaml += `    url: ${urlTemplate}\n`;
    } else if (actionType === "powershell") {
      if (psCode.includes("\n")) {
        const indented = psCode
          .split("\n")
          .map(line => line.length > 0 ? `      ${line}` : "")
          .join("\n");
        yaml += `    shell script: |\n${indented}\n`;
      } else {
        yaml += `    shell script: ${psCode}\n`;
      }
    } else if (actionType === "keys") {
      yaml += `    key combo: ${keyCombo}\n`;
    }

    if (requirements.trim()) {
      const reqList = requirements.split(",").map(r => r.trim()).filter(Boolean);
      yaml += `    requirements: [${reqList.join(", ")}]\n`;
    }

    if (afterStep && afterStep !== "none") {
      yaml += `    after: ${afterStep}\n`;
    }

    return yaml;
  }, [name, id, desc, icon, hasOptions, options, actionType, jsCode, urlTemplate, psCode, keyCombo, requirements, afterStep]);

  const highlightedYamlHtml = useMemo(() => highlightYAML(generateYaml), [generateYaml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generateYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateYaml], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Config.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleInstallToFlyClip = () => {
    const snippet = `# flyclip\n${generateYaml}`;
    const schemeUrl = `flyclip://install-extension?name=${encodeURIComponent(name)}&data=${encodeURIComponent(snippet)}`;
    try {
      window.open(schemeUrl, "_blank");
      setInstalled(true);
      setTimeout(() => setInstalled(false), 3000);
    } catch (_) {}
  };

  const lineCount = jsCode.split("\n").length;

  return (
    <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2d3142]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Wrench size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>在线扩展配置生成器</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                实时语法高亮编辑器
              </span>
            </h2>
            <p className="text-xs text-slate-400">实时编写 JavaScript 代码，生成符合规范的 <code>Config.yaml</code> 并一键安装</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallToFlyClip}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 active:scale-95"
            title="一键唤起 FlyClip 客户端安装此扩展"
          >
            <Zap size={14} className="text-amber-300" />
            <span>{installed ? "已唤起安装..." : "一键安装到 FlyClip"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Code Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata Cards */}
          <div className="space-y-4 bg-[#14161d] border border-[#2d3142] rounded-xl p-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">基本元信息 (Metadata)</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">扩展名称 (Name)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setId(`com.flyclip.extension.${e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">唯一标识符 (Identifier)</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">图标 (Icon)</label>
                <input
                  type="text"
                  value={icon}
                  placeholder="如 Aa, ⚡, 或 iconify:lucide:search"
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">简要描述 (Description)</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action Type Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              选择动作类型 (Action Type)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActionType("javascript")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  actionType === "javascript"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/10"
                    : "bg-[#14161d] border-[#2d3142] text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                <Code size={18} className={actionType === "javascript" ? "text-emerald-400" : "text-slate-400"} />
                <span className="text-xs">JavaScript</span>
                <span className="text-[10px] text-emerald-400/80">🥇 首选推荐</span>
              </button>

              <button
                type="button"
                onClick={() => setActionType("url")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  actionType === "url"
                    ? "bg-blue-500/15 border-blue-500 text-blue-300 font-bold shadow-md shadow-blue-500/10"
                    : "bg-[#14161d] border-[#2d3142] text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                <Globe size={18} className={actionType === "url" ? "text-blue-400" : "text-slate-400"} />
                <span className="text-xs">URL 模板</span>
                <span className="text-[10px] text-blue-400/80">网页/搜索</span>
              </button>

              <button
                type="button"
                onClick={() => setActionType("powershell")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  actionType === "powershell"
                    ? "bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10"
                    : "bg-[#14161d] border-[#2d3142] text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                <Terminal size={18} className={actionType === "powershell" ? "text-amber-400" : "text-slate-400"} />
                <span className="text-xs">PowerShell</span>
                <span className="text-[10px] text-amber-400/80">Windows 专用</span>
              </button>

              <button
                type="button"
                onClick={() => setActionType("keys")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  actionType === "keys"
                    ? "bg-purple-500/15 border-purple-500 text-purple-300 font-bold shadow-md shadow-purple-500/10"
                    : "bg-[#14161d] border-[#2d3142] text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                <Keyboard size={18} className={actionType === "keys" ? "text-purple-400" : "text-slate-400"} />
                <span className="text-xs">快捷键模拟</span>
                <span className="text-[10px] text-purple-400/80">Key Combo</span>
              </button>
            </div>
          </div>

          {/* Action Editor depending on Type */}
          {actionType === "javascript" && (
            <div className="space-y-3">
              {/* Presets Bar */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>JavaScript 脚本代码编辑器 (内置语法高亮)</span>
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500">预设模版:</span>
                  {JS_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="px-2 py-0.5 rounded bg-[#14161d] hover:bg-emerald-500/20 hover:text-emerald-300 text-[11px] text-slate-300 border border-[#2d3142] transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Editor Container */}
              <div className="border border-[#2d3142] rounded-xl overflow-hidden bg-[#0e1017] shadow-inner">
                {/* Editor Top Toolbar */}
                <div className="px-4 py-2 bg-[#14161d] border-b border-[#2d3142] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-slate-300 font-semibold ml-2">action.js</span>
                  </div>
                  <span className="text-[11px] text-slate-500">支持 Tab 缩进 (2 空格)</span>
                </div>

                {/* Editor with Gutter and Synchronized Syntax Highlighting */}
                <div className="flex text-xs font-mono leading-relaxed relative min-h-[260px] bg-[#0e1017]">
                  {/* Line Numbers Gutter */}
                  <div className="w-10 py-3 bg-[#10121a] text-slate-600 text-right pr-3 select-none border-r border-[#1f2330] flex-shrink-0">
                    {Array.from({ length: Math.max(lineCount, 10) }).map((_, i) => (
                      <div key={i} className="h-5 leading-5">{i + 1}</div>
                    ))}
                  </div>

                  {/* Code Area with Syntax Highlighting Backdrop */}
                  <div className="flex-1 relative overflow-hidden">
                    {/* Highlighted Backdrop (pre) */}
                    <pre
                      ref={preRef}
                      aria-hidden="true"
                      className="absolute inset-0 p-3 m-0 pointer-events-none font-mono text-xs leading-5 whitespace-pre-wrap break-all overflow-hidden text-slate-200"
                      dangerouslySetInnerHTML={{ __html: highlightedJsHtml + "\n" }}
                    />

                    {/* Editable Input (textarea) */}
                    <textarea
                      ref={textareaRef}
                      value={jsCode}
                      onChange={(e) => setJsCode(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onScroll={(e) => {
                        if (preRef.current) {
                          preRef.current.scrollTop = e.currentTarget.scrollTop;
                          preRef.current.scrollLeft = e.currentTarget.scrollLeft;
                        }
                      }}
                      spellCheck={false}
                      className="absolute inset-0 w-full h-full p-3 m-0 bg-transparent text-transparent caret-cyan-400 font-mono text-xs leading-5 whitespace-pre-wrap break-all focus:outline-none resize-none z-10 selection:bg-blue-500/30 selection:text-white"
                      placeholder="// 在此输入 JavaScript 代码，支持 flyclip.input.text, flyclip.pressKey, flyclip.fetch, flyclip.run 等"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 space-y-1">
                <p>
                  <strong>💡 JS 常用 API 说明</strong>：<code>flyclip.input.text</code>（选中文本）、<code>flyclip.pressKey(&quot;ctrl c&quot;)</code>（模拟快捷键）、<code>flyclip.options.*</code>（配置项）、<code>return &quot;结果&quot;</code>（配合 <code>after: paste-result</code> 自动替换选区）、<code>await flyclip.fetch(url, options)</code>（HTTP 请求）、<code>flyclip.run(cmd, args)</code>（唤起本地程序）。
                </p>
              </div>
            </div>
          )}

          {actionType === "url" && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                URL 模板 (支持 <code>***</code> 或 <code>&#123;flyclip text&#125;</code> 占位符)
              </label>
              <input
                type="text"
                value={urlTemplate}
                onChange={(e) => setUrlTemplate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-300 focus:outline-none focus:border-blue-500"
                placeholder="https://www.google.com/search?q=***"
              />
              <p className="text-[11px] text-slate-500">
                支持参数替换，例如：<code>https://example.com/search?q=&#123;flyclip text&#125;&amp;lang=&#123;flyclip option target_lang&#125;</code>
              </p>
            </div>
          )}

          {actionType === "powershell" && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                PowerShell 脚本命令 (接收 <code>$env:FLYCLIP_TEXT</code>)
              </label>
              <textarea
                value={psCode}
                onChange={(e) => setPsCode(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] font-mono text-xs text-amber-300 focus:outline-none focus:border-amber-500"
                placeholder="Write-Host -NoNewline $env:FLYCLIP_TEXT.ToUpper()"
              />
            </div>
          )}

          {actionType === "keys" && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                按键序列 (Key Combo)
              </label>
              <input
                type="text"
                value={keyCombo}
                onChange={(e) => setKeyCombo(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#14161d] border border-[#2d3142] font-mono text-xs text-purple-300 focus:outline-none focus:border-purple-500"
                placeholder="例如: ctrl c 或 ctrl shift f"
              />
            </div>
          )}

          {/* After Step & Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#14161d] border border-[#2d3142] rounded-xl p-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">执行后后续动作 (After Step)</label>
              <select
                value={afterStep}
                onChange={(e) => setAfterStep(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="none">无 (None / 仅执行)</option>
                <option value="paste-result">直接粘贴替换选区 (paste-result)</option>
                <option value="show-result">浮层提示栏展示 (show-result)</option>
                <option value="copy-result">仅复制到剪贴板 (copy-result)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">触发条件 (Requirements)</label>
              <input
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder="text, url, path, email"
              />
            </div>
          </div>

          {/* Options Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasOptions}
                  onChange={(e) => setHasOptions(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-[#14161d] border-[#2d3142] focus:ring-0"
                />
                <span>添加扩展配置选项 (Options)</span>
              </label>
              {hasOptions && (
                <button
                  type="button"
                  onClick={() => setOptions([...options, { id: `opt_${options.length + 1}`, label: "新选项", type: "string", defaultValue: "" }])}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  + 添加选项
                </button>
              )}
            </div>

            {hasOptions && (
              <div className="space-y-3 bg-[#14161d] border border-[#2d3142] rounded-xl p-4">
                {options.map((opt, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 pb-3 border-b border-[#2d3142] last:border-b-0 last:pb-0">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">选项 ID</span>
                      <input
                        type="text"
                        value={opt.id}
                        onChange={(e) => {
                          const n = [...options];
                          n[idx].id = e.target.value;
                          setOptions(n);
                        }}
                        className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">显示标签 (Label)</span>
                      <input
                        type="text"
                        value={opt.label}
                        onChange={(e) => {
                          const n = [...options];
                          n[idx].label = e.target.value;
                          setOptions(n);
                        }}
                        className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">类型</span>
                      <select
                        value={opt.type}
                        onChange={(e) => {
                          const n = [...options];
                          n[idx].type = e.target.value as OptionItem["type"];
                          setOptions(n);
                        }}
                        className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200"
                      >
                        <option value="string">文本 (string)</option>
                        <option value="boolean">开关 (boolean)</option>
                        <option value="multiple">多选列表 (multiple)</option>
                        <option value="secret">凭据/Token (secret)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">默认值</span>
                      <input
                        type="text"
                        value={opt.defaultValue}
                        onChange={(e) => {
                          const n = [...options];
                          n[idx].defaultValue = e.target.value;
                          setOptions(n);
                        }}
                        className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live YAML Output (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#14161d] border border-[#2d3142] rounded-xl p-5 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3142] mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-400" />
                <span>实时生成的 Config.yaml</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownload}
                  title="下载为 Config.yaml 文件"
                  className="px-2.5 py-1 rounded bg-[#1c1e27] hover:bg-[#252836] border border-[#2d3142] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Download size={12} />
                  <span>下载</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  <span>{copied ? "已复制" : "复制"}</span>
                </button>
              </div>
            </div>

            {/* Code Output with Syntax Highlighting */}
            <div className="p-4 rounded-xl bg-[#0e1017] border border-[#1f2330] overflow-x-auto max-h-[520px] overflow-y-auto">
              <pre
                className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre select-all"
                dangerouslySetInnerHTML={{ __html: highlightedYamlHtml }}
              />
            </div>
          </div>

          {/* Quick Install Banner */}
          <div className="pt-4 border-t border-[#2d3142] mt-4 space-y-3">
            <button
              type="button"
              onClick={handleInstallToFlyClip}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <Zap size={15} className="text-amber-300" />
              <span>直接载入 Snippet 到 FlyClip 安装</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center leading-normal">
              提示：创建文件夹 <code>{name}.flyclipext/</code> 并将此文件保存为 <code>Config.yaml</code> 放入其中，即可直接作为本地扩展使用。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

