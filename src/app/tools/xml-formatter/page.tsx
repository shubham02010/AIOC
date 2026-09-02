import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { XMLFormatterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("xml-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="xml-formatter">
      <XMLFormatterTool />
    </ToolPageShell>
  );
}
