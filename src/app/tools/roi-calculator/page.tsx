import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ROICalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("roi-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="roi-calculator">
      <ROICalculatorTool />
    </ToolPageShell>
  );
}
