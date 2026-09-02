import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { FutureValueCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("future-value-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="future-value-calculator">
      <FutureValueCalculatorTool />
    </ToolPageShell>
  );
}
