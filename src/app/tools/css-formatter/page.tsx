import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSFormatterTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="css-formatter">
      <CSSFormatterTool />
    </ToolPageShell>
  );
}
