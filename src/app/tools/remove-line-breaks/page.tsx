import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RemoveLineBreaksTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("remove-line-breaks");

export default function Page() {
  return (
    <ToolPageShell slug="remove-line-breaks">
      <RemoveLineBreaksTool />
    </ToolPageShell>
  );
}
