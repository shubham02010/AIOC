import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSFlexboxTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-flexbox-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-flexbox-generator">
      <CSSFlexboxTool />
    </ToolPageShell>
  );
}
