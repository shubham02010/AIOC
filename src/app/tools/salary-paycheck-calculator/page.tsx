import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SalaryPaycheckCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("salary-paycheck-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="salary-paycheck-calculator">
      <SalaryPaycheckCalculatorTool />
    </ToolPageShell>
  );
}
