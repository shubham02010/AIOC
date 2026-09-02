import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CTRCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("ctr-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="ctr-calculator">
      <CTRCalculatorTool />
    </ToolPageShell>
  );
}
