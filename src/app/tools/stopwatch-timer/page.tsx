import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { StopwatchTimerTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("stopwatch-timer");

export default function Page() {
  return (
    <ToolPageShell slug="stopwatch-timer">
      <StopwatchTimerTool />
    </ToolPageShell>
  );
}
