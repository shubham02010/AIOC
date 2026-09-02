import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { PasswordGeneratorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("password-generator");

export default function Page() {
  return (
    <ToolPageShell slug="password-generator">
      <PasswordGeneratorTool />
    </ToolPageShell>
  );
}
