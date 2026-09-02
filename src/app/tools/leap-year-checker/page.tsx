import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { LeapYearCheckerTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("leap-year-checker");

export default function Page() {
  return (
    <ToolPageShell slug="leap-year-checker">
      <LeapYearCheckerTool />
    </ToolPageShell>
  );
}
