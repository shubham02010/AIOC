import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { VATGSTCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("vat-gst-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="vat-gst-calculator">
      <VATGSTCalculatorTool />
    </ToolPageShell>
  );
}
