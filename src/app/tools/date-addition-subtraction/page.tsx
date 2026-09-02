import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { DateAdditionSubtractionTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("date-addition-subtraction");

export default function Page() {
  return (
    <ToolPageShell slug="date-addition-subtraction">
      <DateAdditionSubtractionTool />
    </ToolPageShell>
  );
}
