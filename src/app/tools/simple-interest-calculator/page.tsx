import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SimpleInterestCalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("simple-interest-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="simple-interest-calculator">
      <SimpleInterestCalculatorTool />
    </ToolPageShell>
  );
}
