import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WorldClockTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("world-clock");

export default function Page() {
  return (
    <ToolPageShell slug="world-clock">
      <WorldClockTool />
    </ToolPageShell>
  );
}
