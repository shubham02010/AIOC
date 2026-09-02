import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { BreakEvenCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("break-even-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="break-even-calculator">
      <BreakEvenCalculatorTool />
    </ToolPageShell>
  );
}
