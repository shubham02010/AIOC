import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TrimWhitespaceTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("trim-whitespace");

export default function Page() {
  return (
    <ToolPageShell slug="trim-whitespace">
      <TrimWhitespaceTool />
    </ToolPageShell>
  );
}
