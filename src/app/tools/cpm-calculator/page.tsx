import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CPMCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("cpm-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="cpm-calculator">
      <CPMCalculatorTool />
    </ToolPageShell>
  );
}
