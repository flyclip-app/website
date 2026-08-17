export interface ExtensionItem {
  id: string;
  name: string;
  nameZh?: string;
  nameEn?: string;
  category: 'translation' | 'search_ai' | 'text_tools' | 'developer' | 'shopping';
  icon: string;
  description: string;
  descriptionZh: string;
  hasOptions: boolean;
  optionsCount?: number;
  type: 'url' | 'js' | 'powershell' | 'keys';
  configYaml: string;
}

export function getExtensionPackageName(id: string): string {
  const map: Record<string, string> = {
    "com.flyclip.extension.pot-desktop": "PotTranslate",
    "com.flyclip.extension.stranslate": "STranslate",
    "com.flyclip.extension.google-translate": "GoogleTranslate",
    "com.flyclip.extension.deepl": "DeepLTranslate",
    "com.flyclip.extension.baidu-translate": "BaiduTranslate",
    "com.flyclip.extension.youdao": "YoudaoTranslate",
    "com.flyclip.extension.chatgpt": "ChatGPT",
    "com.flyclip.extension.claude": "Claude",
    "com.flyclip.extension.deepseek": "DeepSeek",
    "com.flyclip.extension.google-search": "GoogleSearch",
    "com.flyclip.extension.bing": "BingSearch",
    "com.flyclip.extension.baidu": "BaiduSearch",
    "com.flyclip.extension.duckduckgo": "DuckDuckGo",
    "com.flyclip.extension.github": "GitHubSearch",
    "com.flyclip.extension.wikipedia": "Wikipedia",
    "com.flyclip.extension.zhihu": "ZhihuSearch",
    "com.flyclip.extension.bilibili": "BilibiliSearch",
    "com.flyclip.extension.youtube": "YouTubeSearch",
    "com.flyclip.extension.mdn": "MDNWebDocs",
    "com.flyclip.extension.case-converter": "CaseConverter",
    "com.flyclip.extension.remove-spaces": "RemoveSpaces",
    "com.flyclip.extension.join-lines": "JoinLines",
    "com.flyclip.extension.sort-lines": "SortLines",
    "com.flyclip.extension.full-half-width": "FullHalfWidth",
    "com.flyclip.extension.text-statistics": "TextStatistics",
    "com.flyclip.extension.base64": "Base64",
    "com.flyclip.extension.url-encode": "URLEncode",
    "com.flyclip.extension.html-encode": "HTMLEncode",
    "com.flyclip.extension.json-formatter": "JSONFormatter",
    "com.flyclip.extension.hash-generator": "HashGenerator",
    "com.flyclip.extension.timestamp-convert": "TimestampConvert",
    "com.flyclip.extension.calculate": "Calculate",
    "com.flyclip.extension.regex-test": "RegexTest",
    "com.flyclip.extension.markdown-tools": "MarkdownTools",
    "com.flyclip.extension.ip-lookup": "IPLookup",
    "com.flyclip.extension.search-icons": "SearchIcons",
    "com.flyclip.extension.taobao": "Taobao",
    "com.flyclip.extension.jd": "JD",
    "com.flyclip.extension.douban": "Douban",
    "com.flyclip.extension.imdb": "IMDb",
    "com.flyclip.extension.urban-dictionary": "UrbanDictionary",
    "com.flyclip.extension.amazon": "Amazon",
  };
  return map[id] || id.split(".").pop() || "Extension";
}

