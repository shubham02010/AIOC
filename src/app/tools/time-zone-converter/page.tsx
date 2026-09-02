import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TimeZoneConverterTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("time-zone-converter");

export default function Page() {
  return (
    <ToolPageShell slug="time-zone-converter">
      <TimeZoneConverterTool />
    </ToolPageShell>
  );
}
