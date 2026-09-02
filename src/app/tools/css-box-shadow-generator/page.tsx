import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSBoxShadowTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-box-shadow-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-box-shadow-generator">
      <CSSBoxShadowTool />
    </ToolPageShell>
  );
}
