import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JSONToYAMLTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("json-to-yaml");

export default function Page() {
  return (
    <ToolPageShell slug="json-to-yaml">
      <JSONToYAMLTool />
    </ToolPageShell>
  );
}
