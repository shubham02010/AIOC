import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { PresentValueCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("present-value-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="present-value-calculator">
      <PresentValueCalculatorTool />
    </ToolPageShell>
  );
}
