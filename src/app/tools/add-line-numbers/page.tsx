import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { AddLineNumbersTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("add-line-numbers");

export default function Page() {
  return (
    <ToolPageShell slug="add-line-numbers">
      <AddLineNumbersTool />
    </ToolPageShell>
  );
}
