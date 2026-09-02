import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SERPSnippetPreviewTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("serp-snippet-preview");

export default function Page() {
  return (
    <ToolPageShell slug="serp-snippet-preview">
      <SERPSnippetPreviewTool />
    </ToolPageShell>
  );
}
