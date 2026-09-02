import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RandomColorGeneratorTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("random-color-generator");

export default function Page() {
  return (
    <ToolPageShell slug="random-color-generator">
      <RandomColorGeneratorTool />
    </ToolPageShell>
  );
}
