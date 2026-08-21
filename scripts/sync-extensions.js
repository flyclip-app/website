const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const extRepoDir = path.resolve(__dirname, '../../flyclip-extensions/extensions');
const outputFile = path.resolve(__dirname, '../src/data/extensions.ts');

if (!fs.existsSync(extRepoDir)) {
  console.warn(`[WARN] flyclip-extensions repo not found at ${extRepoDir}, keeping existing extensions.ts`);
  process.exit(0);
}

const folders = fs.readdirSync(extRepoDir).filter(f => f.endsWith('.flyclipext'));

const categoryMap = {
  // Translation
  'com.flyclip.extension.pot-desktop': 'translation',
  'com.flyclip.extension.stranslate': 'translation',
  'com.flyclip.extension.google-translate': 'translation',
  'com.flyclip.extension.deepl-translate': 'translation',
  'com.flyclip.extension.baidu-translate': 'translation',
  'com.flyclip.extension.youdao-dict': 'translation',
  'com.flyclip.extension.wikipedia': 'translation',
  'com.flyclip.extension.mdn-web-docs': 'translation',
  'com.flyclip.extension.urban-dictionary': 'translation',
  'com.flyclip.extension.traditional-simplified': 'translation',

  // Search & AI & Academic
  'com.flyclip.extension.google-search': 'search_ai',
  'com.flyclip.extension.baidu-search': 'search_ai',
  'com.flyclip.extension.bing-search': 'search_ai',
  'com.flyclip.extension.duckduckgo': 'search_ai',
  'com.flyclip.extension.github-search': 'search_ai',
  'com.flyclip.extension.chatgpt': 'search_ai',
  'com.flyclip.extension.claude': 'search_ai',
  'com.flyclip.extension.deepseek': 'search_ai',
  'com.flyclip.extension.zhihu-search': 'search_ai',
  'com.flyclip.extension.bilibili-search': 'search_ai',
  'com.flyclip.extension.youtube-search': 'search_ai',
  'com.flyclip.extension.xiaohongshu': 'search_ai',
  'com.flyclip.extension.twitter-search': 'search_ai',
  'com.flyclip.extension.reddit-search': 'search_ai',
  'com.flyclip.extension.hackernews-search': 'search_ai',
  'com.flyclip.extension.medium-search': 'search_ai',
  'com.flyclip.extension.v2ex-search': 'search_ai',
  'com.flyclip.extension.google-scholar': 'search_ai',
  'com.flyclip.extension.pubmed': 'search_ai',
  'com.flyclip.extension.arxiv-search': 'search_ai',
  'com.flyclip.extension.wolfram-alpha': 'search_ai',
  'com.flyclip.extension.brave-search': 'search_ai',
  'com.flyclip.extension.kagi-search': 'search_ai',
  'com.flyclip.extension.startpage-search': 'search_ai',
  'com.flyclip.extension.ecosia-search': 'search_ai',
  'com.flyclip.extension.yandex-search': 'search_ai',

  // Text Tools
  'com.flyclip.extension.cut': 'text_tools',
  'com.flyclip.extension.case-converter': 'text_tools',
  'com.flyclip.extension.base64': 'text_tools',
  'com.flyclip.extension.url-encode': 'text_tools',
  'com.flyclip.extension.html-encode': 'text_tools',
  'com.flyclip.extension.json-formatter': 'text_tools',
  'com.flyclip.extension.text-statistics': 'text_tools',
  'com.flyclip.extension.sort-lines': 'text_tools',
  'com.flyclip.extension.join-lines': 'text_tools',
  'com.flyclip.extension.remove-spaces': 'text_tools',
  'com.flyclip.extension.full-half-width': 'text_tools',
  'com.flyclip.extension.timestamp-converter': 'text_tools',
  'com.flyclip.extension.markdown-tools': 'text_tools',
  'com.flyclip.extension.link-cleaner': 'text_tools',
  'com.flyclip.extension.open-urls': 'text_tools',
  'com.flyclip.extension.copy-urls': 'text_tools',
  'com.flyclip.extension.sum-numbers': 'text_tools',
  'com.flyclip.extension.slugify': 'text_tools',
  'com.flyclip.extension.comma-list': 'text_tools',
  'com.flyclip.extension.shuffle-lines': 'text_tools',
  'com.flyclip.extension.reverse-lines': 'text_tools',
  'com.flyclip.extension.poor-text': 'text_tools',
  'com.flyclip.extension.rot13': 'text_tools',
  'com.flyclip.extension.shorten-link': 'text_tools',

  // Developer
  'com.flyclip.extension.calculate': 'developer',
  'com.flyclip.extension.regex101': 'developer',
  'com.flyclip.extension.ip-lookup': 'developer',
  'com.flyclip.extension.hash-generator': 'developer',
  'com.flyclip.extension.iconify-search': 'developer',
  'com.flyclip.extension.stackoverflow': 'developer',
  'com.flyclip.extension.devdocs': 'developer',
  'com.flyclip.extension.npm-search': 'developer',
  'com.flyclip.extension.pypi-search': 'developer',
  'com.flyclip.extension.crates-io': 'developer',
  'com.flyclip.extension.dockerhub': 'developer',
  'com.flyclip.extension.caniuse': 'developer',
  'com.flyclip.extension.cyberchef': 'developer',
  'com.flyclip.extension.regexr': 'developer',
  'com.flyclip.extension.doi-resolver': 'developer',

  // Shopping & Media & Notes & Location
  'com.flyclip.extension.jd-search': 'shopping',
  'com.flyclip.extension.taobao-search': 'shopping',
  'com.flyclip.extension.douban-search': 'shopping',
  'com.flyclip.extension.imdb': 'shopping',
  'com.flyclip.extension.amazon': 'shopping',
  'com.flyclip.extension.ebay-search': 'shopping',
  'com.flyclip.extension.convert-currency': 'shopping',
  'com.flyclip.extension.goodreads': 'shopping',
  'com.flyclip.extension.rotten-tomatoes': 'shopping',
  'com.flyclip.extension.spotify-search': 'shopping',
  'com.flyclip.extension.obsidian-capture': 'shopping',
  'com.flyclip.extension.notion-search': 'shopping',
  'com.flyclip.extension.todoist-task': 'shopping',
  'com.flyclip.extension.raindrop-bookmark': 'shopping',
  'com.flyclip.extension.pocket-save': 'shopping',
  'com.flyclip.extension.wayback-machine': 'shopping',
  'com.flyclip.extension.archive-today': 'shopping',
  'com.flyclip.extension.google-maps': 'shopping',
  'com.flyclip.extension.openstreetmap': 'shopping',
  'com.flyclip.extension.amap-search': 'shopping',
};

