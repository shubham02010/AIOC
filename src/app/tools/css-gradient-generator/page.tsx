import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSGradientTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-gradient-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-gradient-generator">
      <CSSGradientTool />
    </ToolPageShell>
  );
}
