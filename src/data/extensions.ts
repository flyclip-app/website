export interface ExtensionItem {
  id: string;
  name: string;
  category: 'translation' | 'search_ai' | 'text_tools' | 'developer' | 'shopping';
  icon: string;
  description: string;
  descriptionZh: string;
  hasOptions: boolean;
  optionsCount?: number;
  type: 'url' | 'powershell' | 'keys';
  configYaml: string;
}

export const EXTENSIONS_DATA: ExtensionItem[] = [
  // --- Translation & Dictionary ---
  {
    id: "com.flyclip.extension.google-translate",
    name: "Google Translate",
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

  // --- Text Tools (PowerShell / Native) ---
  {
    id: "com.flyclip.extension.case-converter",
    name: "Case Converter",
    category: "text_tools",
    icon: "Aa",
    description: "Convert text between UPPER, lower, Title, camelCase, snake_case, kebab-case.",
    descriptionZh: "全能大小写命名风格转换（大写/小写/词首/小驼峰/下划线/连字符）。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: Case Converter
identifier: com.flyclip.extension.case-converter
icon: Aa
actions:
  - title: 大写 (UPPER)
    shell script: Write-Host -NoNewline $env:FLYCLIP_TEXT.ToUpper()
    after: paste-result
  - title: 小写 (lower)
    shell script: Write-Host -NoNewline $env:FLYCLIP_TEXT.ToLower()
    after: paste-result
  - title: 驼峰 (camelCase)
    shell script: |
      $words = [regex]::Split($env:FLYCLIP_TEXT, '[^a-zA-Z0-9]+') | Where-Object { $_ }
      $first = $words[0].ToLower()
      $rest = $words | Select-Object -Skip 1 | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower() }
      Write-Host -NoNewline ($first + ($rest -join ''))
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.base64",
    name: "Base64",
    category: "text_tools",
    icon: "B64",
    description: "Encode or decode Base64 strings with optional URL-safe mode.",
    descriptionZh: "Base64 快速编码与解码，支持 URL 安全模式开关。",
    hasOptions: true,
    optionsCount: 1,
    type: "powershell",
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
    shell script: |
      $bytes = [System.Text.Encoding]::UTF8.GetBytes($env:FLYCLIP_TEXT)
      $b64 = [Convert]::ToBase64String($bytes)
      if ($env:FLYCLIP_OPTION_URL_SAFE -eq "1") { $b64 = $b64.Replace('+','-').Replace('/','_').TrimEnd('=') }
      Write-Host -NoNewline $b64
    after: paste-result
  - title: Base64 解码
    shell script: |
      $s = $env:FLYCLIP_TEXT.Trim()
      if ($env:FLYCLIP_OPTION_URL_SAFE -eq "1") { $s = $s.Replace('-','+').Replace('_','/') }
      Write-Host -NoNewline ([System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($s)))
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.url-encode",
    name: "URL Encode",
    category: "text_tools",
    icon: "%20",
    description: "Percent-encode and decode URL parameters.",
    descriptionZh: "URL 百分号编码与反向解码。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: URL Encode
identifier: com.flyclip.extension.url-encode
icon: "%20"
actions:
  - title: URL 编码
    shell script: Write-Host -NoNewline ([System.Uri]::EscapeDataString($env:FLYCLIP_TEXT))
    after: paste-result
  - title: URL 解码
    shell script: Write-Host -NoNewline ([System.Uri]::UnescapeDataString($env:FLYCLIP_TEXT))
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.html-encode",
    name: "HTML Encode",
    category: "text_tools",
    icon: "<&>",
    description: "Encode or decode HTML special character entities.",
    descriptionZh: "HTML 特殊实体符号转义与反转义。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: HTML Encode
identifier: com.flyclip.extension.html-encode
icon: "<&>"
actions:
  - title: HTML 转义
    shell script: Write-Host -NoNewline ([System.Net.WebUtility]::HtmlEncode($env:FLYCLIP_TEXT))
    after: paste-result
  - title: HTML 反转义
    shell script: Write-Host -NoNewline ([System.Net.WebUtility]::HtmlDecode($env:FLYCLIP_TEXT))
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.json-formatter",
    name: "JSON Formatter",
    category: "text_tools",
    icon: "{}",
    description: "Prettify or minify JSON text in place.",
    descriptionZh: "JSON 格式化美化排版或单行压缩。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: JSON Formatter
identifier: com.flyclip.extension.json-formatter
icon: "{}"
actions:
  - title: 格式化 JSON
    shell script: |
      $obj = $env:FLYCLIP_TEXT | ConvertFrom-Json
      Write-Host -NoNewline ($obj | ConvertTo-Json -Depth 100)
    after: paste-result
  - title: 压缩 JSON
    shell script: |
      $obj = $env:FLYCLIP_TEXT | ConvertFrom-Json
      Write-Host -NoNewline ($obj | ConvertTo-Json -Compress -Depth 100)
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.text-statistics",
    name: "Text Statistics",
    category: "text_tools",
    icon: "123",
    description: "Count characters, words, lines, and bytes in selected text.",
    descriptionZh: "实时统计字符数、词数、行数与字节大小并展示于提示栏。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: Text Statistics
identifier: com.flyclip.extension.text-statistics
icon: "123"
actions:
  - title: 字数统计
    shell script: |
      $t = $env:FLYCLIP_TEXT
      $chars = $t.Length
      $lines = ($t -split "\`r\`n|\`r|\`n").Length
      $words = ($t -split '\s+' | Where-Object { $_ }).Length
      $bytes = [System.Text.Encoding]::UTF8.GetByteCount($t)
      Write-Host -NoNewline "$chars 字符 · $words 词 · $lines 行 · $bytes B"
    after: show-result`
  },
  {
    id: "com.flyclip.extension.sort-lines",
    name: "Sort Lines",
    category: "text_tools",
    icon: "AZ",
    description: "Sort lines ascending, descending, or remove duplicate lines.",
    descriptionZh: "多行文本升序、降序排序与行去重。",
    hasOptions: true,
    optionsCount: 1,
    type: "powershell",
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
    shell script: |
      $lines = $env:FLYCLIP_TEXT -split "\`r\`n|\`r|\`n"
      Write-Host -NoNewline (($lines | Sort-Object) -join "\`r\`n")
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.join-lines",
    name: "Join Lines",
    category: "text_tools",
    icon: "->",
    description: "Join multi-line text into a single line with custom delimiters.",
    descriptionZh: "多行合并为单行，支持指定逗号、空格、分号等分隔符。",
    hasOptions: true,
    optionsCount: 1,
    type: "powershell",
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
    shell script: |
      $lines = $env:FLYCLIP_TEXT -split "\`r\`n|\`r|\`n" | Where-Object { $_.Trim() }
      $delim = switch ($env:FLYCLIP_OPTION_DELIMITER) { "comma" {","} "space" {" "} default {", "} }
      Write-Host -NoNewline ($lines -join $delim)
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.remove-spaces",
    name: "Remove Spaces",
    category: "text_tools",
    icon: "␣",
    description: "Collapse duplicate spaces or strip all whitespace characters.",
    descriptionZh: "消除所有多余空格或压缩连续空白字符。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: Remove Spaces
identifier: com.flyclip.extension.remove-spaces
icon: "␣"
actions:
  - title: 压缩空格
    shell script: Write-Host -NoNewline ([regex]::Replace($env:FLYCLIP_TEXT, '\s+', ' ').Trim())
    after: paste-result
  - title: 消除所有空格
    shell script: Write-Host -NoNewline ([regex]::Replace($env:FLYCLIP_TEXT, '\s+', ''))
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.full-half-width",
    name: "全角半角转换",
    category: "text_tools",
    icon: "全半",
    description: "Convert between Full-width and Half-width characters.",
    descriptionZh: "全角标点字符与半角英文字符双向转换。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: 全角半角转换
identifier: com.flyclip.extension.full-half-width
icon: 全半
actions:
  - title: 全角转半角
    shell script: |
      $chars = $env:FLYCLIP_TEXT.ToCharArray()
      for ($i=0; $i -lt $chars.Length; $i++) {
        $c = [int]$chars[$i]
        if ($c -eq 12288) { $chars[$i] = [char]32 }
        elseif ($c -ge 65281 -and $c -le 65374) { $chars[$i] = [char]($c - 65248) }
      }
      Write-Host -NoNewline (New-Object String(,$chars))
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.timestamp-converter",
    name: "Timestamp Converter",
    category: "text_tools",
    icon: "⏱️",
    description: "Convert Unix epoch timestamps to local date-time strings.",
    descriptionZh: "Unix 时间戳转换为本地日期时间，或获取当前秒级时间戳。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: Timestamp Converter
identifier: com.flyclip.extension.timestamp-converter
icon: ⏱️
actions:
  - title: 转日期
    shell script: |
      $s = $env:FLYCLIP_TEXT.Trim()
      if ($s -match '^\d{10}$') {
        Write-Host -NoNewline ([DateTimeOffset]::FromUnixTimeSeconds([int64]$s).ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss"))
      }
    after: paste-result
  - title: 当前时间戳
    shell script: Write-Host -NoNewline ([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())
    after: paste-result`
  },
  {
    id: "com.flyclip.extension.markdown-tools",
    name: "Markdown Tools",
    category: "text_tools",
    icon: "MD",
    description: "Wrap text in Markdown bold, inline code, code blocks, or blockquotes.",
    descriptionZh: "快速为选中文本添加 Markdown 粗体、行内代码、代码块或引用标记。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: Markdown Tools
identifier: com.flyclip.extension.markdown-tools
icon: MD
actions:
  - title: 粗体
    shell script: Write-Host -NoNewline ("**" + $env:FLYCLIP_TEXT + "**")
    after: paste-result
  - title: 行内代码
    shell script: Write-Host -NoNewline ("\`" + $env:FLYCLIP_TEXT + "\`")
    after: paste-result
  - title: 引用
    shell script: |
      $lines = $env:FLYCLIP_TEXT -split "\`r\`n|\`r|\`n"
      Write-Host -NoNewline (($lines | ForEach-Object { "> $_" }) -join "\`r\`n")
    after: paste-result`
  },

  // --- Developer Tools ---
  {
    id: "com.flyclip.extension.calculate",
    name: "Calculate",
    category: "developer",
    icon: "=?",
    description: "Evaluate math expressions instantly (e.g. 128*1024, (50+20)/3).",
    descriptionZh: "即时计算选中的数学表达式并显示结果。",
    hasOptions: false,
    type: "powershell",
    configYaml: `name: Calculate
identifier: com.flyclip.extension.calculate
icon: "=?"
actions:
  - title: 计算结果
    shell script: |
      $expr = $env:FLYCLIP_TEXT.Trim()
      $res = Invoke-Expression $expr
      Write-Host -NoNewline "$expr = $res"
    after: show-result`
  },
  {
    id: "com.flyclip.extension.regex101",
    name: "Regex101",
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
