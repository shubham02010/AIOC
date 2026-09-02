import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JSONToCSVTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("json-to-csv");

export default function Page() {
  return (
    <ToolPageShell slug="json-to-csv">
      <JSONToCSVTool />
    </ToolPageShell>
  );
}
