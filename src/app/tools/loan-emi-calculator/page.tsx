import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { LoanEMICalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("loan-emi-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="loan-emi-calculator">
      <LoanEMICalculatorTool />
    </ToolPageShell>
  );
}
