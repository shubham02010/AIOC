import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JSMinifierTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("js-minifier");

export default function Page() {
  return (
    <ToolPageShell slug="js-minifier">
      <JSMinifierTool />
    </ToolPageShell>
  );
}
