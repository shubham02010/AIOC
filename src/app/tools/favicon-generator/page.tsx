import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { FaviconGeneratorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("favicon-generator");

export default function Page() {
  return (
    <ToolPageShell slug="favicon-generator">
      <FaviconGeneratorTool />
    </ToolPageShell>
  );
}
