import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSVToJSONTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("csv-to-json");

export default function Page() {
  return (
    <ToolPageShell slug="csv-to-json">
      <CSVToJSONTool />
    </ToolPageShell>
  );
}
