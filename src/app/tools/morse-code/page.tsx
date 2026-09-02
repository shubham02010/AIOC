import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MorseCodeTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("morse-code");

export default function Page() {
  return (
    <ToolPageShell slug="morse-code">
      <MorseCodeTool />
    </ToolPageShell>
  );
}
