import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TextStatisticsTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("text-statistics");

export default function Page() {
  return (
    <ToolPageShell slug="text-statistics">
      <TextStatisticsTool />
    </ToolPageShell>
  );
}
