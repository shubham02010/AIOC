import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { DiscountCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("discount-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="discount-calculator">
      <DiscountCalculatorTool />
    </ToolPageShell>
  );
}
