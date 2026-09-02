import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { FindAndReplaceTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("find-and-replace");

export default function Page() {
  return (
    <ToolPageShell slug="find-and-replace">
      <FindAndReplaceTool />
    </ToolPageShell>
  );
}
