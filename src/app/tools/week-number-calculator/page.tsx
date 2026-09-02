import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WeekNumberCalculatorTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("week-number-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="week-number-calculator">
      <WeekNumberCalculatorTool />
    </ToolPageShell>
  );
}
