"use client";

import { useState, useRef, useMemo } from "react";
import { 
  RefreshCw, 
  Upload, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode, 
  Sparkles, 
  Layers, 
  Terminal, 
  ArrowRight,
  ExternalLink,
  Code
} from "lucide-react";
import JSZip from "jszip";

interface ConversionReport {
  originalFormat: "plist" | "yaml" | "json" | "unknown";
  name: string;
  id: string;
  actionsCount: number;
  warnings: string[];
  fixes: string[];
  yamlOutput: string;
  files: { name: string; content: string | Uint8Array }[];
}

function parsePlistXml(xmlText: string): any {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  
  const parseError = xmlDoc.querySelector("parsererror");
  if (parseError) {
    throw new Error("XML plist 解析失败: " + parseError.textContent);
  }

  const plistRoot = xmlDoc.querySelector("plist");
  if (!plistRoot || !plistRoot.firstElementChild) {
    throw new Error("未找到有效的 <plist> 根节点");
  }

  function parseNode(node: Element): any {
    const tag = node.tagName.toLowerCase();
    if (tag === "dict") {
      const result: Record<string, any> = {};
      let currentKey: string | null = null;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const childTag = child.tagName.toLowerCase();
        if (childTag === "key") {
          currentKey = child.textContent?.trim() || "";
        } else if (currentKey) {
          result[currentKey] = parseNode(child);
          currentKey = null;
        }
      }
      return result;
    } else if (tag === "array") {
      const result: any[] = [];
      for (let i = 0; i < node.children.length; i++) {
        result.push(parseNode(node.children[i]));
      }
      return result;
    } else if (tag === "string") {
      return node.textContent || "";
    } else if (tag === "integer" || tag === "real") {
      return Number(node.textContent) || 0;
    } else if (tag === "true") {
      return true;
    } else if (tag === "false") {
      return false;
    } else if (tag === "data") {
      return node.textContent?.trim() || "";
    }
    return node.textContent || "";
  }

  return parseNode(plistRoot.firstElementChild);
}

function modernizeJavaScript(code: string): { code: string; changed: boolean } {
  let updated = code;
  let changed = false;

  // popclip.input.matchedText -> flyclip.input.matched
  if (updated.includes("popclip.input.matchedText")) {
    updated = updated.replace(/popclip\.input\.matchedText/g, "flyclip.input.matched");
    changed = true;
  }
  // popclip.input.text -> flyclip.input.text
  if (updated.includes("popclip.input.text")) {
    updated = updated.replace(/popclip\.input\.text/g, "flyclip.input.text");
    changed = true;
  }
  // popclip.copyText( -> flyclip.copy(
  if (updated.includes("popclip.copyText(")) {
    updated = updated.replace(/popclip\.copyText\(/g, "flyclip.copy(");
    changed = true;
  }
  // popclip.pasteText( -> flyclip.paste(
  if (updated.includes("popclip.pasteText(")) {
    updated = updated.replace(/popclip\.pasteText\(/g, "flyclip.paste(");
    changed = true;
  }
  // pasteboard.text = ... -> flyclip.copy(...)
  const pbWriteRegex = /pasteboard\.text\s*=\s*([^;\n]+);?/g;
  if (pbWriteRegex.test(updated)) {
    updated = updated.replace(pbWriteRegex, "flyclip.copy($1);");
    changed = true;
  }
  // pasteboard.text (read) -> flyclip.readClipboard()
  if (updated.includes("pasteboard.text")) {
    updated = updated.replace(/pasteboard\.text/g, "flyclip.readClipboard()");
    changed = true;
  }
  // popclip.openUrl -> flyclip.openUrl
  if (updated.includes("popclip.openUrl")) {
    updated = updated.replace(/popclip\.openUrl/g, "flyclip.openUrl");
    changed = true;
  }
  // popclip.options. -> flyclip.options.
  if (updated.includes("popclip.options.")) {
    updated = updated.replace(/popclip\.options\./g, "flyclip.options.");
    changed = true;
  }
  // popclip.showText -> flyclip.showText
  if (updated.includes("popclip.showText")) {
    updated = updated.replace(/popclip\.showText/g, "flyclip.showText");
    changed = true;
  }

  return { code: updated, changed };
}

function objectToYaml(obj: any, indent = 0): string {
  const pad = "  ".repeat(indent);
  let yaml = "";

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === "object" && item !== null) {
        const itemYaml = objectToYaml(item, indent + 1).trimStart();
        yaml += `${pad}- ${itemYaml}`;
      } else {
        yaml += `${pad}- ${JSON.stringify(item)}\n`;
      }
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined || value === null) continue;
      
      if (typeof value === "string") {
        if (value.includes("\n")) {
          const lines = value.split("\n").map(l => `${pad}    ${l}`).join("\n");
          yaml += `${pad}${key}: |\n${lines}\n`;
        } else if (value.includes(":") || value.includes("#") || value.startsWith("{") || value.startsWith("[") || value === "") {
          yaml += `${pad}${key}: ${JSON.stringify(value)}\n`;
        } else {
          yaml += `${pad}${key}: ${value}\n`;
        }
      } else if (typeof value === "boolean" || typeof value === "number") {
        yaml += `${pad}${key}: ${value}\n`;
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          yaml += `${pad}${key}: []\n`;
        } else if (value.every(v => typeof v === "string" && !v.includes("\n") && v.length < 20)) {
          yaml += `${pad}${key}: [${value.map(v => v.includes(" ") ? `"${v}"` : v).join(", ")}]\n`;
        } else {
          yaml += `${pad}${key}:\n${objectToYaml(value, indent + 1)}`;
        }
      } else if (typeof value === "object") {
        yaml += `${pad}${key}:\n${objectToYaml(value, indent + 1)}`;
      }
    }
  }

  return yaml;
}

