import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CaesarCipherTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("caesar-cipher");

export default function Page() {
  return (
    <ToolPageShell slug="caesar-cipher">
      <CaesarCipherTool />
    </ToolPageShell>
  );
}
