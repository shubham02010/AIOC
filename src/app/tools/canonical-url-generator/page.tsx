import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CanonicalURLGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("canonical-url-generator");

export default function Page() {
  return (
    <ToolPageShell slug="canonical-url-generator">
      <CanonicalURLGeneratorTool />
    </ToolPageShell>
  );
}
