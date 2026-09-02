import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RatioCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("ratio-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="ratio-calculator">
      <RatioCalculatorTool />
    </ToolPageShell>
  );
}
