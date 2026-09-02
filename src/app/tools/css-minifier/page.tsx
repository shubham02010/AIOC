import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSMinifierTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-minifier");

export default function Page() {
  return (
    <ToolPageShell slug="css-minifier">
      <CSSMinifierTool />
    </ToolPageShell>
  );
}
