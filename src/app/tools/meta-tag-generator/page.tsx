import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MetaTagGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("meta-tag-generator");

export default function Page() {
  return (
    <ToolPageShell slug="meta-tag-generator">
      <MetaTagGeneratorTool />
    </ToolPageShell>
  );
}
