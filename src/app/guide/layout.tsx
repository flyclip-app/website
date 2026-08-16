import DocsSidebar from "@/components/DocsSidebar";
import { GUIDE_NAV } from "@/data/docsNav";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
      <DocsSidebar sections={GUIDE_NAV} basePath="/guide" />
      <article className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-10 max-w-4xl">
        {children}
      </article>
    </div>
  );
}
