import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MortgageCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("mortgage-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="mortgage-calculator">
      <MortgageCalculatorTool />
    </ToolPageShell>
  );
}
