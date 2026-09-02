import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { InflationCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("inflation-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="inflation-calculator">
      <InflationCalculatorTool />
    </ToolPageShell>
  );
}