export const EXTENSIONS_DATA: ExtensionItem[] = [
  // --- Desktop Apps HTTP Integration ---
  {
    id: "com.flyclip.extension.pot-desktop",
    name: "Pot 划词翻译",
    nameZh: "Pot 划词翻译",
    nameEn: "Pot Translate",
    category: "translation",
    icon: "Pot",
    description: "Send selected text to Pot Desktop via local HTTP API for instant translation/OCR.",
    descriptionZh: "通过本地 HTTP 服务将选中文本发送至 Pot Desktop 进行划词翻译或 OCR。",
    hasOptions: true,
    optionsCount: 2,
    type: "js",
    configYaml: `name: Pot 划词翻译
identifier: com.flyclip.extension.pot-desktop
icon: Pot
options:
  - identifier: port
    label: 本地服务端口
    type: string
    default value: "60828"
actions:
  - title: Pot 翻译
    javascript: |
      const text = flyclip.input.text.trim();
      const port = flyclip.options.port || "60828";
      try {
        await flyclip.fetch(\`http://127.0.0.1:\${port}/api/translate\`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
      } catch (e) {
        flyclip.run("cmd", ["/c", "start", \`pot:translate?text=\${encodeURIComponent(text)}\`]);
      }
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.stranslate",
    name: "STranslate 翻译",
    nameZh: "STranslate 翻译",
    nameEn: "STranslate",
    category: "translation",
    icon: "ST",
    description: "Trigger Windows open-source STranslate tool for deep translation.",
    descriptionZh: "通过本地服务或命令行调用 Windows 开源神器 STranslate 进行即时翻译。",
    hasOptions: true,
    optionsCount: 2,
    type: "js",
    configYaml: `name: STranslate 翻译
identifier: com.flyclip.extension.stranslate
icon: ST
platforms: [windows] # 标记 Windows 专属，WebDAV 多端同步自动静默适配
options:
  - identifier: trigger_mode
    label: 唤起方式
    type: multiple
    values: [http, cli]
    default value: http
  - identifier: port
    label: 本地端口
    type: string
    default value: "50020"
actions:
  - title: STranslate
    javascript: |
      const text = flyclip.input.text.trim();
      const mode = flyclip.options.trigger_mode || "http";
      const port = flyclip.options.port || "50020";
      if (mode === "http") {
        await flyclip.fetch(\`http://127.0.0.1:\${port}/text?content=\${encodeURIComponent(text)}\`);
      } else {
        flyclip.run("stranslate", ["-t", text]);
      }
    requirements: [text]`
  },

  // --- Translation & Dictionary ---
  {
    id: "com.flyclip.extension.google-translate",
    name: "Google Translate",
    nameZh: "Google 翻译",
    nameEn: "Google Translate",
    category: "translation",
    icon: "GT",
    description: "Translate selected text with Google Translate worldwide.",
    descriptionZh: "使用 Google 翻译选中文本，支持多站点切换与目标语言设定。",
    hasOptions: true,
    optionsCount: 2,
    type: "url",
    configYaml: `name: Google Translate
identifier: com.flyclip.extension.google-translate
description: Translate selected text with Google Translate
icon: iconify:simple-icons:googletranslate
options:
  - identifier: site
    label: 翻译站点
    type: multiple
    values:
      - translate.google.com
      - translate.google.cn
      - translate.google.com.hk
    default value: translate.google.com
  - identifier: target_lang
    label: 目标语言
    type: multiple
    values: [zh-CN, en, ja, ko, fr, de, es, ru]
    default value: zh-CN
actions:
  - title: Google Translate
    url: https://{flyclip option site}/?sl=auto&tl={flyclip option target_lang}&text={flyclip text}&op=translate
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.deepl-translate",
    name: "DeepL Translate",
    nameZh: "DeepL 翻译",
    nameEn: "DeepL Translate",
    category: "translation",
    icon: "DL",
    description: "High-accuracy neural machine translation with DeepL.",
    descriptionZh: "使用 DeepL 神经网络高质量翻译选中文本。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: DeepL Translate
identifier: com.flyclip.extension.deepl-translate
icon: iconify:simple-icons:deepl
options:
  - identifier: target_lang
    label: 目标语言
    type: multiple
    values: [zh, en, ja, de, fr, es, ru, ko]
    default value: zh
actions:
  - title: DeepL
    url: https://www.deepl.com/translator#auto/{flyclip option target_lang}/{flyclip text}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.baidu-translate",
    name: "百度翻译",
    nameZh: "百度翻译",
    nameEn: "Baidu Translate",
    category: "translation",
    icon: "百翻",
    description: "Translate text with Baidu Translate.",
    descriptionZh: "使用百度翻译引擎翻译选中文本。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: Baidu Translate
identifier: com.flyclip.extension.baidu-translate
icon: iconify:simple-icons:baidu
options:
  - identifier: target_lang
    label: 目标语言
    type: multiple
    values: [zh, en, jp, kor, fra, de, spa, ru]
    default value: zh
actions:
  - title: 百度翻译
    url: https://fanyi.baidu.com/#auto/{flyclip option target_lang}/{flyclip text}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.youdao-dict",
    name: "有道词典",
    nameZh: "有道词典",
    nameEn: "Youdao Dictionary",
    category: "translation",
    icon: "有道",
    description: "Look up words in Youdao Dictionary.",
    descriptionZh: "有道词典划词查词与权威翻译释义。",
    hasOptions: false,
    type: "url",
    configYaml: `name: Youdao Dictionary
identifier: com.flyclip.extension.youdao-dict
icon: 有道
actions:
  - title: 有道词典
    url: https://dict.youdao.com/search?q={flyclip text}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.wikipedia",
    name: "Wikipedia",
    nameZh: "维基百科",
    nameEn: "Wikipedia",
    category: "translation",
    icon: "W",
    description: "Search Wikipedia encyclopedia in multiple languages.",
    descriptionZh: "在维基百科中搜索选中文本词条。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: Wikipedia
identifier: com.flyclip.extension.wikipedia
icon: iconify:simple-icons:wikipedia
options:
  - identifier: lang
    label: 语言版本
    type: multiple
    values: [zh, en, ja, de, fr, es, ru]
    default value: zh
actions:
  - title: Wikipedia
    url: https://{flyclip option lang}.wikipedia.org/wiki/{flyclip text}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.mdn-web-docs",
    name: "MDN Web Docs",
    nameZh: "MDN 开发者文档",
    nameEn: "MDN Web Docs",
    category: "translation",
    icon: "MDN",
    description: "Search web APIs, HTML, CSS, and JS reference docs on MDN.",
    descriptionZh: "搜索 MDN Web Docs 权威开发者文档与 API 规范。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: MDN Web Docs
identifier: com.flyclip.extension.mdn-web-docs
icon: MDN
options:
  - identifier: locale
    label: 文档语言
    type: multiple
    values: [zh-CN, en-US, ja, fr, es]
    default value: zh-CN
actions:
  - title: MDN
    url: https://developer.mozilla.org/{flyclip option locale}/search?q={flyclip text}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.urban-dictionary",
    name: "Urban Dictionary",
    nameZh: "Urban 俚语词典",
    nameEn: "Urban Dictionary",
    category: "translation",
    icon: "UD",
    description: "Look up slang and idioms on Urban Dictionary.",
    descriptionZh: "在 Urban Dictionary 查询英语流行俚语与俗语含义。",
    hasOptions: false,
    type: "url",
    configYaml: `name: Urban Dictionary
identifier: com.flyclip.extension.urban-dictionary
icon: UD
actions:
  - title: Urban Dict
    url: https://www.urbandictionary.com/define.php?term={flyclip text}
    requirements: [text]`
  },

  // --- Search & AI ---
  {
    id: "com.flyclip.extension.google-search",
    name: "Google Search",
    nameZh: "Google 搜索",
    nameEn: "Google Search",
    category: "search_ai",
    icon: "G",
    description: "Search the web with Google Search.",
    descriptionZh: "使用 Google 搜索选中的关键词。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: Google Search
identifier: com.flyclip.extension.google-search
icon: iconify:simple-icons:google
options:
  - identifier: site
    label: 搜索域名
    type: multiple
    values: [google.com, google.com.hk, google.co.jp, google.co.uk]
    default value: google.com
actions:
  - title: Google
    url: https://www.{flyclip option site}/search?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.baidu-search",
    name: "百度搜索",
    nameZh: "百度搜索",
    nameEn: "Baidu Search",
    category: "search_ai",
    icon: "百度",
    description: "Search with Baidu Search Engine.",
    descriptionZh: "使用百度搜索选中的关键词。",
    hasOptions: false,
    type: "url",
    configYaml: `name: 百度搜索
identifier: com.flyclip.extension.baidu-search
icon: iconify:simple-icons:baidu
actions:
  - title: 百度
    url: https://www.baidu.com/s?wd=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.bing-search",
    name: "Bing Search",
    nameZh: "必应搜索",
    nameEn: "Bing Search",
    category: "search_ai",
    icon: "Bing",
    description: "Search with Microsoft Bing.",
    descriptionZh: "使用微软必应 Bing 搜索选中文本。",
    hasOptions: false,
    type: "url",
    configYaml: `name: Bing Search
identifier: com.flyclip.extension.bing-search
icon: iconify:simple-icons:microsoftbing
actions:
  - title: Bing
    url: https://www.bing.com/search?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.duckduckgo",
    name: "DuckDuckGo",
    nameZh: "DuckDuckGo",
    nameEn: "DuckDuckGo",
    category: "search_ai",
    icon: "DDG",
    description: "Privacy search with DuckDuckGo.",
    descriptionZh: "使用 DuckDuckGo 隐私无追踪搜索引擎。",
    hasOptions: false,
    type: "url",
    configYaml: `name: DuckDuckGo
identifier: com.flyclip.extension.duckduckgo
icon: iconify:simple-icons:duckduckgo
actions:
  - title: DDG
    url: https://duckduckgo.com/?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.github-search",
    name: "GitHub Search",
    nameZh: "GitHub 搜索",
    nameEn: "GitHub Search",
    category: "search_ai",
    icon: "GH",
    description: "Search repositories, code, and issues on GitHub.",
    descriptionZh: "在 GitHub 搜索开源仓库、源码片段或 Issue 问题。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: GitHub Search
identifier: com.flyclip.extension.github-search
icon: iconify:simple-icons:github
options:
  - identifier: search_type
    label: 搜索类型
    type: multiple
    values: [repositories, code, issues, commits, users]
    default value: repositories
actions:
  - title: GitHub
    url: https://github.com/search?q={flyclip text}&type={flyclip option search_type}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.chatgpt",
    name: "ChatGPT",
    nameZh: "ChatGPT",
    nameEn: "ChatGPT",
    category: "search_ai",
    icon: "GPT",
    description: "Ask ChatGPT or analyze text with OpenAI.",
    descriptionZh: "快速将选中文本发送给 ChatGPT 进行提问或智能分析。",
    hasOptions: false,
    type: "url",
    configYaml: `name: ChatGPT
identifier: com.flyclip.extension.chatgpt
icon: iconify:simple-icons:openai
actions:
  - title: ChatGPT
    url: https://chatgpt.com/?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.claude",
    name: "Claude",
    nameZh: "Claude",
    nameEn: "Claude",
    category: "search_ai",
    icon: "Claude",
    description: "Send selected text to Anthropic Claude AI.",
    descriptionZh: "发送选中文本给 Anthropic Claude 对话交互。",
    hasOptions: false,
    type: "url",
    configYaml: `name: Claude
identifier: com.flyclip.extension.claude
icon: iconify:simple-icons:anthropic
actions:
  - title: Claude
    url: https://claude.ai/new?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.deepseek",
    name: "DeepSeek",
    nameZh: "DeepSeek 深度求索",
    nameEn: "DeepSeek",
    category: "search_ai",
    icon: "DS",
    description: "Ask DeepSeek AI with selected text.",
    descriptionZh: "发送选中文本给 DeepSeek 深度求索 AI 助手分析。",
    hasOptions: false,
    type: "url",
    configYaml: `name: DeepSeek
identifier: com.flyclip.extension.deepseek
icon: DS
actions:
  - title: DeepSeek
    url: https://chat.deepseek.com/?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.zhihu-search",
    name: "知乎搜索",
    nameZh: "知乎搜索",
    nameEn: "Zhihu Search",
    category: "search_ai",
    icon: "知",
    description: "Search questions and discussions on Zhihu.",
    descriptionZh: "在知乎搜索相关问题、高赞回答与专栏文章。",
    hasOptions: false,
    type: "url",
    configYaml: `name: 知乎搜索
identifier: com.flyclip.extension.zhihu-search
icon: iconify:simple-icons:zhihu
actions:
  - title: 知乎
    url: https://www.zhihu.com/search?type=content&q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.bilibili-search",
    name: "哔哩哔哩",
    nameZh: "哔哩哔哩",
    nameEn: "Bilibili Search",
    category: "search_ai",
    icon: "B站",
    description: "Search anime, tutorials, and creators on Bilibili.",
    descriptionZh: "在哔哩哔哩搜索精选视频、教程与UP主。",
    hasOptions: false,
    type: "url",
    configYaml: `name: 哔哩哔哩
identifier: com.flyclip.extension.bilibili-search
icon: iconify:simple-icons:bilibili
actions:
  - title: 哔哩哔哩
    url: https://search.bilibili.com/all?keyword=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.youtube-search",
    name: "YouTube",
    nameZh: "YouTube",
    nameEn: "YouTube Search",
    category: "search_ai",
    icon: "YT",
    description: "Search videos on YouTube.",
    descriptionZh: "在 YouTube 上搜索全球精彩视频。",
    hasOptions: false,
    type: "url",
    configYaml: `name: YouTube
identifier: com.flyclip.extension.youtube-search
icon: iconify:simple-icons:youtube
actions:
  - title: YouTube
    url: https://www.youtube.com/results?search_query=***
    requirements: [text]`
  },

  // --- Text Tools (JavaScript / Native) ---
  {
    id: "com.flyclip.extension.case-converter",
    name: "Case Converter",
    nameZh: "大小写转换",
    nameEn: "Case Converter",
    category: "text_tools",
    icon: "Aa",
    description: "Convert text between UPPER, lower, Title, camelCase, snake_case, kebab-case.",
    descriptionZh: "全能大小写命名风格转换（大写/小写/词首/小驼峰/下划线/连字符）。",
    hasOptions: false,
    type: "js",
    configYaml: `name: Case Converter
identifier: com.flyclip.extension.case-converter
icon: Aa
actions:
  - title: 大写 (UPPER)
    javascript: return flyclip.input.text.toUpperCase();
    after: paste-result
  - title: 小写 (lower)
    javascript: return flyclip.input.text.toLowerCase();
    after: paste-result
  - title: 词首大写 (Title)
    javascript: return flyclip.input.text.replace(/\\w\\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
    after: paste-result
  - title: 驼峰 (camelCase)
    javascript: |
      const words = flyclip.input.text.split(/[^a-zA-Z0-9]+/).filter(Boolean);
      if (words.length === 0) return flyclip.input.text;
      const first = words[0].toLowerCase();
      const rest = words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
      return first + rest;
    after: paste-result
  - title: 下划线 (snake_case)
    javascript: |
      return flyclip.input.text
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toLowerCase();
    after: paste-result
  - title: 连字符 (kebab-case)
    javascript: |
      return flyclip.input.text
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.base64",
    name: "Base64",
    nameZh: "Base64 编解码",
    nameEn: "Base64",
    category: "text_tools",
    icon: "B64",
    description: "Encode or decode Base64 strings with optional URL-safe mode.",
    descriptionZh: "Base64 快速编码与解码，支持 URL 安全模式开关。",
    hasOptions: true,
    optionsCount: 1,
    type: "js",
    configYaml: `name: Base64
identifier: com.flyclip.extension.base64
icon: B64
options:
  - identifier: url_safe
    label: URL 安全模式 (- 和 _)
    type: boolean
    default value: false
actions:
  - title: Base64 编码
    javascript: |
      const str = flyclip.input.text;
      let b64 = btoa(unescape(encodeURIComponent(str)));
      if (flyclip.options.url_safe === "1" || flyclip.options.url_safe === true) {
        b64 = b64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
      }
      return b64;
    after: paste-result
  - title: Base64 解码
    javascript: |
      let s = flyclip.input.text.trim();
      if (flyclip.options.url_safe === "1" || flyclip.options.url_safe === true) {
        s = s.replace(/-/g, '+').replace(/_/g, '/');
        while (s.length % 4 !== 0) { s += '='; }
      }
      try {
        return decodeURIComponent(escape(atob(s)));
      } catch (e) {
        return "[Base64 解码错误: 格式不合法]";
      }
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.url-encode",
    name: "URL Encode",
    nameZh: "URL 编解码",
    nameEn: "URL Encode",
    category: "text_tools",
    icon: "%20",
    description: "Percent-encode and decode URL parameters.",
    descriptionZh: "URL 百分号编码与反向解码。",
    hasOptions: false,
    type: "js",
    configYaml: `name: URL Encode
identifier: com.flyclip.extension.url-encode
icon: "%20"
actions:
  - title: URL 编码
    javascript: return encodeURIComponent(flyclip.input.text);
    after: paste-result
  - title: URL 解码
    javascript: |
      try {
        return decodeURIComponent(flyclip.input.text);
      } catch (e) {
        return flyclip.input.text;
      }
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.html-encode",
    name: "HTML Encode",
    nameZh: "HTML 实体转义",
    nameEn: "HTML Encode",
    category: "text_tools",
    icon: "<&>",
    description: "Encode or decode HTML special character entities.",
    descriptionZh: "HTML 特殊实体符号转义与反转义。",
    hasOptions: false,
    type: "js",
    configYaml: `name: HTML Encode
identifier: com.flyclip.extension.html-encode
icon: "<&>"
actions:
  - title: HTML 转义
    javascript: |
      return flyclip.input.text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    after: paste-result
  - title: HTML 反转义
    javascript: |
      return flyclip.input.text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'");
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.json-formatter",
    name: "JSON Formatter",
    nameZh: "JSON 格式化",
    nameEn: "JSON Formatter",
    category: "text_tools",
    icon: "{}",
    description: "Prettify or minify JSON text in place.",
    descriptionZh: "JSON 格式化美化排版或单行压缩。",
    hasOptions: false,
    type: "js",
    configYaml: `name: JSON Formatter
identifier: com.flyclip.extension.json-formatter
icon: "{}"
actions:
  - title: 格式化 JSON
    javascript: |
      try {
        const obj = JSON.parse(flyclip.input.text);
        return JSON.stringify(obj, null, 2);
      } catch (e) {
        return "[JSON 解析失败: 语法格式有误]";
      }
    after: paste-result
  - title: 压缩 JSON
    javascript: |
      try {
        const obj = JSON.parse(flyclip.input.text);
        return JSON.stringify(obj);
      } catch (e) {
        return "[JSON 解析失败: 语法格式有误]";
      }
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.text-statistics",
    name: "Text Statistics",
    nameZh: "字数与文本统计",
    nameEn: "Text Statistics",
    category: "text_tools",
    icon: "123",
    description: "Count characters, words, lines, and bytes in selected text.",
    descriptionZh: "实时统计字符数、词数、行数与字节大小并展示于提示栏。",
    hasOptions: false,
    type: "js",
    configYaml: `name: Text Statistics
identifier: com.flyclip.extension.text-statistics
icon: "123"
actions:
  - title: 字数统计
    javascript: |
      const t = flyclip.input.text;
      const chars = t.length;
      const words = (t.match(/\\S+/g) || []).length;
      const lines = t.split(/\\r\\n|\\r|\\n/).length;
      const bytes = new TextEncoder().encode(t).length;
      return \`\${chars} 字符 · \${words} 词 · \${lines} 行 · \${bytes} B\`;
    after: show-result`
  },
  {
    id: "com.flyclip.extension.sort-lines",
    name: "Sort Lines",
    nameZh: "文本行排序与去重",
    nameEn: "Sort Lines",
    category: "text_tools",
    icon: "AZ",
    description: "Sort lines ascending, descending, or remove duplicate lines.",
    descriptionZh: "多行文本升序、降序排序与行去重。",
    hasOptions: true,
    optionsCount: 1,
    type: "js",
    configYaml: `name: Sort Lines
identifier: com.flyclip.extension.sort-lines
icon: AZ
options:
  - identifier: case_sensitive
    label: 区分大小写
    type: boolean
    default value: false
actions:
  - title: 升序排序 (A-Z)
    javascript: |
      const cs = flyclip.options.case_sensitive === "1" || flyclip.options.case_sensitive === true;
      const lines = flyclip.input.text.split(/\\r\\n|\\r|\\n/);
      lines.sort((a, b) => cs ? a.localeCompare(b, undefined, { sensitivity: 'case' }) : a.localeCompare(b));
      return lines.join("\\n");
    after: paste-result
  - title: 降序排序 (Z-A)
    javascript: |
      const cs = flyclip.options.case_sensitive === "1" || flyclip.options.case_sensitive === true;
      const lines = flyclip.input.text.split(/\\r\\n|\\r|\\n/);
      lines.sort((a, b) => cs ? b.localeCompare(a, undefined, { sensitivity: 'case' }) : b.localeCompare(a));
      return lines.join("\\n");
    after: paste-result
  - title: 行去重 (Unique)
    javascript: |
      const cs = flyclip.options.case_sensitive === "1" || flyclip.options.case_sensitive === true;
      const lines = flyclip.input.text.split(/\\r\\n|\\r|\\n/);
      if (cs) {
        return Array.from(new Set(lines)).join("\\n");
      } else {
        const seen = new Set();
        const result = [];
        for (const line of lines) {
          const lower = line.toLowerCase();
          if (!seen.has(lower)) { seen.add(lower); result.push(line); }
        }
        return result.join("\\n");
      }
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.join-lines",
    name: "Join Lines",
    nameZh: "多行合并为单行",
    nameEn: "Join Lines",
    category: "text_tools",
    icon: "->",
    description: "Join multi-line text into a single line with custom delimiters.",
    descriptionZh: "多行合并为单行，支持指定逗号、空格、分号等分隔符。",
    hasOptions: true,
    optionsCount: 1,
    type: "js",
    configYaml: `name: Join Lines
identifier: com.flyclip.extension.join-lines
icon: ->
options:
  - identifier: delimiter
    label: 分隔符
    type: multiple
    values: [comma_space, comma, space, semicolon]
    default value: comma_space
actions:
  - title: 合并单行
    javascript: |
      const lines = flyclip.input.text.split(/\\r\\n|\\r|\\n/).filter(l => l.trim().length > 0);
      const delimMap = { comma: ",", space: " ", semicolon: "; ", comma_space: ", " };
      const delim = delimMap[flyclip.options.delimiter] || ", ";
      return lines.join(delim);
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.remove-spaces",
    name: "Remove Spaces",
    nameZh: "清除多余空格",
    nameEn: "Remove Spaces",
    category: "text_tools",
    icon: "␣",
    description: "Collapse duplicate spaces or strip all whitespace characters.",
    descriptionZh: "消除所有多余空格或压缩连续空白字符。",
    hasOptions: false,
    type: "js",
    configYaml: `name: Remove Spaces
identifier: com.flyclip.extension.remove-spaces
icon: "␣"
actions:
  - title: 压缩空格
    javascript: return flyclip.input.text.replace(/\\s+/g, ' ').trim();
    after: paste-result
  - title: 消除所有空格
    javascript: return flyclip.input.text.replace(/\\s+/g, '');
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.full-half-width",
    name: "全角半角转换",
    nameZh: "全角半角转换",
    nameEn: "Full/Half Width",
    category: "text_tools",
    icon: "全半",
    description: "Convert between Full-width and Half-width characters.",
    descriptionZh: "全角标点字符与半角英文字符双向转换。",
    hasOptions: false,
    type: "js",
    configYaml: `name: 全角半角转换
identifier: com.flyclip.extension.full-half-width
icon: 全半
actions:
  - title: 全角转半角
    javascript: |
      let str = "";
      for (let i = 0; i < flyclip.input.text.length; i++) {
        let code = flyclip.input.text.charCodeAt(i);
        if (code === 12288) str += String.fromCharCode(32);
        else if (code >= 65281 && code <= 65374) str += String.fromCharCode(code - 65248);
        else str += flyclip.input.text[i];
      }
      return str;
    after: paste-result
  - title: 半角转全角
    javascript: |
      let str = "";
      for (let i = 0; i < flyclip.input.text.length; i++) {
        let code = flyclip.input.text.charCodeAt(i);
        if (code === 32) str += String.fromCharCode(12288);
        else if (code >= 33 && code <= 126) str += String.fromCharCode(code + 65248);
        else str += flyclip.input.text[i];
      }
      return str;
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.timestamp-converter",
    name: "Timestamp Converter",
    nameZh: "时间戳转换",
    nameEn: "Timestamp Converter",
    category: "text_tools",
    icon: "⏱️",
    description: "Convert Unix epoch timestamps to local date-time strings.",
    descriptionZh: "Unix 时间戳转换为本地日期时间，或获取当前秒级时间戳。",
    hasOptions: false,
    type: "js",
    configYaml: `name: Timestamp Converter
identifier: com.flyclip.extension.timestamp-converter
icon: ⏱️
actions:
  - title: 转日期
    javascript: |
      const s = flyclip.input.text.trim();
      if (/^\\d{10}$/.test(s)) {
        const d = new Date(parseInt(s, 10) * 1000);
        return d.getFullYear() + '-' +
          String(d.getMonth() + 1).padStart(2, '0') + '-' +
          String(d.getDate()).padStart(2, '0') + ' ' +
          String(d.getHours()).padStart(2, '0') + ':' +
          String(d.getMinutes()).padStart(2, '0') + ':' +
          String(d.getSeconds()).padStart(2, '0');
      } else if (/^\\d{13}$/.test(s)) {
        const d = new Date(parseInt(s, 10));
        return d.getFullYear() + '-' +
          String(d.getMonth() + 1).padStart(2, '0') + '-' +
          String(d.getDate()).padStart(2, '0') + ' ' +
          String(d.getHours()).padStart(2, '0') + ':' +
          String(d.getMinutes()).padStart(2, '0') + ':' +
          String(d.getSeconds()).padStart(2, '0') + '.' +
          String(d.getMilliseconds()).padStart(3, '0');
      } else {
        return "[无效的时间戳: 需为 10 位秒级或 13 位毫秒级数字]";
      }
    after: paste-result
  - title: 当前时间戳
    javascript: return Math.floor(Date.now() / 1000).toString();
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.markdown-tools",
    name: "Markdown Tools",
    nameZh: "Markdown 格式化",
    nameEn: "Markdown Tools",
    category: "text_tools",
    icon: "MD",
    description: "Wrap text in Markdown bold, inline code, code blocks, or blockquotes.",
    descriptionZh: "快速为选中文本添加 Markdown 粗体、行内代码、代码块或引用标记。",
    hasOptions: false,
    type: "js",
    configYaml: `name: Markdown Tools
identifier: com.flyclip.extension.markdown-tools
icon: MD
actions:
  - title: 粗体
    javascript: return \`**\${flyclip.input.text}**\`;
    after: paste-result
  - title: 行内代码
    javascript: return \`\\\`\${flyclip.input.text}\\\`\`;
    after: paste-result
  - title: 引用
    javascript: |
      return flyclip.input.text
        .split(/\\r\\n|\\r|\\n/)
        .map(line => \`> \${line}\`)
        .join("\\n");
    after: paste-result`
  },

  // --- Developer Tools ---
  {
    id: "com.flyclip.extension.calculate",
    name: "Calculate",
    nameZh: "即时数学计算",
    nameEn: "Calculate",
    category: "developer",
    icon: "=?",
    description: "Evaluate math expressions instantly (e.g. 128*1024, (50+20)/3).",
    descriptionZh: "即时计算选中的数学表达式并显示结果。",
    hasOptions: false,
    type: "js",
    configYaml: `name: Calculate
identifier: com.flyclip.extension.calculate
icon: "=?"
actions:
  - title: 计算结果
    javascript: |
      const expr = flyclip.input.text.trim();
      try {
        const res = Function(\`'use strict'; return (\${expr})\`)();
        return \`\${expr} = \${res}\`;
      } catch (e) {
        return "[计算出错: 表达式无效]";
      }
    after: show-result`
  },
  {
    id: "com.flyclip.extension.regex101",
    name: "Regex101",
    nameZh: "Regex101 正则测试",
    nameEn: "Regex101",
    category: "developer",
    icon: ".*",
    description: "Test and debug regular expressions in Regex101.",
    descriptionZh: "在 Regex101 中测试并分析正则表达式。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: Regex101
identifier: com.flyclip.extension.regex101
icon: ".*"
options:
  - identifier: flavor
    label: 正则引擎
    type: multiple
    values: [pcre2, javascript, python, golang, rust]
    default value: pcre2
actions:
  - title: Regex101
    url: https://regex101.com/?regex={flyclip text}&flavor={flyclip option flavor}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.ip-lookup",
    name: "IP Lookup",
    nameZh: "IP 归属地查询",
    nameEn: "IP Lookup",
    category: "developer",
    icon: "IP",
    description: "Query IP address geolocation and WHOIS info.",
    descriptionZh: "查询 IP 地址的地理位置、归属地与网络 ASN 信息。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: IP Lookup
identifier: com.flyclip.extension.ip-lookup
icon: IP
actions:
  - title: IP 查询
    url: https://ipinfo.io/{flyclip text}
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.hash-generator",
    name: "Hash Generator",
    nameZh: "哈希值计算",
    nameEn: "Hash Generator",
    category: "developer",
    icon: "#",
    description: "Calculate MD5 and SHA-256 hashes of selected text.",
    descriptionZh: "快速计算文本的 MD5 与 SHA-256 哈希值。",
    hasOptions: true,
    optionsCount: 1,
    type: "powershell",
    configYaml: `name: Hash Generator
identifier: com.flyclip.extension.hash-generator
icon: "#"
options:
  - identifier: uppercase
    label: 大写十六进制
    type: boolean
    default value: false
actions:
  - title: MD5
    shell script: |
      $bytes = [System.Text.Encoding]::UTF8.GetBytes($env:FLYCLIP_TEXT)
      $md5 = [System.Security.Cryptography.MD5]::Create().ComputeHash($bytes)
      $hex = [BitConverter]::ToString($md5).Replace('-','')
      if ($env:FLYCLIP_OPTION_UPPERCASE -ne "1") { $hex = $hex.ToLower() }
      Write-Host -NoNewline $hex
    after: paste-result
  - title: SHA256
    shell script: |
      $bytes = [System.Text.Encoding]::UTF8.GetBytes($env:FLYCLIP_TEXT)
      $sha = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
      $hex = [BitConverter]::ToString($sha).Replace('-','')
      if ($env:FLYCLIP_OPTION_UPPERCASE -ne "1") { $hex = $hex.ToLower() }
      Write-Host -NoNewline $hex
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.iconify-search",
    name: "Iconify Icons",
    nameZh: "Iconify 矢量图标",
    nameEn: "Iconify Icons",
    category: "developer",
    icon: "Icon",
    description: "Search 200,000+ open source vector icons on Iconify.",
    descriptionZh: "在 Iconify 搜索超过 20 万个开源矢量图标与 SVG 代码。",
    hasOptions: false,
    type: "url",
    configYaml: `name: Iconify Search
identifier: com.flyclip.extension.iconify-search
icon: iconify:simple-icons:iconify
actions:
  - title: Iconify
    url: https://icon-sets.iconify.design/?query=***
    requirements: [text]`
  },

  // --- Shopping & Media ---
  {
    id: "com.flyclip.extension.jd-search",
    name: "京东搜索",
    nameZh: "京东搜索",
    nameEn: "JD Search",
    category: "shopping",
    icon: "JD",
    description: "Search products on JD.com.",
    descriptionZh: "在京东商城搜索选中的商品与数码好物。",
    hasOptions: false,
    type: "url",
    configYaml: `name: 京东搜索
identifier: com.flyclip.extension.jd-search
icon: iconify:simple-icons:jd
actions:
  - title: 京东
    url: https://search.jd.com/Search?keyword=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.taobao-search",
    name: "淘宝搜索",
    nameZh: "淘宝搜索",
    nameEn: "Taobao Search",
    category: "shopping",
    icon: "淘",
    description: "Search items and deals on Taobao.",
    descriptionZh: "在淘宝网搜索选中的商品宝贝与优惠。",
    hasOptions: false,
    type: "url",
    configYaml: `name: 淘宝搜索
identifier: com.flyclip.extension.taobao-search
icon: iconify:simple-icons:taobao
actions:
  - title: 淘宝
    url: https://s.taobao.com/search?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.douban-search",
    name: "豆瓣搜索",
    nameZh: "豆瓣搜索",
    nameEn: "Douban Search",
    category: "shopping",
    icon: "豆",
    description: "Search movies, books, and music on Douban.",
    descriptionZh: "在豆瓣搜索高分电影、热门图书与音乐条目。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: 豆瓣搜索
identifier: com.flyclip.extension.douban-search
icon: iconify:simple-icons:douban
options:
  - identifier: cat
    label: 搜索分类
    type: multiple
    values: ["1001", "1002", "1003"]
    default value: "1001"
actions:
  - title: 豆瓣
    url: https://www.douban.com/search?cat={flyclip option cat}&q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.imdb",
    name: "IMDb",
    nameZh: "IMDb 影视资料",
    nameEn: "IMDb",
    category: "shopping",
    icon: "IMDb",
    description: "Search movies, TV shows, and cast on IMDb.",
    descriptionZh: "在 IMDb 数据库搜索电影、剧集与演员资料。",
    hasOptions: false,
    type: "url",
    configYaml: `name: IMDb
identifier: com.flyclip.extension.imdb
icon: iconify:simple-icons:imdb
actions:
  - title: IMDb
    url: https://www.imdb.com/find?q=***
    requirements: [text]`
  },
  {
    id: "com.flyclip.extension.amazon",
    name: "Amazon",
    nameZh: "亚马逊商城",
    nameEn: "Amazon",
    category: "shopping",
    icon: "Amz",
    description: "Search Amazon worldwide with site selection.",
    descriptionZh: "在全球 Amazon 亚马逊商城（美/中/日/英/德）搜索商品。",
    hasOptions: true,
    optionsCount: 1,
    type: "url",
    configYaml: `name: Amazon
identifier: com.flyclip.extension.amazon
icon: iconify:simple-icons:amazon
options:
  - identifier: site
    label: 亚马逊商城站点
    type: multiple
    values: [amazon.com, amazon.cn, amazon.co.jp, amazon.co.uk, amazon.de]
    default value: amazon.com
actions:
  - title: Amazon
    url: https://www.{flyclip option site}/s?k=***
    spaces as plus: true
    requirements: [text]`
  }
];
