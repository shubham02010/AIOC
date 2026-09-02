import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { IBANValidatorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("iban-validator");

export default function Page() {
  return (
    <ToolPageShell slug="iban-validator">
      <IBANValidatorTool />
    </ToolPageShell>
  );
}
