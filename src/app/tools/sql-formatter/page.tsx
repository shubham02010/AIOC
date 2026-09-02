import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SQLFormatterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("sql-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="sql-formatter">
      <SQLFormatterTool />
    </ToolPageShell>
  );
}
