import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CSSTransformTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("css-transform-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-transform-generator">
      <CSSTransformTool />
    </ToolPageShell>
  );
}
