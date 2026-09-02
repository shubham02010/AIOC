import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WorkingDaysCalculatorTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("working-days-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="working-days-calculator">
      <WorkingDaysCalculatorTool />
    </ToolPageShell>
  );
}
