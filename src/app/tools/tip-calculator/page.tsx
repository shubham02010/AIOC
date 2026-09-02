import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TipCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("tip-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="tip-calculator">
      <TipCalculatorTool />
    </ToolPageShell>
  );
}
