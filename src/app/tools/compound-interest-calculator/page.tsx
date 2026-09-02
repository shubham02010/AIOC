import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CompoundInterestCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("compound-interest-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="compound-interest-calculator">
      <CompoundInterestCalculatorTool />
    </ToolPageShell>
  );
}
