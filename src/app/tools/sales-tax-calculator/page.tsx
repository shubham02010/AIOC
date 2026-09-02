import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SalesTaxCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("sales-tax-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="sales-tax-calculator">
      <SalesTaxCalculatorTool />
    </ToolPageShell>
  );
}
