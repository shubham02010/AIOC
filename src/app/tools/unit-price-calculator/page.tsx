import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UnitPriceCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("unit-price-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="unit-price-calculator">
      <UnitPriceCalculatorTool />
    </ToolPageShell>
  );
}
