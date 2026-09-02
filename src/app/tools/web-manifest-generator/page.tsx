import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WebManifestGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("web-manifest-generator");

export default function Page() {
  return (
    <ToolPageShell slug="web-manifest-generator">
      <WebManifestGeneratorTool />
    </ToolPageShell>
  );
}
