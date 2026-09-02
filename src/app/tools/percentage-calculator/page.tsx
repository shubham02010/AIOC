import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { PercentageCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("percentage-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="percentage-calculator">
      <PercentageCalculatorTool />
    </ToolPageShell>
  );
}
