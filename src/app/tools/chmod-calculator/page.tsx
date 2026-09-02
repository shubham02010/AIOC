import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ChmodCalculatorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("chmod-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="chmod-calculator">
      <ChmodCalculatorTool />
    </ToolPageShell>
  );
}
