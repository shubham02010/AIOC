import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSGlassmorphismTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-glassmorphism-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-glassmorphism-generator">
      <CSSGlassmorphismTool />
    </ToolPageShell>
  );
}
