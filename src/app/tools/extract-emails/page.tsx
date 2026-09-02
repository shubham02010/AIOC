import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ExtractEmailsTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("extract-emails");

export default function Page() {
  return (
    <ToolPageShell slug="extract-emails">
      <ExtractEmailsTool />
    </ToolPageShell>
  );
}
