import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ColorBlindnessSimulatorTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("color-blindness-simulator");

export default function Page() {
  return (
    <ToolPageShell slug="color-blindness-simulator">
      <ColorBlindnessSimulatorTool />
    </ToolPageShell>
  );
}
