import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ROT13CipherTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("rot13-cipher");

export default function Page() {
  return (
    <ToolPageShell slug="rot13-cipher">
      <ROT13CipherTool />
    </ToolPageShell>
  );
}
