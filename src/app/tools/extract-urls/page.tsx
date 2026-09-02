import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ExtractURLsTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("extract-urls");

export default function Page() {
  return (
    <ToolPageShell slug="extract-urls">
      <ExtractURLsTool />
    </ToolPageShell>
  );
}
