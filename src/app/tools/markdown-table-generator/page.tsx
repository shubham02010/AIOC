import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MarkdownTableGeneratorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("markdown-table-generator");

export default function Page() {
  return (
    <ToolPageShell slug="markdown-table-generator">
      <MarkdownTableGeneratorTool />
    </ToolPageShell>
  );
}
