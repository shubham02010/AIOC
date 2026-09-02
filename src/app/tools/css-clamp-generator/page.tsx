import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSClampTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-clamp-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-clamp-generator">
      <CSSClampTool />
    </ToolPageShell>
  );
}
