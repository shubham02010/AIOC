import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RandomStringGeneratorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("random-string-generator");

export default function Page() {
  return (
    <ToolPageShell slug="random-string-generator">
      <RandomStringGeneratorTool />
    </ToolPageShell>
  );
}
