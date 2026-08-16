import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function DevMigrationPage() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
      <div>
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Developer Reference / Migration</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">从 PopClip 平滑迁移指南</h1>
        <p className="text-slate-400">
          FlyClip 针对 PopClip 的扩展语法设计了完善的兼容映射层，降低跨平台移植成本。
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-[#2d3142] pb-2">语法映射与兼容对照</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d3142] text-slate-400">
                <th className="py-2.5 px-3">FlyClip 原生标准</th>
                <th className="py-2.5 px-3">PopClip 兼容别名</th>
                <th className="py-2.5 px-3">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3142] text-slate-300">
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">.flyclipext</td>
                <td className="py-3 px-3 font-mono text-slate-400">.popclipext</td>
                <td className="py-3 px-3">扩展包目录后缀均被引擎扫描并自动加载。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">.flyclipextz</td>
                <td className="py-3 px-3 font-mono text-slate-400">.popclipextz</td>
                <td className="py-3 px-3">单文件压缩归档均被自动解压安装。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">{`{flyclip text}`}</td>
                <td className="py-3 px-3 font-mono text-slate-400">{`{popclip text}`}</td>
                <td className="py-3 px-3">URL 模板占位符双向兼容。</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono text-blue-400">$env:FLYCLIP_TEXT</td>
                <td className="py-3 px-3 font-mono text-slate-400">$env:POPCLIP_TEXT</td>
                <td className="py-3 px-3">脚本环境变量双向注入。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2d3142] flex justify-between items-center text-xs">
        <Link href="/dev/variables" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1c1e27] border border-[#2d3142] text-slate-300 hover:text-white font-semibold transition-colors">
          <ArrowLeft size={14} />
          <span>上一页：占位符与环境变量</span>
        </Link>
        <Link href="/extensions" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          <span>浏览 40+ 官方扩展</span>
        </Link>
      </div>
    </div>
  );
}
