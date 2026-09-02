import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JSFormatterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("js-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="js-formatter">
      <JSFormatterTool />
    </ToolPageShell>
  );
}