export default function PopClipConverter() {
  const [inputText, setInputText] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [report, setReport] = useState<ConversionReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"paste" | "upload">("paste");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert raw object or plist dictionary into FlyClip Extension Model
  const convertDictToFlyClip = (dict: Record<string, any>, originalFormat: "plist" | "yaml" | "json"): ConversionReport => {
    const warnings: string[] = [];
    const fixes: string[] = [];
    const files: { name: string; content: string | Uint8Array }[] = [];

    const name = dict["Extension Name"] || dict["name"] || dict["title"] || "未命名扩展";
    let id = dict["Extension Identifier"] || dict["identifier"] || dict["id"] || `com.flyclip.extension.${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const desc = dict["Extension Description"] || dict["description"] || "";
    const icon = dict["Icon"] || dict["icon"] || "";

    const flyclipConfig: Record<string, any> = {
      name,
      identifier: id,
    };

    if (desc) flyclipConfig.description = desc;
    if (icon) flyclipConfig.icon = icon;

    // Plist specific notices
    if (originalFormat === "plist") {
      fixes.push("已将旧版 macOS XML Config.plist 自动解析并重构为标准 Config.yaml");
    }

    // Convert Options
    const rawOptions = dict["Options"] || dict["options"];
    if (Array.isArray(rawOptions) && rawOptions.length > 0) {
      flyclipConfig.options = rawOptions.map((opt: any) => {
        const optId = opt["Option Identifier"] || opt["identifier"] || opt["id"];
        const optLabel = opt["Option Label"] || opt["label"] || optId;
        const optType = (opt["Option Type"] || opt["type"] || "string").toLowerCase();
        const optDefault = opt["Option Default Value"] ?? opt["default value"] ?? opt["default"];
        const optValues = opt["Option Values"] || opt["values"];

        const convertedOpt: Record<string, any> = {
          identifier: optId,
          label: optLabel,
          type: optType === "heading" ? "heading" : optType === "boolean" ? "boolean" : optType === "multiple" ? "multiple" : "string"
        };
        if (optValues) convertedOpt.values = optValues;
        if (optDefault !== undefined) convertedOpt["default value"] = String(optDefault);
        return convertedOpt;
      });
      fixes.push(`已标准化 ${flyclipConfig.options.length} 个配置选项 (Options)`);
    }

    // Convert Actions
    const rawActions = dict["Actions"] || dict["actions"] || (dict["URL"] || dict["url"] || dict["javascript"] || dict["Script"] ? [dict] : []);
    
    if (Array.isArray(rawActions) && rawActions.length > 0) {
      flyclipConfig.actions = rawActions.map((act: any) => {
        const title = act["Title"] || act["title"] || name;
        const convertedAct: Record<string, any> = { title };

        // 1. URL Action
        const rawUrl = act["URL"] || act["url"];
        if (rawUrl) {
          let cleanUrl = rawUrl;
          if (cleanUrl.includes("{popclip text}")) {
            cleanUrl = cleanUrl.replace(/\{popclip text\}/g, "{flyclip text}");
            fixes.push("已将 URL 占位符 {popclip text} 升级为 {flyclip text}");
          }
          convertedAct.url = cleanUrl;
        }

        // 2. JavaScript Action
        const rawJs = act["JavaScript"] || act["javascript"] || act["java script"] || act["js"];
        if (rawJs) {
          const { code, changed } = modernizeJavaScript(rawJs);
          convertedAct.javascript = code;
          if (changed) {
            fixes.push(`已自动将动作「${title}」中的 popclip API 升级为标准 flyclip API`);
          }
        }

        // 3. AppleScript / Shell detection
        if (act["AppleScript"] || act["applescript"] || act["AppleScript File"]) {
          warnings.push(`❌ 动作「${title}」包含 macOS 专属 AppleScript，Windows 无法直接运行，已生成 JS 骨架待人工重写`);
          convertedAct.javascript = `// ⚠️ 原动作使用了 macOS AppleScript，请根据 Windows 场景改写为 JS 或 flyclip.run\n// 例如：const res = flyclip.run("notepad.exe", [flyclip.input.text]);\nreturn flyclip.input.text;`;
        }

        if (act["Shell Script"] || act["shell script"] || act["Script File"] || act["POSIX Script"]) {
          warnings.push(`⚠️ 动作「${title}」包含 POSIX Shell 脚本，建议使用 flyclip.run("cmd", [args]) 重构为跨平台 JS`);
          convertedAct.javascript = `// ⚠️ 原动作使用了 POSIX Shell 脚本，推荐改写为原生 JS + flyclip.run\nconst res = flyclip.run("cmd", ["/c", "echo", flyclip.input.text]);\nreturn res.stdout.trim();`;
        }

        // 3.1 macOS Shortcuts / Automator Services
        if (act["Shortcuts"] || act["shortcuts"] || act["Shortcut Name"]) {
          const scName = act["Shortcuts"] || act["shortcuts"] || act["Shortcut Name"];
          warnings.push(`❌ 动作「${title}」依赖 macOS 捷径应用 (Shortcut: "${scName}")，Windows 系统无原生捷径引擎，不支持直接运行`);
        }

        if (act["Service Name"] || act["service name"] || act["Service"]) {
          warnings.push(`❌ 动作「${title}」依赖 macOS 系统服务 (Service)，Windows 不支持`);
        }

        // 3.2 HTML capture
        if (act["Capture HTML"] || act["pass html"] || act["capture html"]) {
          warnings.push(`⚠️ 动作「${title}」声明了 capture html / pass html，FlyClip 当前聚焦纯文本处理，富文本 HTML 捕获暂不支持`);
        }

        // 3.3 Node / npm require detection
        if (rawJs && (rawJs.includes("require(") || rawJs.includes("from '") || rawJs.includes("from \""))) {
          warnings.push(`⚠️ 动作「${title}」JS 中检测到外部 require/import 模块依赖。FlyClip 内置极速轻量 QuickJS，无需 node_modules，网络请求请改用内置的 await flyclip.fetch()`);
        }

        // 4. Key Combo
        const rawKey = act["Key Combo"] || act["key combo"] || act["Key"];
        if (rawKey) {
          let keyStr = String(rawKey).toLowerCase();
          if (/0x[0-9a-fA-F]+/i.test(keyStr)) {
            warnings.push(`⚠️ 动作「${title}」包含 macOS 硬件虚拟键码 (${keyStr})，建议在 Windows 下改用标准英文字符键名 (如 "ctrl shift s")`);
          }
          if (keyStr.includes("command")) {
            keyStr = keyStr.replace(/command/g, "ctrl");
            fixes.push(`已将快捷键修饰符 command 自动重映射为 ctrl (${keyStr})`);
          }
          convertedAct["key combo"] = keyStr;
        }

        // 5. App Bundle Filtering
        const rawApps = act["Apps"] || act["apps"] || act["App"] || dict["Apps"] || dict["apps"];
        if (rawApps) {
          const appList = Array.isArray(rawApps) ? rawApps : [rawApps];
          const hasMacBundle = appList.some((a: string) => typeof a === "string" && (a.startsWith("com.apple.") || a.includes(".")));
          if (hasMacBundle) {
            warnings.push(`⚠️ 动作「${title}」限定了 macOS 专属应用包名 (${JSON.stringify(appList)})，在 Windows 下请改为目标进程名 (如 "chrome.exe", "notepad.exe")`);
          }
          convertedAct["required apps"] = appList;
        }

        // Requirements
        const reqs = act["Requirements"] || act["requirements"];
        if (reqs) {
          convertedAct.requirements = Array.isArray(reqs) ? reqs : [reqs];
        }

        // Regex
        const regex = act["Regular Expression"] || act["regex"] || act["regular expression"];
        if (regex) {
          convertedAct.regex = regex;
        }

        // After step
        const after = act["After"] || act["after"];
        if (after) {
          convertedAct.after = after;
        }

        return convertedAct;
      });
    }

    const yamlOutput = `# flyclip extension manifest\n# Converted automatically by FlyClip DevTools\n` + objectToYaml(flyclipConfig);

    return {
      originalFormat,
      name,
      id,
      actionsCount: flyclipConfig.actions?.length || 0,
      warnings,
      fixes,
      yamlOutput,
      files,
    };
  };

  // Handle Text/Code Paste Conversion
  const handleConvertText = () => {
    setErrorMsg(null);
    if (!inputText.trim()) {
      setErrorMsg("请粘贴 PopClip 的 Config.plist 或 YAML 配置代码");
      return;
    }

    setIsConverting(true);
    try {
      const trimmed = inputText.trim();
      let res: ConversionReport;

      if (trimmed.startsWith("<?xml") || trimmed.includes("<plist") || trimmed.startsWith("<dict>")) {
        // XML plist
        const fullXml = trimmed.includes("<plist") ? trimmed : `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0">${trimmed}</plist>`;
        const parsed = parsePlistXml(fullXml);
        res = convertDictToFlyClip(parsed, "plist");
      } else {
        // Assume YAML-like key-value / snippet
        // Very basic simple YAML-like parser or JS modernize
        const { code, changed } = modernizeJavaScript(trimmed);
        if (changed && !trimmed.includes("name:") && !trimmed.includes("actions:")) {
          // It was a pure JS snippet!
          res = {
            originalFormat: "yaml",
            name: "已转换 JavaScript 脚本",
            id: "com.flyclip.extension.custom-script",
            actionsCount: 1,
            warnings: [],
            fixes: ["已将 JS 脚本中的 popclip.* 自动重写为 flyclip.*"],
            yamlOutput: `# flyclip inline action\nactions:\n  - title: 自定义脚本\n    javascript: |\n${code.split("\n").map(l => "      " + l).join("\n")}\n`,
            files: [],
          };
        } else {
          // Text contains YAML headers
          let cleanYaml = trimmed;
          if (cleanYaml.includes("{popclip text}")) {
            cleanYaml = cleanYaml.replace(/\{popclip text\}/g, "{flyclip text}");
          }
          if (cleanYaml.includes("popclip.input.")) {
            cleanYaml = cleanYaml.replace(/popclip\.input\.matchedText/g, "flyclip.input.matched");
            cleanYaml = cleanYaml.replace(/popclip\.input\.text/g, "flyclip.input.text");
          }
          if (cleanYaml.includes("popclip.copyText(")) {
            cleanYaml = cleanYaml.replace(/popclip\.copyText\(/g, "flyclip.copy(");
          }
          if (cleanYaml.includes("popclip.pasteText(")) {
            cleanYaml = cleanYaml.replace(/popclip\.pasteText\(/g, "flyclip.paste(");
          }

          res = {
            originalFormat: "yaml",
            name: "已转换配置",
            id: "com.flyclip.extension.converted",
            actionsCount: 1,
            warnings: [],
            fixes: ["已完成 YAML 语法与 API 现代规范化"],
            yamlOutput: cleanYaml.startsWith("# flyclip") ? cleanYaml : `# flyclip extension manifest\n${cleanYaml}`,
            files: [],
          };
        }
      }

      setReport(res);
    } catch (err: any) {
      setErrorMsg("转换失败: " + (err.message || "未知解析错误，请检查代码格式是否完整"));
    } finally {
      setIsConverting(false);
    }
  };

  // Handle Zip / File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsConverting(true);

    try {
      if (file.name.endsWith(".plist")) {
        const text = await file.text();
        const fullXml = text.includes("<plist") ? text : `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0">${text}</plist>`;
        const parsed = parsePlistXml(fullXml);
        const res = convertDictToFlyClip(parsed, "plist");
        setReport(res);
      } else if (file.name.endsWith(".yaml") || file.name.endsWith(".yml") || file.name.endsWith(".json")) {
        const text = await file.text();
        setInputText(text);
        handleConvertText();
      } else if (file.name.endsWith(".popclipextz") || file.name.endsWith(".zip") || file.name.endsWith(".flyclipextz")) {
        const zip = new JSZip();
        const loadedZip = await zip.loadAsync(file);
        
        const accompanyingFiles: { name: string; content: string | Uint8Array }[] = [];
        let foundConfig = false;
        let configContent = "";
        let isPlist = false;

        for (const [path, zipEntry] of Object.entries(loadedZip.files)) {
          if (zipEntry.dir) continue;
          const lower = path.toLowerCase();
          const fileName = path.split("/").pop() || path;

          if (lower.endsWith("config.plist")) {
            configContent = await zipEntry.async("text");
            isPlist = true;
            foundConfig = true;
          } else if (lower.endsWith("config.yaml") || lower.endsWith("config.yml")) {
            configContent = await zipEntry.async("text");
            isPlist = false;
            foundConfig = true;
          } else if (lower.endsWith(".js") || lower.endsWith(".ts")) {
            const jsText = await zipEntry.async("text");
            const { code, changed } = modernizeJavaScript(jsText);
            accompanyingFiles.push({ name: fileName, content: code });
          } else {
            const binary = await zipEntry.async("uint8array");
            accompanyingFiles.push({ name: fileName, content: binary });
          }
        }

        if (!foundConfig) {
          throw new Error("压缩包中未找到 Config.plist 或 Config.yaml 配置文件");
        }

        let res: ConversionReport;
        if (isPlist) {
          const parsed = parsePlistXml(configContent);
          res = convertDictToFlyClip(parsed, "plist");
        } else {
          setInputText(configContent);
          const { code } = modernizeJavaScript(configContent);
          let cleanYaml = configContent;
          if (cleanYaml.includes("{popclip text}")) cleanYaml = cleanYaml.replace(/\{popclip text\}/g, "{flyclip text}");
          if (cleanYaml.includes("popclip.input.")) cleanYaml = cleanYaml.replace(/popclip\.input\.matchedText/g, "flyclip.input.matched").replace(/popclip\.input\.text/g, "flyclip.input.text");
          if (cleanYaml.includes("popclip.copyText(")) cleanYaml = cleanYaml.replace(/popclip\.copyText\(/g, "flyclip.copy(");
          if (cleanYaml.includes("popclip.pasteText(")) cleanYaml = cleanYaml.replace(/popclip\.pasteText\(/g, "flyclip.paste(");

          res = {
            originalFormat: "yaml",
            name: "已转换扩展包",
            id: "com.flyclip.extension.converted-package",
            actionsCount: 1,
            warnings: [],
            fixes: ["已完成压缩包内 Config.yaml 与 JS 脚本的现代规范化"],
            yamlOutput: cleanYaml.startsWith("# flyclip") ? cleanYaml : `# flyclip extension manifest\n${cleanYaml}`,
            files: accompanyingFiles,
          };
        }

        res.files = accompanyingFiles;
        if (accompanyingFiles.length > 0) {
          res.fixes.push(`已保留并打包 ${accompanyingFiles.length} 个附加资源文件 (图标/外部JS脚本)`);
        }
        setReport(res);
      } else {
        throw new Error("仅支持上传 .popclipextz, .zip, Config.plist, Config.yaml 文件");
      }
    } catch (err: any) {
      setErrorMsg("文件解析失败: " + (err.message || "请确保文件有效"));
    } finally {
      setIsConverting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Download .flyclipextz archive
  const handleDownloadFlyclipExtz = async () => {
    if (!report) return;
    const zip = new JSZip();
    zip.file("Config.yaml", report.yamlOutput);

    // Add accompanying files (icons, external JS)
    if (report.files && report.files.length > 0) {
      for (const f of report.files) {
        zip.file(f.name, f.content);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const safeName = (report.name || "extension").replace(/[^a-zA-Z0-9_\-\u4e00-\u9fa5]+/g, "_");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${safeName}.flyclipextz`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy YAML
  const handleCopyYaml = () => {
    if (!report) return;
    navigator.clipboard.writeText(report.yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load Presets
  const loadExample = (type: "plist" | "js") => {
    if (type === "plist") {
      setInputText(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Extension Name</key>
  <string>GitHub 仓库检索</string>
  <key>Extension Identifier</key>
  <string>com.example.popclip.github</string>
  <key>Actions</key>
  <array>
    <dict>
      <key>Title</key>
      <string>GitHub</string>
      <key>URL</key>
      <string>https://github.com/search?q={popclip text}</string>
    </dict>
  </array>
</dict>
</plist>`);
    } else {
      setInputText(`// 旧 PopClip 脚本
const text = popclip.input.matchedText;
pasteboard.text = "【格式化】" + text.trim();
popclip.pasteText();`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex border-b border-[#2d3142] gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("paste")}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "paste"
              ? "border-blue-500 text-blue-400 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Code size={16} />
          <span>直接粘贴代码转换 (Plist / YAML / JS)</span>
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "upload"
              ? "border-blue-500 text-blue-400 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Upload size={16} />
          <span>上传文件转换 (.popclipextz / .plist)</span>
        </button>
      </div>

      {/* Mode A: Paste Text */}
      {activeTab === "paste" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>在下方粘贴 PopClip 扩展的 <code>Config.plist</code> (XML) 或旧 YAML / JS 代码：</span>
            <div className="flex gap-2">
              <button
                onClick={() => loadExample("plist")}
                className="text-blue-400 hover:underline"
              >
                加载 Plist 示例
              </button>
              <span>·</span>
              <button
                onClick={() => loadExample("js")}
                className="text-emerald-400 hover:underline"
              >
                加载 JS 示例
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            placeholder="在此粘贴 <?xml ...> <dict> ... </dict> </plist> 或旧版 YAML / JS 脚本"
            className="w-full p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
          />

          <button
            onClick={handleConvertText}
            disabled={isConverting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <RefreshCw size={16} className={isConverting ? "animate-spin" : ""} />
            <span>{isConverting ? "正在解析并重构规范..." : "一键转换为 FlyClip 现代扩展格式"}</span>
          </button>
        </div>
      )}

      {/* Mode B: Upload File */}
      {activeTab === "upload" && (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-10 rounded-2xl border-2 border-dashed border-[#2d3142] hover:border-blue-500 bg-[#14161d]/50 hover:bg-[#14161d] transition-all cursor-pointer text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
              <Upload size={24} />
            </div>
            <div>
              <div className="font-bold text-white text-sm">点击选择文件或将扩展包拖拽至此处</div>
              <div className="text-xs text-slate-400 mt-1">支持 <code>.popclipextz</code>、<code>.zip</code> 压缩包或 <code>Config.plist</code> 属性列表</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".popclipextz,.zip,.plist,.yaml,.yml"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
          <AlertTriangle className="text-rose-400 shrink-0" size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Report & Converted Output */}
      {report && (
        <div className="space-y-6 pt-4 border-t border-[#2d3142]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <span>转换完成报告 ({report.name})</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              包含 {report.actionsCount} 个动作
            </span>
          </div>

          {/* Fixes and Warnings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {report.fixes.length > 0 && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>自动规范化与修复项 ({report.fixes.length})</span>
                </div>
                <ul className="space-y-1 text-emerald-200/90 list-disc pl-4">
                  {report.fixes.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {report.warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle size={14} />
                  <span>需人工检查的平台差异 ({report.warnings.length})</span>
                </div>
                <ul className="space-y-1 text-amber-200/90 list-disc pl-4">
                  {report.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Converted YAML Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                生成的原生 Config.yaml
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyYaml}
                  className="px-3 py-1.5 rounded-lg bg-[#1c1e27] hover:bg-[#252834] border border-[#2d3142] text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? "已复制 YAML" : "复制 YAML"}</span>
                </button>
                <button
                  onClick={handleDownloadFlyclipExtz}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-500/20"
                >
                  <Download size={14} />
                  <span>下载 .flyclipextz 安装包</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#14161d] border border-[#2d3142] font-mono text-xs text-blue-200 overflow-x-auto">
              <pre>{report.yamlOutput}</pre>
            </div>
          </div>

          {/* Actions & Next Steps */}
          <div className="p-4 rounded-xl bg-[#1c1e27] border border-[#2d3142] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-300">
              💡 <strong>安装方式：</strong>下载生成的 <code>.flyclipextz</code> 文件后双击或直接复制到 <code>%APPDATA%\flyclip\extensions\</code> 目录即可立即在 FlyClip 中生效。
            </div>
            <a
              href={`flyclip://install-extension?name=${encodeURIComponent(report.name)}&data=${encodeURIComponent(report.yamlOutput)}`}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
            >
              <span>一键呼起 FlyClip 安装</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
