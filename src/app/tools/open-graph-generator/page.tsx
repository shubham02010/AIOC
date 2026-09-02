import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { OpenGraphGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("open-graph-generator");

export default function Page() {
  return (
    <ToolPageShell slug="open-graph-generator">
      <OpenGraphGeneratorTool />
    </ToolPageShell>
  );
}
