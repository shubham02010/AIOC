import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SVGToDataURITool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("svg-to-data-uri");

export default function Page() {
  return (
    <ToolPageShell slug="svg-to-data-uri">
      <SVGToDataURITool />
    </ToolPageShell>
  );
}
