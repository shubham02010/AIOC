import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HMACGeneratorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("hmac-generator");

export default function Page() {
  return (
    <ToolPageShell slug="hmac-generator">
      <HMACGeneratorTool />
    </ToolPageShell>
  );
}
