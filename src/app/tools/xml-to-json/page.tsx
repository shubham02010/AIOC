import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { XMLToJSONTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("xml-to-json");

export default function Page() {
  return (
    <ToolPageShell slug="xml-to-json">
      <XMLToJSONTool />
    </ToolPageShell>
  );
}
