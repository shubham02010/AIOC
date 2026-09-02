import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { DepreciationCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("depreciation-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="depreciation-calculator">
      <DepreciationCalculatorTool />
    </ToolPageShell>
  );
}
