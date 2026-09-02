import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { DataURIToSVGTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("data-uri-to-svg");

export default function Page() {
  return (
    <ToolPageShell slug="data-uri-to-svg">
      <DataURIToSVGTool />
    </ToolPageShell>
  );
}
