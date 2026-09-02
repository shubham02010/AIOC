import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSGridTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-grid-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-grid-generator">
      <CSSGridTool />
    </ToolPageShell>
  );
}