function determineType(parsed) {
  const actions = Array.isArray(parsed.actions) ? parsed.actions : (parsed.action ? [parsed.action] : []);
  for (const act of actions) {
    if (act.javascript || act['javascript file']) return 'js';
    if (act['shell script'] || act['shell script file'] || act.powershell) return 'powershell';
    if (act['key combo'] || act['key combos']) return 'keys';
    if (act.url) return 'url';
  }
  return 'url';
}

const items = [];

for (const folder of folders) {
  const yamlPath = path.join(extRepoDir, folder, 'Config.yaml');
  if (!fs.existsSync(yamlPath)) continue;

  const rawYaml = fs.readFileSync(yamlPath, 'utf8').trim();
  let parsed;
  try {
    parsed = YAML.parse(rawYaml);
  } catch (err) {
    console.error(`Failed to parse YAML for ${folder}:`, err.message);
    continue;
  }

  const id = parsed.identifier || `com.flyclip.extension.${folder.toLowerCase().replace(/\.flyclipext$/, '')}`;

  // Extract bilingual names directly from Config.yaml
  let nameEn = '';
  let nameZh = '';
  let defaultName = '';

  if (typeof parsed.name === 'object' && parsed.name !== null) {
    nameEn = parsed.name.en || '';
    nameZh = parsed.name['zh-CN'] || parsed.name['zh-Hans'] || parsed.name.zh || nameEn;
    defaultName = nameEn || nameZh;
  } else if (typeof parsed.name === 'string') {
    defaultName = parsed.name;
    nameEn = parsed.name;
    nameZh = parsed.name;
  }

  // Extract bilingual descriptions directly from Config.yaml
  let descEn = '';
  let descZh = '';

  if (typeof parsed.description === 'object' && parsed.description !== null) {
    descEn = parsed.description.en || '';
    descZh = parsed.description['zh-CN'] || parsed.description['zh-Hans'] || parsed.description.zh || descEn;
  } else if (typeof parsed.description === 'string') {
    descEn = parsed.description;
    descZh = parsed.description;
  }

  const icon = String(parsed.icon || '⚡');
  const hasOptions = Array.isArray(parsed.options) && parsed.options.length > 0;
  const optionsCount = hasOptions ? parsed.options.length : undefined;
  const type = determineType(parsed);
  const category = categoryMap[id] || 'developer';

  items.push({
    folderName: folder.replace(/\.flyclipext$/, ''),
    id,
    name: defaultName,
    nameZh,
    nameEn,
    category,
    icon,
    description: descEn,
    descriptionZh: descZh,
    hasOptions,
    optionsCount,
    type,
    configYaml: rawYaml,
  });
}

// Generate TS output
let tsContent = `// Automatically generated by scripts/sync-extensions.js from flyclip-extensions repository.
// DO NOT EDIT MANUALLY. Modify Config.yaml in flyclip-extensions instead.

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

const EXTENSION_PACKAGE_MAP: Record<string, string> = {
${items.map(it => `  ${JSON.stringify(it.id)}: ${JSON.stringify(it.folderName)},`).join('\n')}
};

export function getExtensionPackageName(id: string): string {
  return EXTENSION_PACKAGE_MAP[id] || id.split('.').pop() || 'Extension';
}

export const EXTENSIONS_DATA: ExtensionItem[] = [
`;

for (const item of items) {
  tsContent += `  {
    id: ${JSON.stringify(item.id)},
    name: ${JSON.stringify(item.name)},
    nameZh: ${JSON.stringify(item.nameZh)},
    nameEn: ${JSON.stringify(item.nameEn)},
    category: ${JSON.stringify(item.category)},
    icon: ${JSON.stringify(item.icon)},
    description: ${JSON.stringify(item.description)},
    descriptionZh: ${JSON.stringify(item.descriptionZh)},
    hasOptions: ${item.hasOptions},
    ${item.optionsCount ? `optionsCount: ${item.optionsCount},` : ''}
    type: ${JSON.stringify(item.type)},
    configYaml: ${JSON.stringify(item.configYaml)}
  },
`;
}

tsContent += `];\n`;

fs.writeFileSync(outputFile, tsContent, 'utf8');
console.log(`[SUCCESS] Synced ${items.length} extensions from flyclip-extensions into ${outputFile}`);
