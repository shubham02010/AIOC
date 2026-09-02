import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ExtractNumbersTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("extract-numbers");

export default function Page() {
  return (
    <ToolPageShell slug="extract-numbers">
      <ExtractNumbersTool />
    </ToolPageShell>
  );
}
