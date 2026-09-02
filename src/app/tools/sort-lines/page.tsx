import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SortLinesTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("sort-lines");

export default function Page() {
  return (
    <ToolPageShell slug="sort-lines">
      <SortLinesTool />
    </ToolPageShell>
  );
}
