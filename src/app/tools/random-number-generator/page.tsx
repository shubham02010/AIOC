import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RandomNumberGeneratorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("random-number-generator");

export default function Page() {
  return (
    <ToolPageShell slug="random-number-generator">
      <RandomNumberGeneratorTool />
    </ToolPageShell>
  );
}
