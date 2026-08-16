"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Wrench } from "lucide-react";

export default function ExtensionGenerator() {
  const [name, setName] = useState("自定义搜索");
  const [id, setId] = useState("com.flyclip.extension.custom-search");
  const [icon, setIcon] = useState("iconify:simple-icons:google");
  const [desc, setDesc] = useState("快速搜索选中文本");
  const [actionType, setActionType] = useState("url");
  const [actionContent, setActionContent] = useState("https://www.google.com/search?q=***");
  const [afterStep, setAfterStep] = useState("none");
  const [hasOption, setHasOption] = useState(false);
  const [optId, setOptId] = useState("site");
  const [optLabel, setOptLabel] = useState("搜索站点");
  const [optType, setOptType] = useState("multiple");
  const [copied, setCopied] = useState(false);

  const generateYaml = () => {
    let yaml = `name: ${name}\n`;
    yaml += `identifier: ${id}\n`;
    yaml += `description: ${desc}\n`;
    yaml += `icon: ${icon}\n`;

    if (hasOption) {
      yaml += `options:\n`;
      yaml += `  - identifier: ${optId}\n`;
      yaml += `    label: ${optLabel}\n`;
      yaml += `    type: ${optType}\n`;
      if (optType === "multiple") {
        yaml += `    values: [site1.com, site2.com]\n`;
        yaml += `    default value: site1.com\n`;
      } else if (optType === "boolean") {
        yaml += `    default value: false\n`;
      }
    }

    yaml += `actions:\n`;
    yaml += `  - title: ${name}\n`;
    if (actionType === "url") {
      yaml += `    url: ${actionContent}\n`;
    } else if (actionType === "powershell") {
      yaml += `    shell script: ${actionContent}\n`;
    } else if (actionType === "keys") {
      yaml += `    key combo: ${actionContent}\n`;
    }
    yaml += `    requirements: [text]\n`;
    if (afterStep && afterStep !== "none") {
      yaml += `    after: ${afterStep}\n`;
    }

    return yaml;
  };

  const yamlOutput = generateYaml();

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1c1e27] border border-[#2d3142] rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-3 pb-4 border-b border-[#2d3142] mb-6">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <Wrench size={18} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>在线扩展配置生成器</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">Live Tool</span>
          </h2>
          <p className="text-xs text-slate-400">填写表单，实时生成合规的 <code>Config.yaml</code> 扩展配置代码</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">扩展名称 (Name)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setId(`com.flyclip.extension.${e.target.value.toLowerCase().replace(/\s+/g, "-")}`);
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">唯一标识符 (Identifier)</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">图标 (Icon: 字符 / iconify)</label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">动作类型 (Action Type)</label>
              <select
                value={actionType}
                onChange={(e) => {
                  setActionType(e.target.value);
                  if (e.target.value === "url") setActionContent("https://www.google.com/search?q=***");
                  if (e.target.value === "powershell") setActionContent("Write-Host -NoNewline $env:FLYCLIP_TEXT.ToUpper()");
                  if (e.target.value === "keys") setActionContent("ctrl c");
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="url">打开网页 URL (Open URL)</option>
                <option value="powershell">PowerShell 脚本动作</option>
                <option value="keys">模拟快捷键 (Key Combo)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">动作执行内容 (URL 模板 或 脚本命令)</label>
            <input
              type="text"
              value={actionContent}
              onChange={(e) => setActionContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">执行后后续动作 (After Step)</label>
              <select
                value={afterStep}
                onChange={(e) => setAfterStep(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="none">无 (None / 默认)</option>
                <option value="paste-result">粘贴输出结果 (paste-result)</option>
                <option value="show-result">在提示栏展示结果 (show-result)</option>
                <option value="copy-result">复制结果到剪贴板 (copy-result)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">扩展简要描述</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14161d] border border-[#2d3142] text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Options toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={hasOption}
                onChange={(e) => setHasOption(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-[#14161d] border-[#2d3142] focus:ring-0"
              />
              <span>为扩展添加参数配置项 (Options)</span>
            </label>
          </div>

          {hasOption && (
            <div className="p-4 rounded-xl bg-[#14161d] border border-dashed border-[#2d3142] space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">选项标识 (ID)</label>
                  <input
                    type="text"
                    value={optId}
                    onChange={(e) => setOptId(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">选项名称 (Label)</label>
                  <input
                    type="text"
                    value={optLabel}
                    onChange={(e) => setOptLabel(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">选项类型 (Type)</label>
                  <select
                    value={optType}
                    onChange={(e) => setOptType(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-[#1c1e27] border border-[#2d3142] text-xs text-slate-200"
                  >
                    <option value="multiple">多选列表 (multiple)</option>
                    <option value="boolean">开关 (boolean)</option>
                    <option value="string">文本输入 (string)</option>
                    <option value="secret">密钥凭据 (secret)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Code Preview */}
        <div className="flex flex-col justify-between bg-[#14161d] border border-[#2d3142] rounded-xl p-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3142] mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue-400" />
                <span>实时生成的 Config.yaml</span>
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                <span>{copied ? "已复制" : "一键复制"}</span>
              </button>
            </div>
            <pre className="font-mono text-xs text-blue-200 leading-relaxed overflow-x-auto whitespace-pre">
              {yamlOutput}
            </pre>
          </div>
          <p className="text-[11px] text-slate-500 pt-3 border-t border-[#2d3142] mt-4">
            提示：将此文件保存为 <code>Config.yaml</code> 放入 <code>{name}.flyclipext/</code> 即可立即在 FlyClip 中加载。
          </p>
        </div>
      </div>
    </div>
  );
}
