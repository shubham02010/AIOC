import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TwitterCardGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("twitter-card-generator");

export default function Page() {
  return (
    <ToolPageShell slug="twitter-card-generator">
      <TwitterCardGeneratorTool />
    </ToolPageShell>
  );
}
