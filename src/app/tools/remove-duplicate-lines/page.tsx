import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RemoveDuplicateLinesTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("remove-duplicate-lines");

export default function Page() {
  return (
    <ToolPageShell slug="remove-duplicate-lines">
      <RemoveDuplicateLinesTool />
    </ToolPageShell>
  );
}
