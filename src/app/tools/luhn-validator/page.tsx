import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { LuhnValidatorTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("luhn-validator");

export default function Page() {
  return (
    <ToolPageShell slug="luhn-validator">
      <LuhnValidatorTool />
    </ToolPageShell>
  );
}
