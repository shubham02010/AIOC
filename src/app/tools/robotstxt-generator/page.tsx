import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RobotsTxtGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("robotstxt-generator");

export default function Page() {
  return (
    <ToolPageShell slug="robotstxt-generator">
      <RobotsTxtGeneratorTool />
    </ToolPageShell>
  );
}
