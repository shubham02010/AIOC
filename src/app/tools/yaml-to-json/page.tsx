import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { YAMLToJSONTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("yaml-to-json");

export default function Page() {
  return (
    <ToolPageShell slug="yaml-to-json">
      <YAMLToJSONTool />
    </ToolPageShell>
  );
}
