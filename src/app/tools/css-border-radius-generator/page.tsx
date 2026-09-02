import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSBorderRadiusTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-border-radius-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-border-radius-generator">
      <CSSBorderRadiusTool />
    </ToolPageShell>
  );
}
