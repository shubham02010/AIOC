import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { PassphraseGeneratorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("passphrase-generator");

export default function Page() {
  return (
    <ToolPageShell slug="passphrase-generator">
      <PassphraseGeneratorTool />
    </ToolPageShell>
  );
}
