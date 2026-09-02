import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SitemapGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("sitemap-generator");

export default function Page() {
  return (
    <ToolPageShell slug="sitemap-generator">
      <SitemapGeneratorTool />
    </ToolPageShell>
  );
}
