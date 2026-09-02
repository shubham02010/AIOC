import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MarginCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("margin-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="margin-calculator">
      <MarginCalculatorTool />
    </ToolPageShell>
  );
}
