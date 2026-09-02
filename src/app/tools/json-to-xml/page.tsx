import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JSONToXMLTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("json-to-xml");

export default function Page() {
  return (
    <ToolPageShell slug="json-to-xml">
      <JSONToXMLTool />
    </ToolPageShell>
  );
}
