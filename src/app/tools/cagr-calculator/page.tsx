import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CAGRCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("cagr-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="cagr-calculator">
      <CAGRCalculatorTool />
    </ToolPageShell>
  );
}
