import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ConversionRateCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("conversion-rate-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="conversion-rate-calculator">
      <ConversionRateCalculatorTool />
    </ToolPageShell>
  );
}
