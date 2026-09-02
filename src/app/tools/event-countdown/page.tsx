import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { EventCountdownTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("event-countdown");

export default function Page() {
  return (
    <ToolPageShell slug="event-countdown">
      <EventCountdownTool />
    </ToolPageShell>
  );
}
