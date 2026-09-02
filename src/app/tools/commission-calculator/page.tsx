import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CommissionCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("commission-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="commission-calculator">
      <CommissionCalculatorTool />
    </ToolPageShell>
  );
}
