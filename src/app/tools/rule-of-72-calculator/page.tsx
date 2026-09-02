import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RuleOf72CalculatorTool } from "@/components/calculator-tools/CalculatorToolsComponents";

export const metadata = generateToolMetadata("rule-of-72-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="rule-of-72-calculator">
      <RuleOf72CalculatorTool />
    </ToolPageShell>
  );
}
