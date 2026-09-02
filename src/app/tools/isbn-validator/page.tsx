import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ISBNValidatorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("isbn-validator");

export default function Page() {
  return (
    <ToolPageShell slug="isbn-validator">
      <ISBNValidatorTool />
    </ToolPageShell>
  );
}
