import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ReverseTextTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("reverse-text");

export default function Page() {
  return (
    <ToolPageShell slug="reverse-text">
      <ReverseTextTool />
    </ToolPageShell>
  );
}
