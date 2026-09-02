import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TextDiffTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("text-diff");

export default function Page() {
  return (
    <ToolPageShell slug="text-diff">
      <TextDiffTool />
    </ToolPageShell>
  );
}
