import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ColorNamerTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("color-namer");

export default function Page() {
  return (
    <ToolPageShell slug="color-namer">
      <ColorNamerTool />
    </ToolPageShell>
  );
}
